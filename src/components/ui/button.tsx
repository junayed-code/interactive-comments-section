import React from "react";
import cn from "@/utils/cn";
import { createVariants, type VariantProps } from "@/utils/create-variants";

const buttonVariants = createVariants({
  default: "bg-gray-500 text-slate-100 uppercase hover:opacity-80",
  primary: "bg-primary text-slate-100 uppercase hover:opacity-80",
  danger: "bg-danger text-slate-100 uppercase hover:opacity-80",
  link: "bg-transparent text-primary hover:opacity-80 px-1 py-0.5",
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "inline-flex justify-center items-center gap-x-1.5 whitespace-nowrap text-base font-medium rounded-md px-5 py-2 duration-150",
          buttonVariants(variant),
          className
        )}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
