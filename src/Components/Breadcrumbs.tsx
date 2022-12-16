import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const Icon = () => {
  return (
    <li className="flex items-center text-blue">
      <FontAwesomeIcon className="h-[0.5rem] ml-2" icon={faAngleRight} />
    </li>
  );
};

const MyDocuments = (link?: boolean) => {
  return (
    <>
      <Icon />
      {link ? (
        <Link to="/my-documents" className="flex items-center text-blue">
          <span className="px-2">Meus Documentos</span>
        </Link>
      ) : (
        <li className="flex items-center text-gray-200">
          <span className="px-2">Meus Documentos</span>
        </li>
      )}
    </>
  );
};

const NewDocument = () => {
  return (
    <>
      {MyDocuments(true)}
      <Icon />
      <li className="flex items-center text-gray-200">
        <span className="px-2">Novo</span>
      </li>
    </>
  );
};

const EditDocument = () => {
  return (
    <>
      {MyDocuments(true)}
      <Icon />
      <li className="flex items-center text-gray-200">
        <span className="px-2">Editar</span>
      </li>
    </>
  );
};

const ViewDocument = () => {
  return (
    <>
      {MyDocuments(true)}
      <Icon />
      <li className="flex items-center text-gray-200">
        <span className="px-2">Detalhes</span>
      </li>
    </>
  );
};

const About = () => {
  return (
    <>
      <Icon />
      <li className="flex items-center text-gray-200">
        <span className="px-2">About</span>
      </li>
    </>
  );
};

const BREADCRUMBS: { [path: string]: () => JSX.Element } = {
  "/my-documents$": MyDocuments,
  "/my-documents/new$": NewDocument,
  "/my-documents/(.*)/edit$": EditDocument,
  "/my-documents/(.*)$": ViewDocument,
  "/about$": About,
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pattern = Object.keys(BREADCRUMBS).filter((pattern) => {
    if (location.pathname.match(new RegExp(pattern))) {
      return true;
    } else {
      return false;
    }
  })[0];
  const breadcrumb = BREADCRUMBS[pattern];

  return (
    <ul className="flex text-xs p-2">
      <li className="items-center text-blue ">
        <Link className={``} to="/">
          Início
        </Link>
      </li>
      {location.pathname !== "/" && breadcrumb ? breadcrumb() : null}
    </ul>
  );
}
