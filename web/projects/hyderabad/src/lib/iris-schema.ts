export class IEntity {
  id: number;
}

export class User {
  id: number = undefined;
  name: string = undefined;
}

export class Auth {
  constructor(
    public landId: string = null,
    public userName: string = null,
    public firstName: string = null,
    public lastName: string = null,
    public bearerToken: string = '',
    public isAuthenticated = false
  ) {}
}
