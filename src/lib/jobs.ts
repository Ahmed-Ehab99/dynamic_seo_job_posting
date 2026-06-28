import type { Job } from "@/types/job";
import jobsData from "@/data/jobs.json";

const allJobs = jobsData as Job[];

/** Return every job. */
export function getAllJobs(): Job[] {
  return allJobs;
}

/** Find a single job by its URL slug. Returns undefined when not found. */
export function getJobBySlug(slug: string): Job | undefined {
  return allJobs.find((job) => job.slug === slug);
}

/** Return slug params for generateStaticParams. */
export function getStaticSlugs(): { slug: string }[] {
  return allJobs.map((job) => ({ slug: job.slug }));
}
