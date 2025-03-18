import { ILoginViewModel } from "@/viewmodels/useLoginViewModel";
import { Button, Form } from "react-bootstrap";

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
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="container p-5 border rounded bg-secondary text-light"
        style={{ maxWidth: 400 }}
      >
        <h2 className="mb-4">Login</h2>

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
          variant="dark"
          onClick={handleLogin}
          disabled={submitButtonDisabled || loading}
          className="w-100"
        >
          {loading ? "Carregando..." : "Entrar"}
        </Button>

        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </div>
    </div>
  );
}
