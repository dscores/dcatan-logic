import Object from './Object';

export default class ClassicBoardLogic {
  private objects: Object[] = [];
  private currentRoundPoints: number = 0;
  private roundPoints: number[] = [];

  protected addObject(object: Object): ClassicBoardLogic {
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

  public markObject(objectIndex: number): ClassicBoardLogic {
    if (this.isFinished()) {
      return this;
    }
    const object = this.getObjects()[objectIndex];
    if (object.markObject()) {
      this.addCurrentRoundPoints(object.getObjectPoints());
    }
    return this;
  }

  private addCurrentRoundPoints(roundPoints: number): ClassicBoardLogic {
    this.currentRoundPoints += roundPoints;
    return this;
  }

  private resetCurrentRoundPoints(): ClassicBoardLogic {
    this.currentRoundPoints = 0;
    return this;
  }

  public getCurrentRoundPoints(): number {
    return this.currentRoundPoints;
  }

  public nextRound() {
    if (this.isFinished()) {
      return;
    }
    const currentRoundPoints = this.getCurrentRoundPoints();
    if (currentRoundPoints === 0) {
      this.roundPoints.push(-2);
    } else {
      this.roundPoints.push(currentRoundPoints);
      this.resetCurrentRoundPoints();
    }
  }

  public getRoundPoints(): number[] {
    return this.roundPoints;
  }

  public getPoints(): number {
    return this.getRoundPoints().reduce((roundPointsA: number, roundPointsB: number) => { return roundPointsA + roundPointsB; }, 0);
  }

  public isOpen(): boolean {
    return this.getRoundPoints().length < 15;
  }

  public isFinished() {
    return !this.isOpen();
  }
}
