"use server";

import {redirect} from "next/navigation";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function SignInWithEmailAndPassword(loginData: {email: string; password: string}) {
  const supabase = await createSupabaseServerClient();

  const {data, error} = await supabase.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  });

  return {data, error};
}

export async function Logout() {
  "use server";
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect("/");
}
