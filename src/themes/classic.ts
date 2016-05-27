import Board from '../logics/Board';
import Object from '../logics/Object';

export default function classic(board: Board): Board {
  const objects = [];

  let streetA = new Object('street', [], 1);
  streetA.markObject();
  objects.push(streetA);
  let villageA = new Object('village', [streetA], 3);
  objects.push(villageA);
  let streetB = new Object('street', [streetA], 1);
  objects.push(streetB);

  let streetBA = new Object('street', [streetB], 1);
  objects.push(streetBA);
  let cityA = new Object('city', [streetBA], 7);
  objects.push(cityA);

  let streetC = new Object('street', [streetB], 1);
  objects.push(streetC);
  let villageB = new Object('village', [streetC, villageA], 4);
  objects.push(villageB);

  let anotherStreetCA = new Object('street', [streetC], 1);
  objects.push(anotherStreetCA);
  let cityB = new Object('city', [anotherStreetCA, cityA], 12);
  objects.push(cityB);

  let streetD = new Object('street', [streetC], 1);
  objects.push(streetD);
  let villageC = new Object('village', [streetD, villageB], 5);
  objects.push(villageC);
  let streetE = new Object('street', [streetD], 1);
  objects.push(streetE);
  let streetF = new Object('street', [streetE], 1);
  objects.push(streetF);
  let villageD = new Object('village', [streetF, villageC], 7);
  objects.push(villageD);

  let streetFA = new Object('street', [streetF], 1);
  objects.push(streetFA);
  let streetFB = new Object('street', [streetFA], 1);
  objects.push(streetFB);
  let cityC = new Object('city', [streetFB, cityB], 20);
  objects.push(cityC);

  let streetFC = new Object('street', [streetFB], 1);
  objects.push(streetFC);
  let streetFD = new Object('street', [streetFC], 1);
  objects.push(streetFD);
  let cityD = new Object('city', [streetFD, cityC], 30);
  objects.push(cityD);

  let streetG = new Object('street', [streetF], 1);
  objects.push(streetG);
  let streetH = new Object('street', [streetG], 1);
  objects.push(streetH);
  let villageE = new Object('village', [streetH, villageD], 9);
  objects.push(villageE);
  let streetI = new Object('street', [streetH], 1);
  objects.push(streetI);
  let streetJ = new Object('street', [streetI], 1);
  objects.push(streetJ);
  let villageF = new Object('village', [streetJ, villageE], 11);
  objects.push(villageF);

  let knightA = new Object('knight', [], 1);
  objects.push(knightA);
  let ressourceA = new Object('ressource', [knightA], 0);
  objects.push(ressourceA);

  let knightB = new Object('knight', [knightA], 2);
  objects.push(knightB);
  let ressourceB = new Object('ressource', [knightB], 0);
  objects.push(ressourceB);

  let knightC = new Object('knight', [knightB], 3);
  objects.push(knightC);
  let ressourceC = new Object('ressource', [knightC], 0);
  objects.push(ressourceC);

  let knightD = new Object('knight', [knightC], 4);
  objects.push(knightD);
  let ressourceD = new Object('ressource', [knightD], 0);
  objects.push(ressourceD);

  let knightE = new Object('knight', [knightD], 5);
  objects.push(knightE);
  let ressourceE = new Object('ressource', [knightE], 0);
  objects.push(ressourceE);

  let knightF = new Object('knight', [knightE], 6);
  objects.push(knightF);
  let ressourceF = new Object('ressource', [knightF], 0);
  objects.push(ressourceF);

  return board.setObjects(objects);
}
