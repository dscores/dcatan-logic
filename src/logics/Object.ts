export default class Object {
  private type: string;
  private links: Object[];
  private marked: boolean = false;
  private points: number;

  public constructor(type: string, links: Object[], points: number) {
    this.type = type;
    this.links = links;
    this.points = points;
  }

  public getType(): string {
    return this.type;
  }

  public getLinks(): Object[] {
    return this.links;
  }

  public isMarkable(): boolean {
    if (this.isMarked()) {
      return false;
    }
    const streets = this.getLinks().filter((link: Object) => { return link.isStreet(); });
    if (streets.length > 0) {
      const markedStreets = streets.filter((link: Object) => { return link.isMarked(); });
      if (markedStreets.length === 0) {
        return false;
      }
    }
    const notStreetsNotMarked = this.getLinks().filter((link: Object) => { return !link.isStreet() && !link.isMarked(); });
    if (notStreetsNotMarked.length > 0) {
      return false;
    }
    return true;
  }

  public markObject(): boolean {
    if (!this.isMarkable()) {
      return false;
    }
    this.marked = true;
    return true;
  }

  public isMarked(): boolean {
    return this.marked;
  }

  public getPoints(): number {
    return this.points;
  }

  private isStreet(): boolean {
    return this.getType() === 'street';
  }
}
