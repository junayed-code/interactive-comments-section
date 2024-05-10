"use client";

import { useOptimistic, startTransition, memo } from "react";

import cn from "@/utils/cn";
import Button from "@ui/button";
import { PlusIcon, MinusIcon } from "@/components/ui/icons";

type CounterProps = {
  className?: string;
  countValue?: number;
  onIncrement?: (currentValue: number) => void;
  onDecrement?: (currentValue: number) => void;
};

interface CounterAction {
  type: "increment" | "decrement";
}

const Counter = memo(
  ({ className, onIncrement, onDecrement, countValue = 0 }: CounterProps) => {
    const [optimisticCount, addOptimisticCount] = useOptimistic<
      number,
      CounterAction
    >(countValue, (state, action) => {
      switch (action.type) {
        case "increment":
          return state + 1;
        case "decrement":
          return state - 1;
        default:
          return state;
      }
    });

    const increment = () => {
      startTransition(() => addOptimisticCount({ type: "increment" }));
      if (typeof onIncrement === "function") {
        onIncrement(optimisticCount);
      }
    };

    const decrement = () => {
      startTransition(() => addOptimisticCount({ type: "decrement" }));
      if (typeof onDecrement === "function") {
        onDecrement(optimisticCount);
      }
    };

    return (
      <div
        className={cn(
          "text-primary bg-slate-100 rounded-xl px-2.5 sm:px-3 py-1.5 md:py-3 flex flex-row md:flex-col shrink-0 justify-between items-center gap-4 sm:gap-x-5 !min-w-12",
          className
        )}
      >
        <Button
          variant="link"
          className="px-0 py-0 hover:opacity-100"
          onClick={increment}
        >
          <PlusIcon className="text-[12px] sm:text-sm fill-primary-300 hover:fill-primary duration-150" />
        </Button>
        <span className="font-medium sm:text-xl mt-0.5">{optimisticCount}</span>
        <Button
          variant="link"
          className="px-0 py-0 opacity-60 hover:opacity-100 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={optimisticCount === 0}
          onClick={decrement}
        >
          <MinusIcon className="text-[12px] sm:text-sm fill-primary-300 hover:fill-primary duration-150" />
        </Button>
      </div>
    );
  }
);
Counter.displayName = "Counter";

export default Counter;
