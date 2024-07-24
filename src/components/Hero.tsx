"use client";

import {BackgroundGradient} from "./Bg-gradient";

function Hero() {
  return (
    <BackgroundGradient>
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-3 rounded-[1.25em] bg-background md:gap-6 md:p-6">
        <h1 className="text-3xl font-bold uppercase md:text-4xl lg:text-7xl">
          <span className="text-primary">Acorta</span> tus URL&apos;s!
        </h1>
        <p className="text-md text-balance text-center opacity-80 md:text-xl">
          Iniciá sesión para poder ver y administrar todas tus url&apos;s acortadas.
        </p>
      </div>
    </BackgroundGradient>
  );
}

export default Hero;
