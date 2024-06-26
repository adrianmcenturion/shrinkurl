import {redirect} from "next/navigation";

import readUserSession from "@/lib/actions";
import {publicPaths} from "@/lib/utils";

import CRUDLinks from "./components/CRUDLinks";
import LinksList from "./components/LinksList";

export default async function PrivatePage() {
  const {data} = await readUserSession();

  if (!data.session) {
    return redirect(publicPaths.home);
  }

  return (
    <div className="flex flex-col gap-6">
      <CRUDLinks />
      <LinksList />
    </div>
  );
}
