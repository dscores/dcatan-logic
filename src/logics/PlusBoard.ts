import Object, { ObjectType } from './Object';
import PlusBoardLogic from './PlusBoardLogic';

export default class PlusBoard extends PlusBoardLogic {
  public static generate(): PlusBoard {
    const board = new PlusBoard();

    const streetA = board.addStreet();
    board.addVillage(streetA);
    const streetB = board.addStreet(streetA);
    const streetC = board.addStreet(streetB);
    board.addVillage(streetC);
    const streetD = board.addStreet(streetC);
    const streetE = board.addStreet(streetD);
    board.addVillage(streetE);
    const streetF = board.addStreet(streetE);
    const streetG = board.addStreet(streetF);
    const streetH = board.addStreet(streetG);
    const streetI = board.addStreet(streetH);
    board.addVillage(streetI);
    const streetJ = board.addStreet(streetI);
    const streetK = board.addStreet(streetJ);
    board.addVillage(streetK);
    const streetL = board.addStreet(streetK);
    const streetM = board.addStreet(streetL);
    board.addVillage(streetM);
    const streetN = board.addStreet(streetM);
    const streetO = board.addStreet(streetN);
    board.addVillage(streetO);

    const streetBA = board.addStreet(streetB);
    board.addCity(streetBA);
    const streetDA = board.addStreet(streetD);
    board.addCity(streetDA);
    board.addCity(streetG);
    const streetJA = board.addStreet(streetJ);
    board.addCity(streetJA);

    board.addKnightsAndRessource(1);
    board.addKnightsAndRessource(1);
    board.addKnightsAndRessource(1);
    board.addKnightsAndRessource(1);
    board.addKnightsAndRessource(1);
    board.addKnightsAndRessource(2);
    board.addKnightsAndRessource(2);

    return board;
  }

  public static resume() {
    // TODO
  }

  private addStreet(linkedStreet: Object = undefined): Object {
    const street = new Object(ObjectType.Street);
    if (linkedStreet) {
      street.addLinkedObject(linkedStreet);
    } else {
      street.markObject();
    }
    this.addObject(street);
    return street;
  }

  private addVillage(linkedStreet: Object): PlusBoardLogic {
    const village = new Object(ObjectType.Village)
      .setObjectPoints(1)
      .addLinkedObject(linkedStreet);
    this.addObject(village);
    return this;
  }

  private addCity(linkedStreet: Object): PlusBoardLogic {
    const city = new Object(ObjectType.City)
      .setObjectPoints(2)
      .addLinkedObject(linkedStreet);
    this.addObject(city);
    return this;
  }

  private addKnightsAndRessource(amountKnights): PlusBoardLogic {
    const ressource = new Object(ObjectType.Ressource);
    for (let i = 0; i < amountKnights; ++i) {
      const knight = new Object(ObjectType.Knight);
      ressource.addLinkedObject(knight);
      this.addObject(knight);
    }
    this.addObject(ressource);
    return this;
  }
}
