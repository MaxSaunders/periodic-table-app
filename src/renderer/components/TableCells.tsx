/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useElement from "../helpers/useElement";
import useGroup from "../helpers/useGroup";
import { className, convertMass } from "../helpers/utils";
import { Element as ElementType } from "../types/Elements";
import "./TableCells.css";

export function SkipCell({
  amount,
  extraKey,
}: {
  amount: number;
  extraKey: string | number;
}) {
  if (!amount || amount < 1) {
    return null;
  }
  const emptyArray = (Array(...Array(amount)) || []).map((i, idx) => idx);
  const emptyCells = emptyArray.map((identifier) => (
    <div
      key={`${extraKey}-${identifier}`}
      className="periodic-table-cell blank-cell"
    />
  ));
  return emptyCells;
}

type ElementCellProps = {
  element: ElementType;
};

function ElementCell({ element }: ElementCellProps) {
  const { selectedElement, setElement } = useElement();
  const { currentSelection } = useGroup();

  return (
    <>
      <SkipCell
        amount={element.cellsOffset ?? 0}
        extraKey={element.atomicNumber}
      />
      <div
        onClick={() => setElement(element.atomicNumber)}
        className={className([
          "periodic-table-cell",
          element.isUnstable && "unstable",
          element.groupBlock.toLocaleString().replaceAll(" ", "-"),
          `standard-state-${element.standardState}`,
          selectedElement === element.atomicNumber.toString() && "selected",
          currentSelection &&
            `group-selected-${currentSelection === element.groupBlock}`,
        ])}
      >
        <div className="cell-atomicNumber">{element.atomicNumber}</div>
        <div className="cell-symbol">{element.symbol}</div>
        <div className="cell-name">{element.name}</div>
        <div className="cell-atomicMass">{convertMass(element.atomicMass)}</div>
      </div>
    </>
  );
}

export default ElementCell;
