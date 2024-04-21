export class LoginResponse {
    public loginStatus: LoginStatus.FAILURE | LoginStatus.SUCCESS;
    public loginMessage: string;

    constructor(loginStatus: LoginStatus.FAILURE | LoginStatus.SUCCESS, loginMessage: string) {
        this.loginStatus = loginStatus;
        this.loginMessage = loginMessage;
    }
}

export enum LoginStatus {
    SUCCESS = 'success',
    FAILURE = 'failure'
}
