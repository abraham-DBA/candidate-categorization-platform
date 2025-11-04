const Table = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              {columns.map((col, colIndex) => {
                let value = row[col.toLowerCase()];

                // Handle skills array
                if (col.toLowerCase() === "skills" && Array.isArray(row.skills)) {
                  value = row.skills.join(", ");
                }

                // Handle tier display
                if (col.toLowerCase() === "tier") {
                  value = `Tier ${row.tier}`;
                }

                // Handle date formatting
                if (col.toLowerCase() === "date") {
                  value = new Date(row.createdAt).toLocaleDateString();
                }

                return (
                  <td key={colIndex} className="px-4 py-2 text-sm text-gray-600">
                    {value || "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
