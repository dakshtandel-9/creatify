type IconProps = { className?: string };

/** Lucide dropped brand/logo icons; these are minimal hand-drawn equivalents. */

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" />
      <path d="M5.25 7.02C6.35 7.02 7.25 6.12 7.25 5.02C7.25 3.92 6.35 3.02 5.25 3.02C4.14 3.02 3.25 3.92 3.25 5.02C3.25 6.12 4.14 7.02 5.25 7.02Z" />
      <path d="M13.28 8.5H10.06V20.5H13.42V14.4C13.42 12.77 13.73 11.19 15.75 11.19C17.74 11.19 17.77 13.05 17.77 14.5V20.5H21.13V13.84C21.13 10.93 20.5 8.69 17.1 8.69C15.47 8.69 14.37 9.59 13.92 10.44H13.28V8.5Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.9 3H21.7L15.5 10.1L22.8 21H17.1L12.6 14.6L7.5 21H4.7L11.3 13.4L4.3 3H10.2L14.3 8.9L18.9 3ZM17.9 19.2H19.5L9.3 4.7H7.6L17.9 19.2Z" />
    </svg>
  );
}
