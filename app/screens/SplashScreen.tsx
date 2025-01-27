import React from "react";

export default function SplashScreen() {
  return (
    <div className="flex  items-center justify-center min-h-screen bg-[#fdf2f8] text-[#333333] font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 items-center animate-pulse">
        <h2 className="text-5xl font-bold">LuminFlights</h2>
        <p className="text-xl font-semibold">All Reservations in one place.</p>
      </main>
    </div>
  );
}
