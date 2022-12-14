import { trpc } from "../client";
import Table from "./Table";

export default function MyDocuments() {
  const response = trpc.documents.useQuery();

  if (!response.data) {
    return <div>Loading...</div>;
  }

  return (
    <Table
      header={{
        id: "ID",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
        title: "Título",
        description: "Descrição",
      }}
      data={response.data}
    ></Table>
  );
}
