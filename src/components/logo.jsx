const Logo = ({ size = 40, bg = "#0E1020" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DevTinder logo">
    <g transform="translate(53 50) scale(0.9) translate(-50 -50)">
      <g transform="rotate(-90 50 50)" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.25 13.875 C15.75 9.5 22 7 29 7 C38 7 46 12 50 19 C54 12 62 7 71 7 C78 7 84.25 9.5 88.75 13.875" stroke="#FF5C9D" />
        <path d="M50 90 C18 68 4 50 4 32 C4 24.5 6.75 18.25 11.25 13.875" stroke="#8B7BFF" />
        <path d="M50 90 C82 68 96 50 96 32 C96 24.5 93.25 18.25 88.75 13.875" stroke="#5EEAD4" />
      </g>
      <circle cx="14" cy="11" r="8" fill={bg} stroke="#5EEAD4" strokeWidth="5.5" />
      <circle cx="14" cy="89" r="8" fill={bg} stroke="#8B7BFF" strokeWidth="5.5" />
      <circle cx="90" cy="50" r="8" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="5.5" />
    </g>
  </svg>
);

export default Logo;