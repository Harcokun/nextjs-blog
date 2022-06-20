import axios from "axios";
import { AuthService } from "./authService";

export class StoreService {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async getAllStores() {
    var stores = [];
    var errorCode = "";
    var errorMsg = "";

    await axios
      .get("http://127.0.0.1:8000/api/stores/", {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
          Accept: "application/json",
        },
      })
      .then(function (response) {
        stores = response.data;
        //console.log(response.data);
        //console.log(`Stores from storeService.getAllStores(): ${JSON.stringify(stores)}`);
      })
      .catch(function (error) {
        if (error.response) {
          errorCode = error.response.status;
          errorMsg = error.response.statusText;
          console.log(`Error Code: ${error.response.status}`);
          alert(`Unauthorized Code ${errorCode}: ${errorMsg}`);
        }
      });

      return [stores, errorCode];
  }

}