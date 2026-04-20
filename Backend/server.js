const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes  = require("./routes/productRoutes");
const cartRoutes  = require("./routes/cartRoutes");
const checkoutRoutes  = require("./routes/checkoutRoutes");
const orderRoutes  = require("./routes/orderRoutes");
const uploadRoutes  = require("./routes/uploadRoutes");
const subscribeRoute  = require("./routes/subscribeRoute");
const adminRoutes  = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");


const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173","https://rabbits-5jpu.vercel.app" ], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 9000;
//connect  to mongodb
connectDB ();

app.get("/",(req,res)=>{
    res.send("WELCOME TO Coder")
});

//API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",checkoutRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api",subscribeRoute);

//Admin routes
app.use("/api/admin/users",adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders",adminOrderRoutes);


app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
 })
