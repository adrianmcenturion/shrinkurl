import {redirect} from "next/navigation";

import readUserSession from "@/lib/actions";
import {privatePaths} from "@/lib/utils";

import Login from "./components/Login";

export default async function page() {
  const {data} = await readUserSession();

  if (data.session) {
    return redirect(privatePaths.dashboard);
  }

  return (
    <div className="mx-auto mt-16 h-full max-w-md">
      <Login />
    </div>
  );
}
