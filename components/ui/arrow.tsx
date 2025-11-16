import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/Utils";

function Arrow({
  direction = "right",
  className,
  ...props
}: React.ComponentProps<typeof ArrowRight> & {
  direction?: "left" | "right";
}) {
  if (direction === "left") {
    return (
      <ArrowLeft
        className={cn("w-4 h-4 text-amber-900 dark:text-amber-500", className)}
        {...props}
      />
    );
  } else if (direction === "right") {
    return (
      <ArrowRight
        className={cn("w-4 h-4 text-amber-900 dark:text-amber-500", className)}
        {...props}
      />
    );
  }
  throw new Error(`Invalid direction: ${direction}`);
}
export { Arrow };
