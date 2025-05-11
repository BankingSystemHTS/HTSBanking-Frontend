import LeftSideBar from "@/components/sidebar/LeftSideBar";

//root layout for main pages that contains side bar
export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const loggedIn = { fistName: "Nathan", lastName: "Smith" };
   return (
      <main className="flex h-screen w-full font-inter">
         <LeftSideBar
            user={loggedIn}
         />
         {children}
      </main>
   );
}

