import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircleChart({ label, percentage = 0, color = "#fff" }) {
  const safePercentage = Number(percentage) || 0;

  return (
    <div style={{ width: 120 }}>
      <CircularProgressbar
        value={safePercentage}
        text={`${safePercentage.toFixed(1)}%`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: color,
          trailColor: "#1e3a8a",
        })}
      />
      <p className="text-center mt-2">{label}</p>
    </div>
  );
}
