import React, { useState, useEffect } from 'react';

const CATEGORY_MAP = {
  "कुकर": "Cookers",
  "कड़ाही": "Kadhai & Woks",
  "तवा": "Tawa & Pans",
  "डिब्बे": "Storage Boxes",
  "गिलास": "Glassware",
  "क्रॉकरी": "Crockery",
  "कटलरी": "Cutlery",
  "गिफ्ट आईटम": "Gift Items",
  "तोलाई बर्तन (Per KG)": "Utensils by Weight (KG)"
};

const DEFAULT_SCRAP_RATES = {
  "steel": { hi: "स्टेनलेस स्टील (Steel)", en: "Stainless Steel", rate: 50 },
  "aluminum": { hi: "एल्युमिनियम (Aluminum)", en: "Aluminum", rate: 130 },
  "cast_aluminum": { hi: "कच्चा / कास्ट एल्युमिनियम (Cast Aluminum)", en: "Cast Aluminum", rate: 105 },
  "brass": { hi: "पीतल (Brass)", en: "Brass", rate: 430 },
  "copper": { hi: "तांबा (Copper)", en: "Copper", rate: 680 }
};

const TRANSLATIONS = {
  hi: {
    tagline: "करण्डी वालों की बर्तनों की दुकान",
    shopName: "श्री गणेश क्रॉकरी एंड गिफ्ट हाउस",
    gstin: "जीएसटीIN",
    location: "मेन मार्केट, रतिया | मो: 83074-65719, 70159-64832",
    call: "📞 कॉल करें",
    ownerPanel: "🔐 मालिक पैनल",
    searchPlaceholder: "🔍 कुकर, कड़ाही, ब्रांड, डिब्बे सर्च करें...",
    allProducts: "सभी सामान",
    addToOrder: "+ ऑर्डर में जोड़ें",
    itemsSelected: "सामान चुने गए",
    totalAmount: "कुल राशि",
    viewBill: "बिल व QR देखें ➔",
    billSummary: "दुकान का पर्चा (Bill Summary)",
    orderNo: "ऑर्डर नंबर",
    scanToPay: "QR स्कैन करके तुरंत भुगतान करें",
    payViaApp: "GPay / PhonePe से डायरेक्ट पे करें",
    shareWhatsApp: "📲 WhatsApp पर बिल भेजें",
    downloadReceipt: "📥 पक्का बिल डाउनलोड करें (Print/PDF)",
    noItemFound: "इस कैटेगरी या सर्च में कोई सामान नहीं मिला!",
    seeAll: "सभी सामान देखें",
    ownerLoginTitle: "🔐 दुकान मालिक लॉगिन",
    ownerPinDesc: "पिन डालें",
    loginBtn: "लॉगिन करें",
    addNewTab: "+ नया सामान",
    manageTab: "✏️ स्टॉक एडिट",
    settingsTab: "⚙️ UPI व स्क्रैप भाव",
    standeeTab: "🖨️ काउंटर स्टैंडी",
    exchangeBannerTitle: "🔄 पुराने बर्तन लाओ - नया सामान ले जाओ!",
    exchangeBannerSub: "स्टील, एल्युमिनियम, पीतल, तांबे के पुराने बर्तन बाज़ार भाव पर बदलें",
    calculateExchange: "पुराना भाव जोड़ें",
    oldUtensilDeduction: "पुराने बर्तनों की कुल छूट",
    bargainDiscount: "विशेष छूट / लेस (Less)",
    addAnotherScrap: "+ दूसरी धातु जोड़ें",
    serverError: "बिलिंग सर्वर से कनेक्ट नहीं हो सका!"
  },
  en: {
    tagline: "Karandi's Premium Kitchenware Store",
    shopName: "Shri Ganesh Crockery & Gift House",
    gstin: "GSTIN",
    location: "Main Market, Ratia | M: 83074-65719, 70159-64832",
    call: "📞 Call Now",
    ownerPanel: "🔐 Owner Panel",
    searchPlaceholder: "🔍 Search cookers, pans, containers, dinnerware...",
    allProducts: "All Items",
    addToOrder: "+ Add to Order",
    itemsSelected: "items selected",
    totalAmount: "Total Amount",
    viewBill: "View Bill & QR ➔",
    billSummary: "Store Bill & Invoice",
    orderNo: "Order ID",
    scanToPay: "Scan QR Code to Pay Instantly",
    payViaApp: "Pay with UPI (GPay / PhonePe)",
    shareWhatsApp: "📲 Share Bill on WhatsApp",
    downloadReceipt: "📥 Download Invoice Receipt (Print/PDF)",
    noItemFound: "No items found matching your search!",
    seeAll: "View All Items",
    ownerLoginTitle: "🔐 Store Owner Login",
    ownerPinDesc: "Enter secret PIN",
    loginBtn: "Login to Dashboard",
    addNewTab: "+ New Item",
    manageTab: "✏️ Edit Stock",
    settingsTab: "⚙️ UPI & Scrap Rates",
    standeeTab: "🖨️ Counter Standee",
    exchangeBannerTitle: "🔄 Old Utensils Exchange Offer!",
    exchangeBannerSub: "Exchange old Steel, Aluminum, Brass & Copper at daily market rates",
    calculateExchange: "Add Scrap Exchange",
    oldUtensilDeduction: "Old Utensil Scrap Discount",
    bargainDiscount: "Special Less / Bargain Discount",
    addAnotherScrap: "+ Add Another Metal",
    serverError: "Unable to connect to billing server!"
  }
};

