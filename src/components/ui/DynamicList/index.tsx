import styles from "./DynamicList.module.css";

interface Column {
  key: string;
  header: string;
}

interface DynamicListProps {
  columns: Column[];
  data: Record<string, any>[];
}

export function DynamicList({ columns, data }: DynamicListProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns?.map((col) => (
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
