interface BadgeProps {
  icon: string;
  label: string;
}

const Badge = ({ icon, label }: BadgeProps) => {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                 text-sm bg-gray-100 text-gray-700 border border-gray-200"
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </span>
  );
};

export default Badge;
