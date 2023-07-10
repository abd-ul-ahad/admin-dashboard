import { SlSettings } from "react-icons/sl";
import { AiOutlineReload } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center md:px-5 px-2 py-1">
      <div>
        <input
          type="search"
          placeholder="Search"
          className="bg-[var(--background-secondary)] text-[var(--text-color)] py-1 px-5 rounded-full "
        />
      </div>
      <div className="flex justify-end items-center">
        <button className="px-3 py-1">
          <AiOutlineReload className="text-[var(--text-color)]" size={21} />
        </button>
        <button className="px-3 py-1">
          <SlSettings className="text-[var(--text-color)]" size={21} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
