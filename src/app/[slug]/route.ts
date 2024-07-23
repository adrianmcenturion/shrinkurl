import type {PostgrestSingleResponse} from "@supabase/supabase-js";

import {NextResponse} from "next/server";

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

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const slug = url.pathname.split("/").pop();

  const resp: PostgrestSingleResponse<Links[]> = await readLinks();

  const supabase = await createSupabaseServerClient();

  const links = resp.data!.filter((r) => r.short_url === slug);

  if (links.length === 0) {
    return new Response(`<h1>/${slug} is not in our record</h1>`, {
      status: 400,
      headers: {
        "content-type": "text/html",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const {id, visit_count, target} = links[0];

  // Actualizar el contador de visitas de forma síncrona antes de redirigir
  const {error} = await supabase
    .from("shrinkurl")
    .update({visit_count: visit_count + 1})
    .eq("id", id);

  if (error) {
    return new Response("<h1>Error updating visit count</h1>", {
      status: 500,
      headers: {
        "content-type": "text/html",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  return NextResponse.redirect(new URL(target), {
    status: 302,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
