import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    style={{
      fill: "#fff",
    }}
    viewBox="0 0 300 150"
    {...props}
  >
    <path
      strokeMiterlimit={10}
      d="M14 4C8.486 4 4 8.486 4 14v22c0 5.514 4.486 10 10 10h22c5.514 0 10-4.486 10-10V14c0-5.514-4.486-10-10-10zm7.133 9h7.734c.873 0 1.694.465 2.145 1.213l1.834 3.06a1.51 1.51 0 0 0 1.287.727H39.5c.827 0 1.5.673 1.5 1.5v16c0 .827-.673 1.5-1.5 1.5h-29c-.827 0-1.5-.673-1.5-1.5v-16c0-.827.673-1.5 1.5-1.5h5.367c.523 0 1.018-.279 1.287-.729l1.834-3.058A2.516 2.516 0 0 1 21.133 13zM12 14h2a1 1 0 0 1 1 1v1h-4v-1a1 1 0 0 1 1-1zm22 5.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-9 .5c-4.136 0-7.5 3.364-7.5 7.5S20.864 35 25 35s7.5-3.364 7.5-7.5S29.136 20 25 20zm0 2c3.032 0 5.5 2.468 5.5 5.5S28.032 33 25 33a5.507 5.507 0 0 1-5.5-5.5c0-3.032 2.468-5.5 5.5-5.5z"
      fontFamily="none"
      fontSize="none"
      fontWeight="none"
      style={{
        mixBlendMode: "normal",
      }}
      textAnchor="none"
      transform="scale(5.12)"
    />
  </svg>
);
export { SvgComponent as IconCamera };
