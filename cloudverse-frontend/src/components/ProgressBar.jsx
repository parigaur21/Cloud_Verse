export default function ProgressBar({ status }) {
  let progress = 0;
  let color = "from-primary to-accent";

  if (status === "Building") progress = 35;
  if (status === "Testing") progress = 65;
  if (status === "Deploying") progress = 85;
  if (status === "Completed") progress = 100;
  if (status === "Failed") {
    progress = 100;
    color = "from-red-500 to-red-600";
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
        <span>Process Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
        <div
          className={`bg-gradient-to-r ${color} h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(99,102,241,0.3)]`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}