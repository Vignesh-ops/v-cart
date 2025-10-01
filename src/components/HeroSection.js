export default function HeroSection({ onJoin }) {
  return (
    <section className="flex flex-col items-center justify-center h-[80vh] bg-gradient-to-br from-black to-gray-800 text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
        Muscle Art Fitness
      </h1>
      <p className="text-lg md:text-2xl mb-8 max-w-xl">
        Transform your body. Build your strength. Join the fitness community that pushes you to be your best.
      </p>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-full uppercase font-semibold hover:scale-105 transition"
        onClick={onJoin}
      >
        Join Now
      </button>
    </section>
  );
}
