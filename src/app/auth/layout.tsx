import StoreProvider from "@/providers/store-provider";
import { Toaster } from "sonner";
import "../globals.css";

export default function AuthLayout({children}:{children: React.ReactNode}) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    <Toaster position="top-center"/>
                    {children}
                </StoreProvider>
            </body>
        </html>
    )
}