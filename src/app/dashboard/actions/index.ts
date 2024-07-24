"use server";

import type {LinkProps} from "@/types";

import {customAlphabet, urlAlphabet} from "nanoid";
import {revalidatePath} from "next/cache";

import createSupabaseServerClient from "@/lib/supabase/server";
import {privatePaths} from "@/lib/utils";

export async function createShortLink({alias, target}: LinkProps) {
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
    .from("shrinkurl")
    .insert({alias, target: newTarget, short_url})
    .single();

  revalidatePath(privatePaths.dashboard);

  return {data, error};
}

export async function createLinkAndGetIt({target}: LinkProps) {
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
    .from("shrinkurl")
    .insert({target: newTarget, short_url})
    .select();

  return {data, error};
}

export async function readLinks() {
  const supabase = await createSupabaseServerClient();
  const getUserId = await supabase.auth.getUser();

  const res = getUserId.data.user?.id
    ? supabase.from("shrinkurl").select("*").eq("created_by", getUserId.data.user.id)
    : supabase.from("shrinkurl").select("*");

  return await res;
}

// export async function updateLinks() {
//   const supabase = await createSupabaseServerClient();
// }

export async function deleteLinksByID(id: number) {
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.from("shrinkurl").delete().eq("id", id);

  revalidatePath(privatePaths.dashboard);

  return {error};
}
