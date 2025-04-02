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

  // Define a página atual e atualiza a URL antes de recarregar
  const setSelectedPage = (page: string) => {
    setSelectedPageState(page);

    const currentTab = searchParams.get("tab");
    if (currentTab !== page) {
      // Atualiza explicitamente a URL antes do reload
      window.history.replaceState({}, "", `/dashboard?tab=${page}`);
      if (page === "ranking") window.location.reload();
    }
  };

  // Verifica se o usuário está logado
  useEffect(() => {
    const loggedUser = authService.getLoggedUser();
    if (!loggedUser) {
      router.push("/");
    } else {
      setUser(loggedUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lê a aba da URL na primeira montagem
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
