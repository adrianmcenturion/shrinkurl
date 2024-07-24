"use client";

import {MoonIcon, SunIcon} from "@radix-ui/react-icons";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

import {Button} from "@/components/ui/button";

export function SwitchTheme() {
  const {setTheme, theme} = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(theme === "dark" ? true : false);

  const handleSetTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    isDarkTheme ? setTheme("dark") : setTheme("light");
  }, [isDarkTheme, setTheme]);

  return (
    <>
      {isDarkTheme ? (
        <Button size="sm" variant="outline" onClick={handleSetTheme}>
          <SunIcon className="size[1.5rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      ) : (
        <Button size="sm" variant="outline" onClick={handleSetTheme}>
          <MoonIcon className="size[1.5rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}
    </>
  );
}
