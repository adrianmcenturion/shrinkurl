import type {LinkProps} from "@/components/LinkCard";
import type {PostgrestSingleResponse} from "@supabase/supabase-js";

import {redirect} from "next/navigation";
import Link from "next/link";

import LinkShortener from "@/components/LinkShortener";
import readUserSession from "@/lib/actions";
import {privatePaths} from "@/lib/utils";

import {readAnonLinks} from "./actions";

export default async function HomePage() {
  const {data} = await readUserSession();
  const link: PostgrestSingleResponse<LinkProps[]> = await readAnonLinks();

  console.log("link", link);

  data.session ? redirect(privatePaths.dashboard) : null;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-12">
      <h1 className="text-4xl font-bold">Registrate para poder administrar tus links!</h1>
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold">Pega la URL que quieras acortar</h3>
        <LinkShortener />
      </div>
    </div>
  );
}
