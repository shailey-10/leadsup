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
        <Script
          src="https://www.paypal.com/sdk/js?client-id=ASRQERd9Tc0_86cCG7mKF8ZW27St9gX1WuCqPFLqBOtpqhvN--3Tnd1O6pzDG7g875p07WDwVGl60JQt&vault=true&intent=subscription"
          data-sdk-integration-source="button-factory"
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
