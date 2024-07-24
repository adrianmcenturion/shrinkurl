import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

import {toast} from "@/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const publicPaths = {
  home: "/",
  login: "/login",
  register: "/register",
};

export const privatePaths = {
  dashboard: "/dashboard",
};

export const createUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_URL!}${path}`;
};

export const copyToClipboard = (url: string) => {
  navigator.clipboard.writeText(url);
  toast({
    title: "Copiado!",
    duration: 750,
  });
};
