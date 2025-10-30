import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Fixed admin credentials (use .env for security in production)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "eswaranagavenkatesh@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "12345678";

// ✅ Root route (for quick health check)
app.get("/", (req, res) => {
  res.status(200).send("✅ Custom Decap Auth Server is running successfully");
});

// ✅ Auth route (Decap CMS calls this)
app.post("/auth", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = `auth-token-${Date.now()}`; // Simple token for CMS
    return res.status(200).json({
      token,
      user: { email, role: "admin" },
      message: "✅ Authentication successful",
    });
  }

  return res.status(401).json({ error: "❌ Invalid email or password" });
});

// ✅ Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Custom Decap Auth Server running on port ${PORT}`);
});
