const RotateArrowIcon = ({ rotate }: { rotate: boolean }) => (
  <svg
    className={`w-3 h-3 text-gray-800
                           dark:text-white inline transition-transform duration-300 
                           ${rotate ? "" : "rotate-180"}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 8"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
    />
  </svg>
);

export default RotateArrowIcon;
