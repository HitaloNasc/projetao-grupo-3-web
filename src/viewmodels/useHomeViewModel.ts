import { User } from "@/models/User";
import { IAuthService } from "@/services/AuthService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface IHomeViewModel {
  user: User | null;
  logout: () => void;
}

export function useHomeViewModel(authService: IAuthService) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedUser = authService.getLoggedUser();
    if (!loggedUser) {
      router.push("/");
    } else {
      setUser(loggedUser);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const logout = () => {
    Cookies.remove("user");
    router.push("/");
  };
  return { user, logout };
}
