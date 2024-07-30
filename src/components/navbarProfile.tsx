import { ModeToggle } from "./mode-toggle";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase/config";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavbarProfile = () => {
  let Links = [
    { name: "Messages", link: "/" },
    { name: "Sell Materials", link: "/sell" },
    { name: "Find Materials", link: "/browse" },
  ];
  let [open, setOpen] = useState(false);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="bg-secondary-500 dark:bg-dark-4 w-full fixed top-0 left-0 text-xl font-semibold">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7 ">
        {/* logo section */}
        <Link to="/">
          <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
            <img
              src={"/assets/Artifact Logo.png"}
              className="hidden xl:block h-[5rem]  object-cover"
            />
            <h1 className="text-3xl font-bold font-[Lexend]">ARTIFACT</h1>
          </div>
        </Link>

        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </div>
        {/* linked items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <a href={link.link} className=" hover:text-blue-400">
                {link.name}
              </a>
            </li>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="btn bg-off-white hover:bg-gray-300 dark:hover:bg-gray-400 text-white md:ml-8 font-semibold px-3 py-3 rounded-[50%] md:static">
            <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="text-black">RC</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[100] opacity-100 bg-white dark:bg-black text-black dark:text-white">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Order History</DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={signOut}>Sign Out</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ul>
      </div>
      {/* Theme Switcher Toggle */}
      <div className="m-3 absolute z-10 flex right-7">
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavbarProfile;
