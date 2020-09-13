import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
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
    <button class="btn btn-primary" onClick={download}>
      Download JSON
    </button>
  );
};

