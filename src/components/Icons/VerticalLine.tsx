function VerticalLine({ size }: { size: number }) {
  return (
    <svg
      width="3"
      height="24"
      viewBox="0 0 3 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 24C0.559644 24 0 23.8508 0 23.6667L0 0.333333C0 0.149238 0.559644 -7.15256e-07 1.25 -7.15256e-07C1.94036 -7.15256e-07 2.5 0.149238 2.5 0.333333L2.5 23.6667C2.5 23.8508 1.94036 24 1.25 24Z"
        fill="white"
      />
    </svg>
  );
}

export default VerticalLine;
