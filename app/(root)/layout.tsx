//root layout for main pages that contains side bar
export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main>
         Side bar
         {children}
      </main>
   );
}

