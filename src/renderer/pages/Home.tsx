import ElementCell, {
  SkipRow,
  TableLegend,
  TableOffsetLegend,
} from "../components/TableCells";
import ElementFlyout from "../components/ElementFlyout";
import useGetElements from "../helpers/useGetElements";

export default function Home() {
  const { offset, nonOffset } = useGetElements();

  return (
    <div className="app-wrapper">
      <div className="periodic-table">
        {nonOffset.map((element) => (
          <ElementCell key={element.atomicNumber} element={element} />
        ))}
        <SkipRow />
        {offset.map((element) => (
          <ElementCell key={element.atomicNumber} element={element} />
        ))}
        <TableLegend />
        <TableOffsetLegend />
      </div>
      <ElementFlyout />
    </div>
  );
}
