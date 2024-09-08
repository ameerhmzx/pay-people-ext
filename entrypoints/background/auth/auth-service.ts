import { defineProxyService } from "@webext-core/proxy-service";
import { storage } from "wxt/storage";
import { Credentials, LoginRes } from "@/entrypoints/background/auth/types.ts";
import { getTimesheetService } from "@/entrypoints/background/timesheet/timesheet-service.ts";
import { bgQueryClient } from "@/entrypoints/background/common/bg-query-client.ts";

export class AuthService {
  private RES_KEY = "local:loginRes" as const;
  private CRED_KEY = "local:credentials" as const;

  /**
   * Checks if the user is logged in and the token is still valid
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      const loginRes = await storage.getItem<LoginRes>(this.RES_KEY);
      if (!loginRes) {
        return false;
      }

      const token = loginRes.ResultSet.Token;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() < payload.exp * 1000;
    } catch (error) {
      console.error("Error checking if logged in: ", error);
      return false;
    }
  }

  /**
   * Logs in the user and stores the credentials and login response
   * if not already logged in
   * @param email
   * @param password
   */
  async login(email: string, password: string): Promise<LoginRes> {
    // check if already logged in
    const isLogged = await this.isLoggedIn();
    const previous = await storage.getItem<LoginRes>(this.RES_KEY);
    if (previous && isLogged) {
      return previous;
    }

    const res = await fetch(
      "https://app.paypeople.pk/ServiceApi/api/User/Login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // I have no idea what these values are XD
          AccountType: "W",
          agree: false,
          MultilingualId: 1,
          Email: email,
          Pwd: password,
          BrowserInfo: "Chrome",
        }),
      },
    );

    const data = (await res.json()) as LoginRes;
    if (!data.IsSuccess) {
      throw new Error(data.ErrorMessage);
    }

    await storage.setItem<LoginRes>(this.RES_KEY, data);
    await storage.setItem<Credentials>(this.CRED_KEY, { email, password });

    return data;
  }

  async getEmployeeId() {
    const loginRes = await this.ensureLogin();
    return loginRes.ResultSet.EmployeeID;
  }

  async logout() {
    // remove loginRes
    await storage.setItem(this.RES_KEY, null);

    // remove projects cache
    await getTimesheetService().clearProjectCache();

    // remove scheduled timesheet
    await getTimesheetService().clearScheduledTimesheet();

    // clear all caches
    bgQueryClient.clear();
  }

  /**
   * Ensures that the user is logged in and returns the login response
   * If not logged in, it will try to login using the stored credentials
   * If no credentials are stored, it will throw an error
   */
  async ensureLogin() {
    if (!(await this.isLoggedIn())) {
      const credentials = await this.getCredentials();
      console.log(
        "Not logged in, trying to login with stored credentials: ",
        credentials?.email,
      );
      if (!credentials) {
        throw new Error("Not logged in");
      }

      try {
        return this.login(credentials.email, credentials.password);
      } catch (e) {
        // If it fails to login using saved credentials
        await this.logout();
      }
    }

    const loginRes = await storage.getItem<LoginRes>(this.RES_KEY);
    if (!loginRes) {
      throw new Error("Not logged in");
    }

    return loginRes;
  }

  async getToken() {
    const loginRes = await this.ensureLogin();
    return loginRes.ResultSet.Token;
  }

  async getCredentials() {
    return await storage.getItem<Credentials>(this.CRED_KEY);
  }
}

export const [registerAuthService, getAuthService] = defineProxyService(
  "AuthService",
  () => new AuthService(),
);
