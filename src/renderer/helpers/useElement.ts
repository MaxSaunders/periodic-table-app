import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const ELEMENT_URL_PARAM = "element";

const useElement = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedElement = useMemo(
    () => searchParams.get(ELEMENT_URL_PARAM),
    [searchParams],
  );

  const setElement = useCallback(
    (elementId?: string | number) => {
      searchParams.delete(ELEMENT_URL_PARAM);
      if (elementId) {
        searchParams.set(ELEMENT_URL_PARAM, elementId.toString());
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const clearElement = useCallback(setElement, [setElement]);

  return {
    selectedElement,
    setElement,
    clearElement,
  };
};

export default useElement;
