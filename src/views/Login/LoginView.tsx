import { ILoginViewModel } from "@/viewmodels/useLoginViewModel";
import { Button, Form } from "react-bootstrap";
import Image from "next/image";
import AchievementAmico from "../../../public/images/achievement-amico.svg";
import Logo from "../../../public/images/logo.svg";
import styles from "./LoginView.module.css";
import Loading from "@/components/ui/Loading";

export function LoginView({
  email,
  password,
  submitButtonDisabled,
  handleLogin,
  handleChange,
  loading,
  error,
}: ILoginViewModel) {
  return (
    <div
      className="d-flex justify-content-around align-items-center m-0"
      style={{ height: "100vh", width: "100%", backgroundColor: "#ffffff" }}
    >
      <div className={styles.ilustrationLeft} style={{ width: "50%" }}>
        <h2
          style={{
            color: "#67943f",
            fontWeight: 800,
            maxWidth: 376,
            textWrap: "wrap",
            textAlign: "center",
          }}
        >
          Líderes na Estrada, Estrelas no Ranking
        </h2>
        <Image src={AchievementAmico} alt="Achievement illustration" />
      </div>
      <div
        className={`${styles.formRight} p-5 text-light d-flex flex-column justify-content-center align-items-center gap-3`}
        style={{ height: "100vh", width: "50%", backgroundColor: "#161637" }}
      >
        <Image src={Logo} alt="Achievement illustration" />

        <h3 className="mb-4">Acesse sua conta</h3>

        <Form
          className={styles.loginForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={handleChange("email")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handleChange("password")}
            />
          </Form.Group>

          <Button
            type="submit"
            onClick={handleLogin}
            disabled={submitButtonDisabled || loading}
            className={styles.submitButton}
          >
            {loading ? <Loading color="light" size="sm" /> : "Entrar"}
          </Button>
        </Form>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </div>
    </div>
  );
}
