import  {Metadata} from "next";
import "./globals.css";
import {Navbar} from "@/app/components/Navbar";

export const metadata: Metadata = {
  title: "Geltendorfer Ferienprogramm",
  description: "Geltendorfer Ferienprogramm",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de">
            <body>
                <Navbar/>
                {children}
            </body>
        </html>
    );
}
