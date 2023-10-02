import { h,useState, useEffect, useCallback } from "react";

const selectNode = (e) => {
  const node = e.target;

  if (document.body.createTextRange) {
    const range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  } else if (window.getSelection) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export const PayloadPresentation = ({ payload }) => {
  const [enableSelection, setEnableSelection] = useState(true);

  useEffect(() => {
    setEnableSelection(true);
  }, [payload]);

  const onClick = useCallback(
    (e) => {
      if (enableSelection) {
        selectNode(e);
        setEnableSelection(false);
      }
    },
    [enableSelection, setEnableSelection]
  );

  return (
    <pre className="bg-dark text-light p-2" onClick={onClick}>
      {payload}
    </pre>
  );
};
