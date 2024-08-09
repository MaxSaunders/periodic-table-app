import { useEffect, useMemo, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { Element as ElementType } from "../types/Elements";
import useElement from "../helpers/useElement";
import useGetElements from "../helpers/useGetElements";
import "./ElementFlyout.css";

type InfoRowProps = {
  label: string;
  value: string | number;
};

function InfoRow({ label, value }: InfoRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const className = `info-row ${isHovered ? "is-hovered" : ""}`;
  const bgColor = "";
  // const bgColor = isHovered ? `#${color}` : "";
  return (
    <>
      <span
        style={{ backgroundColor: bgColor }}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {label}
      </span>
      <span
        style={{ backgroundColor: bgColor }}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {(value || "N/A").toString().toUpperCase()}
      </span>
    </>
  );
}

function ElementFlyout() {
  const { data } = useGetElements();
  const { selectedElement, clearElement } = useElement();
  const [previousValue, setPreviousValue] = useState<ElementType>(
    {} as ElementType,
  );

  const selectedElementData = useMemo(
    () => data.find((i) => i.atomicNumber.toString() === selectedElement),
    [data, selectedElement],
  );

  useEffect(() => {
    if (selectedElementData) {
      setPreviousValue(selectedElementData);
    }
  }, [selectedElementData]);

  const isHidden = useMemo(
    () => !selectedElement || !selectedElementData,
    [selectedElement, selectedElementData],
  );

  const {
    atomicNumber = "",
    name = "",
    symbol = "",
    atomicMass = "",
    meltingPoint = "",
    groupBlock = "",
    density = "",
    standardState = "",
    electroNegativity = "",
    boilingPoint = "",
    yearDiscovered = "",
    atomicRadius = "",
    electronicConfiguration = "",
    electronAffinity = "",
  } = selectedElementData || previousValue;

  return (
    <div className={`element-flyout ${isHidden ? "hidden" : ""}`}>
      <div className="header">
        <div className="info">
          <h1 className="atomic-number">{atomicNumber}</h1>
          <h1 className="atomic-number">-</h1>
          <h2 className="name">{name}</h2>
        </div>
        <button
          onClick={() => clearElement()}
          type="button"
          className="close-button"
        >
          <VscClose />
        </button>
      </div>
      <h1 className={`symbol ${groupBlock.toString().replaceAll(" ", "-")}`}>
        {/* <h1 className="symbol" style={{ backgroundColor: `#${cpkHexColor}` }}> */}
        {symbol}
      </h1>
      <div className="info-table">
        <InfoRow label="Group" value={groupBlock} />
        <InfoRow label="Atomic Mass" value={atomicMass} />
        <InfoRow label="Density" value={density} />
        <InfoRow label="Standard State" value={standardState} />
        <InfoRow label="Year Discovered" value={yearDiscovered} />
        <InfoRow label="Melting Point" value={meltingPoint} />
        <InfoRow label="Boiling Point" value={boilingPoint} />
        <InfoRow label="Electro Negativity" value={electroNegativity} />
        <InfoRow label="Atomic Radius" value={atomicRadius} />
        <InfoRow label="Electron Affinity" value={electronAffinity} />
        <InfoRow
          label="Electronic Configuration"
          value={electronicConfiguration}
        />
      </div>
    </div>
  );
}

export default ElementFlyout;
