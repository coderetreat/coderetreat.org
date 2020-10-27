import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

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
    <button class="btn btn-secondary my-1" onClick={copyJsonToClipboard}>
      {copied ? "Copied to clipboard!" : "Copy to clipboard"}
    </button>
  );
};
