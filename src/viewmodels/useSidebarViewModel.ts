import { User } from "@/models/User";
import { IAuthService } from "@/services/AuthService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export interface ISidebarViewModel {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  user: User | null;
  logout: () => void;
}

export function useSidebarViewModel(
  authService: IAuthService
): ISidebarViewModel {
  const [selectedPage, setSelectedPageState] = useState("ranking");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialized = useRef(false);

  // Função de set que também atualiza a URL
  const setSelectedPage = (page: string) => {
    setSelectedPageState(page);
    const currentTab = searchParams.get("tab");
    if (currentTab !== page) {
      router.replace(`/dashboard?tab=${page}`);
    }
  };

  // Autenticação (mantém)
  useEffect(() => {
    const loggedUser = authService.getLoggedUser();
    if (!loggedUser) {
      router.push("/");
    } else {
      setUser(loggedUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Leitura do parâmetro da URL (apenas uma vez)
  useEffect(() => {
    if (initialized.current) return;

    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedPageState(tab);
    }

    initialized.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    authService.logout();
    router.push("/");
  };

  return {
    selectedPage,
    setSelectedPage,
    user,
    logout,
  };
}
