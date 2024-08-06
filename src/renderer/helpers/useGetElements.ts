import { useMemo } from "react";
import elementData from "../table_data";
import { Element, elementSchema } from "../types/Elements";

const useGetElements = () => {
  const data: Element[] = useMemo(
    () =>
      elementSchema
        .array()
        .parse(elementData)
        .sort(
          (a, b) =>
            parseInt(a.atomicNumber.toString(), 10) -
            parseInt(b.atomicNumber.toString(), 10),
        ),
    [],
  );
  const offset: Element[] = useMemo(
    () => data.filter((i) => i.isUnstable),
    [data],
  );
  const nonOffset: Element[] = useMemo(
    () => data.filter((i) => !i.isUnstable),
    [data],
  );

  return { data, offset, nonOffset };
};

export default useGetElements;
