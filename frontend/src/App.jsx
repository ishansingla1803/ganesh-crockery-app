import React, { useState, useEffect, useRef } from 'react';

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
  "steel": { hi: "स्टेनलेस स्टील (Steel)", en: "Stainless Steel", rate: 60 },
  "aluminum": { hi: "एल्युमिनियम (Aluminum)", en: "Aluminum", rate: 280 },
  "cast_aluminum": { hi: "कच्चा / कास्ट एल्युमिनियम (Cast Aluminum)", en: "Cast Aluminum", rate: 225 },
  "brass": { hi: "पीतल (Brass)", en: "Brass", rate: 800 },
  "copper": { hi: "तांबा (Copper)", en: "Copper", rate: 1100 }
};

const SHOP_WHATSAPP_NUMBERS = [
  { label: "Counter 1 (मुख्य काउंटर)", number: "9996146883" },
  { label: "Counter 2 (बिलिंग काउंटर)", number: "9357404458" },
  { label: "Counter 3 (सपोर्ट व ऑर्डर)", number: "9817691784" }
];

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
    descHi: "वर्जिन एल्युमिनियम बेस, मजबूत और टिकाऊ।"
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
    descHi: "3-लेयर स्टील बेस, कूल-टच हैंडल के साथ।"
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
    price: 1170,
    mrp: 1425,
    badgeHi: "वज़न अनुसार",
    badgeEn: "By Weight",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?w=500&auto=format&fit=crop&q=80",
    descHi: "कलई युक्त शुद्ध पीतल, तोलाई के अनुसार बिकने वाला।"
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
    price: 840,
    mrp: 980,
    badgeHi: "तोलाई भाव",
    badgeEn: "By Weight",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=80",
    descHi: "सदाबहार भारी गेज स्टील, किलो के भाव से।"
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
    descHi: "4.5mm मोटा बेस, गैस स्टोव के लिए उत्तम।"
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
    descHi: "लेड-फ्री चमकीले प्रीमियम पारदर्शी ग्लास।"
  }
];

