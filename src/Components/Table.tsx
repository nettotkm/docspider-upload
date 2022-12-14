import React from "react";

interface DataHeader {
  [k: string]: string;
}
type DataEntry = string | number | boolean;

interface DataEntries {
  [k: string]: DataEntry;
}

const Table: React.FC<{
  header: DataHeader;
  data: DataEntries[];
}> = (props) => {
  return (
    <table
      className="
    table-auto border-collapse border border-slate-300"
    >
      <thead>
        <tr className="bg-blue text-white">
          {Object.keys(props.header).map((h) => (
            <td className="p-2" key={h}>
              {props.header[h]}
            </td>
          ))}
          <td>__actions__</td>
        </tr>
      </thead>
      <tbody>
        {props.data.map((items, i) => {
          return (
            <tr key={i} className="even:bg-gray odd:bg-white">
              {Object.keys(props.header).map((header, j) => {
                return (
                  <td key={j} className="p-2">
                    {items[header]}
                  </td>
                );
              })}
              <td>__coloque os icones aqui__</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
