import { Job } from "@/types/job";
import Link from "next/link";

const JobCard = ({ job }: { job: Job }) => {
  const postedDate = new Date(job.datePosted).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li>
      <Link
        href={`/jobs/${job.slug}`}
        className="group flex flex-col h-full p-5 bg-white rounded-2xl border border-gray-200
                   hover:border-blue-400 hover:shadow-md transition-all duration-200"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {job.employmentType}
          </span>
          <span className="text-gray-200">·</span>
          <span className="text-xs text-gray-400">{job.location}</span>
        </div>

        <h2 className="font-semibold text-gray-900 text-lg leading-snug group-hover:text-blue-600 transition-colors">
          {job.title}
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>

        <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
          {job.description}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-600">
            {job.salary.currency} {job.salary.value.toLocaleString()}
            <span className="font-normal text-gray-400"> / mo</span>
          </span>
          <span className="text-xs text-gray-400">Posted {postedDate}</span>
        </div>
      </Link>
    </li>
  );
};

export default JobCard;
