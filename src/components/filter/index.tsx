export default function Filter({
  filters,
}: {
  filters: Record<string, string[]>;
}) {
  return (
    <div className={""}>
      {Object.entries(filters).map(([key, values]) => (
        <div key={key}>
          <h3>{key}</h3>
          {Array.from(values).map((value) => (
            <button onClick={() => {}} key={value}>
              {value}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
