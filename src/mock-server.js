import express from "express";
import cors from "cors";

const app = express();

const db = {
  rankings: [
    {
      id: "mock-id-1",
      name: "João da Silva",
      score: 90,
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      indicators: [
        {
          id: "1",
          name: "indicator1",
          value: 10,
        },
        {
          id: "2",
          name: "indicator2",
          value: 20,
        },
        {
          id: "3",
          name: "indicator3",
          value: 30,
        },
        {
          id: "4",
          name: "indicator4",
          value: 30,
        },
      ],
    },
    {
      id: "mock-id-2",
      name: "Maria da Silva",
      score: 80,
      position: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      indicators: [
        {
          id: "1",
          name: "indicator1",
          value: 10,
        },
        {
          id: "2",
          name: "indicator2",
          value: 20,
        },
        {
          id: "3",
          name: "indicator3",
          value: 30,
        },
        {
          id: "4",
          name: "indicator4",
          value: 20,
        },
      ],
    },
    {
      id: "mock-id-3",
      name: "José da Silva",
      score: 70,
      position: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      indicators: [
        {
          id: "1",
          name: "indicator1",
          value: 10,
        },
        {
          id: "2",
          name: "indicator2",
          value: 20,
        },
        {
          id: "3",
          name: "indicator3",
          value: 20,
        },
        {
          id: "4",
          name: "indicator4",
          value: 20,
        },
      ],
    },
    {
      id: "mock-id-4",
      name: "Ana da Silva",
      score: 60,
      position: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      indicators: [
        {
          id: "1",
          name: "indicator1",
          value: 10,
        },
        {
          id: "2",
          name: "indicator2",
          value: 20,
        },
        {
          id: "3",
          name: "indicator3",
          value: 10,
        },
        {
          id: "4",
          name: "indicator4",
          value: 20,
        },
      ],
    },
  ],
  drivers: [
    {
      id: "mock-id-1",
      name: "João da Silva",
      picture: "22",
      cpf: "123.456.789-00",
      email: "joao.silva@email.com",
      phone: "(11) 99999-9999",
      branch: "Recipe/PE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "mock-id-2",
      name: "Maria da Silva",
      picture: "22",
      cpf: "123.456.789-00",
      email: "maira.silva@email.com",
      phone: "(11) 99999-9999",
      branch: "Recipe/PE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "mock-id-3",
      name: "José da Silva",
      picture: "22",
      cpf: "123.456.789-00",
      email: "jose.silva@email.com",
      phone: "(11) 99999-9999",
      branch: "Recipe/PE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "mock-id-4",
      name: "Ana da Silva",
      picture: "22",
      cpf: "123.456.789-00",
      email: "ana.silva@email.com",
      phone: "(11) 99999-9999",
      branch: "Recipe/PE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  indicators: [
    {
      id: "mock-id-1",
      name: "indicator1",
      description: "description1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "mock-id-2",
      name: "indicator2",
      description: "description2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "mock-id-3",
      name: "indicator3",
      description: "description3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "mock-id-4",
      name: "indicator4",
      description: "description4",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

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

app.get("/rankings", (req, res) => {
  return res.status(200).json(db.rankings);
});

app.get("/drivers", (req, res) => {
  return res.status(200).json(db.drivers);
});

app.post("/drivers", (req, res) => {
  const { name, picture, cpf, email, phone, branch } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (!cpf) {
    return res.status(400).json({ error: "CPF is required" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!phone) {
    return res.status(400).json({ error: "Phone is required" });
  }

  if (!branch) {
    return res.status(400).json({ error: "Branch is required" });
  }

  const create = {
    id: "mock-id-" + db.drivers.length + 1,
    name,
    picture,
    cpf,
    email,
    phone,
    branch,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.drivers.push(create);

  return res.status(201).json(create);
});

app.put("/drivers/:id", (req, res) => {
  const { id } = req.params;
  const { name, picture, cpf, email, phone, branch } = req.body;

  const driver = db.drivers.find((driver) => driver.id === id);

  if (!driver) {
    return res.status(404).json({ error: "Driver not found" });
  }

  const update = {
    id: driver.id,
    name: name || driver.name,
    picture: picture || driver.picture,
    cpf: cpf || driver.cpf,
    email: email || driver.email,
    phone: phone || driver.phone,
    branch: branch || driver.branch,
    createdAt: driver.createdAt,
    updatedAt: new Date(),
  };

  db.drivers = db.drivers.map((driver) => {
    if (driver.id === id) return update;
    return driver;
  });

  return res.status(200).json(update);
});

app.delete("/drivers/:id", (req, res) => {
  const { id } = req.params;

  const driver = db.drivers.find((driver) => driver.id === id);

  if (!driver) {
    return res.status(404).json({ error: "Driver not found" });
  }

  db.drivers = db.drivers.filter((driver) => driver.id !== id);

  return res.status(200).send();
});

app.get("/indicators", (req, res) => {
  return res.status(200).json(db.indicators);
});

app.post("/indicators", (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  const create = {
    id: "mock-id-" + db.indicators.length + 1,
    name,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.indicators.push(create);

  return res.status(201).json(create);
});

app.put("/indicators/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const indicator = db.indicators.find((indicator) => indicator.id === id);

  if (!indicator) {
    return res.status(404).json({ error: "Indicator not found" });
  }

  const update = {
    id: indicator.id,
    name: name || indicator.name,
    description: description || indicator.description,
    createdAt: indicator.createdAt,
    updatedAt: new Date(),
  };

  db.indicators = db.indicators.map((indicator) => {
    if (indicator.id === id) return update;
    return indicator;
  });

  return res.status(200).json(update);
});

app.delete("/indicators/:id", (req, res) => {
  const { id } = req.params;

  const indicator = db.indicators.find((indicator) => indicator.id === id);

  if (!indicator) {
    return res.status(404).json({ error: "Indicator not found" });
  }

  db.indicators = db.indicators.filter((indicator) => indicator.id !== id);

  return res.status(200).send();
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
