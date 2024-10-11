
import { Gowun_Batang } from "next/font/google";
import "./globals.css";

import Bot from './components/bot';

const inter = Gowun_Batang({ subsets: ["latin"], weight: ['400', '700'], });

export const metadata = {
  title: "Tour De India",
  description: "News web app",
};


export default function RootLayout({ children }) {
  return (
    <html className={inter.className} lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=New+Amsterdam&display=swap" rel="stylesheet" />



      </head>
      <body className="font-inter scrolling" style={{ top: 0 }}>
        {children}
        <Bot/>

        <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"></script>
        <script src="https://files.bpcontent.cloud/2024/10/06/03/20241006033257-4O1MZBDD.js"></script>
      </body>
    </html >
  );
}


