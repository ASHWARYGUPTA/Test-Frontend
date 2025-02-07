interface ChevronDownInterface {
  rotate?: boolean;
}

export const ChevronDownIcon = ({ rotate = false }: ChevronDownInterface) => {
  const rotateConfig = "rotate-180 transition delay-0 duration-300 ease-in-out";
  return (
    <>
      <div
        className={`${
          rotate ? rotateConfig : "transition delay-0 duration-300 ease-in-out"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </>
  );
};
