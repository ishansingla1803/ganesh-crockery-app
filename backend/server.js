const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '15mb' }));

const DATA_FILE = path.join(__dirname, 'store_data.json');
const SETTINGS_FILE = path.join(__dirname, 'store_settings.json');

const DEFAULT_SETTINGS = {
  upiId: "8307465719@upi",
  merchantName: "Radhe Shyam",
  shopName: "श्री गणेश क्रॉकरी एंड गिफ्ट हाउस"
};

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Hawkins Classic Pressure Cooker (5 Litre)",
    category: "कुकर",
    company: "Hawkins",
    price: 1850,
    mrp: 2150,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1584990347449-399a9cf3e218?w=500&auto=format&fit=crop&q=80",
    desc: "Virgin aluminum base, food-safe & durable."
  },
  {
    id: 2,
    name: "Tri-Ply Heavy Stainless Steel Kadhai (26cm)",
    category: "कड़ाही",
    company: "Prestige",
    price: 1399,
    mrp: 1799,
    badge: "22% OFF",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80",
    desc: "3-layer base with heat-resistant steel handles."
  },
  {
    id: 3,
    name: "Hard Anodized Heavy Concave Roti Tawa",
    category: "तवा",
    company: "Hawkins",
    price: 649,
    mrp: 850,
    badge: "Hot Deal",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=80",
    desc: "Non-toxic surface, gas stove compatible."
  },
  {
    id: 4,
    name: "Laser Embossed Steel Dabba Set (5 Pieces)",
    category: "डिब्बे",
    company: "Patanjali / Local",
    price: 1150,
    mrp: 1450,
    badge: "Kitchen Pack",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=80",
    desc: "Heavy gauge airtight storage boxes."
  },
  {
    id: 5,
    name: "Diamond Cut Crystal Drinking Glasses (Set of 6)",
    category: "गिलास",
    company: "Ocean",
    price: 380,
    mrp: 520,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80",
    desc: "Lead-free sparkling clear glass tumblers."
  },
  {
    id: 6,
    name: "Royal Ceramic Gold-Rim Cup & Saucer (6 Pcs)",
    category: "क्रॉकरी",
    company: "Clay Craft",
    price: 799,
    mrp: 1050,
    badge: "Gift Special",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&auto=format&fit=crop&q=80",
    desc: "Premium bone-china finish with gold detailing."
  },
  {
    id: 7,
    name: "Cutlery Set with Revolving Stand (24 Pcs)",
    category: "कटलरी",
    company: "King Steel",
    price: 599,
    mrp: 799,
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?w=500&auto=format&fit=crop&q=80",
    desc: "Mirror polish spoons and forks with stand."
  },
  {
    id: 8,
    name: "Embossed Brass Shagun Pooja Thali Combo",
    category: "गिफ्ट आईटम",
    company: "Handicrafts",
    price: 1550,
    mrp: 2100,
    badge: "Wedding Pick",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?w=500&auto=format&fit=crop&q=80",
    desc: "Traditional wedding and return gift brass thali set."
  }
];

function loadSettings() {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
      return DEFAULT_SETTINGS;
    }
    return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
  } catch (err) {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(settings) {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
  } catch (err) {
    console.error("Settings save error:", err);
  }
}

function loadProducts() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_PRODUCTS, null, 2));
      return DEFAULT_PRODUCTS;
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    return DEFAULT_PRODUCTS;
  }
}

function saveProducts(products) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
  } catch (err) {
    console.error("Products save error:", err);
  }
}

app.get('/api/settings', (req, res) => {
  res.json(loadSettings());
});

app.post('/api/settings', (req, res) => {
  const { upiId, merchantName } = req.body;
  const current = loadSettings();
  const updated = {
    ...current,
    upiId: upiId || current.upiId,
    merchantName: merchantName || current.merchantName
  };
  saveSettings(updated);
  res.json({ success: true, settings: updated });
});

app.get('/api/products', (req, res) => {
  res.json(loadProducts());
});

app.post('/api/products/sync', (req, res) => {
  const { products } = req.body;
  if (!Array.isArray(products)) return res.status(400).json({ error: "Invalid product list" });
  saveProducts(products);
  res.json({ success: true, count: products.length });
});

app.post('/api/checkout', async (req, res) => {
  const { items, totalAmount } = req.body;
  if (!items || items.length === 0 || !totalAmount) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const settings = loadSettings();
  const orderId = `ORD-${Date.now().toString().slice(-6)}`;
  
  const upiUrl = `upi://pay?pa=${encodeURIComponent(settings.upiId)}&pn=${encodeURIComponent(settings.merchantName)}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(upiUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#7A0C0C',
        light: '#FFFFFF'
      }
    });

    res.json({
      success: true,
      orderId,
      totalAmount,
      upiId: settings.upiId,
      merchantName: settings.merchantName,
      upiUrl,
      qrDataUrl
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR" });
  }
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Permanent Server running at http://0.0.0.0:${PORT}`);
});