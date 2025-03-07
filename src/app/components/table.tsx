type tableProps = {
  columns: string[];
  data: Array<Record<string, any>>;
};

const Table = ({ columns, data }: tableProps) => {
  return (
    <div className="overflow-x-auto flex justify-center">
      <table className="max-w-4xl w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column, i) => (
              <th
                key={i}
                className="border border-gray-300 px-4 py-3 text-left"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            return (
              <tr key={i} className="hover:bg-gray-50 transition">
                {columns.map((column, j) => {
                  return (
                    <td key={j} className="border border-gray-300 px-4 py-3">
                      {row[column]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
