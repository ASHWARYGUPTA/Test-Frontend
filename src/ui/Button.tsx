import React, { ButtonHTMLAttributes, FC } from "react";

enum buttonSizes {
  small = "sm",
  medium = "md",
  large = "lg",
}

interface ButtonProps {
  size?: buttonSizes;
  children: React.ReactNode;
  onClick: () => void;
  typeButton?: "reset" | "button" | "submit";
  typeStyle?: "outline" | "normal" | "danger";
}

export const Button: FC<ButtonProps> = ({
  size = buttonSizes.medium,
  children,
  onClick = () => {},
  typeButton = "button",
  typeStyle = "normal",
}: ButtonProps) => {
  const typeStyleOutline =
    "outline outline-[#3B82F6] bg-transparent text-black";
  const typeStyleDanger = "bg-red-600 text-white";
  const typeStyleNormal = "text-white bg-[#3B82F6]";
  return (
    <button
      className={`border border-solid m-2 p-2 px-4 rounded-lg bg-[#3B82F6] ${
        typeStyle == "outline"
          ? typeStyleOutline
          : typeStyle == "danger"
          ? typeStyleDanger
          : typeStyleNormal
      }`}
      type={typeButton}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
