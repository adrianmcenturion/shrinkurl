"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function SignUpWithEmailAndPassword(registerData: {
  email: string;
  password: string;
  confirm: string;
}) {
  const supabase = await createSupabaseServerClient();

  const {data, error} = await supabase.auth.signUp({
    email: registerData.email,
    password: registerData.password,
  });

  return {data, error};
}
