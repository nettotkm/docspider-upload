import { Link } from "react-router-dom";
import { trpc } from "../client";
import Table from "./Table";

export default function MyDocuments() {
  const { data } = trpc.documents.useQuery();

  return (
    <div className="flex flex-col">
      <Link
        className="text-blue border rounded p-2 ml-auto mb-4"
        to="/my-documents/new"
      >
        New Upload
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
        className="text-blue border rounded p-2 ml-auto mt-4 mb-8"
        to="/my-documents/new"
      >
        New Upload
      </Link>
    </div>
  );
}
