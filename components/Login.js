import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        src="https://img.icons8.com/clouds/800/null/google-docs.png"
        height="300"
        width="550"
        alt="logo"
      />
      <h1 className="text-[1.8rem] lg:text-[3rem] text-slate-500">
        Google Docs Clone
      </h1>
      <Button
        className="w-44 mt-10"
        color="blue"
        variant="filled"
        ripple={true}
        onClick={signIn}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
