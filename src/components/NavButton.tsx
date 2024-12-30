type NavButtonProps = {
  value: string;
  onClick?: () => void;
};

function NavButton({ value, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
    >
      {value}
    </button>
  );
}

export default NavButton;
