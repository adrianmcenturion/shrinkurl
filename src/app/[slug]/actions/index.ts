import type {PostgrestSingleResponse} from "@supabase/supabase-js";
import type {Link} from "@/components/Table/columns";

import createSupabaseServerClient from "@/lib/supabase/server";

export const getShortUrl = async (slug: string) => {
  const supabase = await createSupabaseServerClient();

  const {data, error}: PostgrestSingleResponse<Link> = await supabase
    .from("shrinkurl")
    .select("*")
    .eq("short_url", slug)
    .single();

  if (error) {
    console.error("Error fetching short URL:", error);

    return null;
  }

  return data;
};

export const increaseCountVisits = async (slug: string) => {
  const supabase = await createSupabaseServerClient();

  const shortUrl = await getShortUrl(slug);

  if (!shortUrl) {
    return;
  }

  await supabase
    .from("shrinkurl")
    .update({visit_count: shortUrl.visit_count + 1})
    .eq("id", shortUrl.id);
};
