"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className: string;
  delay?: number;
};

export default function AnimatedHighlight({
  children,
  className,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            setVisible(true);
          }, delay);

          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      className={`${className} pattern-highlight-animate ${
        visible ? "is-visible" : ""
      }`}
    >
      {children}
    </span>
  );
}