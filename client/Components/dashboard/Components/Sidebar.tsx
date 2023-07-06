import Image from "next/image";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { BsFillPersonFill, BsNewspaper, BsGlobe } from "react-icons/bs";
import { AiOutlineAreaChart } from "react-icons/ai";

export default function Sidebar({
  tabI,
  setTabI,
}: {
  tabI: number;
  setTabI: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleTabClick = (index: number) => {
    if (tabI !== index) {
      setTabI(index);
      localStorage.setItem("__index__tab_!", index.toString());
    }
  };

  return (
    <div className="text-[var(--text-color)] w-[var(--sidebar-w)] flex justify-between items-center flex-col h-screen pb-5 pt-1">
      <div className="w-full">
        <div className="pl-5">
          <h1 className="text-2xl font-bold">Admin</h1>
        </div>
        <div className="space-y-6 mt-3">
          <div className="flex justify-start items-center w-full">
            <button
              className={`${
                tabI === 0 &&
                "bg-[var(--background-tab)] text-[var(--sidebar-active-text)]"
              } pl-4 py-2 flex justify-start w-full items-center space-x-4`}
              onClick={() => handleTabClick(0)}
            >
              <FaHome />
              <p>Dashboard</p>
            </button>
          </div>

          <div className="flex justify-center items-start flex-col">
            <p className="text-xs pl-2 pb-1">Client Facing</p>
            <ul className="w-full">
              {clientFacing.map((e, i) => (
                <li
                  key={i}
                  onClick={() => handleTabClick(i + 1)}
                  className={`flex justify-start py-2 pl-4 items-center space-x-4 ${
                    tabI === i + 1 &&
                    "bg-[var(--background-tab)] text-[var(--sidebar-active-text)]"
                  } w-full cursor-pointer`}
                >
                  {e.icon}
                  <p>{e.title}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center items-start flex-col">
            <p className="text-xs pl-2 pb-1">Management</p>
            <ul className="w-full">
              {management.map((e, i) => (
                <li
                  key={i}
                  onClick={() => handleTabClick(i + 6)}
                  className={`flex justify-start py-2 pl-4 items-center space-x-4 ${
                    tabI === i + 6 &&
                    "bg-[var(--background-tab)] text-[var(--sidebar-active-text)]"
                  } w-full cursor-pointer`}
                >
                  {e.icon}
                  <p>{e.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full ">
        <div
          onClick={() => handleTabClick(8)}
          className={`${
            tabI === 8 &&
            "bg-[var(--background-tab)] text-[var(--sidebar-active-text)]"
          } cursor-pointer flex justify-start space-x-6 items-center pl-4 py-1`}
        >
          <Image
            src="/images/person.jpg"
            width={30}
            height={30}
            alt="Picture of the author"
            className="rounded-full"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
          />
          <div className="flex justify-center items-start flex-col">
            <p className="text-sm">Abdul Ahad</p>
            <p className="text-xs">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
const clientFacing = [
  { title: "Products", icon: <FaShoppingCart /> },
  { title: "Customer", icon: <BsFillPersonFill /> },
  { title: "Transactions", icon: <BsNewspaper /> },
  { title: "Geography", icon: <BsGlobe /> },
];
const management = [
  { title: "Admin", icon: <RiAdminFill /> },
  { title: "Performance", icon: <AiOutlineAreaChart /> },
];
