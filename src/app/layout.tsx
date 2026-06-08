import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Asta_Sans} from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "미래디자이너를 위한 창의환경 조성기금",
  description: "서울대학교 미술대학 디자인과의 발전기금 웹사이트입니다.",
};

const astaSans = Asta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-asta",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
          <body
  className={`
    ${astaSans.variable}

    min-h-full flex flex-col
  `}
>
        {children}
      </body>
    </html>
  );
}
