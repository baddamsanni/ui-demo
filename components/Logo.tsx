export default function Logo({
  className = "",
  color = "canvas",
}: {
  className?: string;
  color?: "canvas" | "jet";
}) {
  const fg = color === "canvas" ? "#f7f8f8" : "#08090a";
  const grey = "#6b6f76";
  const green = "#4ade80";

  return (
    <a
      href="#home"
      className={`group inline-flex items-center gap-3.5 ${className}`}
      aria-label="SDH Systems Home"
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Rounded square badge - grey */}
        <rect
          x="2"
          y="2"
          width="38"
          height="38"
          rx="12"
          stroke={grey}
          strokeWidth="2"
          fill="none"
        />

        {/* Green S-stroke: single, bold, geometric */}
        <path
          d="M13 15.5 h8.5 a3 3 0 0 1 3 3 v0 a3 3 0 0 1 -3 3 h-7.5 a3 3 0 0 0 -3 3 v0 a3 3 0 0 0 3 3 h10"
          stroke={green}
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Grey horizontal bar creating the 'H' crossbar through the S */}
        <rect
          x="11"
          y="20"
          width="9"
          height="2.2"
          rx="1.1"
          fill={grey}
        />

        {/* Grey dot / period — a subtle systems node */}
        <circle cx="27" cy="29.5" r="2.2" fill={green} />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className="text-[19px] font-bold tracking-tight"
          style={{ color: fg }}
        >
          SDH
        </span>
        <span
          className="text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: grey }}
        >
          Systems
        </span>
      </div>
    </a>
  );
}
