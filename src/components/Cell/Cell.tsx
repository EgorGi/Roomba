import "./Cell.css";

export interface IMapCell {
  x: number;
  y: number;
  children?: any;
}

function Cell(props: IMapCell) {
  return (
    <div
      className="cell"
      style={{ left: props.x * 50, top: props.y * 50 + 100 }}
    >
      {props.children}
    </div>
  );
}

export default Cell;
