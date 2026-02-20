export default function StatusBadge({ status }) {
  let color = "bg-gray-600";

  if (status === "Building") color = "bg-yellow-500";
  if (status === "Testing") color = "bg-orange-500";
  if (status === "Deploying") color = "bg-blue-500";
  if (status === "Completed") color = "bg-green-500";
  if (status === "Failed") color = "bg-red-600";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      {status}
    </span>
  );
}