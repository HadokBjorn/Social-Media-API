import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routers from "./routers/index.router.js";

const app = express();
dotenv.config();
app.use(json());
app.use(cors());
app.use(routers);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server online in port: ${PORT}`));
