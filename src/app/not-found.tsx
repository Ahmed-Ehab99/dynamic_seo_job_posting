import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-blue-100 select-none">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-3">
        Page not found
      </h1>
      <p className="text-gray-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold
                   px-6 py-2.5 rounded-xl transition shadow-sm"
      >
        ← Back to Jobs
      </Link>
    </div>
  );
}
