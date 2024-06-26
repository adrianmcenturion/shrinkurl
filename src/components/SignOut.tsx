"use client";

import {Logout} from "@/app/login/actions";

import {Button} from "./ui/button";

export default function SignOut() {
  return (
    <form action={() => void Logout()} className="m-0 leading-none">
      <Button size="default">Cerrar sesión</Button>
    </form>
  );
}
