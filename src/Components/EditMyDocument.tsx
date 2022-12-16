import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trpc } from "../client";
import { faFileArrowDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Document } from "../document";
import DeleteMyDocument from "./DeleteMyDocument";

export default function EditMyDocument() {
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filename, setFilename] = useState("");
  const [document, setDocument] = useState<Document>({
    title: "",
    description: "",
  } as Document);
  const { id } = useParams();
  const { data } = trpc.document.useQuery(id || "");

  const mutation = trpc.editDocument.useMutation();

  useEffect(() => {
    if (id && data) {
      const document = data;
      setDocument(document as Document);
      setTitle(document.title);
      setDescription(document.description);
      setFilename(document.filename || "");
    }
  }, [id, data]);

  async function saveDocument() {
    if (!id) {
      return;
    }
    try {
      await mutation.mutate({
        id: Number(id),
        title,
        description,
        filename,
      });
    } catch (e) {
      // do nothing for now
    }
  }

  return (
    <div>
      <div>
        <form className="flex flex-col">
          <label htmlFor="title" className="font-bold">
            Título
          </label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(evt) => {
              setTitle(evt.target.value);
            }}
          />
          <label htmlFor="description" className="mt-2 font-bold">
            Descrição
          </label>
          <textarea
            name="description"
            maxLength={2000}
            rows={9}
            value={description}
            onChange={(evt) => {
              setDescription(evt.target.value);
            }}
          />
          <label htmlFor="filename" className="mt-2 font-bold">
            Nome do Arquivo
          </label>
          <input
            name="filename"
            type="text"
            value={filename}
            onChange={(evt) => {
              setFilename(evt.target.value);
            }}
          />
          {document.filepath ? (
            <div className="inline-flex items-center mt-2">
              <a
                className="inline-flex items-center underline mr-4"
                href={`http://localhost:4000/${document.filepath}/download`}
              >
                <span className="mr-2">
                  {document.filename}
                  {document.fileext}
                </span>
                <FontAwesomeIcon className="w-4" icon={faFileArrowDown} />
              </a>
            </div>
          ) : null}
          <div className="flex items-center justify-center w-full mt-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    Clicar aqui para realizar upload
                  </span>{" "}
                  ou arraste
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <div className="self-end mt-4  flex items-center">
            <button
              className="rounded p-2  px-6  text-white bg-red mr-4 font-bold"
              onClick={(evt) => {
                evt.preventDefault();
                setShowDeletionModal(true);
              }}
            >
              Destruir
            </button>
            <button
              className="border font-bold border-blue text-blue rounded p-2 px-6  bg-white hover:bg-blue hover:text-white"
              type="submit"
              onClick={(evt) => {
                evt.preventDefault();
                saveDocument();
              }}
            >
              Salvar
            </button>
          </div>
        </form>
        {showDeletionModal ? (
          <DeleteMyDocument
            onClose={() => setShowDeletionModal(false)}
            documentId={document.id.toString()}
          />
        ) : null}
      </div>
    </div>
  );
}
