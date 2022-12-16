import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trpc } from "../client";

export default function EditMyDocument() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filename, setFilename] = useState("");

  const { id } = useParams();
  const { data, error } = trpc.document.useQuery(id || "");
  const mutation = trpc.editDocument.useMutation();

  useEffect(() => {
    if (id && data) {
      const document = data;
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
          <label htmlFor="title">Título</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(evt) => {
              setTitle(evt.target.value);
            }}
          />
          <label htmlFor="description" className="mt-2">
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
          <label htmlFor="filename" className="mt-2">
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
          <div className="flex items-center justify-center w-full mt-4">
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <button
            className="self-end border border-blue text-blue rounded p-2 mt-4  bg-white hover:bg-blue hover:text-white"
            type="submit"
            onClick={(evt) => {
              evt.preventDefault();
              saveDocument();
            }}
          >
            Save Document
          </button>
        </form>
      </div>
    </div>
  );
}
