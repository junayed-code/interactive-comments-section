import React from "react";
import cn from "@/utils/cn";

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form {...props} ref={ref} className={cn("w-full", className)}>
        {children}
      </form>
    );
  }
);
Form.displayName = "Form";

export default Form;
