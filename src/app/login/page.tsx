import Image from "next/image";
import { LoginForm } from "./login_form";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="relative hidden w-1/2 shrink-0 lg:block">
        <Image
          src="/login.jpg"
          alt="Login"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-zinc-900/20" />
      </div>
      <div className="flex w-full flex-1 items-center justify-center bg-zinc-50 px-6 py-12 lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}
