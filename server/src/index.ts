import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from the Vinted Clone API!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
