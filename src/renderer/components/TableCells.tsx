/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useElement from "../helpers/useElement";
import useGroup from "../helpers/useGroup";
import { convertMass } from "../helpers/utils";
import { Element as ElementType } from "../types/Elements";
import "./TableCells.css";

export function TableOffsetLegend() {
  const { currentSelection } = useGroup();
  return (
    <div
      style={{ opacity: currentSelection ? 0.1 : 1 }}
      className="offset-legend"
    >
      <div className="offset-legend-box">57 - 71</div>
      <div className="offset-legend-box">89 - 103</div>
      <div />
      <div className="offset-legend-box large">6</div>
      <div className="offset-legend-box large">7</div>
    </div>
  );
}

function TableGroup({ value, label }: { value: string; label: string }) {
  const { getMouseOverProps, toggleSelectedGroup, currentSelection } =
    useGroup();

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getMouseOverProps(value)}
      onClick={() => toggleSelectedGroup(value)}
      className={`group-select ${value.replaceAll(" ", "-")} ${
        currentSelection ? `selected-${currentSelection === value}` : ""
      }`}
    >
      <span>{label}</span>
    </div>
  );
}

export function TableLegend() {
  return (
    <div className="table-legend">
      <div className="states">
        <div className="entry">
          <span className="symbol">C</span>
          <span className="label">Solid</span>
        </div>
        <div className="entry liquid">
          <span className="symbol">Hg</span>
          <span className="label">Liquid</span>
        </div>
        <div className="entry gas">
          <span className="symbol">H</span>
          <span className="label">Gas</span>
        </div>
        <div className="entry unknown">
          <span className="symbol">Rf</span>
          <span className="label">Unknown</span>
        </div>
      </div>
      <div className="groups">
        <TableGroup label="Metals" value="metal" />
        <TableGroup label="NonMetals" value="nonmetal" />
        <TableGroup label="Alkali Metals" value="alkali metal" />
        <TableGroup
          label="Alkaline Earth Metals"
          value="alkaline earth metal"
        />
        <TableGroup label="Lanthanoids" value="lanthanoid" />
        <TableGroup label="Actinoids" value="actinoid" />
        <TableGroup label="Transition Metals" value="transition metal" />
        <TableGroup
          label="Post-transition Metals"
          value="post-transition metal"
        />
        <TableGroup label="Metalloids" value="metalloid" />
        <TableGroup label="Reactive Nonmetals" value="halogen" />
        <TableGroup label="Noble Gases" value="noble gas" />
      </div>
    </div>
  );
}

export function SkipRow() {
  return <div className="periodic-table-row blank-row" />;
}

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
        className={`periodic-table-cell ${
          element.isUnstable ? "unstable" : ""
        } ${element.groupBlock
          .toLocaleString()
          .replaceAll(" ", "-")} standard-state-${element.standardState} ${
          selectedElement === element.atomicNumber.toString() ? "selected" : ""
        }
        ${
          currentSelection
            ? `group-selected-${currentSelection === element.groupBlock}`
            : ""
        }
        `}
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
