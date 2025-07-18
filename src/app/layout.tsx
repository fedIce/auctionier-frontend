import type { Metadata } from "next";
import { Jura, Poppins } from "next/font/google";
import "./globals.css";
import Header from '../components/header'
import Footer from '../components/footer'
import AuthContext from '../contexts/auth'
import BiddingContext from '../contexts/bid_context'
import AlertContext from '../contexts/Alert'
import NotificationContext from '../contexts/Notifications'
// import prisma from '../lib'

const JuraSans = Jura({
  variable: "--font-jura-sans",
  subsets: ["latin"],
});

const PoppinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: "400"
});


export const metadata: Metadata = {
  title: "Auctionier",
  description: "Everything on auction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  // prisma.users.findUnique({
  //   where: { email: 'info@guideutility.co' }
  // }).then((activeUser: any) => console.log(activeUser));



  return (
    <html lang="en">
      <body className={`${JuraSans.variable} ${PoppinsSans.variable}  min-h-screen min-w-screen overflow-x-hidden antialiased`}>
        <AlertContext>
          <AuthContext>
            <NotificationContext>
              <BiddingContext>
                <div className="items-center justify-center w-full h-[100vh]">
                  <Header />
                  <div className="pt-18 w-full flex flex-col items-center relative">
                    <div className="w-full h-fit max-w-7xl ">
                      {children}
                    </div>

                    <div className="w-full">
                      <Footer />
                    </div>
                  </div>
                </div>
              </BiddingContext>
            </NotificationContext>
          </AuthContext>
        </AlertContext>
      </body>
    </html>
  );
}
