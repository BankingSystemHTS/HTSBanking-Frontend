//auth layout for login, sign up pages
export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main>
         {children}
         {/* image */}
      </main>
   );
}
