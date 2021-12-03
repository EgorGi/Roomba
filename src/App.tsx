import { useEffect, useState } from "react";
import "./App.css";
import Cell from "./components/Cell/Cell";
import Roomba from "./components/Roomba/Roomba";

interface IRoomba {
  x: number;
  y: number;
  direction: number;
}

interface IMapItem {
  x: number;
  y: number;
}

function App() {
  const [map, setMap] = useState<IMapItem[]>([]);
  const [roomba, setRoomba] = useState<IRoomba>({ x: 0, y: 0, direction: 0 });
  const [obstacles, setObstacles] = useState<number[]>([]);

  useEffect(() => {
    initGame();
  }, []);

  const initRoomba = () => {
    setRoomba({ x: 0, y: 0, direction: 0 });
  };

  const initObstacles = () => {
    setObstacles([]);
  };

  const initMap = () => {
    let initialMap: IMapItem[] = [];

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

  const initGame = () => {
    initMap();
    initRoomba();
    initObstacles();
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

    if (
      newRoombaProps.x < 0 ||
      newRoombaProps.x > 9 ||
      newRoombaProps.y < 0 ||
      newRoombaProps.y > 9 ||
      isObstacle(newRoombaProps.x * 10 + newRoombaProps.y)
    ) {
      isBlocked = true;
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

  const clickCell = (cellIndex: any) => {
    console.log(cellIndex);
    if (obstacles.find((obstacle) => obstacle === cellIndex)) {
      setObstacles(obstacles.filter((obstacle) => obstacle === cellIndex));
    } else {
      setObstacles([...obstacles, cellIndex]);
    }
  };

  const isObstacle = (cellIndex: number): boolean => {
    const obstacle = obstacles.find((obstacle) => obstacle === cellIndex);
    if (obstacle) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div>
        <button onClick={initGame}>Init Map</button>
        <button onClick={moveRoomba}>Move</button>
        <button onClick={rotateRoomba}>Rotate</button>
      </div>

      <div>
        {map &&
          map.map((mapCell: IMapItem, index) => (
            <Cell
              x={mapCell.x}
              y={mapCell.y}
              cellIndex={index}
              key={index}
              click={(cellIndex: number) => {
                clickCell(cellIndex);
              }}
            >
              {roomba.x === mapCell.x && roomba.y === mapCell.y ? (
                <Roomba direction={roomba.direction} />
              ) : null}
              {isObstacle(index) && "X"}
            </Cell>
          ))}
      </div>
    </>
  );
}

export default App;
