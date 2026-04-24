import { useState, type ReactNode } from "react";

interface Props {
  firstContent: ReactNode;
  secondContent: ReactNode;
}

export default function HoverFlipCard({ firstContent, secondContent }: Props) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        cursor: "pointer",
      }}
    >
      <div style={{
        position: "absolute", 
        inset: 0,
        opacity: hover ? 0 : 1,
        transition: "opacity 0.2s ease-in-out",
      }}>
        {firstContent}
      </div>
      <div style={{ 
        position: "absolute", 
        inset: 0,
        opacity: hover ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",
      }}>
        {secondContent}
      </div>
    </div>
  );
}
