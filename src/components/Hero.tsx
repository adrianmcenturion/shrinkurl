function Hero() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-6">
      <h1 className="text-4xl font-bold uppercase lg:text-7xl">
        <span className="text-primary">Acorta</span> tus URL&apos;s!
      </h1>
      <p className="text-md text-balance text-center opacity-80 md:text-xl">
        Iniciá sesión para poder ver y administrar todas tus url&apos;s acortadas.
      </p>
    </div>
  );
}

export default Hero;
