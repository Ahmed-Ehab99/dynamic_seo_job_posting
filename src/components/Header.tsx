import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
        <Link
          href="/"
          className="font-bold text-xl text-blue-600 tracking-tight hover:text-blue-700 transition"
        >
          JobBoard
        </Link>
      </div>
    </header>
  );
};

export default Header;
