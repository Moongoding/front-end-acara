import ToasterContainer from "@/components/ui/Toaster/ToasterContainer"; // ini yang baru ya!
import { cn } from "@/utils/cn";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

interface PropTypes {
    children: ReactNode;
}

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const AppShell = ({ children }: PropTypes) => {
    return (
        <main className={cn(inter.className)}>
            {children}
            <ToasterContainer /> {/* Render semua toaster di sini */}
        </main>
    );
};

export default AppShell;
