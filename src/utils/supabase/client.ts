"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/utils/env";

let client: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  client ??= createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return client;
}