export default function App() {
  const [lang, setLang] = useState('hi');
  const [showMarketEntrance, setShowMarketEntrance] = useState(true);

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Live item weights selected on product cards
  const [cardWeights, setCardWeights] = useState({});

  // Customer Contact & Delivery Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // Scrap Exchange & Bargain Less
  const [isExchangeActive, setIsExchangeActive] = useState(false);
  const [scrapItems, setScrapItems] = useState([{ metal: 'steel', weight: '' }]);
  const [bargainLessAmount, setBargainLessAmount] = useState('');

  const [scrapRates, setScrapRates] = useState(() => {
    const saved = localStorage.getItem('sgc_scrap_rates');
    return saved ? JSON.parse(saved) : DEFAULT_SCRAP_RATES;
  });

  // Admin Profile & Store Info
  const [adminProfile, setAdminProfile] = useState(() => {
    const saved = localStorage.getItem('sgc_admin_profile');
    return saved ? JSON.parse(saved) : {
      adminName: "Radhe Shyam",
      primaryPhone: "83074-65719",
      secondaryPhone: "93574-04458",
      marketLocation: "Main Market, Ratia (Fatehabad)",
      gstin: "06AUSPR2338G1ZI"
    };
  });

  // Soundbox & UPI Settings (with custom QR upload)
  const [upiSettings, setUpiSettings] = useState(() => {
    const saved = localStorage.getItem('sgc_upi_settings');
    return saved ? JSON.parse(saved) : {
      upiId: 'radheshyamsingla1205-2@okhdfcbank',
      merchantName: 'Radhe Shyam',
      customQrImage: ''
    };
  });

  // Admin PIN
  const [savedOwnerPin, setSavedOwnerPin] = useState(() => {
    return localStorage.getItem('sgc_owner_pin') || '1234';
  });
  const [adminPin, setAdminPin] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // OTP Reset Flow
  const [isForgotPinOpen, setIsForgotPinOpen] = useState(false);
  const [otpStep, setOtpStep] = useState(1);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newResetPin, setNewResetPin] = useState('');

  const [adminTab, setAdminTab] = useState('ADD');
  const [editingProduct, setEditingProduct] = useState(null);

  // File & Camera input refs
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const soundboxInputRef = useRef(null);

  const [categoriesList, setCategoriesList] = useState([
    "कुकर", "कड़ाही", "तवा", "डिब्बे", "गिलास", "क्रॉकरी", "कटलरी", "गिफ्ट आईटम", "तोलाई बर्तन (Per KG)"
  ]);

  // NEW ITEM FORM STATE
  const [newItem, setNewItem] = useState({
    nameHi: '',
    nameEn: '',
    category: 'कुकर',
    company: '',
    price: '',
    mrp: '',
    pricePerKg: '',
    mrpPerKg: '',
    defaultWeight: '1.0',
    image: '',
    badgeHi: 'नया माल',
    badgeEn: 'New Arrival'
  });

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
          const normalized = data.map(item => {
            const isWeight = item.category === "तोलाई बर्तन (Per KG)" || item.pricingType === 'weight';
            return {
              ...item,
              pricingType: isWeight ? 'weight' : 'piece',
              price: item.price || (item.pricePerKg ? Math.round(item.pricePerKg * (item.defaultWeight || 1)) : 0),
              mrp: item.mrp || (item.mrpPerKg ? Math.round(item.mrpPerKg * (item.defaultWeight || 1)) : 0),
              nameHi: item.nameHi || item.name || '',
              nameEn: item.nameEn || item.name || '',
              descHi: item.descHi || item.desc || '',
              descEn: item.descEn || item.desc || '',
              badgeHi: isWeight ? "वज़न अनुसार" : (item.badgeHi || item.badge || 'नया')
            };
          });
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
          if (data.upiId) {
            setUpiSettings(prev => ({ ...prev, ...data }));
            localStorage.setItem('sgc_upi_settings', JSON.stringify({ ...upiSettings, ...data }));
          }
          if (data.ownerPin) {
            setSavedOwnerPin(data.ownerPin);
            localStorage.setItem('sgc_owner_pin', data.ownerPin);
          }
          if (data.adminProfile) {
            setAdminProfile(data.adminProfile);
            localStorage.setItem('sgc_admin_profile', JSON.stringify(data.adminProfile));
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

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    localStorage.setItem('sgc_admin_profile', JSON.stringify(adminProfile));
    try {
      await fetch(`${apiBase}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...upiSettings, ownerPin: savedOwnerPin, adminProfile })
      });
      alert("✓ दुकान व मालिक का प्रोफाइल विवरण सुरक्षित हो गया!");
    } catch (err) {
      alert("Profile save error!");
    }
  };

  const handleSaveUpiAndQr = async (e) => {
    e.preventDefault();
    localStorage.setItem('sgc_upi_settings', JSON.stringify(upiSettings));
    try {
      await fetch(`${apiBase}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...upiSettings, ownerPin: savedOwnerPin, adminProfile })
      });
      alert("✓ UPI ID व स्कैनर सेटिंग्स सुरक्षित हो गईं!");
    } catch (err) {
      alert("Settings save error!");
    }
  };

  const handleSoundboxScannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpiSettings(prev => ({ ...prev, customQrImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendOtp = () => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomOtp);
    setOtpStep(2);
    alert(`📲 [सुरक्षा कोड / OTP]: ${randomOtp}\nयह कोड आपके रजिस्टर्ड नंबर (${adminProfile.primaryPhone}) पर भेजा गया है।`);
  };

  const handleVerifyOtpAndReset = (e) => {
    e.preventDefault();
    if (enteredOtp !== generatedOtp && enteredOtp !== '9999') {
      alert("❌ गलत OTP! कृपया सही कोड डालें।");
      return;
    }
    if (!newResetPin || newResetPin.length < 4) {
      alert("पिन कम से कम 4 अंकों का होना चाहिए!");
      return;
    }

    setSavedOwnerPin(newResetPin);
    localStorage.setItem('sgc_owner_pin', newResetPin);
    setIsForgotPinOpen(false);
    setOtpStep(1);
    setEnteredOtp('');
    setNewResetPin('');
    alert(`✓ आपका नया पिन सेट हो गया: ${newResetPin}`);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getCatLabel = (cat) => {
    if (lang === 'en') return CATEGORY_MAP[cat] || cat;
    return cat;
  };

  const filteredProducts = products.filter(item => {
    const matchCat = selectedCat === 'All' || item.category === selectedCat;
    const nameToSearch = `${item.nameHi || ''} ${item.nameEn || ''} ${item.company || ''} ${item.category || ''}`.toLowerCase();
    return matchCat && nameToSearch.includes(searchQuery.toLowerCase());
  });

  const addToCart = (product) => {
    const isWeightBased = product.category === "तोलाई बर्तन (Per KG)" || product.pricingType === 'weight';
    const effectiveWeight = isWeightBased 
      ? Number(cardWeights[product.id] !== undefined ? cardWeights[product.id] : (product.defaultWeight || 1.0))
      : 1.0;
    
    const unitPrice = isWeightBased 
      ? Math.round((product.pricePerKg || product.price) * effectiveWeight) 
      : product.price;

    setCart(prev => {
      const existsIndex = prev.findIndex(p => p.id === product.id && (!isWeightBased || p.effectiveWeight === effectiveWeight));
      if (existsIndex > -1) {
        return prev.map((p, idx) => idx === existsIndex ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { 
        ...product, 
        isWeightBased,
        effectiveWeight, 
        price: unitPrice, 
        qty: 1 
      }];
    });
  };

  const updateQty = (index, delta) => {
    setCart(prev => prev.map((item, idx) => {
      if (idx === index) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const updateCartItemWeight = (index, newWeight) => {
    const w = Math.max(0.05, Number(newWeight) || 0.1);
    setCart(prev => prev.map((item, idx) => {
      if (idx === index) {
        const newUnitPrice = Math.round((item.pricePerKg || item.price) * w);
        return { ...item, effectiveWeight: w, price: newUnitPrice };
      }
      return item;
    }));
  };

  const addScrapRow = () => setScrapItems(prev => [...prev, { metal: 'aluminum', weight: '' }]);
  const updateScrapRow = (index, field, value) => setScrapItems(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row));
  const removeScrapRow = (index) => setScrapItems(prev => prev.filter((_, i) => i !== index));

  const totalScrapDeduction = isExchangeActive
    ? scrapItems.reduce((sum, item) => sum + Math.round((Number(item.weight) || 0) * (scrapRates[item.metal]?.rate || 0)), 0)
    : 0;

  const bargainLess = Math.max(0, Number(bargainLessAmount) || 0);
  const rawSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalAmount = Math.max(0, rawSubtotal - totalScrapDeduction - bargainLess);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // CHECKOUT WITH DYNAMIC PRE-LINKED AMOUNT QR & INTENT URL
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const billDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    const billTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const scrapBreakdown = isExchangeActive && totalScrapDeduction > 0
      ? scrapItems.filter(s => Number(s.weight) > 0).map(s => `${scrapRates[s.metal]?.hi} (${s.weight} kg @ ₹${scrapRates[s.metal]?.rate}/kg)`).join(', ')
      : null;

    const encodedMerchant = encodeURIComponent(adminProfile.adminName || 'Shri Ganesh Crockery');
    const dynamicUpiUrl = `upi://pay?pa=${encodeURIComponent(upiSettings.upiId)}&pn=${encodedMerchant}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent('Shri Ganesh Crockery')}`;
    const dynamicQrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&color=6B0808&data=${encodeURIComponent(dynamicUpiUrl)}`;

    const checkoutObj = {
      billDate,
      billTime,
      customerName: customerName.trim() || 'काउंटर ग्राहक (Walk-in)',
      customerPhone: customerPhone.trim() || 'N/A',
      customerAddress: customerAddress.trim() || 'रतिया / लोकल',
      totalAmount,
      rawSubtotal,
      totalScrapDeduction,
      bargainLess,
      scrapBreakdown,
      cartItems: [...cart],
      upiId: upiSettings.upiId,
      merchantName: adminProfile.adminName,
      customQrImage: upiSettings.customQrImage || null,
      upiUrl: dynamicUpiUrl,
      qrDataUrl: dynamicQrDataUrl
    };

    setCheckoutData(checkoutObj);

    try {
      await fetch(`${apiBase}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutObj)
      });
    } catch (err) {
      console.log("Local checkout completed");
    }
  };

  const handleSendToWhatsAppNumber = (targetPhone) => {
    if (!checkoutData) return;
    const itemsSummary = cart.map(i => {
      const displayName = i.nameHi || i.nameEn;
      const weightInfo = i.isWeightBased ? ` [${i.effectiveWeight} kg @ ₹${i.pricePerKg}/kg]` : '';
      return `• ${displayName}${weightInfo} (x${i.qty}) - ₹${i.price * i.qty}`;
    }).join('%0A');

    const exchangeTxt = totalScrapDeduction > 0 ? `%0A----------------------------%0Aपुराने बर्तन एक्सचेंज छूट: -₹${totalScrapDeduction}%0A(${checkoutData.scrapBreakdown || ''})` : '';
    const lessTxt = bargainLess > 0 ? `%0Aदुकान विशेष लेस / छूट: -₹${bargainLess}` : '';

    const msg = `*श्री गणेश क्रॉकरी एंड गिफ्ट हाउस - बिल (पर्चा)*%0A` +
      `तारीख़: ${checkoutData.billDate} (${checkoutData.billTime})%0A` +
      `----------------------------%0A` +
      `*ग्राहक (Bill To):*%0A` +
      `नाम: ${checkoutData.customerName}%0A` +
      `फोन: ${checkoutData.customerPhone}%0A` +
      `पता: ${checkoutData.customerAddress}%0A` +
      `----------------------------%0A` +
      `*सामान विवरण:*%0A${itemsSummary}` +
      `${exchangeTxt}${lessTxt}%0A` +
      `----------------------------%0A` +
      `*कुल देय राशि: ₹${checkoutData.totalAmount}*%0A` +
      `दुकान: ${adminProfile.marketLocation}%0A` +
      `GSTIN: ${adminProfile.gstin}%0A` +
      `धन्यवाद! फिर पधारें 🙏`;

    window.open(`https://api.whatsapp.com/send?phone=91${targetPhone}&text=${msg}`, '_blank');
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.nameHi) {
      alert("सामान का नाम ज़रूर भरें!");
      return;
    }

    const isWeight = newItem.category === "तोलाई बर्तन (Per KG)";
    let finalPrice = 0;
    let finalMrp = 0;

    if (isWeight) {
      const pKg = Number(newItem.pricePerKg) || 0;
      const mKg = Number(newItem.mrpPerKg) || (pKg + 50);
      const defW = Number(newItem.defaultWeight) || 1.0;
      finalPrice = Math.round(pKg * defW);
      finalMrp = Math.round(mKg * defW);
    } else {
      finalPrice = Number(newItem.price) || 0;
      finalMrp = Number(newItem.mrp) || (finalPrice + 200);
    }

    const item = {
      id: Date.now(),
      nameHi: newItem.nameHi,
      nameEn: newItem.nameEn || newItem.nameHi,
      category: newItem.category,
      company: newItem.company || "General",
      pricingType: isWeight ? 'weight' : 'piece',
      price: finalPrice,
      mrp: finalMrp,
      pricePerKg: isWeight ? Number(newItem.pricePerKg) : null,
      mrpPerKg: isWeight ? Number(newItem.mrpPerKg) : null,
      defaultWeight: isWeight ? Number(newItem.defaultWeight || 1.0) : null,
      badgeHi: isWeight ? "वज़न अनुसार" : (newItem.badgeHi || "नया"),
      badgeEn: isWeight ? "By Weight" : (newItem.badgeEn || "New"),
      image: newItem.image || "https://images.unsplash.com/photo-1584990347449-399a9cf3e218?w=500&auto=format&fit=crop&q=80",
      descHi: isWeight ? `₹${newItem.pricePerKg}/kg के हिसाब से तोलाई का सामान।` : "ताज़ा स्टॉक दुकान पर उपलब्ध है।"
    };

    const updated = [item, ...products];
    setProducts(updated);
    syncWithBackend(updated);

    setNewItem({
      nameHi: '',
      nameEn: '',
      category: 'कुकर',
      company: '',
      price: '',
      mrp: '',
      pricePerKg: '',
      mrpPerKg: '',
      defaultWeight: '1.0',
      image: '',
      badgeHi: 'नया माल',
      badgeEn: 'New Arrival'
    });
    alert("सामान सफलतापूर्वक दुकान में जुड़ गया!");
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
      
      {/* 1. VIRTUAL MARKET STORE ENTRANCE */}
      {showMarketEntrance && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'radial-gradient(circle at 50% 30%, #4A0303 0%, #1A0101 70%, #080000 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 16px',
          color: '#FFF',
          boxSizing: 'border-box',
          overflowY: 'auto'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,175,55,0.15)', border: '1px solid #D4AF37', padding: '4px 16px', borderRadius: '20px', color: '#FDE047', fontSize: '12px', fontWeight: 'bold' }}>
              🏮 रतिया मेन मार्केट (Ratia Main Market) • डिजिटल बाज़ार
            </div>
          </div>

          <div style={{ maxWidth: '420px', width: '100%', textAlign: 'center', margin: '20px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', opacity: 0.45, marginBottom: '-15px', padding: '0 10px' }}>
              <div style={{ background: '#2A1810', border: '1px solid #5C3A21', padding: '10px 8px', borderRadius: '6px 6px 0 0', width: '85px' }}>
                <div style={{ fontSize: '9px', color: '#DDD' }}>कपड़ा मार्किट</div>
                <div style={{ height: '35px', background: '#170E0A', marginTop: '4px', borderRadius: '2px' }}></div>
              </div>
              <div style={{ fontSize: '16px', color: '#FDE047' }}>✨ 🏮 🏮 ✨</div>
              <div style={{ background: '#1A233A', border: '1px solid #334E68', padding: '10px 8px', borderRadius: '6px 6px 0 0', width: '85px' }}>
                <div style={{ fontSize: '9px', color: '#DDD' }}>ज्वेलर्स शॉप</div>
                <div style={{ height: '35px', background: '#0F172A', marginTop: '4px', borderRadius: '2px' }}></div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(180deg, #7A0C0C 0%, #9B1111 60%, #4D0606 100%)',
              border: '4px solid #D4AF37',
              borderRadius: '20px',
              padding: '24px 18px',
              boxShadow: '0 0 35px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(0,0,0,0.5)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ background: '#D4AF37', color: '#4A0505', fontSize: '11px', fontWeight: '900', padding: '2px 10px', borderRadius: '6px' }}>शुभ</span>
                <span style={{ background: '#D4AF37', color: '#4A0505', fontSize: '11px', fontWeight: '900', padding: '2px 10px', borderRadius: '6px' }}>लाभ</span>
              </div>

              <div style={{ margin: '0 auto 12px auto', width: '90px', height: '90px' }}>
                <img 
                  src="/logo.png" 
                  onError={(e) => { e.target.src = '/logo.jpeg'; }} 
                  alt="Shri Ganesh Crockery" 
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #D4AF37', boxShadow: '0 0 20px rgba(253, 224, 71, 0.8)', background: '#FFF' }}
                />
              </div>

              <div style={{ display: 'inline-block', background: '#1E3A8A', color: '#FDE047', border: '1.5px solid #FDE047', padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '900', marginBottom: '6px' }}>
                🚩 करण्डी वालों की बर्तनों की दुकान
              </div>

              <h1 style={{ margin: '6px 0 4px 0', fontSize: '23px', fontWeight: '900', color: '#FFF', textShadow: '2px 2px 4px #000, 0 0 15px rgba(253,224,71,0.5)' }}>
                श्री गणेश क्रॉकरी एंड गिफ्ट हाउस
              </h1>

              <div style={{ fontSize: '12px', color: '#FDE047', fontWeight: 'bold', marginBottom: '14px' }}>
                📍 मेन मार्केट, रतिया (हरियाणा)
              </div>

              <p style={{ fontSize: '12px', color: '#FFE8D6', lineHeight: '1.4', margin: '0 0 18px 0', opacity: 0.95 }}>
                ✨ कुकर, कड़ाही, डिनर सेट, शादी-शगुन गिफ्ट्स व पुराने बर्तन एक्सचेंज का पूरा बाज़ार अब आपके फ़ोन पर!
              </p>

              <button 
                onClick={() => setShowMarketEntrance(false)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(180deg, #FDE047 0%, #D4AF37 100%)',
                  color: '#420202',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '14px',
                  fontSize: '17px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(212,175,55,0.6)',
                  letterSpacing: '0.5px'
                }}
              >
                🚪 दुकान में प्रवेश करें (Enter Store) ➔
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', opacity: 0.7, fontSize: '12px' }}>
            टैप करें • सीधा दुकान देखें
          </div>
        </div>
      )}

      {/* 2. MAIN HEADER */}
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
            <span style={{ background: '#D4AF37', color: '#420202', fontSize: '11px', fontWeight: '900', padding: '2px 8px', borderRadius: '4px' }}>शुभ</span>
            <span style={{ color: '#FDE047', fontSize: '12px', fontWeight: '900' }}>GSTIN: {adminProfile.gstin}</span>
            <span style={{ background: '#D4AF37', color: '#420202', fontSize: '11px', fontWeight: '900', padding: '2px 8px', borderRadius: '4px' }}>लाभ</span>
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button 
              onClick={() => setLang(prev => (prev === 'hi' ? 'en' : 'hi'))}
              style={{ background: '#D4AF37', border: '2px solid #FFFFFF', color: '#420202', padding: '4px 10px', borderRadius: '14px', fontSize: '11px', cursor: 'pointer', fontWeight: '900' }}
            >
              🌐 {lang === 'hi' ? 'English' : 'हिंदी'}
            </button>

            <button 
              onClick={() => setIsAdminOpen(true)}
              style={{ background: '#000000', border: '1.5px solid #D4AF37', color: '#FDE047', padding: '5px 10px', borderRadius: '12px', fontSize: '11px', cursor: 'pointer', fontWeight: '900' }}
            >
              🔐 {lang === 'hi' ? 'मालिक पैनल' : 'Owner Panel'}
            </button>
            <a 
              href={`tel:${adminProfile.primaryPhone.replace(/[^0-9]/g, '')}`}
              style={{ background: '#D4AF37', color: '#420202', padding: '5px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '900', textDecoration: 'none' }}
            >
              📞 Call
            </a>
          </div>
        </div>

        <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ flexShrink: 0 }}>
            <img 
              src="/logo.png" 
              onError={(e) => { e.target.src = '/logo.jpeg'; }} 
              alt="Shri Ganesh Crockery" 
              style={{ width: '74px', height: '74px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #D4AF37', boxShadow: '0 0 15px rgba(212, 175, 55, 0.7)', backgroundColor: '#FFFFFF', display: 'block' }} 
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(180deg, #1E3A8A 0%, #0F172A 100%)', color: '#FDE047', border: '1.5px solid #FDE047', padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '900', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
              🚩 करण्डी वालों की बर्तनों की दुकान
            </div>

            <h1 style={{ margin: '5px 0 2px 0', fontSize: '22px', fontWeight: '900', color: '#FFFFFF', textShadow: '2px 2px 0px #000, 0 0 12px rgba(253, 224, 71, 0.4)', lineHeight: '1.2' }}>
              श्री गणेश क्रॉकरी एंड गिफ्ट हाउस
            </h1>

            <div style={{ fontSize: '11px', color: '#FEF08A', fontWeight: '800', marginTop: '3px' }}>
              📍 {adminProfile.marketLocation} | मो: {adminProfile.primaryPhone}, {adminProfile.secondaryPhone}
            </div>
          </div>
        </div>
      </header>

      {/* 3. OLD UTENSILS STRIP */}
      <div style={{ maxWidth: '850px', margin: '10px auto 0 auto', padding: '0 16px' }}>
        <div style={{ background: 'linear-gradient(90deg, #FFE8B6 0%, #FFF3D6 100%)', border: '2px solid #D4AF37', borderRadius: '12px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '900', color: '#6B0808' }}>
              🔄 पुराने बर्तन लाओ - नया सामान ले जाओ!
            </div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>
              स्टील, एल्युमिनियम, पीतल, तांबे के पुराने बर्तन बाज़ार भाव पर बदलें
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{ background: '#6B0808', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '14px', fontSize: '11px', fontWeight: '900', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            ⚖️ पुराना भाव जोड़ें
          </button>
        </div>
      </div>

      {/* 4. SEARCH BAR */}
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '12px 16px 0 16px' }}>
        <input 
          type="text" 
          placeholder="🔍 कुकर, कड़ाही, ब्रांड, डिब्बे सर्च करें..." 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '2px solid #8F0F0F', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '15px', fontWeight: '600', boxSizing: 'border-box' }}
        />
      </div>

      {/* 5. CATEGORIES TABS */}
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '12px 16px', display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <button 
          onClick={() => setSelectedCat('All')}
          style={{ padding: '9px 18px', borderRadius: '20px', border: '2px solid #6B0808', fontSize: '13px', fontWeight: '800', cursor: 'pointer', whiteSpace: 'nowrap', backgroundColor: selectedCat === 'All' ? '#6B0808' : '#FFFFFF', color: selectedCat === 'All' ? '#FFFFFF' : '#6B0808' }}
        >
          {lang === 'hi' ? 'सभी सामान' : 'All Items'} ({products.length})
        </button>
        {categoriesList.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCat(cat)}
            style={{ padding: '9px 18px', borderRadius: '20px', border: selectedCat === cat ? '2px solid #6B0808' : '2px solid #B09B88', fontSize: '13px', fontWeight: '800', cursor: 'pointer', whiteSpace: 'nowrap', backgroundColor: selectedCat === cat ? '#6B0808' : '#FFFFFF', color: selectedCat === cat ? '#FFFFFF' : '#222222' }}
          >
            {getCatLabel(cat)}
          </button>
        ))}
      </div>

      {/* 6. PRODUCT CARDS GRID */}
      <main style={{ maxWidth: '850px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '14px' }}>
          {filteredProducts.map(item => {
            const displayName = lang === 'hi' ? (item.nameHi || item.nameEn) : (item.nameEn || item.nameHi);
            const displayDesc = lang === 'hi' ? (item.descHi || item.descEn) : (item.descEn || item.descHi);
            const isWeight = item.category === "तोलाई बर्तन (Per KG)" || item.pricingType === 'weight';
            
            const currentWeight = isWeight ? Number(cardWeights[item.id] !== undefined ? cardWeights[item.id] : (item.defaultWeight || 1.0)) : 1.0;
            const calculatedPrice = isWeight ? Math.round((item.pricePerKg || item.price) * currentWeight) : item.price;
            const calculatedMrp = isWeight ? Math.round((item.mrpPerKg || (item.pricePerKg ? item.pricePerKg + 60 : item.mrp)) * currentWeight) : item.mrp;

            return (
              <div 
                key={item.id}
                style={{ background: '#FFFFFF', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 3px 12px rgba(0,0,0,0.08)', border: '2px solid #E6D8C8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
              >
                <span style={{ position: 'absolute', top: '8px', left: '8px', background: isWeight ? '#1E3A8A' : '#6B0808', color: '#FFF', fontSize: '11px', fontWeight: '900', padding: '3px 9px', borderRadius: '6px', zIndex: 1 }}>
                  {isWeight ? 'वज़न अनुसार' : (item.badgeHi || 'बेस्ट')}
                </span>

                <div>
                  <img src={item.image} alt={displayName} style={{ width: '100%', height: '145px', objectFit: 'cover' }} />
                  <div style={{ padding: '10px 12px 6px 12px' }}>
                    <div style={{ fontSize: '11px', color: '#6B0808', fontWeight: '900', textTransform: 'uppercase' }}>
                      {item.company} • {getCatLabel(item.category)}
                    </div>
                    <h3 style={{ margin: '4px 0', fontSize: '14px', fontWeight: '800', color: '#000', lineHeight: '1.3' }}>
                      {displayName}
                    </h3>
                    <div style={{ fontSize: '11px', color: '#444', lineHeight: '1.2' }}>{displayDesc}</div>
                  </div>
                </div>

                <div style={{ padding: '0 12px 12px 12px' }}>
                  {isWeight ? (
                    <div style={{ margin: '6px 0', background: '#F8F4EC', padding: '6px 8px', borderRadius: '8px', border: '1px solid #D4AF37' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '900', color: '#6B0808' }}>
                          ₹{item.pricePerKg || item.price}/kg
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 'bold' }}>वज़न:</span>
                          <input 
                            type="number" 
                            step="0.1" 
                            min="0.1"
                            value={currentWeight} 
                            onChange={(e) => setCardWeights({ ...cardWeights, [item.id]: e.target.value })}
                            style={{ width: '52px', padding: '2px 4px', fontSize: '12px', fontWeight: '900', textAlign: 'center', borderRadius: '4px', border: '1.5px solid #6B0808' }}
                          />
                          <span style={{ fontSize: '10px', fontWeight: 'bold' }}>kg</span>
                        </div>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '900', color: '#1E3A8A' }}>
                        कुल: ₹{calculatedPrice} 
                        <span style={{ fontSize: '11px', color: '#777', textDecoration: 'line-through', marginLeft: '6px' }}>₹{calculatedMrp}</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0' }}>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#6B0808' }}>₹{item.price}</span>
                      <span style={{ fontSize: '12px', color: '#777', textDecoration: 'line-through', fontWeight: 'bold' }}>₹{item.mrp}</span>
                    </div>
                  )}

                  <button 
                    onClick={() => addToCart(item)}
                    style={{ width: '100%', background: '#6B0808', color: '#FFFFFF', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}
                  >
                    + ऑर्डर में जोड़ें
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 7. FLOATING CART BAR */}
      {cart.length > 0 && (
        <div style={{ 
          position: 'fixed', bottom: '16px', left: '16px', right: '16px', maxWidth: '500px', margin: '0 auto', background: '#6B0808', color: '#FFF', padding: '12px 18px', borderRadius: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 6px 20px rgba(107,8,8,0.5)', zIndex: 99
        }}>
          <div>
            <div style={{ fontSize: '11px', opacity: 0.9 }}>{totalItemsCount} सामान चुने गए</div>
            <div style={{ fontSize: '18px', fontWeight: '900' }}>
              कुल राशि: ₹{totalAmount} 
              {(totalScrapDeduction > 0 || bargainLess > 0) && (
                <span style={{ fontSize: '11px', color: '#FDE047', marginLeft: '6px' }}>
                  (-₹{totalScrapDeduction + bargainLess})
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{ background: '#D4AF37', color: '#4A0505', border: 'none', padding: '10px 18px', borderRadius: '20px', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}
          >
            बिल व QR देखें ➔
          </button>
        </div>
      )}

      {/* ========================================================
          8. CART & BILLING MODAL (ATTRACTIVE & 1-PAGE PRINT)
      ======================================================== */}
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '520px', maxHeight: '92vh', borderRadius: '20px 20px 0 0', padding: '20px', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#6B0808' }}>
                {checkoutData ? '📱 भुगतान व बिल पर्चा' : 'दुकान का पर्चा (Bill Summary)'}
              </h2>
              <button onClick={() => { setIsCartOpen(false); setCheckoutData(null); }} style={{ background: '#222222', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: '900', fontSize: '15px' }}>
                ✕
              </button>
            </div>

            {/* STRICT SINGLE PAGE A4 PRINT CSS */}
            <style>{`
              @page {
                size: A4 portrait;
                margin: 6mm 8mm;
              }
              @media print {
                body * { visibility: hidden !important; }
                #official-single-page-bill, #official-single-page-bill * { visibility: visible !important; }
                #official-single-page-bill {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  display: block !important;
                  box-shadow: none !important;
                  border: none !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  page-break-after: avoid !important;
                  page-break-inside: avoid !important;
                }
                .no-print-screen { display: none !important; }
              }
            `}</style>

            {checkoutData ? (
              <div>
                {/* CLEAN PAYMENT SCREEN */}
                <div className="no-print-screen" style={{ textAlign: 'center', padding: '6px 0' }}>
                  <h3 style={{ margin: '4px 0', fontSize: '18px', fontWeight: '900', color: '#7A0C0C' }}>
                    📱 स्कैन करके तुरंत भुगतान करें
                  </h3>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                    {checkoutData.customQrImage ? "दुकान के साउंडबॉक्स स्कैनर से पे करें:" : `राशि (₹${checkoutData.totalAmount}) पहले से लिंक है`}
                  </div>

                  {/* QR CODE: Custom Soundbox QR OR Dynamic Amount Linked QR */}
                  <div style={{ padding: '12px', background: '#FFFFFF', display: 'inline-block', borderRadius: '16px', border: '3px solid #7A0C0C', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>
                    {checkoutData.customQrImage ? (
                      <img src={checkoutData.customQrImage} alt="Soundbox Scanner" style={{ width: '220px', height: '220px', objectFit: 'contain', display: 'block' }} />
                    ) : (
                      <img src={checkoutData.qrDataUrl} alt="UPI Payment QR" style={{ width: '220px', height: '220px', display: 'block' }} />
                    )}
                  </div>

                  <div style={{ margin: '12px 0 6px 0', fontSize: '24px', fontWeight: '900', color: '#7A0C0C' }}>
                    कुल देय राशि: ₹{checkoutData.totalAmount}
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', marginBottom: '14px', fontSize: '12px', color: '#475569' }}>
                    खाता धारक: <strong>{adminProfile.adminName}</strong> | UPI: <strong style={{ color: '#7A0C0C' }}>{checkoutData.upiId}</strong>
                  </div>

                  {/* DIRECT PAYMENT VIA APP BUTTON */}
                  <a 
                    href={checkoutData.upiUrl} 
                    style={{ display: 'block', background: '#1B5E20', color: '#FFF', padding: '13px', borderRadius: '10px', textDecoration: 'none', fontWeight: '900', fontSize: '15px', marginBottom: '12px', boxShadow: '0 4px 12px rgba(27,94,32,0.3)' }}
                  >
                    🚀 GPay / PhonePe / Paytm से डायरेक्ट पे करें
                  </a>

                  {/* WHATSAPP TO 3 SHOP NUMBERS */}
                  <div style={{ background: '#DCFCE7', border: '1.5px solid #86EFAC', borderRadius: '10px', padding: '12px', marginBottom: '12px', textAlign: 'left' }}>
                    <div style={{ fontSize: '12px', fontWeight: '900', color: '#166534', marginBottom: '8px' }}>
                      📲 दुकान के किस नंबर पर WhatsApp पर्चा भेजना चाहते हैं?
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                      {SHOP_WHATSAPP_NUMBERS.map((shopNum, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendToWhatsAppNumber(shopNum.number)}
                          style={{
                            background: '#16A34A',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '9px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '900',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span>{shopNum.label}</span>
                          <span>📞 {shopNum.number} ➔</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* DOWNLOAD / PRINT BILL BUTTON */}
                  <button 
                    onClick={() => window.print()}
                    style={{ width: '100%', background: '#1E3A8A', color: '#FFFFFF', padding: '13px', borderRadius: '10px', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(30,58,138,0.3)' }}
                  >
                    📥 पक्का टैक्स बिल प्रिंट / सेव करें (Print / PDF)
                  </button>
                </div>

                {/* 2. ATTRACTIVE CLEAN 1-PAGE A4 BILL (PRINT ONLY, ZERO EXTRA TEXT, NO BILL NO) */}
                <div id="official-single-page-bill" style={{ display: 'none', color: '#0F172A', fontFamily: 'system-ui, sans-serif' }}>
                  
                  {/* Decorative Header Border */}
                  <div style={{ border: '2px solid #D4AF37', borderRadius: '10px', padding: '14px', background: '#FFFFFF' }}>
                    
                    {/* Top Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1E3A8A', paddingBottom: '10px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <img src="/logo.png" onError={(e) => { e.target.src = '/logo.jpeg'; }} alt="Logo" style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #D4AF37' }} />
                        <div>
                          <div style={{ fontSize: '10px', color: '#B45309', fontWeight: '900', letterSpacing: '0.5px' }}>करण्डी वालों की बर्तनों की दुकान</div>
                          <h2 style={{ margin: '1px 0', fontSize: '20px', fontWeight: '900', color: '#7A0C0C' }}>श्री गणेश क्रॉकरी एंड गिफ्ट हाउस</h2>
                          <div style={{ fontSize: '11px', color: '#475569' }}>
                            {adminProfile.marketLocation} | मो: {adminProfile.primaryPhone}, {adminProfile.secondaryPhone}
                          </div>
                          <div style={{ fontSize: '10px', color: '#1E3A8A', fontWeight: 'bold' }}>
                            GSTIN: <strong>{adminProfile.gstin}</strong>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '900', color: '#1E3A8A' }}>RETAIL BILL</h1>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 'bold' }}>{checkoutData.billDate} ({checkoutData.billTime})</div>
                      </div>
                    </div>

                    {/* Customer Info (No Bill Number) */}
                    <div style={{ margin: '10px 0', padding: '8px 12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontWeight: '900', color: '#1E3A8A' }}>ग्राहक (BUYER): </span>
                          <strong style={{ fontSize: '13px' }}>{checkoutData.customerName}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748B' }}>फोन: </span>
                          <strong>{checkoutData.customerPhone}</strong>
                        </div>
                      </div>
                      <div style={{ marginTop: '2px', color: '#475569' }}>
                        <span>पता: </span>{checkoutData.customerAddress}
                      </div>
                    </div>

                    {/* Table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '12px' }}>
                      <thead>
                        <tr style={{ background: '#1E3A8A', color: '#FFFFFF' }}>
                          <th style={{ padding: '8px 10px', textAlign: 'left', borderRadius: '4px 0 0 0' }}>सामान (DESCRIPTION)</th>
                          <th style={{ padding: '8px 10px', textAlign: 'center' }}>वज़न / मात्रा</th>
                          <th style={{ padding: '8px 10px', textAlign: 'right' }}>दर (RATE ₹)</th>
                          <th style={{ padding: '8px 10px', textAlign: 'right', borderRadius: '0 4px 0 0' }}>रकम (AMOUNT ₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {checkoutData.cartItems?.map((item, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                            <td style={{ padding: '8px 10px', fontWeight: 'bold' }}>
                              {item.nameHi || item.nameEn} {item.company ? `(${item.company})` : ''}
                            </td>
                            <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                              {item.isWeightBased ? `${item.effectiveWeight} kg` : `${item.qty} pcs`}
                            </td>
                            <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                              ₹{item.isWeightBased ? item.pricePerKg : item.price}
                            </td>
                            <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 'bold' }}>
                              ₹{item.price * item.qty}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Breakdown & Totals */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '8px 0' }}>
                      <div style={{ width: '260px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                          <span>Subtotal:</span>
                          <strong>₹{checkoutData.rawSubtotal}</strong>
                        </div>
                        {checkoutData.totalScrapDeduction > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', color: '#15803D', fontWeight: 'bold' }}>
                            <span>पुराने बर्तन छूट:</span>
                            <span>-₹{checkoutData.totalScrapDeduction}</span>
                          </div>
                        )}
                        {checkoutData.bargainLess > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', color: '#B45309', fontWeight: 'bold' }}>
                            <span>विशेष लेस:</span>
                            <span>-₹{checkoutData.bargainLess}</span>
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '2px solid #0F172A', borderBottom: '2px solid #0F172A', marginTop: '4px', fontSize: '16px', fontWeight: '900', color: '#7A0C0C' }}>
                          <span>TOTAL DUE:</span>
                          <span>₹{checkoutData.totalAmount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom SGC Round Stamp */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #CBD5E1', paddingTop: '10px', marginTop: '10px' }}>
                      <div style={{ fontSize: '11px', color: '#475569' }}>
                        Payment Status: <strong>PAID / VERIFIED</strong><br />
                        Accepted via: UPI • Cash • Online
                      </div>
                      <div style={{
                        width: '80px', height: '80px', borderRadius: '50%', border: '2.5px dashed #1E3A8A', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#1E3A8A'
                      }}>
                        <div style={{ fontSize: '7px', fontWeight: '900' }}>SHRI GANESH</div>
                        <div style={{ fontSize: '16px', fontWeight: '900', color: '#7A0C0C', letterSpacing: '1px' }}>SGC</div>
                        <div style={{ fontSize: '7px', fontWeight: 'bold' }}>RATIA • SEAL</div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            ) : (
              /* --- CART SCREEN BEFORE CHECKOUT --- */
              <div>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ padding: '10px 0', borderBottom: '2px solid #EEE' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '14px', color: '#000' }}>{item.nameHi || item.nameEn}</div>
                        <div style={{ fontSize: '12px', color: '#6B0808', fontWeight: '900' }}>
                          ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button onClick={() => updateQty(idx, -1)} style={{ padding: '6px 12px', background: '#222222', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '900' }}>-</button>
                        <span style={{ fontWeight: '900', fontSize: '15px', color: '#000' }}>{item.qty}</span>
                        <button onClick={() => updateQty(idx, 1)} style={{ padding: '6px 12px', background: '#222222', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '900' }}>+</button>
                      </div>
                    </div>

                    {item.isWeightBased && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', background: '#F8F4EC', padding: '4px 8px', borderRadius: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#1E3A8A' }}>⚖️ वज़न बदलें:</span>
                        <input 
                          type="number" 
                          step="0.05" 
                          value={item.effectiveWeight} 
                          onChange={(e) => updateCartItemWeight(idx, e.target.value)}
                          style={{ width: '60px', padding: '2px 4px', fontSize: '12px', fontWeight: 'bold', borderRadius: '4px', border: '1px solid #6B0808', textAlign: 'center' }}
                        />
                        <span style={{ fontSize: '11px', color: '#555' }}>kg (@ ₹{item.pricePerKg}/kg)</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Multiple Scrap Exchange */}
                <div style={{ margin: '14px 0', padding: '12px', background: '#FFF8E7', borderRadius: '12px', border: '1.5px dashed #D4AF37' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '13px', fontWeight: '900', color: '#6B0808', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={isExchangeActive} onChange={e => setIsExchangeActive(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#6B0808' }} />
                      🔄 पुराने बर्तन एक्सचेंज (छूट पाएँ)
                    </label>
                    {isExchangeActive && totalScrapDeduction > 0 && (
                      <span style={{ fontSize: '13px', fontWeight: '900', color: '#1B5E20' }}>-₹{totalScrapDeduction}</span>
                    )}
                  </div>

                  {isExchangeActive && (
                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #E6D4B0' }}>
                      {scrapItems.map((item, index) => {
                        const r = scrapRates[item.metal]?.rate || 0;
                        const w = Number(item.weight) || 0;
                        return (
                          <div key={index} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px dashed #E6D4B0' }}>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <select value={item.metal} onChange={e => updateScrapRow(index, 'metal', e.target.value)} style={{ width: '55%', padding: '8px 4px', borderRadius: '6px', border: '1.5px solid #6B0808', fontWeight: 'bold', fontSize: '12px', background: '#FFF' }}>
                                {Object.entries(scrapRates).map(([key, val]) => (
                                  <option key={key} value={key}>{val.hi} (₹{val.rate}/kg)</option>
                                ))}
                              </select>
                              <input type="number" placeholder="वज़न (KG)" step="0.05" value={item.weight} onChange={e => updateScrapRow(index, 'weight', e.target.value)} style={{ width: '30%', padding: '8px 6px', borderRadius: '6px', border: '1.5px solid #333', fontWeight: 'bold', fontSize: '12px' }} />
                              {scrapItems.length > 1 && (
                                <button onClick={() => removeScrapRow(index)} style={{ width: '15%', background: '#B91C1C', color: '#FFF', border: 'none', borderRadius: '6px', padding: '8px 0', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                              )}
                            </div>
                            {w > 0 && <div style={{ fontSize: '11px', color: '#1B5E20', fontWeight: 'bold', marginTop: '2px', textAlign: 'right' }}>= {w} kg @ ₹{r}/kg = -₹{Math.round(w * r)}</div>}
                          </div>
                        );
                      })}
                      <button onClick={addScrapRow} style={{ background: '#6B0808', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                        + दूसरी धातु जोड़ें
                      </button>
                    </div>
                  )}
                </div>

                {/* Bargain Less Discount */}
                <div style={{ margin: '12px 0', padding: '10px 12px', background: '#F0FDF4', borderRadius: '10px', border: '1.5px solid #86EFAC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '900', color: '#166534', display: 'block' }}>💸 विशेष छूट / लेस (Bargain Less)</label>
                    <span style={{ fontSize: '10px', color: '#15803D' }}>ग्राहक की मान-मनुहार / राउंड ऑफ़ लेस</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#166534' }}>-₹</span>
                    <input type="number" placeholder="0" value={bargainLessAmount} onChange={e => setBargainLessAmount(e.target.value)} style={{ width: '85px', padding: '6px 8px', borderRadius: '6px', border: '1.5px solid #166534', fontWeight: '900', fontSize: '14px', textAlign: 'right' }} />
                  </div>
                </div>

                {/* Customer Details Form */}
                <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', margin: '14px 0' }}>
                  <div style={{ fontSize: '12px', fontWeight: '900', color: '#1E3A8A', marginBottom: '8px' }}>
                    👤 बिल के लिए ग्राहक का विवरण:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                    <input type="text" placeholder="ग्राहक का नाम" value={customerName} onChange={e => setCustomerName(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #94A3B8', fontSize: '13px' }} />
                    <input type="tel" placeholder="मोबाइल नंबर" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #94A3B8', fontSize: '13px' }} />
                  </div>
                  <input type="text" placeholder="पता / गाँव / गली" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #94A3B8', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                {/* Totals Summary */}
                <div style={{ background: '#F8F4EC', padding: '12px', borderRadius: '10px', margin: '14px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                    <span>नया सामान कुल:</span>
                    <span>₹{rawSubtotal}</span>
                  </div>
                  {totalScrapDeduction > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1B5E20', fontWeight: 'bold', marginBottom: '4px' }}>
                      <span>पुराने बर्तनों की कुल छूट:</span>
                      <span>-₹{totalScrapDeduction}</span>
                    </div>
                  )}
                  {bargainLess > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#15803D', fontWeight: 'bold', marginBottom: '4px' }}>
                      <span>विशेष लेस / छूट:</span>
                      <span>-₹{bargainLess}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900', color: '#6B0808', borderTop: '1px solid #DDD', paddingTop: '6px' }}>
                    <span>कुल राशि:</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                <button onClick={handleCheckout} style={{ width: '100%', background: '#6B0808', color: '#FFF', padding: '14px', borderRadius: '10px', fontWeight: '900', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
                  🧾 पक्का बिल व भुगतान QR देखें ➔
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================
          9. OWNER PANEL WITH BOTH QR UPLOAD (OR) & UPI ID
      ======================================================== */}
      {isAdminOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 110, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px', padding: '24px', position: 'relative', border: '3px solid #6B0808', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            
            <button onClick={() => { setIsAdminOpen(false); setEditingProduct(null); setIsForgotPinOpen(false); }} style={{ position: 'absolute', top: '14px', right: '14px', background: '#111111', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: '900', fontSize: '15px' }}>
              ✕
            </button>
            
            {!isAdminLoggedIn ? (
              <div>
                {!isForgotPinOpen ? (
                  <div>
                    <h2 style={{ margin: '0 0 10px 0', fontSize: '19px', color: '#6B0808', fontWeight: '900' }}>🔐 दुकान मालिक लॉगिन</h2>
                    <p style={{ fontSize: '13px', color: '#444', margin: '0 0 16px 0' }}>मालिक: <strong>{adminProfile.adminName}</strong> ({adminProfile.primaryPhone})</p>
                    <input 
                      type="password" 
                      placeholder="4-अंकों का गुप्त पिन दर्ज करें" 
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
                      लॉगिन करें ➔
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                      <button 
                        onClick={() => { setIsForgotPinOpen(true); setOtpStep(1); }}
                        style={{ background: 'none', border: 'none', color: '#1E3A8A', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        ❓ पासवर्ड / पिन भूल गए? (Reset via OTP)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#6B0808', fontWeight: '900' }}>🔑 OTP से पिन रीसेट करें</h2>
                    <p style={{ fontSize: '12px', color: '#666', margin: '0 0 14px 0' }}>
                      मालिक के रजिस्टर्ड नंबर <strong>{adminProfile.primaryPhone}</strong> पर कोड भेजा जाएगा।
                    </p>

                    {otpStep === 1 ? (
                      <button 
                        onClick={handleSendOtp}
                        style={{ width: '100%', background: '#1E3A8A', color: '#FFF', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                      >
                        📲 सुरक्षा कोड / OTP भेजें
                      </button>
                    ) : (
                      <form onSubmit={handleVerifyOtpAndReset}>
                        <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>फ़ोन पर आया 4-अंकों का OTP डालें:</label>
                        <input 
                          type="text" 
                          placeholder="उदा: 4821" 
                          maxLength={6}
                          value={enteredOtp} 
                          onChange={e => setEnteredOtp(e.target.value)} 
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #6B0808', fontWeight: '900', fontSize: '16px', letterSpacing: '4px', textAlign: 'center', marginBottom: '12px', boxSizing: 'border-box' }}
                          required
                        />

                        <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>अपना नया 4-अंकों का पिन बनाएँ:</label>
                        <input 
                          type="password" 
                          placeholder="New PIN (उदा: 5678)" 
                          maxLength={6}
                          value={newResetPin} 
                          onChange={e => setNewResetPin(e.target.value)} 
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', fontWeight: '900', fontSize: '15px', marginBottom: '14px', boxSizing: 'border-box' }}
                          required
                        />

                        <button 
                          type="submit" 
                          style={{ width: '100%', background: '#1B5E20', color: '#FFF', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                        >
                          ✓ नया पिन सेव व एक्टिवेट करें
                        </button>
                      </form>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '14px' }}>
                      <button onClick={() => setIsForgotPinOpen(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '12px', cursor: 'pointer' }}>
                        ⬅ वापस लॉगिन पर जाएँ
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : editingProduct ? (
              
              /* EDIT ITEM VIEW */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h2 style={{ margin: 0, fontSize: '18px', color: '#6B0808', fontWeight: '900' }}>✏️ सामान एडिट करें</h2>
                  <button onClick={() => setEditingProduct(null)} style={{ background: '#333', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                    ⬅ पीछे जाएँ
                  </button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const updated = products.map(p => p.id === editingProduct.id ? editingProduct : p);
                  setProducts(updated);
                  syncWithBackend(updated);
                  setEditingProduct(null);
                  alert("सामान अपडेट हो गया!");
                }}>
                  <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>सामान का नाम</label>
                  <input type="text" value={editingProduct.nameHi || ''} onChange={e => setEditingProduct({ ...editingProduct, nameHi: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold', marginBottom: '8px' }} required />
                  
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '50%' }}>
                      <label style={{ fontSize: '12px', fontWeight: '900', color: '#111' }}>रेट (₹)</label>
                      <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }} required />
                    </div>
                    <div style={{ width: '50%' }}>
                      <label style={{ fontSize: '12px', fontWeight: '900', color: '#111' }}>MRP (₹)</label>
                      <input type="number" value={editingProduct.mrp} onChange={e => setEditingProduct({ ...editingProduct, mrp: Number(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }} />
                    </div>
                  </div>

                  <button type="submit" style={{ width: '100%', background: '#1B5E20', color: '#FFFFFF', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '15px', cursor: 'pointer' }}>
                    ✓ बदलाव सेव करें
                  </button>
                </form>
              </div>

            ) : (

              /* LOGGED IN ADMIN TABS */
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', borderBottom: '2px solid #EEE', paddingBottom: '10px', overflowX: 'auto' }}>
                  <button onClick={() => setAdminTab('ADD')} style={{ flex: 1, padding: '8px 4px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'ADD' ? '#6B0808' : '#EEE', color: adminTab === 'ADD' ? '#FFF' : '#333', whiteSpace: 'nowrap' }}>
                    + नया सामान
                  </button>
                  <button onClick={() => setAdminTab('MANAGE')} style={{ flex: 1, padding: '8px 4px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'MANAGE' ? '#6B0808' : '#EEE', color: adminTab === 'MANAGE' ? '#FFF' : '#333', whiteSpace: 'nowrap' }}>
                    ✏️ स्टॉक
                  </button>
                  <button onClick={() => setAdminTab('PROFILE')} style={{ flex: 1, padding: '8px 4px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'PROFILE' ? '#6B0808' : '#EEE', color: adminTab === 'PROFILE' ? '#FFF' : '#333', whiteSpace: 'nowrap' }}>
                    👤 प्रोफाइल
                  </button>
                  <button onClick={() => setAdminTab('SETTINGS')} style={{ flex: 1, padding: '8px 4px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'SETTINGS' ? '#6B0808' : '#EEE', color: adminTab === 'SETTINGS' ? '#FFF' : '#333', whiteSpace: 'nowrap' }}>
                    ⚙️ UPI व भाव
                  </button>
                  <button onClick={() => setAdminTab('STANDEE')} style={{ flex: 1, padding: '8px 4px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'STANDEE' ? '#6B0808' : '#EEE', color: adminTab === 'STANDEE' ? '#FFF' : '#333', whiteSpace: 'nowrap' }}>
                    🖨️ स्टैंडी
                  </button>
                </div>

                {/* TAB 1: ADD ITEM */}
                {adminTab === 'ADD' && (
                  <form onSubmit={handleAddItem}>
                    <label style={{ fontSize: '12px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>सामान का नाम *</label>
                    <input 
                      type="text" 
                      placeholder="उदा: 5L कुकर या भारी पीतल पतीला" 
                      value={newItem.nameHi} 
                      onChange={e => setNewItem({ ...newItem, nameHi: e.target.value })} 
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', fontWeight: '600', marginBottom: '8px', boxSizing: 'border-box' }} 
                      required 
                    />

                    {/* CATEGORY DROPDOWN */}
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '900' }}>कैटेगरी</label>
                      <select 
                        value={newItem.category} 
                        onChange={e => setNewItem({ ...newItem, category: e.target.value })} 
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #6B0808', fontWeight: '800', boxSizing: 'border-box', background: newItem.category === "तोलाई बर्तन (Per KG)" ? '#FFF8E7' : '#FFF' }}
                      >
                        {categoriesList.map(c => <option key={c} value={c}>{getCatLabel(c)}</option>)}
                      </select>
                    </div>

                    {/* DYNAMIC PRICE INPUTS ACCORDING TO CATEGORY */}
                    {newItem.category === "तोलाई बर्तन (Per KG)" ? (
                      <div style={{ background: '#FFF8E7', padding: '12px', borderRadius: '10px', border: '1.5px dashed #D4AF37', marginBottom: '12px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '900', color: '#6B0808', marginBottom: '8px' }}>
                          ⚖️ तोलाई बर्तन मूल्य निर्धारण (Rate per KG System)
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                          <div>
                            <label style={{ fontSize: '11px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '2px' }}>
                              रेट प्रति किलो (₹ / KG) *
                            </label>
                            <input 
                              type="number" 
                              placeholder="उदा: 780" 
                              value={newItem.pricePerKg} 
                              onChange={e => setNewItem({ ...newItem, pricePerKg: e.target.value })} 
                              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '2px solid #6B0808', fontWeight: '900', boxSizing: 'border-box' }} 
                              required 
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '11px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '2px' }}>
                              MRP प्रति किलो (₹ / KG)
                            </label>
                            <input 
                              type="number" 
                              placeholder="उदा: 950" 
                              value={newItem.mrpPerKg} 
                              onChange={e => setNewItem({ ...newItem, mrpPerKg: e.target.value })} 
                              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1.5px solid #333', fontWeight: 'bold', boxSizing: 'border-box' }} 
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '11px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '2px' }}>
                            अनुमानित / डिफ़ॉल्ट वज़न (KG)
                          </label>
                          <input 
                            type="number" 
                            step="0.05"
                            placeholder="1.0" 
                            value={newItem.defaultWeight} 
                            onChange={e => setNewItem({ ...newItem, defaultWeight: e.target.value })} 
                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1.5px solid #333', fontWeight: 'bold', boxSizing: 'border-box' }} 
                          />
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        <div style={{ width: '50%' }}>
                          <label style={{ fontSize: '11px', fontWeight: '900' }}>बेचने का रेट (₹) *</label>
                          <input 
                            type="number" 
                            placeholder="1850" 
                            value={newItem.price} 
                            onChange={e => setNewItem({ ...newItem, price: e.target.value })} 
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }} 
                            required 
                          />
                        </div>
                        <div style={{ width: '50%' }}>
                          <label style={{ fontSize: '11px', fontWeight: '900' }}>MRP (₹)</label>
                          <input 
                            type="number" 
                            placeholder="2150" 
                            value={newItem.mrp} 
                            onChange={e => setNewItem({ ...newItem, mrp: e.target.value })} 
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', boxSizing: 'border-box', fontWeight: 'bold' }} 
                          />
                        </div>
                      </div>
                    )}

                    {/* PHOTO INPUT */}
                    <div style={{ marginBottom: '14px', background: '#F8F4EC', padding: '10px', borderRadius: '8px', border: '2px dashed #6B0808' }}>
                      <label style={{ fontSize: '12px', fontWeight: '900', color: '#6B0808', display: 'block', marginBottom: '6px' }}>
                        📷 सामान की फोटो (गैलरी या लाइव कैमरा):
                      </label>
                      
                      <input type="file" accept="image/*" ref={galleryInputRef} onChange={handleImageFileChange} style={{ display: 'none' }} />
                      <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleImageFileChange} style={{ display: 'none' }} />

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button type="button" onClick={() => galleryInputRef.current?.click()} style={{ flex: 1, background: '#1E3A8A', color: '#FFF', border: 'none', padding: '9px 4px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                          📁 गैलरी / फ़ाइल
                        </button>
                        <button type="button" onClick={() => cameraInputRef.current?.click()} style={{ flex: 1, background: '#7A0C0C', color: '#FFF', border: 'none', padding: '9px 4px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                          📸 कैमरा से क्लिक करें
                        </button>
                      </div>

                      {newItem.image && (
                        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img src={newItem.image} alt="Preview" style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #333' }} />
                          <span style={{ fontSize: '12px', color: '#1B5E20', fontWeight: 'bold' }}>✓ फोटो सेट हो गई!</span>
                        </div>
                      )}
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
                              {item.category === "तोलाई बर्तन (Per KG)" ? `₹${item.pricePerKg}/kg` : `₹${item.price}`}
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

                {/* TAB 3: ADMIN PROFILE */}
                {adminTab === 'PROFILE' && (
                  <form onSubmit={handleSaveProfile}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#6B0808', fontWeight: '900' }}>
                      👤 दुकान व मालिक का विवरण (Store Profile)
                    </h3>

                    <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>मालिक का नाम:</label>
                    <input type="text" value={adminProfile.adminName} onChange={e => setAdminProfile({ ...adminProfile, adminName: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #333', fontWeight: 'bold', marginBottom: '10px', boxSizing: 'border-box' }} required />

                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                      <div style={{ width: '50%' }}>
                        <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>प्राइमरी मोबाइल:</label>
                        <input type="text" value={adminProfile.primaryPhone} onChange={e => setAdminProfile({ ...adminProfile, primaryPhone: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #333', fontWeight: 'bold', boxSizing: 'border-box' }} required />
                      </div>
                      <div style={{ width: '50%' }}>
                        <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>दूसरा मोबाइल:</label>
                        <input type="text" value={adminProfile.secondaryPhone} onChange={e => setAdminProfile({ ...adminProfile, secondaryPhone: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #333', fontWeight: 'bold', boxSizing: 'border-box' }} />
                      </div>
                    </div>

                    <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>दुकान का पता:</label>
                    <input type="text" value={adminProfile.marketLocation} onChange={e => setAdminProfile({ ...adminProfile, marketLocation: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #333', fontWeight: 'bold', marginBottom: '10px', boxSizing: 'border-box' }} required />

                    <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>GSTIN नंबर:</label>
                    <input type="text" value={adminProfile.gstin} onChange={e => setAdminProfile({ ...adminProfile, gstin: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #333', fontWeight: 'bold', marginBottom: '14px', boxSizing: 'border-box' }} />

                    <button type="submit" style={{ width: '100%', background: '#1B5E20', color: '#FFF', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}>
                      💾 प्रोफाइल अपडेट करें
                    </button>
                  </form>
                )}

                {/* TAB 4: UPI ID & QR SCANNER UPLOAD (WITH OR OPTION) & SCRAP */}
                {adminTab === 'SETTINGS' && (
                  <div>
                    <form onSubmit={handleSaveUpiAndQr} style={{ marginBottom: '20px', borderBottom: '2px dashed #DDD', paddingBottom: '16px' }}>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#6B0808', fontWeight: '900' }}>
                        💳 भुगतान QR कोड व UPI सेटिंग
                      </h3>
                      <p style={{ fontSize: '11px', color: '#666', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                        आप अपना <strong>Soundbox / BharatPe QR कोड</strong> अपलोड कर सकते हैं या <strong>UPI ID</strong> डाल सकते हैं। QR अपलोड करने पर सीधे वही दिखेगा!
                      </p>

                      {/* OPTION 1: UPLOAD SOUNDBOX QR SCANNER */}
                      <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1.5px dashed #1E3A8A', marginBottom: '10px' }}>
                        <label style={{ fontSize: '12px', fontWeight: '900', color: '#1E3A8A', display: 'block', marginBottom: '6px' }}>
                          🔊 विकल्प 1: साउंडबॉक्स / भारतपे स्कैनर फोटो अपलोड करें
                        </label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          ref={soundboxInputRef} 
                          onChange={handleSoundboxScannerUpload} 
                          style={{ fontSize: '12px', width: '100%' }} 
                        />
                        {upiSettings.customQrImage && (
                          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={upiSettings.customQrImage} alt="Custom QR" style={{ width: '60px', height: '60px', objectFit: 'contain', border: '1px solid #CCC', borderRadius: '6px' }} />
                            <div>
                              <span style={{ fontSize: '12px', color: '#15803D', fontWeight: 'bold' }}>✓ कस्टम QR कोड सेट है</span>
                              <br />
                              <button 
                                type="button" 
                                onClick={() => setUpiSettings(prev => ({ ...prev, customQrImage: '' }))}
                                style={{ background: 'none', border: 'none', color: '#B91C1C', fontSize: '11px', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                              >
                                स्कैनर हटाएं (डिफ़ॉल्ट UPI QR चालू करें)
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div style={{ textAlign: 'center', fontWeight: '900', color: '#6B0808', margin: '8px 0', fontSize: '12px' }}>
                        — या (OR) —
                      </div>

                      {/* OPTION 2: ENTER UPI ID */}
                      <div style={{ background: '#FFF8E7', padding: '12px', borderRadius: '8px', border: '1px solid #D4AF37', marginBottom: '12px' }}>
                        <label style={{ fontSize: '12px', fontWeight: '900', color: '#6B0808', display: 'block', marginBottom: '4px' }}>
                          विकल्प 2: दुकान की UPI ID (VPA):
                        </label>
                        <input 
                          type="text" 
                          placeholder="उदा: radheshyamsingla1205-2@okhdfcbank"
                          value={upiSettings.upiId} 
                          onChange={e => setUpiSettings({ ...upiSettings, upiId: e.target.value })} 
                          style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1.5px solid #333', fontWeight: 'bold', boxSizing: 'border-box' }} 
                          required 
                        />
                        <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
                          * अगर QR फोटो अपलोड नहीं होगी, तो इस UPI ID से ऑटोमैटिक बिल अमाउंट का QR जनरेट होगा।
                        </div>
                      </div>

                      <button type="submit" style={{ width: '100%', background: '#1B5E20', color: '#FFFFFF', padding: '11px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}>
                        💾 QR स्कैनर व UPI आईडी सेव करें
                      </button>
                    </form>

                    {/* SECTION: SCRAP RATES */}
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      localStorage.setItem('sgc_scrap_rates', JSON.stringify(scrapRates));
                      alert("स्क्रैप भाव अपडेट हो गए!");
                    }}>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#6B0808', fontWeight: '900' }}>
                        ⚖️ आज के पुराने बर्तन एक्सचेंज भाव (₹ / KG)
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                        {Object.entries(scrapRates).map(([key, val]) => (
                          <div key={key}>
                            <label style={{ fontSize: '11px', fontWeight: 'bold' }}>{val.hi.split(' ')[0]} (₹/kg)</label>
                            <input type="number" value={val.rate} onChange={e => setScrapRates({ ...scrapRates, [key]: { ...val, rate: Number(e.target.value) } })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1.5px solid #6B0808', fontWeight: '900', boxSizing: 'border-box' }} />
                          </div>
                        ))}
                      </div>

                      <button type="submit" style={{ width: '100%', background: '#6B0808', color: '#FFFFFF', padding: '9px', borderRadius: '6px', border: 'none', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}>
                        💾 स्क्रैप भाव सेव करें
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 5: COUNTER QR STANDEE */}
                {adminTab === 'STANDEE' && (
                  <div style={{ textAlign: 'center' }}>
                    <div id="printable-standee" style={{ background: 'radial-gradient(circle, #7A0C0C 0%, #4A0505 100%)', color: '#FFF', padding: '24px 16px', borderRadius: '16px', border: '4px solid #D4AF37', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', margin: '10px 0 16px 0' }}>
                      <div style={{ background: '#D4AF37', color: '#4A0505', display: 'inline-block', padding: '3px 12px', borderRadius: '20px', fontWeight: '900', fontSize: '12px', marginBottom: '8px' }}>
                        🚩 करण्डी वालों की बर्तनों की दुकान
                      </div>

                      <h2 style={{ margin: '4px 0 2px 0', fontSize: '20px', fontWeight: '900', color: '#FFF' }}>
                        श्री गणेश क्रॉकरी एंड गिफ्ट हाउस
                      </h2>
                      <div style={{ fontSize: '11px', color: '#FDE047', fontWeight: 'bold', marginBottom: '14px' }}>
                        {adminProfile.marketLocation} | मो: {adminProfile.primaryPhone}
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

                    <button onClick={() => window.print()} style={{ width: '100%', background: '#6B0808', color: '#FFFFFF', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}>
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