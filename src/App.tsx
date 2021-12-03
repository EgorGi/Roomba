import { useEffect, useState } from "react";
import "./App.css";
import Cell, { IMapCell } from "./components/Cell/Cell";
import Roomba from "./components/Roomba/Roomba";

interface IRoomba {
  x: number;
  y: number;
  direction: number;
}

function App() {
  const [map, setMap] = useState<IMapCell[]>([]);
  const [roomba, setRoomba] = useState<IRoomba>({ x: 0, y: 0, direction: 0 });

  useEffect(() => {
    initMap();
    initRoomba();
  }, []);

  const initRoomba = () => {
    setRoomba({ x: 0, y: 0, direction: 0 });
  };

  const initMap = () => {
    let initialMap: IMapCell[] = [];

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        initialMap.push({
          x,
          y,
        });
      }
    }

    setMap(initialMap);
  };

  const moveRoomba = () => {
    const newRoombaProps = { ...roomba };
    let isBlocked = false;

    switch (roomba.direction) {
      case 0: {
        newRoombaProps.y--;
        break;
      }
      case 1: {
        newRoombaProps.x++;
        break;
      }
      case 2: {
        newRoombaProps.y++;
        break;
      }
      case 3: {
        newRoombaProps.x--;
        break;
      }
    }

    if (!isBlocked) {
      setRoomba(newRoombaProps);
    } else {
      rotateRoomba();
    }
  };

  const rotateRoomba = () => {
    const newDirection = roomba.direction + 1 > 3 ? 0 : roomba.direction + 1;
    setRoomba((prevProps) => {
      return { ...prevProps, direction: newDirection };
    });
  };

  return (
    <>
      <div>
        <button onClick={initMap}>Init Map</button>
        <button onClick={moveRoomba}>Move</button>
        <button onClick={rotateRoomba}>Rotate</button>
      </div>

      <div>
        {map &&
          map.map((mapCell: IMapCell, index) => (
            <Cell x={mapCell.x} y={mapCell.y} key={index}>
              {roomba.x === mapCell.x && roomba.y === mapCell.y ? (
                <Roomba direction={roomba.direction} />
              ) : null}
            </Cell>
          ))}
      </div>
    </>
  );
}

export default App;
