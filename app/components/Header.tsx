import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 border-b flex gap-6">
      <Link href="/" className="font-semibold">
        Home
      </Link>

      <Link href="/about" className="font-semibold">
        About
      </Link>

      <Link href="/contact" className="font-semibold">
        Contact
      </Link>

      <Link href="/profile" className="font-semibold">
        Profile
      </Link>
    </nav>
  );
}