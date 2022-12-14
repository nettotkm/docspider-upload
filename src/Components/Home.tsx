import { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="text-blue">
      Hello, World ! <FontAwesomeIcon icon={faEnvelope} />
    </div>
  );
}
