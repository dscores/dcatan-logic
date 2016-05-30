import Object from './Object';

export default class PlusBoardLogic {
  private objects: Object[] = [];
  private mostKnightsMarked: boolean = false;
  private longestStreetsMarked: boolean = false;

  protected addObject(object: Object): PlusBoardLogic {
    this.objects.push(object);
    return this;
  }

  public getObjects(): Object[] {
    return this.objects;
  }

  public isObjectMarkable(objectIndex: number): boolean {
    if (this.isFinished()) {
      return false;
    }
    return this.getObjects()[objectIndex].isObjectMarkable();
  }

  public markObject(objectIndex: number): PlusBoardLogic {
    if (this.isFinished()) {
      return this;
    }
    this.getObjects()[objectIndex].markObject();
    return this;
  }

  public isMostKnightsChangeable(): boolean {
    const knightsMarked = this.getObjects()
      .filter((object: Object) => { return object.isObjectKnight() && object.isObjectMarked(); });
    return knightsMarked.length >= 3;
  }

  public changeMostKnights(mostKnightsMarked: boolean): PlusBoardLogic {
    if (!this.isMostKnightsChangeable()) {
      return this;
    }
    this.mostKnightsMarked = mostKnightsMarked;
    return this;
  }

  public isMostKnightsMarked(): boolean {
    return this.mostKnightsMarked;
  }

  public isLongestStreetsChangeable(): boolean {
    const streetsMarked = this.getObjects()
      .filter((object: Object) => { return object.isObjectStreet() && object.isObjectMarked(); });
    return streetsMarked.length >= 5;
  }

  public changeLongestStreets(longestStreetsMarked: boolean): PlusBoardLogic {
    if (!this.isLongestStreetsChangeable()) {
      return this;
    }
    this.longestStreetsMarked = longestStreetsMarked;
    return this;
  }

  public isLongestStreetsMarked(): boolean {
    return this.longestStreetsMarked;
  }

  public getPoints(): number {
    let points = this.getObjects()
      .filter((object: Object) => { return object.isObjectMarked(); })
      .map((object: Object) => { return object.getObjectPoints(); })
      .reduce((objectPointsA: number, objectPointsB: number) => { return objectPointsA + objectPointsB; }, 0);
    if (this.isMostKnightsMarked()) {
      points += 2;
    }
    if (this.isLongestStreetsMarked()) {
      points += 2;
    }
    return points;
  }

  public isOpen(): boolean {
    return this.getPoints() < 10;
  }

  public isFinished() {
    return !this.isOpen();
  }
}
