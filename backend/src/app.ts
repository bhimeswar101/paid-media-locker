import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import mediaRoutes from "./routes/media.routes";
import purchaseRoutes from "./routes/purchase.routes";
import walletRoutes from "./routes/wallet.routes";
import downloadRoutes from "./routes/download.routes"; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Paid Media Locker API is running 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/download", downloadRoutes);

export default app;
