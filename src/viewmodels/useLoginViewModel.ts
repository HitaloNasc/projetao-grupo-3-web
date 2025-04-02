import { ChangeEvent, useState } from "react";
import { IAuthService } from "@/services/AuthService";
import { User } from "@/models/User";
import { useRouter } from "next/navigation";

export interface ILoginViewModel {
  email: string;
  password: string;
  submitButtonDisabled: boolean;
  loading: boolean;
  error: string;
  user: User | null;
  handleChange: (field: string) => (event: any) => void;
  handleLogin: () => Promise<void>;
}

export function useLoginViewModel(authService: IAuthService) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const handleChange =
    (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (field === "email") {
        setEmail(value);
        setSubmitButtonDisabled(!value || !password);
      }
      if (field === "password") {
        setPassword(value);
        setSubmitButtonDisabled(!value || !email);
      }
    };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const loggedUser = await authService.login({ email, password });
      setUser(loggedUser);
      if (loggedUser?.role === "admin") router.replace("/dashboard");
      if (loggedUser?.role === "user") router.replace("/dashboard-drivers");
    } catch (err: any) {
      setError(err.message || "Erro no login.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    submitButtonDisabled,
    loading,
    error,
    user,
    handleChange,
    handleLogin,
  };
}
