"use client";

import Image from "next/image";
import { useState } from "react";

interface CompanyLogoProps {
  src: string;
  company: string;
}

/**
 * Renders the company logo using the Next.js Image component.
 * Falls back to a coloured letter avatar if the image fails to load.
 */
export function CompanyLogo({ src, company }: CompanyLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        aria-label={`${company} logo`}
        className="shrink-0 w-16 h-16 rounded-xl bg-blue-100 border border-blue-200
                   flex items-center justify-center select-none"
      >
        <span className="text-2xl font-bold text-blue-600">
          {company.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
      <Image
        src={src}
        alt={`${company} logo`}
        fill
        sizes="64px"
        className="object-contain p-1"
        onError={() => setHasError(true)}
        priority
      />
    </div>
  );
}
