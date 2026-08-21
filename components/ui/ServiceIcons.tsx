const STROKE = "#0a355b";
const BADGE = "#4a9fe6";

type ServiceIconProps = {
  className?: string;
};

// Shared badge: a filled accent circle with a white ring, sitting on the
// bottom-right corner of the primary glyph — mirrors the reference's
// "outline icon + small colored badge" composition. Badge glyphs are kept
// to a single bold shape since anything finer disappears at this size.
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <g transform="translate(35, 35)">
      <circle r="10.5" fill={BADGE} stroke="#ffffff" strokeWidth="2" />
      {children}
    </g>
  );
}

const strokeProps = {
  fill: "none",
  stroke: STROKE,
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function StrategicMarketingIcon({ className }: ServiceIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="7" y="27" width="6" height="11" rx="1.2" fill={STROKE} stroke="none" />
      <rect x="16.5" y="19" width="6" height="19" rx="1.2" fill={STROKE} stroke="none" />
      <rect x="26" y="9" width="6" height="29" rx="1.2" fill={STROKE} stroke="none" />
      <path d="M6 22L15.5 12.5L21 17L34 4" {...strokeProps} />
      <path d="M26 4H34V12" {...strokeProps} />
      <Badge>
        <path d="M-3.5 -1.8V1.8L-1 2.6V-2.6Z" fill="#ffffff" />
        <path d="M-1 -2.6L4 -4.5V4.5L-1 2.6Z" fill="#ffffff" />
        <path d="M-2.3 2.2L-1.3 5.3" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
      </Badge>
    </svg>
  );
}

export function EyeCatchyDesignsIcon({ className }: ServiceIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M4 24C4 24 13 9 24 9C35 9 44 24 44 24C44 24 35 39 24 39C13 39 4 24 4 24Z"
        {...strokeProps}
      />
      <circle cx="24" cy="24" r="7.5" {...strokeProps} />
      <circle cx="24" cy="24" r="3" fill={STROKE} stroke="none" />
      <Badge>
        <path
          d="M0 -5L1.4 -1.4L5 0L1.4 1.4L0 5L-1.4 1.4L-5 0L-1.4 -1.4Z"
          fill="#ffffff"
        />
      </Badge>
    </svg>
  );
}

export function SocialMediaIcon({ className }: ServiceIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="19" cy="14" r="7" {...strokeProps} />
      <path d="M6 39C6 30.7 11.8 25 19 25C26.2 25 32 30.7 32 39" {...strokeProps} />
      <path
        d="M14.5 30.5L18 34L23.5 25"
        stroke={BADGE}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M37 8L38.6 12L42.6 13.6L38.6 15.2L37 19.2L35.4 15.2L31.4 13.6L35.4 12Z" fill={BADGE} stroke="none" />
      <path d="M41 23L41.8 25.2L44 26L41.8 26.8L41 29L40.2 26.8L38 26L40.2 25.2Z" fill={BADGE} stroke="none" />
    </svg>
  );
}

export function WebDevelopmentIcon({ className }: ServiceIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="5" y="9" width="38" height="27" rx="3" {...strokeProps} />
      <path d="M5 16H43" {...strokeProps} />
      <circle cx="10.5" cy="12.5" r="1.1" fill={STROKE} stroke="none" />
      <circle cx="14.5" cy="12.5" r="1.1" fill={STROKE} stroke="none" />
      <path d="M17 42H31M20 36L19 42M28 36L29 42" {...strokeProps} />
      <path d="M18 22L14 26L18 30" {...strokeProps} />
      <path d="M30 22L34 26L30 30" {...strokeProps} />
      <Badge>
        <path
          d="M-1.5 -3.4L-5 0L-1.5 3.4"
          stroke="#ffffff"
          strokeWidth="1.7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.5 -3.4L5 0L1.5 3.4"
          stroke="#ffffff"
          strokeWidth="1.7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Badge>
    </svg>
  );
}

export function RobustSeoIcon({ className }: ServiceIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M11 4H27L37 14V42C37 43.1 36.1 44 35 44H11C9.9 44 9 43.1 9 42V6C9 4.9 9.9 4 11 4Z"
        {...strokeProps}
      />
      <path d="M27 4V14H37" {...strokeProps} />
      <path d="M15 23H29M15 29H29M15 35H22" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <Badge>
        <text
          x="0"
          y="3.6"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#ffffff"
          fontFamily="var(--font-sans, sans-serif)"
        >
          %
        </text>
      </Badge>
    </svg>
  );
}

export function AutomationIcon({ className }: ServiceIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="7.5" {...strokeProps} />
      <path
        d="M24 8V13.5M24 34.5V40M40 24H34.5M13.5 24H8M35.3 12.7L31.5 16.5M16.5 31.5L12.7 35.3M35.3 35.3L31.5 31.5M16.5 16.5L12.7 12.7"
        {...strokeProps}
      />
      <Badge>
        <path
          d="M-3.6 0.2C-3.6 2.5 -1.8 4.2 0.4 4.2C2.6 4.2 4.4 2.5 4.4 0.2"
          stroke="#ffffff"
          strokeWidth="1.7"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="-3.6" cy="-2.2" r="1.15" fill="#ffffff" />
        <circle cx="4.4" cy="-2.2" r="1.15" fill="#ffffff" />
      </Badge>
    </svg>
  );
}

export const SERVICE_ICON_BY_TITLE: Record<string, (props: ServiceIconProps) => React.ReactElement> = {
  "Strategic Marketing": StrategicMarketingIcon,
  "Eye-catchy Designs": EyeCatchyDesignsIcon,
  "Social Media": SocialMediaIcon,
  "Web Development": WebDevelopmentIcon,
  "Robust SEO": RobustSeoIcon,
  Automation: AutomationIcon,
};

export const SERVICE_ICON_FALLBACKS: Array<(props: ServiceIconProps) => React.ReactElement> = [
  StrategicMarketingIcon,
  EyeCatchyDesignsIcon,
  SocialMediaIcon,
  WebDevelopmentIcon,
  RobustSeoIcon,
  AutomationIcon,
];
