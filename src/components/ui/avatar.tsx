import React from "react";
import Image from "next/image";

import cn from "@/utils/cn";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | import("next/dist/shared/lib/get-img-props").StaticImport;
  alt?: string;
}

function Avatar({
  src,
  className,
  alt = "Avatar image",
  ...props
}: AvatarProps) {
  return (
    <div
      {...props}
      className={cn("w-10 h-10", className, "rounded-full select-none")}
    >
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        className="w-full h-full block object-cover"
      />
    </div>
  );
}

export default Avatar;
