export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-gray-400 py-6 text-center mt-8">
      © {year} Muscle Art Fitness. All rights reserved.
    </footer>
  );
}
