"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "./ui/DropdownMenu";

const SignOut = () => {
  return (
    <DropdownMenuItem
      onSelect={(event) => {
        event.preventDefault();
        signOut({
          callbackUrl: `${window.location.origin}/sign-in`,
        });
      }}
      className="cursor-pointer"
    >
      Sign Out
    </DropdownMenuItem>
  );
};

export default SignOut;
