import JobCard from "@/components/JobCard";
import { getAllJobs } from "@/lib/jobs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Jobs",
  description:
    "Find the latest tech jobs available from top companies worldwide.",
};

export default function Home() {
  const jobs = getAllJobs();

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Open Positions
        </h1>
        <p className="text-gray-500">
          {jobs.length} job{jobs.length !== 1 ? "s" : ""} available right now
        </p>
      </div>

      {/* Job grid */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </ul>
    </section>
  );
}
