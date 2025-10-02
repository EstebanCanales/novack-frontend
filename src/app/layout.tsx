import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { headers } from "next/headers";
import esMessages from "@/i18n/messages/es.json";
import enMessages from "@/i18n/messages/en.json";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const acceptLanguage = h.get("accept-language") || "es";
  const locale = acceptLanguage.toLowerCase().startsWith("es") ? "es" : "en";
  const messages = locale === "es" ? (esMessages as any) : (enMessages as any);
  return (
    <html lang={locale} dir="ltr" className={inter.className}>
      <body>
        <I18nProvider initialLocale={locale as any} initialMessages={messages}>
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors closeButton />
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
