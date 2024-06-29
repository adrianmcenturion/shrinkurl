import {redirect} from "next/navigation";

import LinkShortener from "@/components/LinkShortener";
import readUserSession from "@/lib/actions";
import {privatePaths} from "@/lib/utils";
import Hero from "@/components/Hero";

export default async function HomePage() {
  const {data} = await readUserSession();

  data.session ? redirect(privatePaths.dashboard) : null;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-12">
      <Hero />
      <div className="flex w-full flex-col gap-6">
        <LinkShortener />
      </div>
    </div>
  );
}
