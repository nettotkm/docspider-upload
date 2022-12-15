import { Link } from "react-router-dom";
import { trpc } from "../client";
import Table from "./Table";

export default function MyDocuments() {
  const { data } = trpc.documents.useQuery();

  return (
    <div>
      <Link className="  text-blue " to="/my-documents/new">
        New Upload
      </Link>
      <Table
        header={{
          // id: "ID",
          title: "Título",
          description: "Descrição",
          filename: "Nome do Arquivo",
          createdAt: "Criado em",
          // updatedAt: "Atualizado em",
        }}
        data={data || []}
      ></Table>
    </div>
  );
}
