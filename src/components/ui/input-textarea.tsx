import cn from "@/utils/cn";
import React from "react";

type InputTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function InputTextarea({ className, ...props }: InputTextareaProps) {
  return (
    <textarea
      maxLength={400}
      minLength={10}
      rows={3}
      className={cn(
        "text-slate-700 border rounded-md w-full min-w-0 resize-none outline-none bg-transparent border-primary-300 focus:border-primary px-2.5 py-2",
        className
      )}
      {...props}
    ></textarea>
  );
}

export default InputTextarea;
