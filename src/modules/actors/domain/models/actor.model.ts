export class ActorModel {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public lastUpdate: Date
  ) {}

  toJson(): Record<string, any> {
    return {
      "id": this.id,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "lastUpdate": this.lastUpdate
    }
  }
}