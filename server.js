import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Set your fixed CMS login credentials here
const ADMIN_EMAIL = "eswaranagavenkatesh@gmail.com";
const ADMIN_PASSWORD = "12345678";

// ✅ Root endpoint for testing
app.get("/", (req, res) => {
  res.send("✅ Custom Decap Auth Server is running");
});

// ✅ Login endpoint (replace GitHub OAuth)
app.post("/auth", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // You can generate a real JWT here if needed
    const fakeToken = "custom-auth-token-12345";
    return res.json({
      token: fakeToken,
      user: { email },
      status: "success",
    });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Custom Decap Auth Server running on port ${PORT}`);
});
