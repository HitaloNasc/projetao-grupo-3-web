import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(
    `${new Date().toLocaleTimeString("pt-Br")} ${req.method} ${req.path}`
  );
  next();
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  return res.status(200).json({
    id: "mock-id",
    email,
    name: "João da Silva",
    token: "mock-token",
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
