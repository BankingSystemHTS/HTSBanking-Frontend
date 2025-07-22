import Image from "next/image";

//auth layout for login, sign up pages
export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main className="flex min-h-screen w-full justify-between font-inter">
         {children}
         <div className="auth-asset">
            <div>
               <Image
                  src="/icons/auth-image.svg"
                  alt="auth image"
                  width={500}
                  height={500}
               />
            </div>
         </div>
      </main>
   );
}
