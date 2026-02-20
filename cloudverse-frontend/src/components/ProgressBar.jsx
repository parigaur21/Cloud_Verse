export default function ProgressBar({ status }) {
  let progress = 10;

  if (status === "Building") progress = 25;
  if (status === "Testing") progress = 50;
  if (status === "Deploying") progress = 75;
  if (status === "Completed") progress = 100;
  if (status === "Failed") progress = 100;

  return (
    <div className="w-full bg-gray-800 rounded-full h-2 mt-4">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}