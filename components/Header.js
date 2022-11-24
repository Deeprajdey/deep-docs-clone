import { IconButton } from "@material-tailwind/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <IconButton
        ripple={true}
        variant="text"
        className="rounded-full hover:bg-white active:bg-gray-200 "
      >
        <Bars3Icon className="h-5 w-5 text-gray-700" />
      </IconButton>
      <h1 className="ml-2 text-gray-700 text-2xl">Docs</h1>
      <Image
        width="80"
        height={0}
        className="h-auto mx-3"
        alt="logo"
        src="https://img.icons8.com/bubbles/200/null/google-docs.png"
      />
      <div className="mx-5 md:mx-20 lg:flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md hidden outline-none">
        <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-5 text-base bg-transparent outline-none border-none focus:ring-transparent"
        />
      </div>
      <IconButton
        ripple={true}
        variant="text"
        className="rounded-full hover:bg-white active:bg-gray-200 hidden lg:block "
      >
        <Squares2X2Icon className="h-auto w-5 text-gray-700 " />
      </IconButton>

      <img
        src={session.user.image}
        alt="user"
        onClick={signOut}
        className="cursor-pointer h-12 w-12 rounded-full lg:ml-8 ml-auto"
      />
    </header>
  );
};

export default Header;
