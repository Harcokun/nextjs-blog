import axios from "axios";
import { AuthService } from "./authService";

export class UserService {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async getOneUser(id: string) {
    var data = null;
    var errorMsg = "";
    //const token = localStorage.getItem("token");
    await axios
      .get("http://127.0.0.1:8000/api/users/" + id, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
          Accept: "application/json",
        },
      })
      .then(function (response) {
        data = response.data;
        //console.log(data);
      })
      .catch(function (error) {
        if (error.response) {
          //console.log(error.response);
          errorMsg = String(error.response.status);
        }
      });
    //console.log(data);
    return [data, errorMsg];
  }

  public async getUserName() {
    var fullname = "";

    if (this.authService.isLogin) {
      await this.authService.getMe().then((result) => {
        if (!result[1]) {
          fullname = result[0].firstname + " " + result[0].lastname;
          console.log(`${fullname}`);
        } else {
          throw alert(`Error ${result[1]}: Unauthenticated`);
        }
      });
    }
    console.log(`Fullname in GetUserName: ${fullname}`);
    return fullname;
  }
}
