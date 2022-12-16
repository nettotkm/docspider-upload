import {
  faEye,
  faFileArrowDown,
  faFilePen,
  faHouse,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

interface DataHeader {
  [k: string]: string;
}
type DataEntry = string | number | boolean | null;

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
        <tr className="bg-blue text-white ">
          {Object.keys(props.header).map((h) => (
            <td className="p-2" key={h}>
              {props.header[h]}
            </td>
          ))}
          <td></td>
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
              <td className="text-blue">
                <div className="space-x-4 flex justify-end items-center mr-4">
                  <Link to={`/my-documents/${items.id}/edit`} className="w-4">
                    <FontAwesomeIcon className="w-4" icon={faFilePen} />
                  </Link>

                  <Link to={`/my-documents/${items.id}`} className="w-4">
                    <FontAwesomeIcon className="w-4" icon={faEye} />
                  </Link>

                  {items.filepath ? (
                    <a
                      href={`http://localhost:4000/${items.filepath}/download`}
                    >
                      <FontAwesomeIcon className="w-4" icon={faFileArrowDown} />
                    </a>
                  ) : (
                    <FontAwesomeIcon
                      className="w-4 text-gray-low cursor-not-allowed"
                      icon={faFileArrowDown}
                    />
                  )}
                  <FontAwesomeIcon
                    className=" w-4 ml-2 text-red"
                    icon={faTrash}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
