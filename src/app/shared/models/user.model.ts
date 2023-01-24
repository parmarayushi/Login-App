export class User {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public confirmPassword: string;

    constructor(
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        confirmpassword: string
    ) {
        this.firstName = firstname;
        this.lastName = lastname;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmpassword;
    }
}