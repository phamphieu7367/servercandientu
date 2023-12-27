const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConnect = require("./config/dbConnect");

const app = express();
const port = 5000;
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Kết nối đến cơ sở dữ liệu MongoDB
dbConnect();

// Sử dụng bodyParser để đọc dữ liệu từ yêu cầu POST
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Định nghĩa mô hình cho dữ liệu
const scaleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ScaleModel = mongoose.model("Scale", scaleSchema);

// Định nghĩa route để lấy dữ liệu từ MongoDB

app.post("/api/data", async (req, res) => {
  try {
    // Lấy tất cả các bản ghi từ cơ sở dữ liệu
    const newData = await ScaleModel.create(req.body);
    res.json(newData);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

app.get("/api/data", async (req, res) => {
  try {
    // Lấy tất cả các bản ghi từ cơ sở dữ liệu
    const data = await ScaleModel.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
