import { CSSProperties } from 'react';

export const Check = ({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      style={style}
      className={className}
    >
      <path d="M20 6L9 17l-5-5"></path>
    </svg>
  );
};
