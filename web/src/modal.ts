// tslint:disable-next-line: no-namespace
namespace hyderabad {
  export class Person {
    ID: string = undefined;
    Name: string = undefined;
  }

  export class PersonList {
    Person: Person[] = [];
  }

  export class IEntity {
    id: number;
  }
}
