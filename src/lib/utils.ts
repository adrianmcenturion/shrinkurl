import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

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
