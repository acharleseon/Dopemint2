import { useScramble } from "@/hooks/use-kinetic";
import { createElement } from "react";

interface Props {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  style?: React.CSSProperties;
}

export function ScrambledText({ text, className, as = "h2", style }: Props) {
  const ref = useScramble<HTMLElement>(text);
  return createElement(as, { ref, className, style }, text);
}
