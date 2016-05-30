import Object, { ObjectType } from './Object';
import ClassicBoardLogic from './ClassicBoardLogic';

export default class ClassicBoard extends ClassicBoardLogic {
  public static generate(): ClassicBoard {
    const board = new ClassicBoard();

    const streetA = board.addStreet();
    streetA.markObject();

    const villageA = board.addVillage(3, streetA);
    const streetB = board.addStreet(streetA);

    const streetBA = board.addStreet(streetB);
    const cityA = board.addCity(7, streetBA);

    const streetC = board.addStreet(streetB);
    const villageB = board.addVillage(4, streetC, villageA);

    const streetCA = board.addStreet(streetC);
    const cityB = board.addCity(12, streetCA, cityA);

    const streetD = board.addStreet(streetC);
    const villageC = board.addVillage(5, streetD, villageB);
    const streetE = board.addStreet(streetD);
    const streetF = board.addStreet(streetE);
    const villageD = board.addVillage(7, streetF, villageC);

    const streetFA = board.addStreet(streetF);
    const streetFB = board.addStreet(streetFA);
    const cityC = board.addCity(20, streetFB, cityB);

    const streetFC = board.addStreet(streetFB);
    const streetFD = board.addStreet(streetFC);
    board.addCity(30, streetFD, cityC);

    const streetG = board.addStreet(streetF);
    const streetH = board.addStreet(streetG);
    const villageE = board.addVillage(9, streetH, villageD);
    const streetI = board.addStreet(streetH);
    const streetJ = board.addStreet(streetI);
    board.addVillage(11, streetJ, villageE);

    const knightA = board.addKnightAndRessource(1);
    const knightB = board.addKnightAndRessource(2, knightA);
    const knightC = board.addKnightAndRessource(3, knightB);
    const knightD = board.addKnightAndRessource(4, knightC);
    const knightE = board.addKnightAndRessource(5, knightD);
    board.addKnightAndRessource(6, knightE);

    return board;
  }

  public static resume() {
    // TODO
  }

  private addStreet(linkedStreet: Object = undefined): Object {
    const street = new Object(ObjectType.Street);
    street.setObjectPoints(1);
    if (linkedStreet) {
      street.addLinkedObject(linkedStreet);
    }
    this.addObject(street);
    return street;
  }

  private addVillage(points: number, linkedStreet: Object, linkedVillage: Object = undefined): Object {
    const village = new Object(ObjectType.Village)
      .setObjectPoints(points)
      .addLinkedObject(linkedStreet);
    if (linkedVillage) {
      village.addLinkedObject(linkedVillage);
    }
    this.addObject(village);
    return village;
  }

  private addCity(points: number, linkedStreet: Object, linkedCity: Object = undefined): Object {
    const city = new Object(ObjectType.City)
      .setObjectPoints(points)
      .addLinkedObject(linkedStreet);
    if (linkedCity) {
      city.addLinkedObject(linkedCity);
    }
    this.addObject(city);
    return city;
  }

  private addKnightAndRessource(points: number, linkedKnight: Object = undefined): Object {
    const knight = new Object(ObjectType.Knight)
      .setObjectPoints(points);
    if (linkedKnight) {
      knight.addLinkedObject(linkedKnight);
    }
    this.addObject(knight);
    const ressource = new Object(ObjectType.Ressource)
      .addLinkedObject(knight);
    this.addObject(ressource);
    return knight;
  }
}
