export class User {
    constructor(public firstName: string, public lastName: string,
        public email: string, public login: string,
        public createdDate: string, public authorities: []) { }
}
