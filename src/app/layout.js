import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { Oswald, Source_Sans_3, Source_Code_Pro } from "next/font/google" 
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import UserProvider from "@/context/UserContext";
import { ThemeProvider } from 'next-themes'
import { getCurrentUser, getCurrentUserDoc } from "@/libs/firebase";

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald'
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans'
})

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code'
})

export const metadata = {
  title: "DEV@Deakin",
  description: "An online interface where students are supporting students",
};

export default async function RootLayout({ children }) {

  const user = await getCurrentUser();
  const userData = await getCurrentUserDoc();

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${sourceSans.variable} ${sourceCodePro.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col antialiased min-h-screen">
        <UserProvider initialUser={user} initialUserData={userData}>
          <ThemeProvider attribute="class">
            <Header />
            <main className={"flex-1"}>
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}