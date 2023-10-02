import { useState, useCallback } from "react";

export const useInputValue = (initial) => {
  const [value, setValue] = useState(initial);
  return [
    value,
    useCallback((event) => setValue(event.target.value)),
    setValue,
  ];
};

export const useCheckbox = (initial) => {
  const [value, setValue] = useState(initial);
  return [value, useCallback((event) => setValue(event.target.checked))];
};

export const useTabular = (emptyElement) => {
  const [tabularData, setTabularData] = useState([{ ...emptyElement }]);

  const maybeAppendEmptyRow = useCallback(
    (tabular) => {
      if (tabular.length === 0) {
        return setTabularData([{ ...emptyElement }]);
      }

      const lastRow = tabular[tabular.length - 1];
      for (let key in emptyElement) {
        if (lastRow[key] != "")
          return setTabularData([...tabular, emptyElement]);
      }

      return setTabularData(tabular);
    },
    [setTabularData]
  );

  const updateRow = useCallback(
    (i, propsToMerge) => {
      const row = { ...tabularData[i], ...propsToMerge };
      maybeAppendEmptyRow([
        ...tabularData.slice(0, i),
        row,
        ...tabularData.slice(i + 1),
      ]);
    },
    [tabularData, maybeAppendEmptyRow]
  );

  const deleteRow = useCallback(
    (i) =>
      maybeAppendEmptyRow([
        ...tabularData.slice(0, i),
        ...tabularData.slice(i + 1),
      ]),
    [tabularData, maybeAppendEmptyRow]
  );

  return [tabularData, updateRow, deleteRow];
};
