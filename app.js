const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const paymentRoutes = require("./routes/payment");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this if your frontend is hosted elsewhere
  })
);

// Set up routes
app.use("/payment", paymentRoutes);

app.post("/payment/notify", (req, res) => {
  console.log("Payment notification received:", req.body);

  // Extract payment details
  const { order_id, status_code, method, amount, currency } = req.body;

  if (status_code === "2") {
    console.log(`Payment Successful for Order ID: ${order_id}`);
    // Update database order status here
  } else {
    console.log(`Payment Failed or Pending for Order ID: ${order_id}`);
  }

  res.sendStatus(200); // Acknowledge receipt
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});