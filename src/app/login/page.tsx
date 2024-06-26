import {redirect} from "next/navigation";

import readUserSession from "@/lib/actions";
import {privatePaths} from "@/lib/utils";

import Login from "./components/Login";

export default async function page() {
  const {data} = await readUserSession();

  console.log(data);

  if (data.session) {
    return redirect(privatePaths.dashboard);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96">
        <Login />
      </div>
    </div>
  );
}
