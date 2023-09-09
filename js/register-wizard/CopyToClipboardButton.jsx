import { h, useState, useEffect } from "react";

export const CopyToClipboardButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [text]);

  const copyJsonToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <button className="btn btn-secondary my-1" onClick={copyJsonToClipboard}>
      {copied ? "Copied to clipboard!" : "Copy to clipboard"}
    </button>
  );
};
