import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: "https://task-board-app-l3yl.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("TaskBoard Backend is Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
