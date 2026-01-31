export default function CategoryBlock({ name, percentage }) {
  return (
    <div className="p-3 bg-blue-800 rounded">
      <h3 className="font-bold">{name}</h3>
      <p>{percentage.toFixed(1)}%</p>
      <div className="w-full bg-blue-900 h-2 rounded mt-1">
        <div className="bg-green-500 h-2 rounded" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
