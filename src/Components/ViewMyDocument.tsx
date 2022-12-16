import { faFileArrowDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { trpc } from "../client";
import { Document } from "../document";
import { useState } from "react";
import DeleteMyDocument from "./DeleteMyDocument";

export function isImage(document: Document) {
  if (!document.filetype) return false;

  if (document.filetype.match(/^image/)) {
    return true;
  }
  return false;
}

export default function ViewMyDocument() {
  const { id } = useParams();
  const [showDeletionModal, setShowDeletionModal] = useState(false);

  if (!id) {
    return <div>Document not found!</div>;
  }

  const { data } = trpc.document.useQuery(id);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="space-y-4 mt-2">
        <div className="inline-flex border rounded">
          <span className="font-bold border-r p-2 bg-blue-200">Título</span>
          <span className="p-2 min-w-[30rem]">{data.title}</span>
        </div>
        <div className="max-w-[34rem]">
          <div className="inline-block font-bold border border-b-0 rounded-tr rounded-tl p-2 bg-blue-200">
            Descrição
          </div>
          <div className="border rounded-br rounded-bl rounded-tr p-4 min-h-[10rem]">
            <p>{data.description}</p>
          </div>
        </div>
        {data.filepath ? (
          <>
            <a
              className="inline-flex items-center underline mt-4 mr-4"
              href={`http://localhost:4000/${data.filepath}/download`}
            >
              <span className="mr-2">
                {data.filename}
                {data.fileext}
              </span>
              <FontAwesomeIcon className="w-4" icon={faFileArrowDown} />
            </a>
            <button
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onClick={(evt) => {
                setShowDeletionModal(true);
              }}
            >
              <FontAwesomeIcon className=" w-4 text-red" icon={faTrash} />
            </button>
          </>
        ) : null}
      </div>
      {showDeletionModal ? (
        <DeleteMyDocument
          onClose={() => setShowDeletionModal(false)}
          documentId={id}
        />
      ) : null}
    </>
  );
}
