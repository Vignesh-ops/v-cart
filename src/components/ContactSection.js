export default function ContactSection() {
  return (
    <section className="py-8 px-6 text-center">
      <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
      <div className="mb-2">📍 Muscle Art Fitness, Chennai</div>
      <div className="mb-2">📞 +91 7305508442</div>
      <div className="flex justify-center gap-4">
        <a
          href="https://goo.gl/maps/DummyLocation"
          target="_blank"
          className="text-green-400 hover:underline"
          rel="noopener noreferrer"
        >
          Google Maps
        </a>
        <a
          href="https://instagram.com/muscleartfitness"
          target="_blank"
          className="text-pink-400 hover:underline"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </section>
  );
}
