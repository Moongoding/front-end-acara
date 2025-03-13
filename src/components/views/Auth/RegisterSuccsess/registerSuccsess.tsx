import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccses = () => {
  const router = useRouter();
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="Company Logo"
          className="w-32 md:w-40"
          width={180}
          height={180}
        />
        <Image
          src="/images/ilustrations/email-send.svg"
          alt="Company email-send"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3-xl font-bold text-danger-500">
          Create Account Success
        </h1>
        <p className="text-xl font-bold text-default-500">
          Check your email for account activation
        </p>
        <Button
          className="mt-4 w-fit border border-red-500 text-red-500 transition duration-300 hover:bg-red-500 hover:text-white"
          variant="bordered"
          color="danger"
          onClick={() => router.push("/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccses;
