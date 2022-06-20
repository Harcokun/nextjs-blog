import React from "react";
import { AuthService } from "./authService";
import { StoreService } from "./storeService";
import { UserService } from "./userService";

const authService = new AuthService();
const userService = new UserService(authService);
const storeService = new StoreService(authService);
export const container = {authService, userService, storeService};