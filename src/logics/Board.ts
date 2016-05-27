import Object from './Object';

export default class Board {
  private objects: Object[] = [];
  private currentRoundPoints: number = 0;
  private roundPoints: number[] = [];

  public setObjects(objects: Object[]): Board {
    this.objects = objects;
    return this;
  }

  public getObjects(): Object[] {
    return this.objects;
  }

  public markObject(objectIndex: number): Board {
    if (this.isFinished()) {
      return this;
    }
    const object = this.getObjects()[objectIndex];
    if (object.markObject()) {
      this.addCurrentRoundPoints(object.getPoints());
    }
    return this;
  }

  public addCurrentRoundPoints(roundPoints: number): Board {
    this.currentRoundPoints += roundPoints;
    return this;
  }

  public resetCurrentRoundPoints(): Board {
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
