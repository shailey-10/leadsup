import { AuthContextProvider } from "@/context/authContext";
import { Inter } from "next/font/google";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import "./globals.css";
import { Providers } from "./redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Leads Lyfter",
  description: "Quality leads for your agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Providers>
            {<NavBar />}
            {children}
            {<Footer />}
          </Providers>
        </AuthContextProvider>
      </body>
    </html>
  );
}
