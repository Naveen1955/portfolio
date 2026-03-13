import { useEffect, useRef } from "react";

/**
 * useScrollAnimation
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, the "visible" class is added.
 * Optionally staggers child elements matching `pillSelector`.
 */
export function useScrollAnimation(pillSelector?: string) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");

        if (pillSelector) {
          entry.target.querySelectorAll<HTMLElement>(pillSelector).forEach(
            (pill, i) => setTimeout(() => pill.classList.add("visible"), i * 80)
          );
        }
        observer.unobserve(entry.target);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [pillSelector]);

  return ref;
}
