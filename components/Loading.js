import { Button, Spinner } from "flowbite-react";
import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen">
      <Image
        src="https://img.icons8.com/clouds/800/null/google-docs.png"
        height="300"
        width="550"
        alt="logo"
        priority
      />
      <Button>
        <Spinner aria-label="Spinner button example" />
        <span className="pl-3">Loading...</span>
      </Button>
    </div>
  );
};

export default Loading;
