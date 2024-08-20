import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Flashcard Study Tool",
  description: "Creates flashcards for you to better study material.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
