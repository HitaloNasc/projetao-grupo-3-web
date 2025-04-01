import { User } from "@/models/User";
import { client } from "@/lib/http/client";

export interface IUserService {
  getAllUsers: () => Promise<User[]>;
  getSelf: (token: string) => Promise<User>;
  // createUser: (userData: UserForm) => Promise<User>;
  firstLogin: (token: string, data: { institutionId: string; institutionName: string }) => Promise<User>;
  deleteUser: (token: string, id: string) => Promise<void>;
}

export class UserService implements IUserService {
  async getAllUsers(): Promise<User[]> {
    const res = await client.get<User[]>("/users");
    return res.data;
  }

  async getSelf(token: string): Promise<User> {
    const res = await client.get<User>("/users/self", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

  // async createUser(userData: UserForm): Promise<User> {
  //   const res = await client.post<User>("/users", userData);
  //   return res.data;
  // }

  async firstLogin(token: string, data: { institutionId: string; institutionName: string }): Promise<User> {
    const res = await client.put<User>("/users/first-login", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

  async deleteUser(token: string, id: string): Promise<void> {
    await client.delete(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}