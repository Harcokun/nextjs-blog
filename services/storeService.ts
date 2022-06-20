import axios from "axios";
import { AuthService } from "./authService";

export class StoreService {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }


}