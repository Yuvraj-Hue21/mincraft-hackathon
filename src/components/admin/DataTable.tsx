import type { ReactNode } from "react";
import { motion } from "framer-motion";

export interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
}

export function DataTable<T extends { id: string }>({ columns, rows }: { columns: Column<T>[]; rows: T[] }) {
  return (
    <div className="overflow-x-auto border border-[#26272c]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#26272c] text-left text-[#8f909a]">
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 font-medium whitespace-nowrap">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4) }}
              className="border-b border-[#1c1d21] last:border-0 hover:bg-[#15161a] transition-colors"
            >
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 whitespace-nowrap">
                  {c.render(row)}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}