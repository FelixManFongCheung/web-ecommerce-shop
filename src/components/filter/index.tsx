import styles from './filter.module.scss';

export default function Filter({ filters }: { filters: Record<string, Set<string>> }) {

  return <div className={styles.filter}>
    {Object.entries(filters).map(([key, values]) => (
      <div key={key}>
        <h3>{key}</h3>
        {Array.from(values).map(value => <button onClick={() => {}} key={value}>{value}</button>)}
      </div>
    ))}
  </div>;
}