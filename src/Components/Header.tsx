import React, { useContext, useState } from "react";
import { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { AppContext } from "../App";

export default function Header() {
  const [open, setOpen] = useContext(AppContext);
  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue p-4 flex items-center">
      <FontAwesomeIcon
        className="text-white h-[1.5rem] mr-4 cursor-pointer"
        icon={faBars}
        onClick={() => setOpen(!open)}
      />
      <div className="sm:flex sm:items-center">
        <img src={logo} alt="logo" className="h-[2.25rem]" />
      </div>
    </div>
  );
}
