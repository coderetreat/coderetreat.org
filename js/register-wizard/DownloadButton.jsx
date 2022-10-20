import { h,useState, useEffect } from "react";
import { btoa } from "abab";

export const DownloadButton = ({ text, filename }) => {

  const download = () => {
    const link = document.createElement("a");
    link.download = filename+".json";
    link.href = `data:application/json;charset=utf-8;base64,${btoa(text)}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <button className="btn btn-primary my-1" onClick={download}>
      Download JSON
    </button>
  );
};

