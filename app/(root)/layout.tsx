import LeftSideBar from "@/components/sidebar/LeftSideBar";
import MobileNavBar from "@/components/sidebar/MobileNavBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

//root layout for main pages that contains side bar
export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const loggedIn = await getLoggedInUser();
   if (!loggedIn) {
      redirect("/sign-in")
   }
   return (
      <main className="flex h-screen w-full font-inter">
         <LeftSideBar
            user={loggedIn}
         />
         {/* mobile nav bar section md hidden */}
         <div className="flex size-full flex-col">
            <div className="root-layout">
               <Image
                  src="/icons/logo.svg"
                  width={30}
                  height={30}
                  alt="logo"
               />
               <div>
                  <MobileNavBar user={loggedIn} />
               </div>
            </div>
            {children}
         </div>
      </main>
   );
}

