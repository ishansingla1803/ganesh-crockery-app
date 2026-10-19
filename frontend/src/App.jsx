import React, { useState, useEffect } from 'react';

const CATEGORY_MAP = {
  "कुकर": "Cookers",
  "कड़ाही": "Kadhai & Woks",
  "तवा": "Tawa & Pans",
  "डिब्बे": "Storage Boxes",
  "गिलास": "Glassware",
  "क्रॉकरी": "Crockery",
  "कटलरी": "Cutlery",
  "गिफ्ट आईटम": "Gift Items"
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
    noItemFound: "इस कैटेगरी या सर्च में कोई सामान नहीं मिला!",
    seeAll: "सभी सामान देखें",
    ownerLoginTitle: "🔐 दुकान मालिक लॉगिन",
    ownerPinDesc: "पिन डालें",
    loginBtn: "लॉगिन करें",
    addNewTab: "+ नया सामान",
    manageTab: "✏️ स्टॉक एडिट",
    settingsTab: "⚙️ UPI व पासवर्ड",
    standeeTab: "🖨️ काउंटर स्टैंडी",
    itemName: "सामान का नाम *",
    brand: "कंपनी / ब्रांड",
    category: "कैटेगरी",
    chooseFromList: "📋 लिस्ट से चुनें",
    typeNewCategory: "✍️ नई कैटेगरी टाइप करें",
    newCategoryPlaceholder: "नई कैटेगरी लिखें...",
    sellingPrice: "बेचने का रेट (₹) *",
    mrp: "MRP (₹)",
    uploadPhoto: "📷 फोटो अपलोड करें",
    photoReady: "✓ फोटो तैयार है!",
    saveToStore: "+ दुकान में सेव करें",
    editItemTitle: "✏️ सामान एडिट करें",
    goBack: "⬅ पीछे जाएँ",
    saveChanges: "✓ बदलाव सेव करें",
    alertNamePrice: "कृपया सामान का नाम और रेट ज़रूर भरें!",
    alertAdded: "सामान सफलतापूर्वक डेटाबेस में सेव हो गया!",
    alertWrongPin: "गलत पिन! कृपया सही पिन डालें।",
    alertDeleted: "सामान हटा दिया गया!",
    alertConfirmDelete: "क्या आप सच में इस सामान को हटाना चाहते हैं?",
    alertUpdated: "सामान अपडेट हो गया!",
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
    noItemFound: "No items found matching your search!",
    seeAll: "View All Items",
    ownerLoginTitle: "🔐 Store Owner Login",
    ownerPinDesc: "Enter secret PIN",
    loginBtn: "Login to Dashboard",
    addNewTab: "+ New Item",
    manageTab: "✏️ Edit Stock",
    settingsTab: "⚙️ UPI & Security",
    standeeTab: "🖨️ Counter Standee",
    itemName: "Item Name *",
    brand: "Company / Brand",
    category: "Category",
    chooseFromList: "📋 Select from List",
    typeNewCategory: "✍️ Type New Category",
    newCategoryPlaceholder: "Enter category name...",
    sellingPrice: "Selling Price (₹) *",
    mrp: "MRP (₹)",
    uploadPhoto: "📷 Upload Photo",
    photoReady: "✓ Photo Selected!",
    saveToStore: "+ Save to Catalog",
    editItemTitle: "✏️ Edit Item Details",
    goBack: "⬅ Back",
    saveChanges: "✓ Save Changes",
    alertNamePrice: "Please fill in the Item Name and Selling Price!",
    alertAdded: "Item saved to database successfully!",
    alertWrongPin: "Incorrect PIN! Please try again.",
    alertDeleted: "Item removed from catalog!",
    alertConfirmDelete: "Are you sure you want to remove this item?",
    alertUpdated: "Item details updated!",
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
    nameHi: "ट्राई-प्लाई स्टेनलेस स्टील कड़ाही (26cm)",
    nameEn: "Tri-Ply Stainless Steel Kadhai (26cm)",
    category: "कड़ाही",
    company: "Prestige",
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
    nameHi: "हार्ड एनोडाइज्ड रोटी तवा",
    nameEn: "Hard Anodized Concave Roti Tawa",
    category: "तवा",
    company: "Hawkins",
    price: 649,
    mrp: 850,
    badgeHi: "हॉट डील",
    badgeEn: "Hot Deal",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=80",
    descHi: "4.5mm मोटा बेस, गैस स्टोव के लिए उत्तम।",
    descEn: "4.5mm heavy gauge base, compatible with gas stoves."
  },
  {
    id: 4,
    nameHi: "स्टेनलेस स्टील लेज़र डिब्बा सेट (5 पीस)",
    nameEn: "Stainless Steel Storage Container Set (5 Pcs)",
    category: "डिब्बे",
    company: "Patanjali / Local",
    price: 1150,
    mrp: 1450,
    badgeHi: "किचन पैक",
    badgeEn: "Kitchen Pack",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=80",
    descHi: "एयरटाइट स्टील कंटेनर ग्रोसरी स्टोरेज के लिए।",
    descEn: "Airtight steel containers for pantry and snacks storage."
  },
  {
    id: 5,
    nameHi: "डायमंड कट क्रिस्टल पानी के गिलास (6 पीस)",
    nameEn: "Diamond Cut Crystal Water Glasses (Set of 6)",
    category: "गिलास",
    company: "Ocean",
    price: 380,
    mrp: 520,
    badgeHi: "पॉपुलर",
    badgeEn: "Popular",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80",
    descHi: "लेड-फ्री चमकीले प्रीमियम पारदर्शी ग्लास।",
    descEn: "Lead-free crystal clear water and juice tumblers."
  },
  {
    id: 6,
    nameHi: "रॉयल सिरेमिक गोल्ड कप-तश्तरी सेट (6 पीस)",
    nameEn: "Royal Ceramic Gold Rim Tea Cup Set (6 Pcs)",
    category: "क्रॉकरी",
    company: "Clay Craft",
    price: 799,
    mrp: 1050,
    badgeHi: "गिफ्ट स्पेशल",
    badgeEn: "Gift Special",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&auto=format&fit=crop&q=80",
    descHi: "गोल्डन बॉर्डर वर्क के साथ बोन-चाइना टी-सेट।",
    descEn: "Fine bone-china style tea set with delicate gold border."
  },
  {
    id: 7,
    nameHi: "स्टेनलेस स्टील कटलरी सेट स्टैंड के साथ (24 पीस)",
    nameEn: "Stainless Steel Cutlery Set with Stand (24 Pcs)",
    category: "कटलरी",
    company: "King Steel",
    price: 599,
    mrp: 799,
    badgeHi: "ज़रूरी",
    badgeEn: "Essential",
    image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?w=500&auto=format&fit=crop&q=80",
    descHi: "मिरर पॉलिश चम्मच, कांटे और स्टैंड।",
    descEn: "Mirror-finish spoons and forks with revolving stand."
  },
  {
    id: 8,
    nameHi: "पीतल की शगुन पूजा थाली सेट",
    nameEn: "Embossed Brass Shagun Pooja Thali Set",
    category: "गिफ्ट आईटम",
    company: "Handicrafts",
    price: 1550,
    mrp: 2100,
    badgeHi: "शादी स्पेशल",
    badgeEn: "Wedding Pick",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?w=500&auto=format&fit=crop&q=80",
    descHi: "शादी और त्योहारों के लिए पारंपरिक पीतल थाली सेट।",
    descEn: "Traditional embossed brass puja thali set for ceremonies."
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
  
  // Dynamic Admin PIN (stored in localStorage with fallback to 1234)
  const [savedOwnerPin, setSavedOwnerPin] = useState(() => {
    return localStorage.getItem('sgc_owner_pin') || '1234';
  });
  const [adminPin, setAdminPin] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // States to change password in Owner Panel
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');

  const [adminTab, setAdminTab] = useState('ADD');
  const [editingProduct, setEditingProduct] = useState(null);

  const [upiSettings, setUpiSettings] = useState({
    upiId: '8307465719@upi',
    merchantName: 'Radhe Shyam'
  });

  const [categoriesList, setCategoriesList] = useState([
    "कुकर", "कड़ाही", "तवा", "डिब्बे", "गिलास", "क्रॉकरी", "कटलरी", "गिफ्ट आईटम"
  ]);

  const [newItem, setNewItem] = useState({
    nameHi: '',
    nameEn: '',
    category: 'कुकर',
    customCategory: '',
    company: '',
    price: '',
    mrp: '',
    image: '',
    badgeHi: 'नया माल',
    badgeEn: 'New Arrival'
  });
  const [isCustomCatMode, setIsCustomCatMode] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  const apiBase = "https://ganesh-crockery-backend.onrender.com";

  // Standee will ALWAYS use your live Vercel URL
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
      const payload = { ...upiSettings, ownerPin: savedOwnerPin };
      const res = await fetch(`${apiBase}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        alert(lang === 'hi' ? "✓ UPI सेटिंग्स सफलतापूर्वक सेव हो गई!" : "✓ UPI settings saved successfully!");
      }
    } catch (err) {
      alert("Settings error!");
    }
  };

  // Change Admin PIN logic
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

    // Save to backend too
    try {
      await fetch(`${apiBase}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...upiSettings, ownerPin: newPinInput })
      });
    } catch (err) {
      console.error("PIN sync error:", err);
    }

    setNewPinInput('');
    setConfirmPinInput('');
    alert(lang === 'hi' ? `✓ आपका नया पिन सफलतापूर्वक सेट हो गया: ${newPinInput}` : `✓ New PIN set successfully: ${newPinInput}`);
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

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      const res = await fetch(`${apiBase}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, totalAmount })
      });
      const data = await res.json();
      if (data.success) {
        setCheckoutData(data);
      }
    } catch (err) {
      alert(t.serverError);
    }
  };

  const shareOnWhatsApp = () => {
    if (!checkoutData) return;
    const itemsSummary = cart.map(i => {
      const displayName = lang === 'hi' ? (i.nameHi || i.nameEn) : (i.nameEn || i.nameHi);
      return `• ${displayName} (x${i.qty}) - ₹${i.price * i.qty}`;
    }).join('%0A');

    const heading = lang === 'hi' ? "*श्री गणेश क्रॉकरी एंड गिफ्ट हाउस - पर्चा*" : "*Shri Ganesh Crockery & Gift House - Invoice*";
    const orderTxt = lang === 'hi' ? "ऑर्डर नंबर" : "Order ID";
    const totalTxt = lang === 'hi' ? "कुल राशि" : "Total Amount";
    const shopTxt = lang === 'hi' ? "मेन मार्केट, रतिया | मो: 83074-65719" : "Main Market, Ratia | M: 83074-65719";
    const thanks = lang === 'hi' ? "धन्यवाद! फिर पधारें 🙏" : "Thank you! Visit again 🙏";

    const msg = `${heading}%0A` +
      `${orderTxt}: ${checkoutData.orderId}%0A` +
      `----------------------------%0A` +
      `${itemsSummary}%0A` +
      `----------------------------%0A` +
      `*${totalTxt}: ₹${checkoutData.totalAmount}*%0A` +
      `${shopTxt}%0A` +
      `${thanks}`;

    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.nameHi || !newItem.price) {
      alert(t.alertNamePrice);
      return;
    }

    const finalCategory = isCustomCatMode 
      ? (newItem.customCategory.trim() || "अन्य")
      : newItem.category;

    if (!categoriesList.includes(finalCategory)) {
      setCategoriesList(prev => [...prev, finalCategory]);
    }

    const item = {
      id: Date.now(),
      nameHi: newItem.nameHi,
      nameEn: newItem.nameEn || newItem.nameHi,
      category: finalCategory,
      company: newItem.company || "General",
      price: Number(newItem.price),
      mrp: Number(newItem.mrp) || Number(newItem.price) + 200,
      badgeHi: newItem.badgeHi || "नया",
      badgeEn: newItem.badgeEn || "New",
      image: newItem.image || "https://images.unsplash.com/photo-1584990347449-399a9cf3e218?w=500&auto=format&fit=crop&q=80",
      descHi: "ताज़ा स्टॉक दुकान पर उपलब्ध है।",
      descEn: "Fresh stock available in store."
    };

    const updated = [item, ...products];
    setProducts(updated);
    syncWithBackend(updated);

    setNewItem({ nameHi: '', nameEn: '', category: 'कुकर', customCategory: '', company: '', price: '', mrp: '', image: '', badgeHi: 'नया माल', badgeEn: 'New Arrival' });
    setIsCustomCatMode(false);
    alert(t.alertAdded);
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`${t.alertConfirmDelete} "${name}"?`)) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      setCart(prev => prev.filter(c => c.id !== id));
      syncWithBackend(updated);
      alert(t.alertDeleted);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updated = products.map(p => p.id === editingProduct.id ? editingProduct : p);
    setProducts(updated);
    syncWithBackend(updated);
    setEditingProduct(null);
    alert(t.alertUpdated);
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

      {/* 2. SEARCH BAR */}
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '14px 16px 0 16px' }}>
        <input 
          type="text" 
          placeholder={t.searchPlaceholder} 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '2px solid #8F0F0F', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '15px', fontWeight: '600', boxSizing: 'border-box' }}
        />
      </div>

      {/* 3. DYNAMIC CATEGORIES */}
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

      {/* 4. PRODUCTS GRID */}
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
                    background: '#6B0808', 
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
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#6B0808' }}>₹{item.price}</span>
                      <span style={{ fontSize: '12px', color: '#777', textDecoration: 'line-through', fontWeight: 'bold' }}>₹{item.mrp}</span>
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

      {/* 5. FLOATING BOTTOM CART BAR */}
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
            <div style={{ fontSize: '18px', fontWeight: '900' }}>{t.totalAmount}: ₹{totalAmount}</div>
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

      {/* 6. CART & PAYMENT MODAL */}
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '500px', maxHeight: '85vh', borderRadius: '20px 20px 0 0', padding: '20px', overflowY: 'auto' }}>
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
                <div style={{ margin: '12px 0', fontSize: '22px', fontWeight: '900', color: '#6B0808' }}>{t.totalAmount}: ₹{checkoutData.totalAmount}</div>
                
                <div style={{ background: '#F8F4EC', padding: '8px 12px', borderRadius: '8px', marginBottom: '12px', fontSize: '12px', color: '#444' }}>
                  {lang === 'hi' ? 'खाता धारक' : 'Account Holder'}: <strong>{checkoutData.merchantName}</strong><br />
                  UPI ID: <strong style={{ color: '#6B0808' }}>{checkoutData.upiId}</strong>
                </div>

                <a href={checkoutData.upiUrl} style={{ display: 'block', background: '#1B5E20', color: '#FFF', padding: '13px', borderRadius: '10px', textDecoration: 'none', fontWeight: '900', fontSize: '15px', marginBottom: '8px' }}>
                  {t.payViaApp}
                </a>

                <button 
                  onClick={shareOnWhatsApp}
                  style={{ width: '100%', background: '#25D366', color: '#FFF', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                >
                  {t.shareWhatsApp}
                </button>
              </div>
            ) : (
              <div>
                {cart.map(item => {
                  const displayName = lang === 'hi' ? (item.nameHi || item.nameEn) : (item.nameEn || item.nameHi);
                  return (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '2px solid #EEE' }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '14px', color: '#000' }}>{displayName}</div>
                        <div style={{ fontSize: '13px', color: '#6B0808', fontWeight: '900' }}>₹{item.price} × {item.qty} = ₹{item.price * item.qty}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button onClick={() => updateQty(item.id, -1)} style={{ padding: '6px 12px', background: '#222222', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '900' }}>-</button>
                        <span style={{ fontWeight: '900', fontSize: '15px', color: '#000' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} style={{ padding: '6px 12px', background: '#222222', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '900' }}>+</button>
                      </div>
                    </div>
                  );
                })}
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0', fontSize: '18px', fontWeight: '900' }}>
                  <span>{t.totalAmount}:</span>
                  <span style={{ color: '#6B0808' }}>₹{totalAmount}</span>
                </div>
                <button onClick={handleCheckout} style={{ width: '100%', background: '#6B0808', color: '#FFF', padding: '14px', borderRadius: '10px', fontWeight: '900', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
                  {t.viewBill}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. OWNER / ADMIN PANEL */}
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
                      alert(t.alertWrongPin);
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
                  <button 
                    onClick={() => setEditingProduct(null)}
                    style={{ background: '#333', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {t.goBack}
                  </button>
                </div>

                <form onSubmit={handleSaveEdit}>
                  <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>सामान का नाम (हिंदी)</label>
                  <input 
                    type="text" 
                    value={editingProduct.nameHi || ''} 
                    onChange={e => setEditingProduct({ ...editingProduct, nameHi: e.target.value })} 
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', backgroundColor: '#FFF', color: '#000', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', boxSizing: 'border-box' }}
                    required
                  />

                  <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>Item Name (English)</label>
                  <input 
                    type="text" 
                    value={editingProduct.nameEn || ''} 
                    onChange={e => setEditingProduct({ ...editingProduct, nameEn: e.target.value })} 
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', backgroundColor: '#FFF', color: '#000', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', boxSizing: 'border-box' }}
                  />

                  <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>{t.brand}</label>
                  <input 
                    type="text" 
                    value={editingProduct.company} 
                    onChange={e => setEditingProduct({ ...editingProduct, company: e.target.value })} 
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', backgroundColor: '#FFF', color: '#000', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', boxSizing: 'border-box' }}
                  />

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '50%' }}>
                      <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>{t.sellingPrice}</label>
                      <input 
                        type="number" 
                        value={editingProduct.price} 
                        onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })} 
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', backgroundColor: '#FFF', color: '#000', fontSize: '14px', fontWeight: 'bold', boxSizing: 'border-box' }}
                        required
                      />
                    </div>
                    <div style={{ width: '50%' }}>
                      <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>{t.mrp}</label>
                      <input 
                        type="number" 
                        value={editingProduct.mrp} 
                        onChange={e => setEditingProduct({ ...editingProduct, mrp: Number(e.target.value) })} 
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', backgroundColor: '#FFF', color: '#000', fontSize: '14px', fontWeight: 'bold', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px', background: '#F8F4EC', padding: '10px', borderRadius: '8px', border: '2px dashed #6B0808' }}>
                    <label style={{ fontSize: '12px', fontWeight: '900', color: '#6B0808', display: 'block', marginBottom: '6px' }}>
                      {t.uploadPhoto}
                    </label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => handleImageUpload(e, (data) => setEditingProduct({ ...editingProduct, image: data }))}
                      style={{ fontSize: '12px', width: '100%', color: '#000', fontWeight: 'bold' }}
                    />
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={editingProduct.image} alt="Current" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #333' }} />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    style={{ width: '100%', background: '#1B5E20', color: '#FFFFFF', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '15px', cursor: 'pointer' }}
                  >
                    {t.saveChanges}
                  </button>
                </form>
              </div>

            ) : (

              /* MAIN TABS */
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', borderBottom: '2px solid #EEE', paddingBottom: '10px' }}>
                  <button 
                    onClick={() => setAdminTab('ADD')} 
                    style={{ flex: 1, padding: '8px 2px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'ADD' ? '#6B0808' : '#EEE', color: adminTab === 'ADD' ? '#FFF' : '#333' }}
                  >
                    {t.addNewTab}
                  </button>
                  <button 
                    onClick={() => setAdminTab('MANAGE')} 
                    style={{ flex: 1, padding: '8px 2px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'MANAGE' ? '#6B0808' : '#EEE', color: adminTab === 'MANAGE' ? '#FFF' : '#333' }}
                  >
                    {t.manageTab}
                  </button>
                  <button 
                    onClick={() => setAdminTab('SETTINGS')} 
                    style={{ flex: 1, padding: '8px 2px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'SETTINGS' ? '#6B0808' : '#EEE', color: adminTab === 'SETTINGS' ? '#FFF' : '#333' }}
                  >
                    {t.settingsTab}
                  </button>
                  <button 
                    onClick={() => setAdminTab('STANDEE')} 
                    style={{ flex: 1, padding: '8px 2px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', background: adminTab === 'STANDEE' ? '#6B0808' : '#EEE', color: adminTab === 'STANDEE' ? '#FFF' : '#333' }}
                  >
                    {t.standeeTab}
                  </button>
                </div>

                {adminTab === 'ADD' && (
                  <form onSubmit={handleAddItem}>
                    <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>सामान का नाम (हिंदी) *</label>
                    <input 
                      type="text" 
                      placeholder="उदा: बटरफ्लाई 3L कुकर" 
                      value={newItem.nameHi} 
                      onChange={e => setNewItem({ ...newItem, nameHi: e.target.value })} 
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333333', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '600', marginBottom: '8px', boxSizing: 'border-box' }}
                      required
                    />

                    <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>Item Name (English)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Butterfly 3L Cooker" 
                      value={newItem.nameEn} 
                      onChange={e => setNewItem({ ...newItem, nameEn: e.target.value })} 
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333333', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '600', marginBottom: '10px', boxSizing: 'border-box' }}
                    />

                    <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>{t.brand}</label>
                    <input 
                      type="text" 
                      placeholder="Hawkins, Prestige, Milton..." 
                      value={newItem.company} 
                      onChange={e => setNewItem({ ...newItem, company: e.target.value })} 
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333333', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '600', marginBottom: '10px', boxSizing: 'border-box' }}
                    />

                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '900', color: '#111' }}>{t.category}</label>
                        <button 
                          type="button"
                          onClick={() => setIsCustomCatMode(!isCustomCatMode)} 
                          style={{ background: '#6B0808', color: '#FFFFFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '900', cursor: 'pointer' }}
                        >
                          {isCustomCatMode ? t.chooseFromList : t.typeNewCategory}
                        </button>
                      </div>

                      {!isCustomCatMode ? (
                        <select 
                          value={newItem.category} 
                          onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333333', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '800', boxSizing: 'border-box' }}
                        >
                          {categoriesList.map(c => <option key={c} value={c}>{getCatLabel(c)}</option>)}
                        </select>
                      ) : (
                        <input 
                          type="text" 
                          placeholder={t.newCategoryPlaceholder} 
                          value={newItem.customCategory} 
                          onChange={e => setNewItem({ ...newItem, customCategory: e.target.value })} 
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #6B0808', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '700', boxSizing: 'border-box' }}
                          autoFocus
                        />
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ width: '50%' }}>
                        <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>{t.sellingPrice}</label>
                        <input 
                          type="number" 
                          placeholder="1450" 
                          value={newItem.price} 
                          onChange={e => setNewItem({ ...newItem, price: e.target.value })} 
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333333', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '800', boxSizing: 'border-box' }}
                          required
                        />
                      </div>
                      <div style={{ width: '50%' }}>
                        <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>{t.mrp}</label>
                        <input 
                          type="number" 
                          placeholder="1750" 
                          value={newItem.mrp} 
                          onChange={e => setNewItem({ ...newItem, mrp: e.target.value })} 
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333333', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '800', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px', background: '#F8F4EC', padding: '12px', borderRadius: '10px', border: '2px dashed #6B0808' }}>
                      <label style={{ fontSize: '13px', fontWeight: '900', color: '#6B0808', display: 'block', marginBottom: '8px' }}>
                        {t.uploadPhoto}
                      </label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => handleImageUpload(e, (data) => setNewItem(prev => ({ ...prev, image: data })))}
                        style={{ fontSize: '13px', width: '100%', color: '#000000', fontWeight: 'bold' }}
                      />
                      {newItem.image && (
                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={newItem.image} alt="Preview" style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #6B0808' }} />
                          <span style={{ fontSize: '12px', color: '#1B5E20', fontWeight: '900' }}>{t.photoReady}</span>
                        </div>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      style={{ width: '100%', background: '#1B5E20', color: '#FFFFFF', padding: '13px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '15px', cursor: 'pointer' }}
                    >
                      {t.saveToStore}
                    </button>
                  </form>
                )}

                {adminTab === 'MANAGE' && (
                  <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
                    {products.map(item => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #DDD', background: '#FAFAFA', borderRadius: '8px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={item.image} alt={item.nameHi} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CCC' }} />
                          <div>
                            <div style={{ fontWeight: '800', fontSize: '13px', color: '#000' }}>{item.nameHi || item.nameEn}</div>
                            <div style={{ fontSize: '12px', color: '#6B0808', fontWeight: 'bold' }}>₹{item.price} <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '11px' }}>₹{item.mrp}</span></div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button 
                            onClick={() => setEditingProduct({ ...item })}
                            style={{ background: '#1E3A8A', color: '#FFF', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(item.id, item.nameHi || item.nameEn)}
                            style={{ background: '#B91C1C', color: '#FFF', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 3: UPI SETTINGS & PASSWORD CHANGE */}
                {adminTab === 'SETTINGS' && (
                  <div>
                    {/* SECTION 1: UPI SETTINGS */}
                    <form onSubmit={handleSaveSettings} style={{ marginBottom: '24px', borderBottom: '2px dashed #DDD', paddingBottom: '20px' }}>
                      <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#6B0808', fontWeight: '900' }}>
                        💳 UPI भुगतान सेटिंग (Payment Settings)
                      </h3>

                      <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>
                        दुकान की असली UPI ID (VPA) *
                      </label>
                      <input 
                        type="text" 
                        placeholder="उदा: 9357404458@ybl" 
                        value={upiSettings.upiId} 
                        onChange={e => setUpiSettings({ ...upiSettings, upiId: e.target.value })} 
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #8F0F0F', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', boxSizing: 'border-box' }}
                        required
                      />

                      <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>
                        खाता धारक / मर्चेंट का नाम *
                      </label>
                      <input 
                        type="text" 
                        placeholder="उदा: Radhe Shyam" 
                        value={upiSettings.merchantName} 
                        onChange={e => setUpiSettings({ ...upiSettings, merchantName: e.target.value })} 
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333333', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: 'bold', marginBottom: '14px', boxSizing: 'border-box' }}
                        required
                      />

                      <button 
                        type="submit" 
                        style={{ width: '100%', background: '#1B5E20', color: '#FFFFFF', padding: '11px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                      >
                        💾 UPI ID सेव करें
                      </button>
                    </form>

                    {/* SECTION 2: CHANGE ADMIN PIN PORTAL */}
                    <form onSubmit={handleUpdatePin}>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#6B0808', fontWeight: '900' }}>
                        🔑 ओनर पिन बदलें (Change Admin PIN)
                      </h3>
                      <p style={{ fontSize: '12px', color: '#666', margin: '0 0 12px 0' }}>
                        वर्तमान पिन: <strong>{savedOwnerPin}</strong>
                      </p>

                      <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>
                        नया 4-अंकों का पिन (New Secret PIN) *
                      </label>
                      <input 
                        type="password" 
                        placeholder="उदा: 9876" 
                        maxLength={6}
                        value={newPinInput} 
                        onChange={e => setNewPinInput(e.target.value)} 
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', backgroundColor: '#FFF', color: '#000', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', boxSizing: 'border-box' }}
                        required
                      />

                      <label style={{ fontSize: '13px', fontWeight: '900', color: '#111', display: 'block', marginBottom: '4px' }}>
                        नया पिन दोबारा डालें (Confirm New PIN) *
                      </label>
                      <input 
                        type="password" 
                        placeholder="उदा: 9876" 
                        maxLength={6}
                        value={confirmPinInput} 
                        onChange={e => setConfirmPinInput(e.target.value)} 
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #333', backgroundColor: '#FFF', color: '#000', fontSize: '14px', fontWeight: 'bold', marginBottom: '14px', boxSizing: 'border-box' }}
                        required
                      />

                      <button 
                        type="submit" 
                        style={{ width: '100%', background: '#6B0808', color: '#FFFFFF', padding: '11px', borderRadius: '8px', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                      >
                        🔒 नया पासवर्ड सेव करें (Update PIN)
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 4: COUNTER QR STANDEE POSTER */}
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

                      {/* Standee QR with Live Vercel Domain */}
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