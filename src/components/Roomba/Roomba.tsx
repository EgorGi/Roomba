import "./Roomba.css";

export interface IRoombaProps {
  direction: number;
}

const getDirectionCharacter = (direction: number): string => {
  let charDirection = "L";
  switch (direction) {
    case 0:
      charDirection = "T";
      break;
    case 1:
      charDirection = "R";
      break;
    case 2:
      charDirection = "B";
      break;
  }
  return charDirection;
};

function Roomba(props: IRoombaProps) {
  return <div className="roomba">{getDirectionCharacter(props.direction)}</div>;
}

export default Roomba;
