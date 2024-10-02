import { AuthContextProvider } from '@/context/authContext';
import Script from 'next/script';
import ClientRedirect from './components/ClientRedirect';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import './globals.css';
import { ReduxProvider } from './redux/provider';

export const metadata = {
  title: 'Leads Lyfter',
  description: 'Quality leads for your agency',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://js.chargebee.com/v2/chargebee.js"
          data-cb-site="leadslyfter"
        />
      </head>
      <body>
        <ReduxProvider>
          <AuthContextProvider>
            <ClientRedirect />
            <NavBar />
            {children}
            <Footer />
          </AuthContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
