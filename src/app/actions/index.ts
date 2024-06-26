"use server";

import {customAlphabet, urlAlphabet} from "nanoid";
import {revalidatePath} from "next/cache";

import createSupabaseServerClient from "@/lib/supabase/server";

interface LinkProps {
  target: string;
}

export async function createAnonLink({target}: LinkProps) {
  const supabase = await createSupabaseServerClient();

  const short_url = customAlphabet(urlAlphabet, 5)();

  const formatUrl = (url: string): string => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }

    return url;
  };

  const newTarget = formatUrl(target);

  const {data, error} = await supabase
    .from("shrinkurl-anon")
    .insert([{target: newTarget, short_url}])
    .select();

  revalidatePath("/");

  return {data, error};
}

export async function readAnonLinks() {
  const supabase = await createSupabaseServerClient();

  return await supabase.from("shrinkurl-anon").select("*");
}
