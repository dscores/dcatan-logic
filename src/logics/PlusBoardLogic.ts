import Object, { ObjectType } from './Object';

export default abstract class PlusBoardLogic {
  private objects: Object[] = [];
  private currentRoundPoints: number = 0;
  private roundPoints: number[] = [];

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

  public getPoints(): number {
    let points = this.getObjects()
      .filter((object: Object) => { return object.isObjectMarked(); })
      .map((object: Object) => { return object.getObjectPoints(); })
      .reduce((objectPointsA: number, objectPointsB: number) => { return objectPointsA + objectPointsB; }, 0);

    // TODO längste handelsstraße
    // TODO größte rittermacht

    return points;
  }

  public isOpen(): boolean {
    return this.getPoints() < 10;
  }

  public isFinished() {
    return !this.isOpen();
  }
}
