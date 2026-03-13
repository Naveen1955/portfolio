import { useRef } from "react";

interface DockItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const BASE = 40;
const MAX  = 64;
const SPREAD = 100;

export default function MagicDock({ items }: { items: DockItem[] }) {
  const iconsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const dockRef  = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dockRef.current) return;
    const dockRect = dockRef.current.getBoundingClientRect();
    const mouseX   = e.clientX - dockRect.left;

    iconsRef.current.forEach((icon) => {
      if (!icon) return;
      const rect   = icon.getBoundingClientRect();
      const center = rect.left + rect.width / 2 - dockRect.left;
      const dist   = Math.abs(mouseX - center);
      const scale  = dist < SPREAD
        ? 1 + (MAX / BASE - 1) * Math.cos((dist / SPREAD) * (Math.PI / 2))
        : 1;
      const size = BASE * scale;
      icon.style.width  = `${size}px`;
      icon.style.height = `${size}px`;
    });
  };

  const handleMouseLeave = () => {
    iconsRef.current.forEach((icon) => {
      if (!icon) return;
      icon.style.width  = `${BASE}px`;
      icon.style.height = `${BASE}px`;
    });
  };

  return (
    <div
      className="dock"
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, i) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="dock-icon"
          ref={(el) => { iconsRef.current[i] = el; }}
        >
          {item.icon}
          <span className="dock-label">{item.label}</span>
        </a>
      ))}
    </div>
  );
}
