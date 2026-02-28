export default function ProgressBar({ status }) {
  let progress = 0;
  let color = "bg-primary";

  if (status === "Building") progress = 35;
  if (status === "Testing") progress = 65;
  if (status === "Deploying") progress = 85;
  if (status === "Completed") progress = 100;
  if (status === "Failed") {
    progress = 100;
    color = "bg-error";
  }

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
        <span>Execution Pipeline</span>
        <span className="tabular-nums">{progress}%</span>
      </div>
      <div className="w-full bg-white/5 border border-white/5 rounded-full h-1 overflow-hidden">
        <div
          className={`${color} h-full transition-all duration-700 ease-in-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}