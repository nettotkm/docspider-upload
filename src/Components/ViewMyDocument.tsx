import {
  faFilePen,
  faEye,
  faFileArrowDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { trpc } from "../client";

export default function ViewMyDocument() {
  const { id } = useParams();

  if (!id) {
    return <div>Document not found!</div>;
  }

  const { data } = trpc.document.useQuery(id);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table className="table-auto border-collapse border border-slate-300">
        <thead>
          <tr>
            <td className="bg-blue text-white"> Título</td>
            <td className="bg-blue text-white"> Descrição</td>
            <td className="bg-blue text-white"> Arquivo</td>
            <td className="bg-blue"> </td>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray odd:bg-white">
            <td>{data.title}</td>
            <td>{data.description}</td>
            <td>{data.filename}</td>

            <td className="text-blue">
              <FontAwesomeIcon
                className=" h-[1rem] ml-2 "
                icon={faFileArrowDown}
              />
              <FontAwesomeIcon
                className=" h-[1rem] ml-2 text-red mr-2"
                icon={faTrash}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
