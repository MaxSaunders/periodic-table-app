/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useGroup from "../helpers/useGroup";
import { className } from "../helpers/utils";
import "./TableComponents.css";

export function TableOffsetLegend() {
  const { currentValue } = useGroup();
  return (
    <div style={{ opacity: currentValue ? 0.1 : 1 }} className="offset-legend">
      <div className="offset-legend-box">57 - 71</div>
      <div className="offset-legend-box">89 - 103</div>
      <div />
      <div className="offset-legend-box large">6</div>
      <div className="offset-legend-box large">7</div>
    </div>
  );
}

function TableGroup({ value, label }: { value: string; label: string }) {
  const { getMouseOverProps, toggleSelectedCategory, currentValue } =
    useGroup();

  const isSelected = currentValue === value;

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getMouseOverProps("group", value)}
      onClick={() => toggleSelectedCategory("group", value)}
      className={className([
        "group-select",
        value.replaceAll(" ", "-"),
        currentValue && `selected-${isSelected}`,
      ])}
    >
      <span>{label}</span>
    </div>
  );
}

export function TableLegendState({
  state,
  symbol,
}: {
  state: string;
  symbol: string;
}) {
  const { getMouseOverProps, toggleSelectedCategory, currentValue } =
    useGroup();
  const isSelected = currentValue === state;

  return (
    <button
      {...getMouseOverProps("state", state)}
      onClick={() => toggleSelectedCategory("state", state)}
      className={className([
        "entry",
        state.toLowerCase(),
        currentValue && `selected-${isSelected}`,
      ])}
    >
      <span className="symbol">{symbol}</span>
      <span className="label">{state}</span>
    </button>
  );
}

export function TableLegend() {
  return (
    <div className="table-legend">
      <div className="states">
        {/* <h3 style={{ padding: 0, marginBlock: "10px 20px" }}>Standard State</h3> */}
        <TableLegendState symbol="C" state="Solid" />
        <TableLegendState symbol="Hg" state="Liquid" />
        <TableLegendState symbol="H" state="Gas" />
        <TableLegendState symbol="Rf" state="Unknown" />
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
