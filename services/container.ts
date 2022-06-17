import React from "react";
import { AuthService } from "./authService";
import { UserService } from "./userService";

const authService = new AuthService();
const userService = new UserService(authService);
export const container = {authService, userService};