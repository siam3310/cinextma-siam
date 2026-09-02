"use server";

import { createClient } from "@/utils/supabase/server";
import { ContentType } from "@/types";
import { Database } from "@/utils/supabase/types";

const PAGE_SIZE_DEFAULT = 20;

type WatchlistInsert = Database["public"]["Tables"]["watchlist"]["Insert"];
type WatchlistRow = Database["public"]["Tables"]["watchlist"]["Row"];

async function getAuthenticatedClient() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { supabase, user: null };
  }

  return { supabase, user };
}

export async function checkInWatchlist(id: number, type: ContentType) {
  const { supabase, user } = await getAuthenticatedClient();
  if (!user) return { success: false, isInWatchlist: false, error: "User not authenticated" };

  const { data, error } = await supabase
    .from("watchlist")
    .select("id")
    .eq("id", id)
    .eq("type", type)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) return { success: false, isInWatchlist: false, error: error.message };
  return { success: true, isInWatchlist: Boolean(data) };
}

export async function addToWatchlist(item: Omit<WatchlistInsert, "user_id">) {
  const { supabase, user } = await getAuthenticatedClient();
  if (!user) return { success: false, error: "User not authenticated" };

  const { error } = await supabase.from("watchlist").insert({ ...item, user_id: user.id });
  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "This item is already in your watchlist" };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function removeFromWatchlist(id: number, type: ContentType) {
  const { supabase, user } = await getAuthenticatedClient();
  if (!user) return { success: false, error: "User not authenticated" };

  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("id", id)
    .eq("type", type)
    .eq("user_id", user.id);

  return error ? { success: false, error: error.message } : { success: true };
}

export async function getWatchlist(
  type: ContentType | "all",
  page = 1,
  pageSize = PAGE_SIZE_DEFAULT,
): Promise<{ success: boolean; data: WatchlistRow[]; hasNextPage: boolean; error?: string }> {
  const { supabase, user } = await getAuthenticatedClient();
  if (!user) return { success: false, data: [], hasNextPage: false, error: "User not authenticated" };

  const from = Math.max(0, page - 1) * pageSize;
  const to = from + pageSize;
  let query = supabase.from("watchlist").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).range(from, to);
  if (type !== "all") query = query.eq("type", type);

  const { data, error } = await query;
  if (error) return { success: false, data: [], hasNextPage: false, error: error.message };

  const rows = data ?? [];
  return { success: true, data: rows.slice(0, pageSize), hasNextPage: rows.length > pageSize };
}

export async function removeAllWatchlist(type: ContentType) {
  const { supabase, user } = await getAuthenticatedClient();
  if (!user) return { success: false, error: "User not authenticated" };

  const { error } = await supabase.from("watchlist").delete().eq("user_id", user.id).eq("type", type);
  return error ? { success: false, error: error.message } : { success: true };
}

