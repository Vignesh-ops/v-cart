export default function AboutSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-12 md:py-24 px-6 gap-10">
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="mb-4">
          At Muscle Art Fitness, we provide professional training, state-of-the-art equipment, and personalized workout plans to help you smash your fitness goals.
        </p>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>Experienced trainers</li>
          <li>Flexible timings</li>
          <li>Modern equipment</li>
          <li>Affordable membership plans</li>
        </ul>
      </div>
      <img
        src="https://images.unsplash.com/photo-1519864600265-abbf6ecb607d?auto=format&fit=crop&w=500&q=80"
        alt="Gym"
        className="md:w-1/2 rounded-xl shadow-lg object-cover max-h-80"
      />
    </section>
  );
}
