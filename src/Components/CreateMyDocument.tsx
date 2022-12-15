import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trpc } from "../client";

export default function CreateMyDocument() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filename, setFilename] = useState("");
  const [originalName, setOriginalName] = useState("");
  const file = useRef<HTMLInputElement>(null);

  const mutation = trpc.createDocument.useMutation();

  async function createDocument() {
    if (file.current && file.current.files) {
      const formData = new FormData();
      const originalFile = file.current.files[0];
      const nameWithoutExt = originalFile.name.replace(/\.([a-z.]+)/, "");
      const ext = originalFile.name.replace(nameWithoutExt, "");
      formData.append("file", originalFile);
      formData.append("filename", `${filename}${ext}`);
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();
      const { path } = payload.file;

      const document = await mutation.mutate({
        title,
        description,
        filename,
        filepath: path,
      });
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
          <input
            name="description"
            type="text"
            value={description}
            onChange={(evt) => {
              setDescription(evt.target.value);
            }}
          />
          {/* <label>Arquivo</label>
          <input type="text" /> */}
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
                {<p className="italic">{originalName}</p>}
              </div>
              <input
                ref={file}
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(evt) => {
                  const name = evt.target.files
                    ? evt.target.files[0].name
                    : null;

                  if (evt.target.files) {
                    console.log(evt.target.files[0]);
                  }

                  if (name) {
                    const nameWithoutExt = name.replace(/\.([a-z.]+)/, "");
                    setOriginalName(name);
                    if (!filename) {
                      setFilename(nameWithoutExt);
                    }
                  }
                }}
              />
            </label>
          </div>
          <button
            className="self-end border border-blue text-blue rounded p-2 mt-4 mr-4 bg-white hover:bg-blue hover:text-white"
            type="submit"
            onClick={(evt) => {
              evt.preventDefault();
              createDocument();
            }}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