const INITIAL_PRODUCTS = [
  {
    id: 1,
    nameHi: "हॉकिन्स क्लासिक प्रेशर कुकर (5 लीटर)",
    nameEn: "Hawkins Classic Pressure Cooker (5L)",
    category: "कुकर",
    company: "Hawkins",
    pricingType: "piece",
    price: 1850,
    mrp: 2150,
    badgeHi: "बेस्टसेलर",
    badgeEn: "Bestseller",
    image: "https://images.unsplash.com/photo-1584990347449-399a9cf3e218?w=500&auto=format&fit=crop&q=80",
    descHi: "वर्जिन एल्युमिनियम बेस, मजबूत और टिकाऊ।",
    descEn: "Virgin aluminum heavy base, safe and durable."
  },
  {
    id: 2,
    nameHi: "ट्राई-प्लाई भारी स्टेनलेस स्टील कड़ाही (26cm)",
    nameEn: "Tri-Ply Stainless Steel Kadhai (26cm)",
    category: "कड़ाही",
    company: "Prestige",
    pricingType: "piece",
    price: 1399,
    mrp: 1799,
    badgeHi: "22% छूट",
    badgeEn: "22% OFF",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80",
    descHi: "3-लेयर स्टील बेस, कूल-टच हैंडल के साथ।",
    descEn: "3-layer heavy steel base with cool-touch handles."
  },
  {
    id: 3,
    nameHi: "शुद्ध भारी पीतल पतीला / भगोना (तोलाई भाव)",
    nameEn: "Pure Heavy Brass Cooking Pot (Sold by Weight)",
    category: "तोलाई बर्तन (Per KG)",
    company: "Heritage Brass",
    pricingType: "weight",
    pricePerKg: 780,
    mrpPerKg: 950,
    defaultWeight: 1.5,
    badgeHi: "वज़न अनुसार",
    badgeEn: "By Weight",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?w=500&auto=format&fit=crop&q=80",
    descHi: "कलई युक्त शुद्ध पीतल, तोलाई के अनुसार बिकने वाला।",
    descEn: "Pure traditional brass vessel, priced per kilogram."
  },
  {
    id: 4,
    nameHi: "स्टेनलेस स्टील भारी डाइनिंग थाली सेट (तोलाई भाव)",
    nameEn: "Heavy Gauge Stainless Steel Thali (By Weight)",
    category: "तोलाई बर्तन (Per KG)",
    company: "Jindal Steel",
    pricingType: "weight",
    pricePerKg: 420,
    mrpPerKg: 490,
    defaultWeight: 2.0,
    badgeHi: "तोलाई भाव",
    badgeEn: "By Weight",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=80",
    descHi: "सदाबहार भारी गेज स्टील, किलो के भाव से।",
    descEn: "Mirror polish heavy gauge steel sold per kilogram."
  },
  {
    id: 5,
    nameHi: "हार्ड एनोडाइज्ड डोसा व रोटी तवा",
    nameEn: "Hard Anodized Heavy Roti Tawa",
    category: "तवा",
    company: "Hawkins",
    pricingType: "piece",
    price: 649,
    mrp: 850,
    badgeHi: "हॉट डील",
    badgeEn: "Hot Deal",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=80",
    descHi: "4.5mm मोटा बेस, गैस स्टोव के लिए उत्तम।",
    descEn: "4.5mm heavy gauge base, compatible with gas stoves."
  },
  {
    id: 6,
    nameHi: "डायमंड कट क्रिस्टल पानी के गिलास (6 पीस)",
    nameEn: "Diamond Cut Crystal Water Glasses (Set of 6)",
    category: "गिलास",
    company: "Ocean",
    pricingType: "piece",
    price: 380,
    mrp: 520,
    badgeHi: "पॉपुलर",
    badgeEn: "Popular",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80",
    descHi: "लेड-फ्री चमकीले प्रीमियम पारदर्शी ग्लास।",
    descEn: "Lead-free crystal clear water and juice tumblers."
  }
];

