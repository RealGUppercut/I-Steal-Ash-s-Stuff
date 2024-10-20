"use client";
import { useState } from "react";
import UpdateForm from "./UpdateForm";

export default function ShowUpdateButton() {
  const [showUpdate, setShowUpdate] = useState(false);
  let buttonText = "update entry";
  if (showUpdate) {
    buttonText = "Hide";
  } else {
    buttonText = "update entry";
  }

  function handleClick() {
    setShowUpdate(!showUpdate);
    console.log(showUpdate);
  }
  return (
    <>
      <button
        onClick={handleClick}
        className="border-black border-1 bg-slate-300 text-rose-400 p-1 m-2 hover:bg-orange-800 hover:text-blue-200
          transition duration-300 ease-in-out"
      >
        {buttonText}
      </button>
    </>
  );
}
