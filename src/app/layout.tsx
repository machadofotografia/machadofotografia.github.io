"use client"

import "./globals.css";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    // const script = document.createElement('script');
    // script.src = "https://kit.fontawesome.com/9e4fa59664.js";
    // script.crossOrigin = "anonymous";
    // script.async = true;
    // document.body.appendChild(script);

    // const script2 = document.createElement('script')
    // script.src = "/public/typewriting-master/typewriting.min.js"
    // script.async = true;
    // script.crossOrigin = "anonymous";
    // document.body.appendChild(script2);


    // return () => {
    //   document.body.removeChild(script);
    // };
  }, []);
  return (
    <html lang="en">


      <body>
        {children}
      {/* <Script
          src="https://kit.fontawesome.com/9e4fa59664.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        /> */}
        <Script src="/public/typewriting-master/typewriting.min.js" strategy="beforeInteractive" />

      </body>
    </html>
  );
}
