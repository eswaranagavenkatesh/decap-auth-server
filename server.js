import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const CLIENT_ID = "Ov23liBqYaexyrRNPYWh";
const CLIENT_SECRET = "c0ccb5893c8afcebd9aea733df5148f67c06cf6e";

app.get("/auth", async (req, res) => {
  const code = req.query.code;
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    }),
  });
  const data = await response.json();
  res.json(data);
});

app.listen(8080, () => {
  console.log("Auth proxy running on port 8080");
});
