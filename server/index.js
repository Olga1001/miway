const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // імпортуємо cors
const Product = require('./models/Product');
const app = express();

const corsOptions = {
  origin: 'https://www.storage-miway.fun/', // заміни на адресу твого продакшн-фронтенду
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Підключення до MongoDB
mongoose.connect('mongodb+srv://zhuravelolga95:.f2k%40XvuM75Bpth@cluster0.49nku.mongodb.net/miway', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Підключено до MongoDB'))
  .catch((err) => console.log('❌ Помилка MongoDB:', err));

// Middleware для парсингу JSON
app.use(express.json());

// API для додавання/оновлення продуктів
app.post('/api/products', async (req, res) => {
  const products = req.body;

  try {
    const operations = products.map(product => {
      return Product.findOneAndUpdate(
        { id: product.id }, // шукаємо по id
        product, // дані для оновлення
        { upsert: true, new: true } // upsert додає новий продукт, якщо не знайдений
      );
    });

    // Виконуємо всі операції
    await Promise.all(operations);

    res.status(200).json({ message: 'Продукти оновлено або додано' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Виникла помилка при додаванні/оновленні продуктів' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // або інша логіка для отримання продуктів
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Помилка при отриманні продуктів' });
  }
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Сервер запущено на порту ${PORT}`));