import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const perm_types: string[] = [
  "-r--r--r--",
  "drwxr-xr-x",
  "-rw-r--r--",
  "drwxr-xr-x@",
];
