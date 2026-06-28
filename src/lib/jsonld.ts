import type { Job } from "@/types/job";

/**
 * Maps human-readable employment types to schema.org valid values.
 * @see https://schema.org/employmentType
 */
function mapEmploymentType(type: string): string {
  const map: Record<string, string> = {
    "Full-time": "FULL_TIME",
    "Part-time": "PART_TIME",
    Contract: "CONTRACTOR",
    Temporary: "TEMPORARY",
    Intern: "INTERN",
    Volunteer: "VOLUNTEER",
    "Per Diem": "PER_DIEM",
    Other: "OTHER",
  };
  return map[type] ?? type.toUpperCase().replace(/[\s-]+/g, "_");
}

/**
 * Generates a valid schema.org JobPosting JSON-LD object.
 * Handles remote jobs with jobLocationType = TELECOMMUTE.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export function generateJobPostingJsonLd(job: Job): Record<string, unknown> {
  const isRemote = job.location.toLowerCase() === "remote";

  const locationData = isRemote
    ? {
        jobLocationType: "TELECOMMUTE",
        applicantLocationRequirements: {
          "@type": "Country",
          name: "Worldwide",
        },
      }
    : {
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location,
          },
        },
      };

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: `${job.validThrough}T23:59:59`,
    employmentType: mapEmploymentType(job.employmentType),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: job.website,
    },
    ...locationData,
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: job.salary.currency,
      value: {
        "@type": "QuantitativeValue",
        value: job.salary.value,
        unitText: "MONTH",
      },
    },
  };
}
