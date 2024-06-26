import type {PostgrestSingleResponse} from "@supabase/supabase-js";

import {NextResponse} from "next/server";
import {revalidatePath} from "next/cache";

import createSupabaseServerClient from "@/lib/supabase/server";

import {readLinks} from "../dashboard/actions";

interface Links {
  id: number;
  created_at: string;
  alias: string;
  target: string;
  visit_count: number;
  created_by: string;
  short_url: string;
}

interface RouteProps {
  _?: string;
  params: {slug: string};
}

export const GET = async (_: unknown, {params}: RouteProps) => {
  const resp: PostgrestSingleResponse<Links[]> = await readLinks();

  const supabase = await createSupabaseServerClient();

  const links = resp.data!.filter((r) => r.short_url === params.slug);

  if (links.length === 0) {
    return new Response(`<h1>/${links[0].short_url} is not in our record</h1>`, {
      status: 400,
      headers: {
        "content-type": "text/html",
      },
    });
  }

  if (links[0]) {
    const update = async () => {
      const {id} = links[0];
      let {visit_count} = links[0];

      visit_count += 1;

      const {error} = await supabase
        .from("shrinkurl")
        .update({visit_count: visit_count})
        .eq("id", id);

      if (!error) revalidatePath("/dashboard");
    };

    update();
  }

  revalidatePath("/dashboard");

  return NextResponse.redirect(new URL(links[0].target), 302);
};
