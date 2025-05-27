const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Shopify Proxy Endpoint
app.post("/api/shopify", async (req, res) => {
  try {
    const { query, variables } = req.body;

    const response = await axios.post(
      "https://kgnknc-fi.myshopify.com/admin/api/2025-04/graphql.json",
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": "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",
        },
      }
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({
      error: error.message,
      ...(error.response && {
        status: error.response.status,
        data: error.response.data,
      }),
    });
  }
});

// Serve static files (your HTML)
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
