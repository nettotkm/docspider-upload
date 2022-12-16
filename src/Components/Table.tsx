import {
  faEye,
  faFileArrowDown,
  faFilePen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteMyDocument from "./DeleteMyDocument";

interface DataHeader {
  [k: string]: string;
}
type DataEntry = string | number | boolean | null;

interface DataEntries {
  [k: string]: DataEntry;
}

const timeFormatter = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date(date));

const Table: React.FC<{
  header: DataHeader;
  data: DataEntries[];
}> = (props) => {
  const [currentRow, setCurrentRow] = useState<DataEntry>("");
  const [showDeletionModal, setShowDeletionModal] = useState(false);

  return (
    <>
      <table
        data-testid="my-documents"
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
                      {header === "createdAt"
                        ? timeFormatter(items[header] as string)
                        : items[header]}
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
                        <FontAwesomeIcon
                          className="w-4"
                          icon={faFileArrowDown}
                        />
                      </a>
                    ) : (
                      <FontAwesomeIcon
                        className="w-4 text-gray-200 cursor-not-allowed"
                        icon={faFileArrowDown}
                      />
                    )}
                    <button
                      data-testid="destroy-document"
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      onClick={(evt) => {
                        setCurrentRow(items.id);
                        setShowDeletionModal(true);
                      }}
                    >
                      <FontAwesomeIcon
                        className=" w-4 text-red"
                        icon={faTrash}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showDeletionModal && typeof currentRow === "number" ? (
        <DeleteMyDocument
          onClose={() => setShowDeletionModal(false)}
          documentId={currentRow.toString()}
        />
      ) : null}
    </>
  );
};

export default Table;
