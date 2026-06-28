import Badge from "@/components/Badge";
import { CompanyLogo } from "@/components/CompanyLogo";
import { getJobBySlug, getStaticSlugs } from "@/lib/jobs";
import { generateJobPostingJsonLd } from "@/lib/jsonld";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getStaticSlugs();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const job = getJobBySlug((await params).slug);

  if (!job) {
    return {
      title: "Job Not Found",
      description: "This job posting does not exist or has expired.",
    };
  }

  return {
    title: `${job.title} | ${job.company}`,
    description: job.description,
    openGraph: {
      title: `${job.title} | ${job.company}`,
      description: job.description,
      type: "website",
      images: [
        {
          url: job.companyLogo,
          alt: `${job.company} logo`,
        },
      ],
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const job = getJobBySlug((await params).slug);

  if (!job) {
    notFound();
  }

  const jsonLd = generateJobPostingJsonLd(job);

  return (
    <>
      {/* ── Dynamic JSON-LD (updates per route) ──────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-blue-600
                     hover:text-blue-800 hover:underline mb-6 transition-colors"
        >
          ← Back to Jobs
        </Link>

        {/* ── Header Card ──────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Logo + Title */}
          <div className="flex items-start gap-4">
            <CompanyLogo src={job.companyLogo} company={job.company} />

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                {job.title}
              </h1>
              <a
                href={job.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:underline mt-0.5 inline-block"
              >
                {job.company} ↗
              </a>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge icon="📍" label={job.location} />
            <Badge icon="💼" label={job.employmentType} />
            <Badge icon="🧑‍💻" label={job.experience} />
          </div>

          {/* Salary + Dates */}
          <div
            className="mt-5 pt-5 border-t border-gray-100
                          grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">
                Monthly Salary
              </p>
              <p className="font-semibold text-gray-900">
                {job.salary.currency} {job.salary.value.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">
                Date Posted
              </p>
              <p className="text-gray-700">{formatDate(job.datePosted)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">
                Apply Before
              </p>
              <p className="text-gray-700">{formatDate(job.validThrough)}</p>
            </div>
          </div>
        </div>

        {/* ── Description Card ─────────────────────────────────────────── */}
        <div className="mt-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Job Description
          </h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* ── Apply CTA ────────────────────────────────────────────────── */}
        <div className="mt-5">
          <a
            href={job.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700
                       text-white font-semibold py-3.5 px-6 rounded-xl
                       transition-colors shadow-sm"
          >
            Apply Now at {job.company}
          </a>
        </div>
      </div>
    </>
  );
}
