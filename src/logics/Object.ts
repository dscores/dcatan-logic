export enum ObjectType {
  Street = 1,
  Village,
  City,
  Knight,
  Ressource
}

export default class Object {
  private type: ObjectType;
  private linkedObjects: Object[] = [];
  private marked: boolean = false;
  private points: number = 0;

  public constructor(type: ObjectType) {
    this.type = type;
  }

  private getObjectType(): ObjectType {
    return this.type;
  }

  public isObjectStreet(): boolean {
    return this.getObjectType() === ObjectType.Street;
  }

  public isObjectVillage(): boolean {
    return this.getObjectType() === ObjectType.Village;
  }

  public isObjectCity(): boolean {
    return this.getObjectType() === ObjectType.City;
  }

  public isObjectKnight(): boolean {
    return this.getObjectType() === ObjectType.Knight;
  }

  public isObjectRessource(): boolean {
    return this.getObjectType() === ObjectType.Ressource;
  }

  public addLinkedObject(linkedObject: Object): Object {
    this.linkedObjects.push(linkedObject);
    return this;
  }

  public getLinkedObjects(): Object[] {
    return this.linkedObjects;
  }

  public isObjectMarkable(): boolean {
    if (this.isObjectMarked()) {
      return false;
    }
    const streets = this.getLinkedObjects().filter((link: Object) => { return link.isObjectStreet(); });
    if (streets.length) {
      const streetsMarked = streets.filter((link: Object) => { return link.isObjectMarked(); });
      if (!streetsMarked.length) {
        return false;
      }
    }
    const notStreetsNotMarked = this.getLinkedObjects().filter((link: Object) => { return !link.isObjectStreet() && !link.isObjectMarked(); });
    if (notStreetsNotMarked.length) {
      return false;
    }
    return true;
  }

  public markObject(): boolean {
    if (!this.isObjectMarkable()) {
      return false;
    }
    this.marked = true;
    return true;
  }

  public isObjectMarked(): boolean {
    return this.marked;
  }

  public setObjectPoints(points: number): Object {
    this.points = points;
    return this;
  }

  public getObjectPoints(): number {
    return this.points;
  }
}
