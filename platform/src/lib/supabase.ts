import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY || SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, supabaseAnonKey);

export const auth = {
  signInWithOtp: async (email: string) => {
    return await supabase.auth.signInWithOtp({
      email,
      // Removed emailRedirectTo to send OTP code instead of magic link
    });
  },
  verifyOtp: async (email: string, token: string) => {
    return await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
  },
  signOut: async () => await supabase.auth.signOut(),
  getSession: async () => await supabase.auth.getSession(),
  onAuthStateChange: (callback: (event: any, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};
