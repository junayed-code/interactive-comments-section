import React from "react";
import cn from "@/utils/cn";

type InputTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// This handler submits the form by keyboard shortcut --> (ctrl+shift+enter)
function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (e.ctrlKey && e.shiftKey && e.key === "Enter") {
    e.currentTarget.form?.requestSubmit();
  }
}

const InputTextarea = React.forwardRef<HTMLTextAreaElement, InputTextareaProps>(
  ({ className, onKeyDown, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={3}
        maxLength={400}
        minLength={10}
        className={cn(
          "text-slate-700 border rounded-md w-full min-w-0 resize-none outline-none bg-transparent border-primary-300 focus:border-primary px-2.5 py-2",
          className
        )}
        onKeyDown={(e) => {
          handleKeyDown(e);
          onKeyDown?.(e);
        }}
        {...props}
      ></textarea>
    );
  }
);
InputTextarea.displayName = "InputTextarea";

export default InputTextarea;
