import Object, { ObjectType } from './Object';
import ClassicBoardLogic from './ClassicBoardLogic';

export default class ClassicBoard extends ClassicBoardLogic {
  public static generate(): ClassicBoard {
    const board = new ClassicBoard();

    const streetA = board.addStreet();
    const villageA = board.addVillage(3, streetA);
    const streetB = board.addStreet(streetA);
    const streetC = board.addStreet(streetB);
    const villageB = board.addVillage(4, streetC, villageA);
    const streetD = board.addStreet(streetC);
    const streetE = board.addStreet(streetD);
    const villageC = board.addVillage(5, streetE, villageB);
    const streetF = board.addStreet(streetE);
    const streetG = board.addStreet(streetF);
    const villageD = board.addVillage(7, streetG, villageC);
    const streetH = board.addStreet(streetG);
    const streetI = board.addStreet(streetH);
    const villageE = board.addVillage(9, streetI, villageD);
    const streetJ = board.addStreet(streetI);
    const streetK = board.addStreet(streetJ);
    const villageF = board.addVillage(11, streetK, villageE);

    const streetBA = board.addStreet(streetB);
    const cityA = board.addCity(7, streetBA);
    const streetDA = board.addStreet(streetD);
    const cityB = board.addCity(12, streetDA, cityA);
    const streetGA = board.addStreet(streetG);
    const streetGB = board.addStreet(streetGA);
    const cityC = board.addCity(20, streetGB, cityB);
    const streetGC = board.addStreet(streetGB);
    const streetGD = board.addStreet(streetGC);
    board.addCity(30, streetGD, cityC);

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
    } else {
      street.markObject();
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
