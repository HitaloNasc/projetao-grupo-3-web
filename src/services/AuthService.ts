import { User } from "@/models/User";
import Cookies from "js-cookie";
import { client } from "@/lib/http/client";

export type ILoginParams = {
  email: string;
  password: string;
};

export interface IAuthService {
  login: ({ email, password }: ILoginParams) => Promise<User>;
  getLoggedUser: () => User | null;
  logout: () => void;
}

export class AuthService {
  async login({ email, password }: ILoginParams): Promise<User> {
    try {
      const res = await client.post<{ token: string; user: User }>(
        "/auth/login",
        { email, password }
      );
      const user = res.data;

      Cookies.set("user", JSON.stringify(user), { expires: 1 });

      return {
        ...user.user,
        token: user.token,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro de autenticação";
      throw new Error(message);
    }
  }

  getLoggedUser(): User | null {
    const storedUser = Cookies.get("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }

  logout() {
    Cookies.remove("user");
  }
}