export default function App() {
  const [lang, setLang] = useState('hi');
  const t = TRANSLATIONS[lang];

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Multiple Scrap Exchange Items Array: [{ metal: 'steel', weight: 1.5 }]
  const [isExchangeActive, setIsExchangeActive] = useState(false);
  const [scrapItems, setScrapItems] = useState([
    { metal: 'steel', weight: '' }
  ]);

  // Bargain Discount (Less ₹)
  const [bargainLessAmount, setBargainLessAmount] = useState('');

  // Daily Scrap Exchange Rates
  const [scrapRates, setScrapRates] = useState(() => {
    const saved = localStorage.getItem('sgc_scrap_rates');
    return saved ? JSON.parse(saved) : DEFAULT_SCRAP_RATES;
  });

  // Admin PIN
  const [savedOwnerPin, setSavedOwnerPin] = useState(() => {
    return localStorage.getItem('sgc_owner_pin') || '1234';
  });
  const [adminPin, setAdminPin] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');

  const [adminTab, setAdminTab] = useState('ADD');
  const [editingProduct, setEditingProduct] = useState(null);

  const [upiSettings, setUpiSettings] = useState({
    upiId: '8307465719@upi',
    merchantName: 'Radhe Shyam'
  });

  const [categoriesList, setCategoriesList] = useState([
    "कुकर", "कड़ाही", "तवा", "डिब्बे", "गिलास", "क्रॉकरी", "कटलरी", "गिफ्ट आईटम", "तोलाई बर्तन (Per KG)"
  ]);

  const [newItem, setNewItem] = useState({
    nameHi: '',
    nameEn: '',
    category: 'कुकर',
    customCategory: '',
    company: '',
    pricingType: 'piece',
    price: '',
    mrp: '',
    pricePerKg: '',
    mrpPerKg: '',
    defaultWeight: 1.0,
    image: '',
    badgeHi: 'नया माल',
    badgeEn: 'New Arrival'
  });
  const [isCustomCatMode, setIsCustomCatMode] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  const apiBase = "https://ganesh-crockery-backend.onrender.com";
  const storeUrl = typeof window !== 'undefined' && window.location.origin.includes('vercel.app')
    ? window.location.origin
    : "https://ganesh-crockery-cmn7ubdt9-crest11.vercel.app";

  useEffect(() => {
    fetch(`${apiBase}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map(item => ({
            ...item,
            pricingType: item.pricingType || 'piece',
            price: item.price || (item.pricePerKg ? item.pricePerKg * (item.defaultWeight || 1) : 0),
            mrp: item.mrp || (item.mrpPerKg ? item.mrpPerKg * (item.defaultWeight || 1) : 0),
            nameHi: item.nameHi || item.name || '',
            nameEn: item.nameEn || item.name || '',
            descHi: item.descHi || item.desc || '',
            descEn: item.descEn || item.desc || '',
            badgeHi: item.badgeHi || item.badge || 'नया',
            badgeEn: item.badgeEn || item.badge || 'New'
          }));
          setProducts(normalized);
          const uniqueCats = [...new Set(data.map(p => p.category))];
          setCategoriesList(prev => [...new Set([...prev, ...uniqueCats])]);
        }
      })
      .catch(err => console.error("Database error:", err));

    fetch(`${apiBase}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          if (data.upiId) setUpiSettings(data);
          if (data.ownerPin) {
            setSavedOwnerPin(data.ownerPin);
            localStorage.setItem('sgc_owner_pin', data.ownerPin);
          }
          if (data.scrapRates) {
            setScrapRates(data.scrapRates);
            localStorage.setItem('sgc_scrap_rates', JSON.stringify(data.scrapRates));
          }
        }
      })
      .catch(err => console.error("Settings error:", err));
  }, []);

  const syncWithBackend = async (updatedProductsList) => {
    try {
      await fetch(`${apiBase}/api/products/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProductsList })
      });
    } catch (err) {
      console.error("Backend sync failed:", err);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('sgc_scrap_rates', JSON.stringify(scrapRates));
      const payload = { ...upiSettings, ownerPin: savedOwnerPin, scrapRates };
      const res = await fetch(`${apiBase}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        alert(lang === 'hi' ? "✓ UPI व आज के स्क्रैप भाव सेव हो गए!" : "✓ UPI and daily scrap rates saved!");
      }
    } catch (err) {
      alert("Settings error!");
    }
  };

  const handleUpdatePin = async (e) => {
    e.preventDefault();
    if (!newPinInput || newPinInput.length < 4) {
      alert(lang === 'hi' ? "पिन कम से कम 4 अंकों का होना चाहिए!" : "PIN must be at least 4 digits!");
      return;
    }
    if (newPinInput !== confirmPinInput) {
      alert(lang === 'hi' ? "दोनों पिन आपस में मेल नहीं खा रहे हैं!" : "PINs do not match!");
      return;
    }
    setSavedOwnerPin(newPinInput);
    localStorage.setItem('sgc_owner_pin', newPinInput);
    try {
      await fetch(`${apiBase}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...upiSettings, ownerPin: newPinInput, scrapRates })
      });
    } catch (err) {
      console.error("PIN sync error:", err);
    }
    setNewPinInput('');
    setConfirmPinInput('');
    alert(lang === 'hi' ? `✓ आपका नया पिन सेट हो गया: ${newPinInput}` : `✓ New PIN set: ${newPinInput}`);
  };

  const toggleLanguage = () => {
    setLang(prev => (prev === 'hi' ? 'en' : 'hi'));
  };

  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const getCatLabel = (cat) => {
    if (lang === 'en') {
      return CATEGORY_MAP[cat] || cat;
    }
    return cat;
  };

  const filteredProducts = products.filter(item => {
    const matchCat = selectedCat === 'All' || item.category === selectedCat;
    const nameToSearch = `${item.nameHi || ''} ${item.nameEn || ''} ${item.company || ''} ${item.category || ''}`.toLowerCase();
    const matchSearch = nameToSearch.includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product, selectedWeight = null) => {
    const isWeightBased = product.pricingType === 'weight';
    const effectiveWeight = selectedWeight || product.defaultWeight || 1.0;
    const unitPrice = isWeightBased ? Math.round(product.pricePerKg * effectiveWeight) : product.price;

    setCart(prev => {
      const exists = prev.find(p => p.id === product.id && p.effectiveWeight === effectiveWeight);
      if (exists) {
        return prev.map(p => (p.id === product.id && p.effectiveWeight === effectiveWeight) ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, effectiveWeight, price: unitPrice, qty: 1 }];
    });
  };

  const updateQty = (id, effectiveWeight, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.effectiveWeight === effectiveWeight) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  // MULTIPLE SCRAP ITEMS HANDLING
  const addScrapRow = () => {
    setScrapItems(prev => [...prev, { metal: 'aluminum', weight: '' }]);
  };

  const updateScrapRow = (index, field, value) => {
    setScrapItems(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row));
  };

  const removeScrapRow = (index) => {
    setScrapItems(prev => prev.filter((_, i) => i !== index));
  };

  // Total Scrap Deduction from All Metals Combined
  const totalScrapDeduction = isExchangeActive
    ? scrapItems.reduce((sum, item) => {
        const w = Number(item.weight) || 0;
        const r = scrapRates[item.metal]?.rate || 0;
        return sum + Math.round(w * r);
      }, 0)
    : 0;

  const bargainLess = Math.max(0, Number(bargainLessAmount) || 0);
  const rawSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalAmount = Math.max(0, rawSubtotal - totalScrapDeduction - bargainLess);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      const scrapBreakdown = isExchangeActive && totalScrapDeduction > 0
        ? scrapItems.filter(s => Number(s.weight) > 0).map(s => `${scrapRates[s.metal]?.hi} (${s.weight} kg @ ₹${scrapRates[s.metal]?.rate}/kg)`).join(', ')
        : null;

      const res = await fetch(`${apiBase}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cart, 
          totalAmount, 
          rawSubtotal,
          totalScrapDeduction,
          bargainLess,
          scrapBreakdown
        })
      });
      const data = await res.json();
      if (data.success) {
        setCheckoutData({
          ...data,
          cartItems: [...cart],
          rawSubtotal,
          totalScrapDeduction,
          bargainLess,
          scrapBreakdown
        });
      }
    } catch (err) {
      alert(t.serverError);
    }
  };

  const shareOnWhatsApp = () => {
    if (!checkoutData) return;
    const itemsSummary = cart.map(i => {
      const displayName = lang === 'hi' ? (i.nameHi || i.nameEn) : (i.nameEn || i.nameHi);
      const weightInfo = i.pricingType === 'weight' ? ` [${i.effectiveWeight} kg @ ₹${i.pricePerKg}/kg]` : '';
      return `• ${displayName}${weightInfo} (x${i.qty}) - ₹${i.price * i.qty}`;
    }).join('%0A');

    const exchangeTxt = totalScrapDeduction > 0 
      ? `%0A----------------------------%0Aपुराने बर्तन एक्सचेंज छूट: -₹${totalScrapDeduction}%0A(${checkoutData.scrapBreakdown || ''})` 
      : '';

    const lessTxt = bargainLess > 0 ? `%0Aदुकान विशेष लेस / छूट: -₹${bargainLess}` : '';

    const heading = lang === 'hi' ? "*श्री गणेश क्रॉकरी एंड गिफ्ट हाउस - पक्का पर्चा*" : "*Shri Ganesh Crockery & Gift House - Invoice*";
    const msg = `${heading}%0A` +
      `ऑर्डर नंबर: ${checkoutData.orderId}%0A` +
      `----------------------------%0A` +
      `${itemsSummary}` +
      `${exchangeTxt}` +
      `${lessTxt}%0A` +
      `----------------------------%0A` +
      `*कुल भुगतान राशि: ₹${checkoutData.totalAmount}*%0A` +
      `दुकान: मेन मार्केट, रतिया | मो: 83074-65719%0A` +
      `धन्यवाद! फिर पधारें 🙏`;

    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  // Instant Print / PDF Download
  const handlePrintReceipt = () => {
    window.print();
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.nameHi) {
      alert("सामान का नाम ज़रूर भरें!");
      return;
    }

    const finalCategory = isCustomCatMode 
      ? (newItem.customCategory.trim() || "अन्य")
      : newItem.category;

    if (!categoriesList.includes(finalCategory)) {
      setCategoriesList(prev => [...prev, finalCategory]);
    }

    const isWeight = newItem.pricingType === 'weight';
    const finalPrice = isWeight ? Number(newItem.pricePerKg) * Number(newItem.defaultWeight || 1) : Number(newItem.price);
    const finalMrp = isWeight ? Number(newItem.mrpPerKg) * Number(newItem.defaultWeight || 1) : (Number(newItem.mrp) || finalPrice + 200);

    const item = {
      id: Date.now(),
      nameHi: newItem.nameHi,
      nameEn: newItem.nameEn || newItem.nameHi,
      category: finalCategory,
      company: newItem.company || "General",
      pricingType: newItem.pricingType,
      price: Math.round(finalPrice),
      mrp: Math.round(finalMrp),
      pricePerKg: isWeight ? Number(newItem.pricePerKg) : null,
      mrpPerKg: isWeight ? Number(newItem.mrpPerKg) : null,
      defaultWeight: isWeight ? Number(newItem.defaultWeight || 1.0) : null,
      badgeHi: isWeight ? "वज़न अनुसार" : (newItem.badgeHi || "नया"),
      badgeEn: isWeight ? "By Weight" : (newItem.badgeEn || "New"),
      image: newItem.image || "https://images.unsplash.com/photo-1584990347449-399a9cf3e218?w=500&auto=format&fit=crop&q=80",
      descHi: isWeight ? `₹${newItem.pricePerKg}/kg के हिसाब से तोलाई का सामान।` : "ताज़ा स्टॉक दुकान पर उपलब्ध है।",
      descEn: isWeight ? `Priced at ₹${newItem.pricePerKg}/kg by weight.` : "Fresh stock available in store."
    };

    const updated = [item, ...products];
    setProducts(updated);
    syncWithBackend(updated);

    setNewItem({ nameHi: '', nameEn: '', category: 'कुकर', customCategory: '', company: '', pricingType: 'piece', price: '', mrp: '', pricePerKg: '', mrpPerKg: '', defaultWeight: 1.0, image: '', badgeHi: 'नया माल', badgeEn: 'New Arrival' });
    setIsCustomCatMode(false);
    alert(t.alertAdded || "सामान सेव हो गया!");
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`क्या आप सच में "${name}" को हटाना चाहते हैं?`)) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      setCart(prev => prev.filter(c => c.id !== id));
      syncWithBackend(updated);
    }
  };

  return (
    <div style={{ backgroundColor: '#F4EFEB', minHeight: '100vh', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#111' }}>
      
      {/* 1. ROYAL BANNER HEADER */}
      <header style={{ 
        background: 'radial-gradient(circle at 50% 20%, #9E1010 0%, #5E0505 85%, #420202 100%)', 
        color: '#FFF', 
        padding: '16px 14px 18px 14px', 
        borderBottom: '4px solid #D4AF37', 
        boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ background: '#D4AF37', color: '#420202', fontSize: '11px', fontWeight: '900', padding: '2px 8px', borderRadius: '4px' }}>
              {lang === 'hi' ? 'शुभ' : 'SHUBH'}
            </span>
            <span style={{ color: '#FDE047', fontSize: '12px', fontWeight: '900' }}>
              {t.gstin}: 06AUSPR2338G1ZI
            </span>
            <span style={{ background: '#D4AF37', color: '#420202', fontSize: '11px', fontWeight: '900', padding: '2px 8px', borderRadius: '4px' }}>
              {lang === 'hi' ? 'लाभ' : 'LABH'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button 
              onClick={toggleLanguage}
              style={{ background: '#D4AF37', border: '2px solid #FFFFFF', color: '#420202', padding: '4px 10px', borderRadius: '14px', fontSize: '11px', cursor: 'pointer', fontWeight: '900' }}
            >
              🌐 {lang === 'hi' ? 'English' : 'हिंदी'}
            </button>

            <button 
              onClick={() => setIsAdminOpen(true)}
              style={{ background: '#000000', border: '1.5px solid #D4AF37', color: '#FDE047', padding: '5px 10px', borderRadius: '12px', fontSize: '11px', cursor: 'pointer', fontWeight: '900' }}
            >
              {t.ownerPanel}
            </button>
            <a 
              href="tel:8307465719"
              style={{ background: '#D4AF37', color: '#420202', padding: '5px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '900', textDecoration: 'none' }}
            >
              {t.call}
            </a>
          </div>
        </div>

        <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ flexShrink: 0 }}>
            <img 
              src="/logo.png" 
              onError={(e) => { e.target.src = '/logo.jpeg'; }} 
              alt="Shri Ganesh Crockery" 
              style={{ 
                width: '74px', 
                height: '74px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                border: '3px solid #D4AF37', 
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.7)',
                backgroundColor: '#FFFFFF',
                display: 'block'
              }} 
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ 
              display: 'inline-block',
              background: 'linear-gradient(180deg, #1E3A8A 0%, #0F172A 100%)',
              color: '#FDE047',
              border: '1.5px solid #FDE047',
              padding: '2px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '900',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
            }}>
              🚩 {t.tagline}
            </div>

            <h1 style={{ 
              margin: '5px 0 2px 0', 
              fontSize: '22px', 
              fontWeight: '900', 
              color: '#FFFFFF', 
              textShadow: '2px 2px 0px #000, 0 0 12px rgba(253, 224, 71, 0.4)',
              lineHeight: '1.2'
            }}>
              {t.shopName}
            </h1>

            <div style={{ fontSize: '11px', color: '#FEF08A', fontWeight: '800', marginTop: '3px' }}>
              📍 {t.location}
            </div>
          </div>
        </div>
      </header>

      {/* 2. OLD UTENSILS EXCHANGE HIGHLIGHT STRIP */}
      <div style={{ maxWidth: '850px', margin: '10px auto 0 auto', padding: '0 16px' }}>
        <div style={{ 
          background: 'linear-gradient(90deg, #FFE8B6 0%, #FFF3D6 100%)', 
          border: '2px solid #D4AF37', 
          borderRadius: '12px', 
          padding: '10px 14px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '900', color: '#6B0808' }}>
              {t.exchangeBannerTitle}
            </div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>
              {t.exchangeBannerSub}
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{ 
              background: '#6B0808', 
              color: '#FFF', 
              border: 'none', 
              padding: '6px 12px', 
              borderRadius: '14px', 
              fontSize: '11px', 
              fontWeight: '900', 
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            ⚖️ {t.calculateExchange}
          </button>
        </div>
      </div>

      {/* 3. SEARCH BAR */}
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '12px 16px 0 16px' }}>
        <input 
          type="text" 
          placeholder={t.searchPlaceholder} 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '2px solid #8F0F0F', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '15px', fontWeight: '600', boxSizing: 'border-box' }}
        />
      </div>

      {/* 4. DYNAMIC CATEGORIES */}
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '12px 16px', display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <button 
          onClick={() => setSelectedCat('All')}
          style={{
            padding: '9px 18px',
            borderRadius: '20px',
            border: '2px solid #6B0808',
            fontSize: '13px',
            fontWeight: '800',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            backgroundColor: selectedCat === 'All' ? '#6B0808' : '#FFFFFF',
            color: selectedCat === 'All' ? '#FFFFFF' : '#6B0808'
          }}
        >
          {t.allProducts} ({products.length})
        </button>
        {categoriesList.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCat(cat)}
            style={{
              padding: '9px 18px',
              borderRadius: '20px',
              border: selectedCat === cat ? '2px solid #6B0808' : '2px solid #B09B88',
              fontSize: '13px',
              fontWeight: '800',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backgroundColor: selectedCat === cat ? '#6B0808' : '#FFFFFF',
              color: selectedCat === cat ? '#FFFFFF' : '#222222'
            }}
          >
            {getCatLabel(cat)}
          </button>
        ))}
      </div>

      {/* 5. PRODUCTS GRID */}
      <main style={{ maxWidth: '850px', margin: '0 auto', padding: '0 16px' }}>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{t.noItemFound}</p>
            <button onClick={() => { setSelectedCat('All'); setSearchQuery(''); }} style={{ background: '#6B0808', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              {t.seeAll}
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '14px' }}>
            {filteredProducts.map(item => {
              const displayName = lang === 'hi' ? (item.nameHi || item.nameEn) : (item.nameEn || item.nameHi);
              const displayDesc = lang === 'hi' ? (item.descHi || item.descEn) : (item.descEn || item.descHi);
              const displayBadge = lang === 'hi' ? (item.badgeHi || item.badgeEn) : (item.badgeEn || item.badgeHi);
              const displayCategory = getCatLabel(item.category);
              const isWeight = item.pricingType === 'weight';

              return (
                <div 
                  key={item.id}
                  style={{ 
                    background: '#FFFFFF', 
                    borderRadius: '14px', 
                    overflow: 'hidden', 
                    boxShadow: '0 3px 12px rgba(0,0,0,0.08)', 
                    border: '2px solid #E6D8C8',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <span style={{ 
                    position: 'absolute', 
                    top: '8px', 
                    left: '8px', 
                    background: isWeight ? '#1E3A8A' : '#6B0808', 
                    color: '#FFF', 
                    fontSize: '11px', 
                    fontWeight: '900', 
                    padding: '3px 9px', 
                    borderRadius: '6px',
                    zIndex: 1
                  }}>
                    {displayBadge}
                  </span>

                  <div>
                    <img 
                      src={item.image} 
                      alt={displayName} 
                      style={{ width: '100%', height: '145px', objectFit: 'cover' }} 
                    />
                    <div style={{ padding: '10px 12px 6px 12px' }}>
                      <div style={{ fontSize: '11px', color: '#6B0808', fontWeight: '900', textTransform: 'uppercase' }}>
                        {item.company} • {displayCategory}
                      </div>
                      <h3 style={{ margin: '4px 0', fontSize: '14px', fontWeight: '800', color: '#000', lineHeight: '1.3' }}>
                        {displayName}
                      </h3>
                      <div style={{ fontSize: '11px', color: '#444', lineHeight: '1.2' }}>{displayDesc}</div>
                    </div>
                  </div>

                  <div style={{ padding: '0 12px 12px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0' }}>
                      {isWeight ? (
                        <div>
                          <span style={{ fontSize: '17px', fontWeight: '900', color: '#6B0808' }}>₹{item.pricePerKg}</span>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#555' }}> / kg</span>
                          <div style={{ fontSize: '11px', color: '#888' }}>
                            अनुमानित: ₹{Math.round(item.pricePerKg * (item.defaultWeight || 1.0))} ({item.defaultWeight || 1.0} kg)
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span style={{ fontSize: '18px', fontWeight: '900', color: '#6B0808' }}>₹{item.price}</span>
                          <span style={{ fontSize: '12px', color: '#777', textDecoration: 'line-through', fontWeight: 'bold', marginLeft: '6px' }}>₹{item.mrp}</span>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      style={{ 
                        width: '100%', 
                        background: '#6B0808', 
                        color: '#FFFFFF', 
                        border: 'none', 
                        padding: '10px', 
                        borderRadius: '8px', 
                        fontWeight: '900', 
                        fontSize: '13px', 
                        cursor: 'pointer' 
                      }}
                    >
                      {t.addToOrder}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 6. FLOATING BOTTOM CART BAR */}
      {cart.length > 0 && (
        <div style={{ 
          position: 'fixed', 
          bottom: '16px', 
          left: '16px', 
          right: '16px', 
          maxWidth: '500px', 
          margin: '0 auto', 
          background: '#6B0808', 
          color: '#FFF', 
          padding: '12px 18px', 
          borderRadius: '30px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          boxShadow: '0 6px 20px rgba(107,8,8,0.5)',
          zIndex: 99
        }}>
          <div>
            <div style={{ fontSize: '11px', opacity: 0.9 }}>{totalItemsCount} {t.itemsSelected}</div>
            <div style={{ fontSize: '18px', fontWeight: '900' }}>
              {t.totalAmount}: ₹{totalAmount} 
              {(totalScrapDeduction > 0 || bargainLess > 0) && (
                <span style={{ fontSize: '11px', color: '#FDE047', marginLeft: '6px' }}>
                  (-₹{totalScrapDeduction + bargainLess})
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{ 
              background: '#D4AF37', 
              color: '#4A0505', 
              border: 'none', 
              padding: '10px 18px', 
              borderRadius: '20px', 
              fontWeight: '900', 
              fontSize: '13px', 
              cursor: 'pointer' 
            }}
          >
            {t.viewBill}
          </button>
        </div>
      )}

      {/* 7. CART & PAYMENT MODAL */}
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '520px', maxHeight: '90vh', borderRadius: '20px 20px 0 0', padding: '20px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#6B0808' }}>{t.billSummary}</h2>
              <button 
                onClick={() => { setIsCartOpen(false); setCheckoutData(null); }} 
                style={{ background: '#222222', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: '900', fontSize: '15px' }}
              >
                ✕
              </button>
            </div>

            {checkoutData ? (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <span style={{ background: '#1B5E20', color: '#FFFFFF', padding: '5px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: '900' }}>
                  {t.orderNo}: {checkoutData.orderId}
                </span>
                <h3 style={{ margin: '14px 0 6px 0', fontSize: '18px', fontWeight: '900' }}>{t.scanToPay}</h3>
                
                <div style={{ padding: '12px', background: '#FFFFFF', display: 'inline-block', borderRadius: '16px', border: '3px solid #6B0808' }}>
                  <img src={checkoutData.qrDataUrl} alt="UPI QR" style={{ width: '220px', height: '220px', display: 'block' }} />
                </div>
                <div style={{ margin: '12px 0', fontSize: '22px', fontWeight: '900', color: '#6B0808' }}>
                  {t.totalAmount}: ₹{checkoutData.totalAmount}
                </div>
                
                <div style={{ background: '#F8F4EC', padding: '8px 12px', borderRadius: '8px', marginBottom: '12px', fontSize: '12px', color: '#444' }}>
                  {lang === 'hi' ? 'खाता धारक' : 'Account Holder'}: <strong>{checkoutData.merchantName}</strong><br />
                  UPI ID: <strong style={{ color: '#6B0808' }}>{checkoutData.upiId}</strong>
                </div>

                <a href={checkoutData.upiUrl} style={{ display: 'block', background: '#1B5E20', color: '#FFF', padding: '13px', borderRadius: '10px', textDecoration: 'none', fontWeight: '900', fontSize: '15px', marginBottom: '8px' }}>
                  {t.payViaApp}
                </a>

                {/* WhatsApp & Print Receipt Buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button 
                    onClick={shareOnWhatsApp}
                    style={{ flex: 1, background: '#25D366', color: '#FFF', padding: '12px 8px', borderRadius: '10px', border: 'none', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}
                  >
                    {t.shareWhatsApp}
                  </button>
                  <button 
                    onClick={handlePrintReceipt}
                    style={{ flex: 1, background: '#1E3A8A', color: '#FFF', padding: '12px 8px', borderRadius: '10px', border: 'none', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}
                  >
                    {t.downloadReceipt}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* ITEMS LIST */}
                {cart.map(item => {
                  const displayName = lang === 'hi' ? (item.nameHi || item.nameEn) : (item.nameEn || item.nameHi);
                  const isWeight = item.pricingType === 'weight';
                  return (
                    <div key={`${item.id}-${item.effectiveWeight}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '2px solid #EEE' }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '14px', color: '#000' }}>{displayName}</div>
                        <div style={{ fontSize: '12px', color: '#6B0808', fontWeight: '900' }}>
                          ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                          {isWeight && <span style={{ color: '#555', fontWeight: 'normal' }}> ({item.effectiveWeight} kg @ ₹{item.pricePerKg}/kg)</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button onClick={() => updateQty(item.id, item.effectiveWeight, -1)} style={{ padding: '6px 12px', background: '#222222', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '900' }}>-</button>
                        <span style={{ fontWeight: '900', fontSize: '15px', color: '#000' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.effectiveWeight, 1)} style={{ padding: '6px 12px', background: '#222222', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '900' }}>+</button>
                      </div>
                    </div>
                  );
                })}

                {/* --- 1. MULTIPLE OLD UTENSILS EXCHANGE ACCORDION --- */}
                <div style={{ margin: '14px 0', padding: '12px', background: '#FFF8E7', borderRadius: '12px', border: '1.5px dashed #D4AF37' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '13px', fontWeight: '900', color: '#6B0808', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={isExchangeActive} 
                        onChange={e => setIsExchangeActive(e.target.checked)} 
                        style={{ width: '16px', height: '16px', accentColor: '#6B0808' }}
                      />
                      🔄 {lang === 'hi' ? 'पुराने बर्तन एक्सचेंज (छूट पाएँ)' : 'Exchange Old Utensils'}
                    </label>
                    {isExchangeActive && totalScrapDeduction > 0 && (
                      <span style={{ fontSize: '13px', fontWeight: '900', color: '#1B5E20' }}>
                        -₹{totalScrapDeduction}
                      </span>
                    )}
                  </div>

                  {isExchangeActive && (
                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #E6D4B0' }}>
                      {scrapItems.map((item, index) => {
                        const r = scrapRates[item.metal]?.rate || 0;
                        const w = Number(item.weight) || 0;
                        const rowDiscount = Math.round(w * r);

                        return (
                          <div key={index} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px dashed #E6D4B0' }}>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <select 
                                value={item.metal} 
                                onChange={e => updateScrapRow(index, 'metal', e.target.value)}
                                style={{ width: '55%', padding: '8px 4px', borderRadius: '6px', border: '1.5px solid #6B0808', fontWeight: 'bold', fontSize: '12px', background: '#FFF' }}
                              >
                                {Object.entries(scrapRates).map(([key, val]) => (
                                  <option key={key} value={key}>
                                    {lang === 'hi' ? val.hi : val.en} (₹{val.rate}/kg)
                                  </option>
                                ))}
                              </select>
                              <input 
                                type="number" 
                                placeholder="वज़न (KG)" 
                                step="0.05"
                                value={item.weight} 
                                onChange={e => updateScrapRow(index, 'weight', e.target.value)}
                                style={{ width: '30%', padding: '8px 6px', borderRadius: '6px', border: '1.5px solid #333', fontWeight: 'bold', fontSize: '12px', boxSizing: 'border-box' }}
                              />
                              {scrapItems.length > 1 && (
                                <button 
                                  onClick={() => removeScrapRow(index)}
                                  style={{ width: '15%', background: '#B91C1C', color: '#FFF', border: 'none', borderRadius: '6px', padding: '8px 0', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                            {w > 0 && (
                              <div style={{ fontSize: '11px', color: '#1B5E20', fontWeight: 'bold', marginTop: '2px', textAlign: 'right' }}>
                                = {w} kg @ ₹{r}/kg = -₹{rowDiscount}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      <button 
                        onClick={addScrapRow}
                        style={{ background: '#6B0808', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '4px' }}
                      >
                        {t.addAnotherScrap}
                      </button>
                    </div>
                  )}
                </div>

                {/* --- 2. BARGAIN DISCOUNT (LESS ₹) --- */}
                <div style={{ margin: '12px 0', padding: '10px 12px', background: '#F0FDF4', borderRadius: '10px', border: '1.5px solid #86EFAC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '900', color: '#166534', display: 'block' }}>
                      💸 {t.bargainDiscount}
                    </label>
                    <span style={{ fontSize: '10px', color: '#15803D' }}>ग्राहक की मान-मनुहार / राउंड ऑफ़ लेस</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#166534' }}>-₹</span>
                    <input 
                      type="number" 
                      placeholder="0"
                      value={bargainLessAmount} 
                      onChange={e => setBargainLessAmount(e.target.value)}
                      style={{ width: '85px', padding: '6px 8px', borderRadius: '6px', border: '1.5px solid #166534', fontWeight: '900', fontSize: '14px', textAlign: 'right', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* BILL TOTALS SUMMARY */}
                <div style={{ background: '#F8F4EC', padding: '12px', borderRadius: '10px', margin: '14px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                    <span>नया सामान कुल:</span>
                    <span>₹{rawSubtotal}</span>
                  </div>
                  {totalScrapDeduction > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1B5E20', fontWeight: 'bold', marginBottom: '4px' }}>
                      <span>{t.oldUtensilDeduction}:</span>
                      <span>-₹{totalScrapDeduction}</span>
                    </div>
                  )}
                  {bargainLess > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#15803D', fontWeight: 'bold', marginBottom: '4px' }}>
                      <span>दुकान विशेष लेस:</span>
                      <span>-₹{bargainLess}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900', color: '#6B0808', borderTop: '1px solid #DDD', paddingTop: '6px' }}>
                    <span>{t.totalAmount}:</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                <button onClick={handleCheckout} style={{ width: '100%', background: '#6B0808', color: '#FFF', padding: '14px', borderRadius: '10px', fontWeight: '900', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
                  {t.viewBill}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. OWNER / ADMIN PANEL */}
      {isAdminOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 110, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px', padding: '24px', position: 'relative', border: '3px solid #6B0808', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            
            <button 
              onClick={() => { setIsAdminOpen(false); setEditingProduct(null); }} 
              style={{ position: 'absolute', top: '14px', right: '14px', background: '#111111', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: '900', fontSize: '15px' }}
            >
              ✕
            </button>
            
            {!isAdminLoggedIn ? (
              <div>
                <h2 style={{ margin: '0 0 10px 0', fontSize: '19px', color: '#6B0808', fontWeight: '900' }}>{t.ownerLoginTitle}</h2>
                <p style={{ fontSize: '13px', color: '#222', margin: '0 0 16px 0', fontWeight: '600' }}>{t.ownerPinDesc}</p>
                <input 
                  type="password" 
                  placeholder="PIN" 
                  value={adminPin} 
                  onChange={e => setAdminPin(e.target.value)} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #333', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '15px', fontWeight: 'bold', marginBottom: '14px', boxSizing: 'border-box' }}
                />
                <button 
                  onClick={() => {
                    if (adminPin === savedOwnerPin) {
                      setIsAdminLoggedIn(true);
                      setAdminPin('');
                    } else {
                      alert("गलत पिन! कृपया सही पिन डालें।");
                    }
                  }}
                  style={{ width: '100%', background: '#6B0808', color: '#FFFFFF', padding: '13px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '15px', cursor: 'pointer' }}
                >
                  {t.loginBtn}
                </button>
              </div>
            ) : editingProduct ? (
              
              /* EDIT ITEM VIEW */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h2 style={{ margin: 0, fontSize: '18px', color: '#6B0808', fontWeight: '900' }}>{t.editItemTitle}</h2>
                  <button onClick={() => setEditingProduct(null)} style={{ background: '#333', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {t.goBack}
                  </button>
                </div>

                <form onSubmit={handleSaveEdit}>
                  <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>सामान का नाम</label>
                  <input 
                    type="text" 
                    value={editingProduct.nameHi || ''} 
                    onChange={e => setEditingProduct({ ...editingProduct, nameHi: e.target.value })} 
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', backgroundColor: '#FFF', color: '#000', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', boxSizing: 'border-box' }}
                    required
                  />

                  {editingProduct.pricingType === 'weight' ? (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                      <div style={{ width: '50%' }}>
                        <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>रेट (₹ / KG)</label>
                        <input 
                          type="number" 
                          value={editingProduct.pricePerKg || ''} 
                          onChange={e => setEditingProduct({ ...editingProduct, pricePerKg: Number(e.target.value), price: Math.round(Number(e.target.value) * (editingProduct.defaultWeight || 1)) })} 
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }}
                          required
                        />
                      </div>
                      <div style={{ width: '50%' }}>
                        <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>वज़न (KG)</label>
                        <input 
                          type="number" 
                          step="0.1"
                          value={editingProduct.defaultWeight || 1.0} 
                          onChange={e => setEditingProduct({ ...editingProduct, defaultWeight: Number(e.target.value), price: Math.round((editingProduct.pricePerKg || 0) * Number(e.target.value)) })} 
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                      <div style={{ width: '50%' }}>
                        <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>बेचने का रेट (₹)</label>
                        <input 
                          type="number" 
                          value={editingProduct.price} 
                          onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })} 
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }}
                          required
                        />
                      </div>
                      <div style={{ width: '50%' }}>
                        <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>MRP (₹)</label>
                        <input 
                          type="number" 
                          value={editingProduct.mrp} 
                          onChange={e => setEditingProduct({ ...editingProduct, mrp: Number(e.target.value) })} 
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }}
                        />
                      </div>
                    </div>
                  )}

                  <button type="submit" style={{ width: '100%', background: '#1B5E20', color: '#FFFFFF', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '15px', cursor: 'pointer' }}>
                    {t.saveChanges}
                  </button>
                </form>
              </div>

            ) : (

              /* MAIN TABS */
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', borderBottom: '2px solid #EEE', paddingBottom: '10px' }}>
                  <button onClick={() => setAdminTab('ADD')} style={{ flex: 1, padding: '8px 2px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'ADD' ? '#6B0808' : '#EEE', color: adminTab === 'ADD' ? '#FFF' : '#333' }}>
                    {t.addNewTab}
                  </button>
                  <button onClick={() => setAdminTab('MANAGE')} style={{ flex: 1, padding: '8px 2px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'MANAGE' ? '#6B0808' : '#EEE', color: adminTab === 'MANAGE' ? '#FFF' : '#333' }}>
                    {t.manageTab}
                  </button>
                  <button onClick={() => setAdminTab('SETTINGS')} style={{ flex: 1, padding: '8px 2px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'SETTINGS' ? '#6B0808' : '#EEE', color: adminTab === 'SETTINGS' ? '#FFF' : '#333' }}>
                    {t.settingsTab}
                  </button>
                  <button onClick={() => setAdminTab('STANDEE')} style={{ flex: 1, padding: '8px 2px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'STANDEE' ? '#6B0808' : '#EEE', color: adminTab === 'STANDEE' ? '#FFF' : '#333' }}>
                    {t.standeeTab}
                  </button>
                </div>

                {/* TAB 1: ADD NEW ITEM */}
                {adminTab === 'ADD' && (
                  <form onSubmit={handleAddItem}>
                    <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>सामान का नाम *</label>
                    <input 
                      type="text" 
                      placeholder="उदा: 5L कुकर या भारी स्टील पतीला" 
                      value={newItem.nameHi} 
                      onChange={e => setNewItem({ ...newItem, nameHi: e.target.value })} 
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333333', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '600', marginBottom: '8px', boxSizing: 'border-box' }}
                      required
                    />

                    {/* PRICING MODE: PIECE VS KG */}
                    <div style={{ marginBottom: '10px', background: '#F8F4EC', padding: '8px', borderRadius: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '900', color: '#6B0808', display: 'block', marginBottom: '4px' }}>बिक्री का तरीक़ा (Selling Type)</label>
                      <div style={{ display: 'flex', gap: '14px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                          <input 
                            type="radio" 
                            name="pricingType" 
                            value="piece" 
                            checked={newItem.pricingType === 'piece'} 
                            onChange={() => setNewItem({ ...newItem, pricingType: 'piece' })}
                          /> प्रति पीस (Per Piece)
                        </label>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                          <input 
                            type="radio" 
                            name="pricingType" 
                            value="weight" 
                            checked={newItem.pricingType === 'weight'} 
                            onChange={() => setNewItem({ ...newItem, pricingType: 'weight', category: 'तोलाई बर्तन (Per KG)' })}
                          /> किलो के हिसाब से (Per KG)
                        </label>
                      </div>
                    </div>

                    {newItem.pricingType === 'piece' ? (
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        <div style={{ width: '50%' }}>
                          <label style={{ fontSize: '12px', fontWeight: '900', color: '#111' }}>बेचने का रेट (₹) *</label>
                          <input type="number" placeholder="1850" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }} required />
                        </div>
                        <div style={{ width: '50%' }}>
                          <label style={{ fontSize: '12px', fontWeight: '900', color: '#111' }}>MRP (₹)</label>
                          <input type="number" placeholder="2150" value={newItem.mrp} onChange={e => setNewItem({ ...newItem, mrp: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }} />
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        <div style={{ width: '33%' }}>
                          <label style={{ fontSize: '11px', fontWeight: '900', color: '#111' }}>रेट / KG (₹) *</label>
                          <input type="number" placeholder="420" value={newItem.pricePerKg} onChange={e => setNewItem({ ...newItem, pricePerKg: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }} required />
                        </div>
                        <div style={{ width: '33%' }}>
                          <label style={{ fontSize: '11px', fontWeight: '900', color: '#111' }}>MRP / KG (₹)</label>
                          <input type="number" placeholder="490" value={newItem.mrpPerKg} onChange={e => setNewItem({ ...newItem, mrpPerKg: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }} />
                        </div>
                        <div style={{ width: '34%' }}>
                          <label style={{ fontSize: '11px', fontWeight: '900', color: '#111' }}>अनुमानित वज़न (KG)</label>
                          <input type="number" step="0.1" placeholder="1.5" value={newItem.defaultWeight} onChange={e => setNewItem({ ...newItem, defaultWeight: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }} />
                        </div>
                      </div>
                    )}

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '900', color: '#111' }}>कैटेगरी</label>
                      <select 
                        value={newItem.category} 
                        onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333333', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '800', boxSizing: 'border-box' }}
                      >
                        {categoriesList.map(c => <option key={c} value={c}>{getCatLabel(c)}</option>)}
                      </select>
                    </div>

                    <div style={{ marginBottom: '14px', background: '#F8F4EC', padding: '10px', borderRadius: '8px', border: '2px dashed #6B0808' }}>
                      <label style={{ fontSize: '12px', fontWeight: '900', color: '#6B0808', display: 'block', marginBottom: '6px' }}>📷 फोटो अपलोड करें</label>
                      <input type="file" accept="image/*" onChange={e => handleImageUpload(e, (data) => setNewItem(prev => ({ ...prev, image: data })))} style={{ fontSize: '12px', width: '100%' }} />
                    </div>

                    <button type="submit" style={{ width: '100%', background: '#1B5E20', color: '#FFFFFF', padding: '13px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '15px', cursor: 'pointer' }}>
                      + दुकान में सेव करें
                    </button>
                  </form>
                )}

                {/* TAB 2: MANAGE */}
                {adminTab === 'MANAGE' && (
                  <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
                    {products.map(item => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #DDD', background: '#FAFAFA', borderRadius: '8px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={item.image} alt={item.nameHi} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CCC' }} />
                          <div>
                            <div style={{ fontWeight: '800', fontSize: '13px', color: '#000' }}>{item.nameHi || item.nameEn}</div>
                            <div style={{ fontSize: '12px', color: '#6B0808', fontWeight: 'bold' }}>
                              {item.pricingType === 'weight' ? `₹${item.pricePerKg}/kg` : `₹${item.price}`}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => setEditingProduct({ ...item })} style={{ background: '#1E3A8A', color: '#FFF', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>✏️</button>
                          <button onClick={() => handleDeleteProduct(item.id, item.nameHi || item.nameEn)} style={{ background: '#B91C1C', color: '#FFF', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>🗑️</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 3: DAILY SCRAP METAL RATES & UPI SETTINGS */}
                {adminTab === 'SETTINGS' && (
                  <div>
                    <form onSubmit={handleSaveSettings} style={{ marginBottom: '20px', borderBottom: '2px dashed #DDD', paddingBottom: '16px' }}>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#6B0808', fontWeight: '900' }}>
                        ⚖️ आज के पुराने बर्तन स्क्रैप भाव (₹ / KG)
                      </h3>
                      <p style={{ fontSize: '11px', color: '#666', margin: '0 0 10px 0' }}>
                        दुकान के आज के एक्सचेंज रेट डालें। ग्राहक पुराने बर्तन का वज़न डालकर बिल में सीधी छूट पाएँगे:
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                        {Object.entries(scrapRates).map(([key, val]) => (
                          <div key={key}>
                            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', display: 'block', marginBottom: '2px' }}>
                              {val.hi.split(' ')[0]} (₹/kg)
                            </label>
                            <input 
                              type="number" 
                              value={val.rate} 
                              onChange={e => setScrapRates({
                                ...scrapRates,
                                [key]: { ...val, rate: Number(e.target.value) }
                              })}
                              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1.5px solid #6B0808', fontWeight: '900', boxSizing: 'border-box' }}
                            />
                          </div>
                        ))}
                      </div>

                      <h3 style={{ margin: '14px 0 6px 0', fontSize: '15px', color: '#6B0808', fontWeight: '900' }}>
                        💳 UPI ID सेटिंग
                      </h3>
                      <input 
                        type="text" 
                        placeholder="8307465719@upi" 
                        value={upiSettings.upiId} 
                        onChange={e => setUpiSettings({ ...upiSettings, upiId: e.target.value })} 
                        style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '2px solid #333', fontWeight: 'bold', marginBottom: '8px', boxSizing: 'border-box' }}
                        required
                      />

                      <button type="submit" style={{ width: '100%', background: '#1B5E20', color: '#FFFFFF', padding: '11px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}>
                        💾 स्क्रैप भाव व UPI सेव करें
                      </button>
                    </form>

                    <form onSubmit={handleUpdatePin}>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B0808', fontWeight: '900' }}>
                        🔑 ओनर पिन बदलें
                      </h3>
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                        <input type="password" placeholder="नया पिन" maxLength={6} value={newPinInput} onChange={e => setNewPinInput(e.target.value)} style={{ width: '50%', padding: '8px', borderRadius: '6px', border: '1.5px solid #333', boxSizing: 'border-box' }} required />
                        <input type="password" placeholder="दोबारा पिन" maxLength={6} value={confirmPinInput} onChange={e => setConfirmPinInput(e.target.value)} style={{ width: '50%', padding: '8px', borderRadius: '6px', border: '1.5px solid #333', boxSizing: 'border-box' }} required />
                      </div>
                      <button type="submit" style={{ width: '100%', background: '#6B0808', color: '#FFFFFF', padding: '9px', borderRadius: '6px', border: 'none', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}>
                        🔒 पिन अपडेट करें
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 4: COUNTER QR STANDEE */}
                {adminTab === 'STANDEE' && (
                  <div style={{ textAlign: 'center' }}>
                    <div id="printable-standee" style={{ 
                      background: 'radial-gradient(circle, #7A0C0C 0%, #4A0505 100%)', 
                      color: '#FFF', 
                      padding: '24px 16px', 
                      borderRadius: '16px', 
                      border: '4px solid #D4AF37', 
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      margin: '10px 0 16px 0'
                    }}>
                      <div style={{ background: '#D4AF37', color: '#4A0505', display: 'inline-block', padding: '3px 12px', borderRadius: '20px', fontWeight: '900', fontSize: '12px', marginBottom: '8px' }}>
                        🚩 करण्डी वालों की बर्तनों की दुकान
                      </div>

                      <h2 style={{ margin: '4px 0 2px 0', fontSize: '20px', fontWeight: '900', color: '#FFF' }}>
                        श्री गणेश क्रॉकरी एंड गिफ्ट हाउस
                      </h2>
                      <div style={{ fontSize: '11px', color: '#FDE047', fontWeight: 'bold', marginBottom: '14px' }}>
                        मेन मार्केट, रतिया | मो: 83074-65719, 93574-04458
                      </div>

                      <div style={{ background: '#FFFFFF', padding: '12px', display: 'inline-block', borderRadius: '14px', border: '3px solid #D4AF37' }}>
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=7A0C0C&data=${encodeURIComponent(storeUrl)}`} 
                          alt="Store QR Code" 
                          style={{ width: '190px', height: '190px', display: 'block' }}
                        />
                      </div>

                      <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: '900', color: '#FDE047' }}>
                        📱 मोबाइल से स्कैन करें और देखें
                      </div>
                      <div style={{ fontSize: '12px', opacity: 0.9 }}>
                        सभी नए बर्तन, ऑफ़र्स व काउंटर ऑर्डर लिस्ट
                      </div>
                    </div>

                    <button 
                      onClick={() => window.print()}
                      style={{ width: '100%', background: '#6B0808', color: '#FFFFFF', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      🖨️ यह पोस्टर प्रिंट करें / PDF सेव करें
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}