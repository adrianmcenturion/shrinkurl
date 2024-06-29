import type {Metadata} from "next";

import Link from "next/link";

import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {SwitchTheme} from "@/components/SwitchTheme";
import {Toaster} from "@/components/ui/toaster";
import {Button} from "@/components/ui/button";
import readUserSession from "@/lib/actions";
import SignOut from "@/components/SignOut";

export const metadata: Metadata = {
  title: "ShrinkUrl",
  description: "Acortá tus links!",
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {data} = await readUserSession();

  return (
    <html lang="en">
      <body>
        <div className=" container m-auto grid min-h-screen max-w-7xl grid-rows-[auto,1fr,auto] bg-background p-4 font-sans antialiased">
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="system"
          >
            <header className="flex justify-between text-xl font-bold leading-[4rem]">
              <Link className="md:text-3xl" href="/">
                <span className="text-primary">S</span>hrink<span className="text-primary">U</span>
                rl
              </Link>
              <div className="flex items-center justify-between gap-3">
                {data.session ? (
                  <SignOut />
                ) : (
                  <>
                    <Button>
                      <Link href="/register">Registrar</Link>
                    </Button>
                    <Button>
                      <Link href="/login">Iniciar Sesión</Link>
                    </Button>
                  </>
                )}
                <SwitchTheme />
              </div>
            </header>
            <main className="mx-auto w-full py-8 md:max-w-3xl">{children}</main>
            <footer className="text-center font-bold leading-[4rem]">
              © {new Date().getFullYear()} <span className="text-primary">S</span>hrink
              <span className="text-primary">U</span>rl
            </footer>
            <Toaster />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
