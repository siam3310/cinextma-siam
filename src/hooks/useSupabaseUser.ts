"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

export default function useSupabaseUser() {
  return useQuery({
    queryKey: ["supabase-user"],
    queryFn: async () => {
      const { data, error } = await createClient().auth.getUser();
      if (error && error.status !== 401) throw error;
      return data.user;
    },
    staleTime: 1000 * 60 * 5,
  });
}
