import React from "react";
import {redirect} from "next/navigation";

import readUserSession from "@/lib/actions";
import {privatePaths} from "@/lib/utils";

import Register from "./components/Register";

export default async function page() {
  const {data} = await readUserSession();

  data.session ? redirect(privatePaths.dashboard) : null;

  return (
    <div className="mx-auto mt-16 h-full max-w-md">
      <Register />
    </div>
  );
}
