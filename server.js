import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Replace with your actual admin credentials (use .env in production)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "eswaranagavenkatesh@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "12345678";

// ✅ Health check route
app.get("/", (req, res) => {
  res.status(200).send("✅ Custom Decap Auth Server is running successfully");
});

// ✅ Login route (Decap CMS expects this endpoint)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = `auth-token-${Date.now()}`; // simple token
    return res.status(200).json({
      token,
      user: {
        email,
        name: "Admin User",
        role: "admin",
      },
      message: "✅ Authentication successful",
    });
  }

  return res.status(401).json({ error: "❌ Invalid email or password" });
});

// ✅ Logout route (optional but recommended)
app.post("/logout", (req, res) => {
  res.status(200).json({ message: "✅ Logged out successfully" });
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
