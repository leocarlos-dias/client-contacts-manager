import Image from "next/image";
import whatsappLogo from "../../../../public/whatsapp-logo.svg";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-green-500 items-center justify-center hidden md:flex">
        <Image className="max-h-full max-w-full" src={whatsappLogo} alt="logo" />
      </div>
      <div className="w-full bg-gray-100 flex items-center justify-center md:w-1/2">
        {children}
      </div>
    </div>
  )
}