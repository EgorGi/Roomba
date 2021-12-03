import "./Cell.css";

export interface ICellProps {
  x: number;
  y: number;
  cellIndex: number;
  children?: React.ReactNode;
  click: any;
}

function Cell(props: ICellProps) {
  return (
    <div
      className="cell"
      onClick={()=> props.click(props.cellIndex)}
      style={{ left: props.x * 50, top: props.y * 50 + 100 }}
    >
      {props.children}
    </div>
  );
}

export default Cell;
