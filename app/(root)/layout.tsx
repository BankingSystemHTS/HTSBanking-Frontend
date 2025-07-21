import LeftSideBar from "@/components/sidebar/LeftSideBar";
import MobileNavBar from "@/components/sidebar/MobileNavBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";

//root layout for main pages that contains side bar
export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   // const user = await getLoggedInUser();
   const loggedIn = { fistName: "Nathan", lastName: "Smith" };
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
                  <MobileNavBar />
               </div>
            </div>
            {children}
         </div>
      </main>
   );
}

