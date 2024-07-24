import type {PostgrestSingleResponse} from "@supabase/supabase-js";
import type {LinkProps} from "@/types";

import {redirect} from "next/navigation";

import readUserSession from "@/lib/actions";
import {publicPaths} from "@/lib/utils";

import CRUDLinks from "./components/CRUDLinks";
import {readLinks} from "./actions";
import LinksList from "./components/LinksList";

export default async function PrivatePage() {
  const {data} = await readUserSession();

  if (!data.session) {
    return redirect(publicPaths.home);
  }
  const links: PostgrestSingleResponse<LinkProps[]> = await readLinks();

  return (
    <div className="flex w-full flex-col gap-6">
      <CRUDLinks />
      <LinksList data={links.data} />
    </div>
  );
}
