import React from "react";

import Register from "./components/Register";

export default function page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96">
        <Register />
      </div>
    </div>
  );
}
