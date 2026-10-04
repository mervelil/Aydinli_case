import type { SVGProps } from "react";

/*
 * İkonlar Figma'daki ölçülerle birebir çizilir:
 * viewBox ikonun gerçek boyutudur, stroke kalınlığı px cinsindendir.
 */

type IconProps = Omit<SVGProps<SVGSVGElement>, "stroke"> & { size?: number; stroke?: number };

const svgBase = (w: number, h: number, stroke: number): SVGProps<SVGSVGElement> => ({
  width: w,
  height: h,
  viewBox: `0 0 ${w} ${h}`,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  overflow: "visible",
  "aria-hidden": true,
  focusable: false,
});

export const CloseIcon = ({ size = 10, stroke = 1.5, ...props }: IconProps) => (
  <svg {...svgBase(size, size, stroke)} {...props}>
    <path d={`M0 0L${size} ${size}M${size} 0L0 ${size}`} />
  </svg>
);

/** 10×5 chevron (Figma: chevron-up / chevron-down) */
export const ChevronUpIcon = ({ stroke = 1.5, ...props }: IconProps) => (
  <svg {...svgBase(10, 5, stroke)} {...props}>
    <path d="M0 5L5 0L10 5" />
  </svg>
);

export const ChevronDownIcon = ({ stroke = 1.5, ...props }: IconProps) => (
  <svg {...svgBase(10, 5, stroke)} {...props}>
    <path d="M0 0L5 5L10 0" />
  </svg>
);
