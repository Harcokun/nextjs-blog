import { AuthService } from "./authService"

export class UserService {
    private authService: AuthService;

    constructor(authService : AuthService) {
        this.authService = authService;
    }

    //getter
    public get getOneUser() : any {
        return {name: 'Lumine'}
    }
}