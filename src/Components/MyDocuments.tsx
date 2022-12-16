import { Link } from "react-router-dom";
import { trpc } from "../client";
import Table from "./Table";

export default function MyDocuments() {
  const { data } = trpc.documents.useQuery();

  return (
    <div className={data?.length ? "flex flex-col" : ""}>
      {data?.length ? (
        <>
          <Link
            data-testid="new-document"
            className="text-blue border rounded border-blue p-2 ml-auto mb-4 hover:bg-blue hover:text-white"
            to="/my-documents/new"
          >
            Novo Documento
          </Link>
          <Table
            header={{
              title: "Título",
              description: "Descrição",
              filename: "Nome do Arquivo",
              createdAt: "Criado em",
            }}
            data={data || []}
          ></Table>
          <Link
            className="text-blue border border-blue rounded p-2 ml-auto mt-4 mb-8 hover:bg-blue hover:text-white"
            to="/my-documents/new"
          >
            Novo Documento
          </Link>
        </>
      ) : (
        <Link
          data-testid="new-document"
          className="text-blue inline-block border rounded border-blue p-2 mb-4 hover:bg-blue hover:text-white"
          to="/my-documents/new"
        >
          Novo Documento
        </Link>
      )}
    </div>
  );
}
