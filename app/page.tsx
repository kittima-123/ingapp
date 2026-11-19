"use client";

import React, { useState } from "react";

interface Plant {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  location: string;
  category: "Indoor" | "Flowers";
  status: string;
  health: number;
  nextWater: string;
  nextMist: string;
  light: string;
  waterFreq: string;
  temp: string;
  soil: string;
  image: string;
}

interface ShopItem {
  id: string;
  name: string;
  category: "Flowers 🌸" | "Indoor 🌿" | "Pots 🪴" | "Care 🧴";
  price: number;
  image: string;
  tag?: string;
}

interface CartItem {
  item: ShopItem;
  quantity: number;
}

// --- ข้อมูลต้นไม้เริ่มต้น (รวมต้นไม้ใบและต้นดอกไม้) ---
const INITIAL_PLANTS: Plant[] = [
  {
    id: "1",
    slug: "monstera_deliciosa",
    name: "Monstera",
    scientificName: "Monstera Deliciosa",
    location: "Living Room",
    category: "Indoor",
    status: "Healthy",
    health: 94,
    nextWater: "2 days",
    nextMist: "5 hours",
    light: "Bright Indirect",
    waterFreq: "Weekly",
    temp: "18-24°C",
    soil: "Well-Draining",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2",
    slug: "pink_phalaenopsis_orchid",
    name: "Pink Orchid",
    scientificName: "Phalaenopsis Orchid",
    location: "Bedroom Window",
    category: "Flowers",
    status: "Blooming 🌸",
    health: 96,
    nextWater: "3 days",
    nextMist: "6 hours",
    light: "Filtered Morning Sun",
    waterFreq: "Every 5 Days",
    temp: "18-26°C",
    soil: "Orchid Bark Mix",
    image: "https://images.unsplash.com/photo-1566924962158-6e595e5b7391?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "3",
    slug: "peace_lily",
    name: "Peace Lily",
    scientificName: "Spathiphyllum",
    location: "Living Room",
    category: "Flowers",
    status: "Blooming 🌸",
    health: 91,
    nextWater: "1 day",
    nextMist: "4 hours",
    light: "Low to Medium",
    waterFreq: "Twice a Week",
    temp: "18-25°C",
    soil: "Rich Moist Soil",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "4",
    slug: "snake_plant",
    name: "Snake Plant",
    scientificName: "Sansevieria Trifasciata",
    location: "Work Desk",
    category: "Indoor",
    status: "Healthy",
    health: 89,
    nextWater: "5 days",
    nextMist: "3 days",
    light: "Low to Bright",
    waterFreq: "Every 2 Weeks",
    temp: "16-27°C",
    soil: "Sandy / Cactus",
    image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "5",
    slug: "pink_anthurium",
    name: "Pink Anthurium",
    scientificName: "Anthurium Andraeanum",
    location: "Balcony",
    category: "Flowers",
    status: "Blooming 🌸",
    health: 93,
    nextWater: "2 days",
    nextMist: "8 hours",
    light: "Bright Indirect",
    waterFreq: "Weekly",
    temp: "20-28°C",
    soil: "Aroid Chunky Mix",
    image: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "6",
    slug: "pilea_peperomioides",
    name: "Pilea",
    scientificName: "Pilea Peperomioides",
    location: "Living Room",
    type: "Indoor",
    category: "Indoor",
    status: "Healthy",
    health: 95,
    nextWater: "2 days",
    nextMist: "5 hours",
    light: "Bright Indirect",
    waterFreq: "Weekly",
    temp: "15-24°C",
    soil: "Peat-based",
    image: "https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?auto=format&fit=crop&w=600&q=80",
  } as Plant,
];

// --- สินค้าในร้านค้าออนไลน์ (เพิ่มต้นดอกไม้ให้เลือกสั่งซื้อได้จริง) ---
const SHOP_PRODUCTS: ShopItem[] = [
  {
    id: "p1",
    name: "Pink Moth Orchid (กล้วยไม้ชมพู)",
    category: "Flowers 🌸",
    price: 590,
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1566924962158-6e595e5b7391?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p2",
    name: "Pastel Hydrangea (ไฮเดรนเยีย)",
    category: "Flowers 🌸",
    price: 650,
    tag: "New 🌸",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p3",
    name: "Peace Lily White (ต้นเดหลี)",
    category: "Flowers 🌸",
    price: 350,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p4",
    name: "Monstera Albo Variegata",
    category: "Indoor 🌿",
    price: 890,
    tag: "Rare",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p5",
    name: "Pastel Ceramic Pot (ชมพูพาสเทล)",
    category: "Pots 🪴",
    price: 240,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p6",
    name: "Flower Bloom Booster (ปุ๋ยเร่งดอก)",
    category: "Care 🧴",
    price: 190,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
  },
];

type ScreenType = "dashboard" | "my-plants" | "profile" | "add-plant" | "shop" | "cart" | "tips";

export default function PlantlyApp() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("dashboard");
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [selectedPlant, setSelectedPlant] = useState<Plant>(INITIAL_PLANTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [plantFilter, setPlantFilter] = useState<"All" | "Flowers" | "Indoor">("All");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // States สำหรับหน้าแก้ไขโปรไฟล์ต้นไม้
  const [isEditingPlant, setIsEditingPlant] = useState(false);
  const [editLocation, setEditLocation] = useState("");

  // States สำหรับระบบตะกร้าและการสั่งซื้อ
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("Alex");
  const [customerAddress, setCustomerAddress] = useState("123/45 ถนนจรดวิถีถ่อง อ.เมือง จ.สุโขทัย 64000");
  const [orderHistory, setOrderHistory] = useState<{ id: string; total: number; itemsCount: number; date: string }[]>([]);

  // States สำหรับหน้าเพิ่มต้นไม้ใหม่
  const [newPlantName, setNewPlantName] = useState("");
  const [newPlantCategory, setNewPlantCategory] = useState<"Flowers" | "Indoor">("Flowers");
  const [newPlantLocation, setNewPlantLocation] = useState("Living Room");
  const [selectedPopular, setSelectedPopular] = useState<{ name: string; cat: "Flowers" | "Indoor"; img: string } | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
  };

  const handleOpenPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setEditLocation(plant.location);
    setIsEditingPlant(false);
    setActiveScreen("profile");
  };

  const handleQuickAction = (action: "water" | "mist" | "fertilize") => {
    const updated = plants.map((p) => {
      if (p.id === selectedPlant.id) {
        const updatedPlant = {
          ...p,
          health: Math.min(100, p.health + (action === "fertilize" ? 5 : 3)),
          nextWater: action === "water" ? "7 days" : p.nextWater,
          nextMist: action === "mist" ? "24 hours" : p.nextMist,
        };
        setSelectedPlant(updatedPlant);
        return updatedPlant;
      }
      return p;
    });
    setPlants(updated);
    if (action === "water") triggerToast(`💧 รดน้ำต้น ${selectedPlant.name} เรียบร้อย (+3% Health)`);
    if (action === "mist") triggerToast(`✨ พ่นหมอกให้ ${selectedPlant.name} เรียบร้อย (+3% Health)`);
    if (action === "fertilize") triggerToast(`🌸 ใส่ปุ๋ยบำรุงดอก ${selectedPlant.name} แล้ว (+5% Health)`);
  };

  const handleSaveEditPlant = () => {
    const updated = plants.map((p) =>
      p.id === selectedPlant.id ? { ...p, location: editLocation || p.location } : p
    );
    setPlants(updated);
    setSelectedPlant({ ...selectedPlant, location: editLocation || selectedPlant.location });
    setIsEditingPlant(false);
    triggerToast("✅ บันทึกตำแหน่งวางต้นไม้ใหม่แล้ว!");
  };

  const handleDeletePlant = (id: string) => {
    const remaining = plants.filter((p) => p.id !== id);
    setPlants(remaining);
    triggerToast("🗑️ ลบต้นไม้ออกจากคอลเลกชันแล้ว");
    setActiveScreen("my-plants");
  };

  const addToCart = (product: ShopItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === product.id);
      if (existing) {
        return prev.map((i) => (i.item.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { item: product, quantity: 1 }];
    });
    triggerToast(`🛒 เพิ่ม "${product.name}" ลงตะกร้าแล้ว!`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => (i.item.id === id ? { ...i, quantity: i.quantity + delta } : i)).filter((i) => i.quantity > 0)
    );
  };

  const subtotalPrice = cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);
  const shippingFee = subtotalPrice > 0 ? (subtotalPrice >= 1000 ? 0 : 45) : 0;
  const grandTotal = subtotalPrice + shippingFee;
  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      total: grandTotal,
      itemsCount: totalCartItems,
      date: "วันนี้",
    };
    setOrderHistory([newOrder, ...orderHistory]);
    triggerToast(`🎉 สั่งซื้อสำเร็จ! รหัสคำสั่งซื้อ ${newOrder.id}`);
    setCart([]);
    setActiveScreen("dashboard");
  };

  const handleAddPlant = () => {
    const nameToUse = newPlantName.trim() || selectedPopular?.name || "Pink Hydrangea";
    const imgToUse =
      selectedPopular?.img ||
      (newPlantCategory === "Flowers"
        ? "https://images.unsplash.com/photo-1566924962158-6e595e5b7391?auto=format&fit=crop&w=600&q=80"
        : "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80");

    const newEntry: Plant = {
      id: Date.now().toString(),
      slug: nameToUse.toLowerCase().replace(/\s+/g, "_"),
      name: nameToUse,
      scientificName: nameToUse,
      location: newPlantLocation,
      category: newPlantCategory,
      status: newPlantCategory === "Flowers" ? "Blooming 🌸" : "Healthy",
      health: 95,
      nextWater: "3 days",
      nextMist: "6 hours",
      light: "Bright Indirect",
      waterFreq: "Weekly",
      temp: "18-25°C",
      soil: newPlantCategory === "Flowers" ? "Loamy Bloom Mix" : "Well-Draining",
      image: imgToUse,
    };
    setPlants([newEntry, ...plants]);
    setNewPlantName("");
    setSelectedPopular(null);
    triggerToast(`🌸 เพิ่ม "${nameToUse}" เข้าสวนของคุณแล้ว!`);
    setActiveScreen("my-plants");
  };

  const filteredPlants = plants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = plantFilter === "All" || p.category === plantFilter;
    return matchesSearch && matchesCategory;
  });

  // ลายขอบหยักสไตล์แอป Plantly
  const scallopedStyle: React.CSSProperties = {
    height: "12px",
    width: "100%",
    backgroundImage: "radial-gradient(circle at 12px 0, currentColor 12px, transparent 13px)",
    backgroundSize: "24px 12px",
  };

  return (
    <div style={{ minHeight: "100vh", width: "100%", backgroundColor: "#FCF9F4", color: "#4a3f3d", display: "flex", flexDirection: "column", paddingBottom: "82px" }}>
      
      {/* Toast แจ้งเตือนลอยด้านบน */}
      {toastMsg && (
        <div style={{ position: "fixed", top: "18px", left: "50%", transform: "translateX(-50%)", zIndex: 9999, backgroundColor: "#4e3645", color: "#ffffff", padding: "10px 20px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, boxShadow: "0 6px 18px rgba(78,54,69,0.25)", whiteSpace: "nowrap" }}>
          {toastMsg}
        </div>
      )}

      {/* =========================================================
          1. หน้า DASHBOARD (หน้าหลัก)
      ========================================================= */}
      {activeScreen === "dashboard" && (
        <div style={{ width: "100%" }}>
          {/* Header ชมพูพาสเทล + ขอบหยัก */}
          <div style={{ position: "sticky", top: 0, zIndex: 30 }}>
            <div style={{ backgroundColor: "#F9C6D4", padding: "16px 20px 10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>🌸</span>
                <span style={{ fontSize: "22px", fontWeight: 800, color: "#4e3d42", letterSpacing: "-0.5px" }}>Plantly</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => setActiveScreen("cart")}
                  style={{ backgroundColor: "#ffffff", color: "#4e3d42", border: "none", padding: "7px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}
                >
                  🛒 {totalCartItems}
                </button>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Alex" style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid #ffffff" }} />
              </div>
            </div>
            <div style={{ ...scallopedStyle, color: "#F9C6D4" }} />
          </div>

          <div style={{ maxWidth: "640px", margin: "0 auto", padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#4a3f3d", margin: "0 0 2px 0" }}>Good Morning, Alex! ☀️</h1>
                <p style={{ fontSize: "13px", color: "#8c7f7a", margin: 0 }}>สวนดอกไม้และต้นไม้ฟอกอากาศของคุณ</p>
              </div>
              {orderHistory.length > 0 && (
                <span style={{ backgroundColor: "#E6D9F5", color: "#55426b", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "9999px" }}>
                  📦 สั่งซื้อแล้ว {orderHistory.length} รายการ
                </span>
              )}
            </div>

            {/* แบนเนอร์โปรโมตต้นดอกไม้เข้าใหม่ */}
            <div
              onClick={() => setActiveScreen("shop")}
              style={{ marginTop: "16px", background: "linear-gradient(135deg, #F9C6D4 0%, #DFC7F2 100%)", borderRadius: "20px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", boxShadow: "0 4px 14px rgba(249,198,212,0.35)" }}
            >
              <div>
                <span style={{ backgroundColor: "#ffffff", color: "#b85d79", fontSize: "10px", fontWeight: 800, padding: "3px 8px", borderRadius: "9999px" }}>NEW ARRIVAL 🌸</span>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#4a3342", margin: "6px 0 2px 0" }}>คอลเลกชันต้นดอกไม้พาสเทล</h3>
                <p style={{ fontSize: "12px", color: "#614757", margin: 0 }}>กล้วยไม้ชมพู & ไฮเดรนเยีย พร้อมส่งถึงบ้าน →</p>
              </div>
              <span style={{ fontSize: "36px" }}>🌺</span>
            </div>

            {/* หัวข้อ My Plant Corner */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#5c504d", margin: 0 }}>My Plant Corner ({plants.length})</h2>
              <button onClick={() => setActiveScreen("add-plant")} style={{ backgroundColor: "#F9C6D4", color: "#4e3d42", border: "none", padding: "6px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                + เพิ่มต้นไม้
              </button>
            </div>

            {/* Grid การ์ดต้นไม้ 2 คอลัมน์ */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {plants.slice(0, 4).map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => handleOpenPlant(plant)}
                  style={{ backgroundColor: "#ffffff", borderRadius: "20px", padding: "12px", border: "1px solid #f0e8df", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", cursor: "pointer", position: "relative" }}
                >
                  <span style={{ position: "absolute", top: "18px", right: "18px", backgroundColor: "rgba(255,255,255,0.9)", padding: "2px 8px", borderRadius: "9999px", fontSize: "10px", fontWeight: 700, color: plant.category === "Flowers" ? "#d65a84" : "#3a7d58" }}>
                    {plant.category === "Flowers" ? "🌸 Flower" : "🌿 Leaf"}
                  </span>
                  <img src={plant.image} alt={plant.name} style={{ width: "100%", height: "135px", objectFit: "cover", borderRadius: "14px", marginBottom: "10px" }} />
                  <h3 style={{ fontSize: "15px", fontWeight: 800, margin: "0 0 3px 0", color: "#3f3735" }}>{plant.name}</h3>
                  <div style={{ fontSize: "12px", color: plant.category === "Flowers" ? "#d65a84" : "#059669", fontWeight: 600 }}>● {plant.status}</div>
                  <div style={{ fontSize: "11px", color: "#8c7f7a", marginTop: "3px" }}>💧 Water in {plant.nextWater}</div>
                </div>
              ))}
            </div>

            {/* Upcoming Tasks */}
            <div style={{ marginTop: "22px", backgroundColor: "#ffffff", padding: "16px", borderRadius: "20px", border: "1px solid #f0e8df", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 800, color: "#5c504d", margin: "0 0 12px 0" }}>Upcoming Tasks (งานดูแลวันนี้):</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button onClick={() => triggerToast("💧 รดน้ำ Monstera เรียบร้อยแล้ว!")} style={{ backgroundColor: "#D7EEF7", color: "#3a5a68", border: "none", padding: "10px 16px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, textAlign: "left", cursor: "pointer" }}>
                  💧 Water Monstera
                </button>
                <button onClick={() => triggerToast("🌸 พ่นละอองน้ำให้ Pink Orchid เรียบร้อยแล้ว!")} style={{ backgroundColor: "#FCE1EB", color: "#783c53", border: "none", padding: "10px 16px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, textAlign: "left", cursor: "pointer" }}>
                  🌸 Mist Pink Orchid
                </button>
                <button onClick={() => triggerToast("✨ ใส่ปุ๋ยบำรุงดอก Peace Lily เรียบร้อยแล้ว!")} style={{ backgroundColor: "#E6D9F5", color: "#55426b", border: "none", padding: "10px 16px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, textAlign: "left", cursor: "pointer" }}>
                  ✨ Fertilize Peace Lily
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          2. หน้า MY PLANTS (รายการต้นไม้และต้นดอกไม้ทั้งหมด)
      ========================================================= */}
      {activeScreen === "my-plants" && (
        <div style={{ width: "100%" }}>
          <div style={{ position: "sticky", top: 0, zIndex: 30 }}>
            <div style={{ backgroundColor: "#DFC7F2", padding: "18px 16px 12px 16px" }}>
              <div style={{ maxWidth: "640px", margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "19px", fontWeight: 800, color: "#4a3957" }}>🌿 My Collection ({plants.length})</span>
                  <button onClick={() => setActiveScreen("add-plant")} style={{ backgroundColor: "#7f5a83", color: "#fff", border: "none", padding: "7px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                    + เพิ่มต้นไม้
                  </button>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 ค้นหาชื่อต้นไม้ หรือต้นดอกไม้..."
                  style={{ width: "100%", padding: "10px 16px", borderRadius: "9999px", border: "none", fontSize: "13px", backgroundColor: "rgba(255,255,255,0.9)", boxSizing: "border-box" }}
                />

                {/* ปุ่มตัวกรองหมวดหมู่ All / Flowers / Indoor */}
                <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                  {[
                    { id: "All", label: `ทั้งหมด (${plants.length})` },
                    { id: "Flowers", label: `🌸 ต้นดอกไม้ (${plants.filter((p) => p.category === "Flowers").length})` },
                    { id: "Indoor", label: `🌿 ไม้ใบ (${plants.filter((p) => p.category === "Indoor").length})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setPlantFilter(tab.id as "All" | "Flowers" | "Indoor")}
                      style={{
                        backgroundColor: plantFilter === tab.id ? "#4a3957" : "rgba(255,255,255,0.65)",
                        color: plantFilter === tab.id ? "#ffffff" : "#4a3957",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "9999px",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ ...scallopedStyle, color: "#DFC7F2" }} />
          </div>

          <div style={{ maxWidth: "640px", margin: "0 auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredPlants.map((plant) => (
              <div
                key={plant.id}
                onClick={() => handleOpenPlant(plant)}
                style={{ backgroundColor: "#ffffff", borderRadius: "20px", padding: "12px", border: "1px solid #efe7de", display: "flex", alignItems: "center", gap: "14px", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
              >
                <img src={plant.image} alt={plant.name} style={{ width: "80px", height: "80px", borderRadius: "14px", objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 800, margin: "0 0 2px 0", color: "#3f3735" }}>{plant.name}</h3>
                    <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "9999px", backgroundColor: plant.category === "Flowers" ? "#FCE1EB" : "#E1F5E8", color: plant.category === "Flowers" ? "#b84b72" : "#2e6b47" }}>
                      {plant.category === "Flowers" ? "🌸 ดอกไม้" : "🌿 ไม้ใบ"}
                    </span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#8c7f7a", margin: "0 0 8px 0" }}>{plant.scientificName} • {plant.location}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ flex: 1, height: "7px", backgroundColor: "#f1e6ee", borderRadius: "9999px", overflow: "hidden" }}>
                      <div style={{ width: `${plant.health}%`, height: "100%", background: "linear-gradient(90deg, #f08ca8 0%, #b983e0 100%)" }} />
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#7f5a83" }}>{plant.health}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          3. หน้า PLANT PROFILE (รายละเอียด & แก้ไข/ดูแลต้นไม้)
      ========================================================= */}
      {activeScreen === "profile" && (
        <div style={{ width: "100%" }}>
          <div style={{ position: "sticky", top: 0, zIndex: 30 }}>
            <div style={{ backgroundColor: "#F9C6D4", padding: "16px 20px 10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={() => setActiveScreen("my-plants")} style={{ background: "none", border: "none", color: "#4e3d42", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}>
                ← Back
              </button>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#4e3d42" }}>{selectedPlant.slug}</span>
              <button onClick={() => setIsEditingPlant(!isEditingPlant)} style={{ backgroundColor: "#ffffff", border: "none", padding: "5px 12px", borderRadius: "9999px", fontSize: "11px", fontWeight: 700, color: "#4e3d42", cursor: "pointer" }}>
                {isEditingPlant ? "ยกเลิก" : "✏️ แก้ไข"}
              </button>
            </div>
            <div style={{ ...scallopedStyle, color: "#F9C6D4" }} />
          </div>

          <div style={{ maxWidth: "640px", margin: "0 auto", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 2px 0" }}>{selectedPlant.name}</h1>
                <p style={{ fontSize: "13px", color: "#8c7f7a", margin: "0 0 14px 0" }}>{selectedPlant.scientificName} • {selectedPlant.location}</p>
              </div>
            </div>

            {/* ฟอร์มแก้ไขสถานที่วางต้นไม้ */}
            {isEditingPlant && (
              <div style={{ backgroundColor: "#ffffff", padding: "14px", borderRadius: "16px", border: "1px solid #f0b4c5", marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "6px" }}>เปลี่ยนตำแหน่งที่วางต้นไม้:</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    style={{ flex: 1, padding: "8px 12px", borderRadius: "9999px", border: "1px solid #ddd", fontSize: "13px" }}
                  />
                  <button onClick={handleSaveEditPlant} style={{ backgroundColor: "#7f5a83", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "9999px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                    บันทึก
                  </button>
                </div>
              </div>
            )}

            <div style={{ width: "100%", height: "240px", borderRadius: "22px", overflow: "hidden", marginBottom: "18px", position: "relative", boxShadow: "0 6px 16px rgba(0,0,0,0.08)" }}>
              <img src={selectedPlant.image} alt={selectedPlant.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: "12px", left: "12px", backgroundColor: "rgba(58,51,48,0.85)", color: "#fff", padding: "6px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 700 }}>
                ❤️ {selectedPlant.status} ({selectedPlant.health}%)
              </div>
            </div>

            {/* Quick Actions 3 ปุ่ม */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "20px" }}>
              <button onClick={() => handleQuickAction("water")} style={{ backgroundColor: "#F4C4D4", color: "#5e3744", border: "none", padding: "12px 8px", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                💧 Water Now
              </button>
              <button onClick={() => handleQuickAction("mist")} style={{ backgroundColor: "#DFC7F2", color: "#4b355c", border: "none", padding: "12px 8px", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                ✨ Mist Now
              </button>
              <button onClick={() => handleQuickAction("fertilize")} style={{ backgroundColor: "#FBE7B2", color: "#6b5624", border: "none", padding: "12px 8px", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                🌸 Fertilize
              </button>
            </div>

            <h2 style={{ fontSize: "14px", fontWeight: 800, marginBottom: "10px" }}>Care Summary:</h2>
            <div style={{ backgroundColor: "#ffffff", padding: "16px", borderRadius: "20px", border: "1px solid #efe7de", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", fontSize: "13px" }}>
              <div><strong>☀️ Light:</strong><br /><span style={{ color: "#8c7f7a" }}>{selectedPlant.light}</span></div>
              <div><strong>💧 Water:</strong><br /><span style={{ color: "#8c7f7a" }}>{selectedPlant.waterFreq}</span></div>
              <div><strong>🌡️ Temp:</strong><br /><span style={{ color: "#8c7f7a" }}>{selectedPlant.temp}</span></div>
              <div><strong>🪴 Soil:</strong><br /><span style={{ color: "#8c7f7a" }}>{selectedPlant.soil}</span></div>
            </div>

            <button
              onClick={() => handleDeletePlant(selectedPlant.id)}
              style={{ width: "100%", marginTop: "20px", backgroundColor: "transparent", color: "#c95b6b", border: "1px solid #f0c2c9", padding: "10px", borderRadius: "9999px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
            >
              🗑️ ลบต้นไม้นี้ออกจากสวน
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          4. หน้า ADD NEW PLANT (เพิ่มต้นไม้ / ต้นดอกไม้ใหม่)
      ========================================================= */}
      {activeScreen === "add-plant" && (
        <div style={{ width: "100%" }}>
          <div style={{ position: "sticky", top: 0, zIndex: 30 }}>
            <div style={{ backgroundColor: "#F9C6D4", padding: "16px 20px 10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={() => setActiveScreen("dashboard")} style={{ background: "none", border: "none", color: "#4e3d42", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
                ✕ Close
              </button>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#4e3d42" }}>Add New Plant</span>
              <div style={{ width: "40px" }} />
            </div>
            <div style={{ ...scallopedStyle, color: "#F9C6D4" }} />
          </div>

          <div style={{ maxWidth: "640px", margin: "0 auto", padding: "18px 16px" }}>
            <label style={{ fontSize: "13px", fontWeight: 700, display: "block", marginBottom: "8px" }}>ชื่อต้นไม้ หรือต้นดอกไม้:</label>
            <input
              type="text"
              value={newPlantName}
              onChange={(e) => setNewPlantName(e.target.value)}
              placeholder="เช่น Pink Orchid, Hydrangea, Monstera..."
              style={{ width: "100%", padding: "12px 16px", borderRadius: "9999px", border: "1px solid #d6c9bc", backgroundColor: "#ffffff", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box" }}
            />

            {/* เลือกประเภท */}
            <label style={{ fontSize: "13px", fontWeight: 700, display: "block", marginBottom: "8px" }}>ประเภทต้นไม้:</label>
            <div style={{ display: "flex", gap: "10px", marginBottom: "18px" }}>
              <button
                onClick={() => setNewPlantCategory("Flowers")}
                style={{ flex: 1, padding: "10px", borderRadius: "9999px", border: "none", fontWeight: 700, fontSize: "13px", cursor: "pointer", backgroundColor: newPlantCategory === "Flowers" ? "#F9C6D4" : "#efeae2", color: "#4e3d42" }}
              >
                🌸 ต้นดอกไม้ (Flowers)
              </button>
              <button
                onClick={() => setNewPlantCategory("Indoor")}
                style={{ flex: 1, padding: "10px", borderRadius: "9999px", border: "none", fontWeight: 700, fontSize: "13px", cursor: "pointer", backgroundColor: newPlantCategory === "Indoor" ? "#D4E8D4" : "#efeae2", color: "#2e4d30" }}
              >
                🌿 ไม้ใบ (Indoor)
              </button>
            </div>

            <h2 style={{ fontSize: "14px", fontWeight: 800, marginBottom: "10px" }}>เลือกจากพันธุ์ดอกไม้และไม้ใบยอดนิยม:</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
              {[
                { name: "Pink Orchid", cat: "Flowers" as const, img: "https://images.unsplash.com/photo-1566924962158-6e595e5b7391?auto=format&fit=crop&w=300&q=80" },
                { name: "Peace Lily", cat: "Flowers" as const, img: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=300&q=80" },
                { name: "Hydrangea", cat: "Flowers" as const, img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=300&q=80" },
                { name: "Fiddle Leaf Fig", cat: "Indoor" as const, img: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=300&q=80" },
                { name: "Pilea", cat: "Indoor" as const, img: "https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?auto=format&fit=crop&w=300&q=80" },
                { name: "Snake Plant", cat: "Indoor" as const, img: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=300&q=80" },
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    setSelectedPopular(item);
                    setNewPlantName(item.name);
                    setNewPlantCategory(item.cat);
                  }}
                  style={{ border: selectedPopular?.name === item.name ? "2px solid #e08ca4" : "1px solid #efe7de", borderRadius: "16px", padding: "8px", textAlign: "center", cursor: "pointer", backgroundColor: "#fff" }}
                >
                  <img src={item.img} alt={item.name} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "10px", marginBottom: "6px" }} />
                  <p style={{ fontSize: "11px", fontWeight: 700, margin: 0 }}>{item.name}</p>
                </div>
              ))}
            </div>

            <button onClick={handleAddPlant} style={{ width: "100%", backgroundColor: "#7f5a83", color: "#fff", border: "none", padding: "14px", borderRadius: "9999px", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(127,90,131,0.3)" }}>
              Save & Add to My Plants
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          5. หน้า SHOP (ร้านค้าออนไลน์ สั่งซื้อต้นดอกไม้และอุปกรณ์ได้จริง)
      ========================================================= */}
      {activeScreen === "shop" && (
        <div style={{ width: "100%" }}>
          <div style={{ position: "sticky", top: 0, zIndex: 30 }}>
            <div style={{ backgroundColor: "#D4E8D4", padding: "18px 20px 12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h1 style={{ fontSize: "19px", fontWeight: 800, color: "#2e4d30", margin: 0 }}>🛍️ Plantly Flower & Plant Shop</h1>
                <p style={{ fontSize: "11px", color: "#476b47", margin: 0 }}>สั่งซื้อต้นดอกไม้ ไม้ฟอกอากาศ และกระถางพาสเทล</p>
              </div>
              <button onClick={() => setActiveScreen("cart")} style={{ backgroundColor: "#ffffff", color: "#2e4d30", border: "none", padding: "8px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 800, cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
                🛒 ตะกร้า ({totalCartItems})
              </button>
            </div>
            <div style={{ ...scallopedStyle, color: "#D4E8D4" }} />
          </div>

          <div style={{ maxWidth: "640px", margin: "0 auto", padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {SHOP_PRODUCTS.map((prod) => (
              <div key={prod.id} style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "12px", border: "1px solid #e8efe8", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                {prod.tag && (
                  <span style={{ position: "absolute", top: "18px", left: "18px", backgroundColor: "#F9C6D4", color: "#5e3744", fontSize: "10px", fontWeight: 800, padding: "2px 8px", borderRadius: "9999px" }}>
                    {prod.tag}
                  </span>
                )}
                <div>
                  <img src={prod.image} alt={prod.name} style={{ width: "100%", height: "135px", objectFit: "cover", borderRadius: "14px", marginBottom: "8px" }} />
                  <span style={{ fontSize: "10px", color: "#059669", fontWeight: 700 }}>{prod.category}</span>
                  <h3 style={{ fontSize: "13px", fontWeight: 800, margin: "2px 0" }}>{prod.name}</h3>
                  <p style={{ fontSize: "15px", fontWeight: 800, color: "#7f5a83", margin: "4px 0 0 0" }}>฿{prod.price}</p>
                </div>
                <button onClick={() => addToCart(prod)} style={{ width: "100%", backgroundColor: "#B7D7B8", color: "#2e4d30", border: "none", padding: "9px", borderRadius: "12px", fontWeight: 700, fontSize: "12px", marginTop: "10px", cursor: "pointer" }}>
                  + เพิ่มลงตะกร้า
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          6. หน้า CART (ตะกร้าสินค้า กรอกที่อยู่ และกดสั่งซื้อจริง)
      ========================================================= */}
      {activeScreen === "cart" && (
        <div style={{ width: "100%" }}>
          <div style={{ position: "sticky", top: 0, zIndex: 30 }}>
            <div style={{ backgroundColor: "#F5E0D3", padding: "16px 20px 10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={() => setActiveScreen("shop")} style={{ background: "none", border: "none", color: "#6e4d3b", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
                ← ร้านค้า
              </button>
              <h1 style={{ fontSize: "16px", fontWeight: 800, color: "#5c3a21", margin: 0 }}>ตะกร้าสินค้าและการสั่งซื้อ</h1>
              <div style={{ width: "40px" }} />
            </div>
            <div style={{ ...scallopedStyle, color: "#F5E0D3" }} />
          </div>

          <div style={{ maxWidth: "640px", margin: "0 auto", padding: "18px 16px" }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", backgroundColor: "#fff", borderRadius: "24px", border: "1px solid #efe7de" }}>
                <p style={{ fontSize: "44px", margin: "0 0 10px 0" }}>🛒</p>
                <p style={{ color: "#8c7f7a", fontSize: "14px", marginBottom: "16px" }}>ยังไม่มีสินค้าในตะกร้าของคุณ</p>
                <button onClick={() => setActiveScreen("shop")} style={{ backgroundColor: "#D4E8D4", color: "#2e4d30", border: "none", padding: "10px 24px", borderRadius: "9999px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
                  ไปเลือกซื้อต้นดอกไม้
                </button>
              </div>
            ) : (
              <div>
                {/* รายการสินค้าในตะกร้า */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                  {cart.map(({ item, quantity }) => (
                    <div key={item.id} style={{ backgroundColor: "#fff", padding: "12px", borderRadius: "18px", border: "1px solid #efe7de", display: "flex", alignItems: "center", gap: "12px" }}>
                      <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", borderRadius: "12px", objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px 0" }}>{item.name}</h4>
                        <p style={{ fontSize: "13px", color: "#7f5a83", fontWeight: 800, margin: 0 }}>฿{item.price * quantity}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", fontWeight: 700, cursor: "pointer" }}>-</button>
                        <span style={{ fontSize: "14px", fontWeight: 700 }}>{quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", fontWeight: 700, cursor: "pointer" }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ข้อมูลการจัดส่ง */}
                <div style={{ backgroundColor: "#fff", padding: "16px", borderRadius: "20px", border: "1px solid #efe7de", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 800, margin: "0 0 10px 0" }}>📍 ข้อมูลจัดส่งสินค้า</h3>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="ชื่อผู้รับ"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid #e5ddd5", fontSize: "13px", marginBottom: "8px", boxSizing: "border-box" }}
                  />
                  <textarea
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    rows={2}
                    placeholder="ที่อยู่จัดส่ง"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid #e5ddd5", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>

                {/* สรุปยอดชำระเงิน */}
                <div style={{ backgroundColor: "#fff", padding: "18px", borderRadius: "20px", border: "1px solid #efe7de" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#8c7f7a", marginBottom: "6px" }}>
                    <span>ค่าสินค้า ({totalCartItems} ชิ้น):</span>
                    <span>฿{subtotalPrice}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#8c7f7a", marginBottom: "12px" }}>
                    <span>ค่าจัดส่ง (ฟรีเมื่อครบ ฿1,000):</span>
                    <span>{shippingFee === 0 ? "ฟรี!" : `฿${shippingFee}`}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "17px", fontWeight: 800, paddingTop: "10px", borderTop: "1px dashed #e5ddd5", marginBottom: "16px" }}>
                    <span>ยอดชำระสุทธิ:</span>
                    <span style={{ color: "#7f5a83" }}>฿{grandTotal}</span>
                  </div>
                  <button onClick={handleCheckout} style={{ width: "100%", backgroundColor: "#7f5a83", color: "#fff", border: "none", padding: "14px", borderRadius: "9999px", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(127,90,131,0.3)" }}>
                    ยืนยันการสั่งซื้อสินค้า (฿{grandTotal})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          7. หน้า TIPS (คู่มือดูแลต้นดอกไม้และไม้ใบ)
      ========================================================= */}
      {activeScreen === "tips" && (
        <div style={{ width: "100%" }}>
          <div style={{ position: "sticky", top: 0, zIndex: 30 }}>
            <div style={{ backgroundColor: "#FBE7B2", padding: "18px 20px 10px 20px" }}>
              <h1 style={{ fontSize: "18px", fontWeight: 800, color: "#5e4a1c", margin: 0 }}>💡 Plant & Flower Care Tips</h1>
            </div>
            <div style={{ ...scallopedStyle, color: "#FBE7B2" }} />
          </div>

          <div style={{ maxWidth: "640px", margin: "0 auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { title: "🌸 เคล็ดลับให้กล้วยไม้ (Orchid) ออกดอกบ่อย", desc: "วางในที่แสงแดดรำไร รดน้ำเฉพาะตอนที่วัสดุปลูกเริ่มแห้ง และพ่นปุ๋ยบำรุงดอกสัปดาห์ละ 1 ครั้ง" },
              { title: "💧 การรดน้ำต้นเดหลี (Peace Lily)", desc: "เดหลีชอบความชื้นสูง หากใบเริ่มตกให้รดน้ำทันที ใบจะกลับมาตั้งตรงสดชื่นภายในไม่กี่ชั่วโมง" },
              { title: "☀️ แสงแดดที่เหมาะสมกับไม้ฟอกอากาศ", desc: "หลีกเลี่ยงแสงแดดจัดช่วงบ่ายโดยตรง เพราะจะทำให้ใบไหม้เป็นสีน้ำตาลได้" },
            ].map((tip, idx) => (
              <div key={idx} style={{ backgroundColor: "#fff", padding: "16px", borderRadius: "18px", border: "1px solid #efe7de" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 800, margin: "0 0 6px 0", color: "#4a3f3d" }}>{tip.title}</h3>
                <p style={{ fontSize: "13px", color: "#7a6e6a", margin: 0, lineHeight: 1.5 }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          BOTTOM NAVIGATION BAR (แถบเมนูด้านล่างติดขอบจอ)
      ========================================================= */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "70px", backgroundColor: "#F9C6D4", borderTop: "1px solid #f0b4c5", display: "flex", alignItems: "center", justifyContent: "space-around", zIndex: 50, boxShadow: "0 -2px 10px rgba(0,0,0,0.04)" }}>
        <button onClick={() => setActiveScreen("dashboard")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", cursor: "pointer", color: activeScreen === "dashboard" ? "#4e333b" : "#8c6873" }}>
          <span style={{ fontSize: "20px" }}>🏠</span>
          <span style={{ fontSize: "11px", fontWeight: activeScreen === "dashboard" ? 800 : 500 }}>Home</span>
        </button>

        <button onClick={() => setActiveScreen("my-plants")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", cursor: "pointer", color: activeScreen === "my-plants" || activeScreen === "profile" || activeScreen === "add-plant" ? "#4e333b" : "#8c6873" }}>
          <span style={{ fontSize: "20px" }}>🌸</span>
          <span style={{ fontSize: "11px", fontWeight: activeScreen === "my-plants" || activeScreen === "profile" || activeScreen === "add-plant" ? 800 : 500 }}>My Plants</span>
        </button>

        <button onClick={() => setActiveScreen("shop")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", cursor: "pointer", color: activeScreen === "shop" || activeScreen === "cart" ? "#4e333b" : "#8c6873", position: "relative" }}>
          <span style={{ fontSize: "20px" }}>🛍️</span>
          {totalCartItems > 0 && (
            <span style={{ position: "absolute", top: "-2px", right: "-6px", backgroundColor: "#7f5a83", color: "#fff", fontSize: "9px", fontWeight: 800, padding: "1px 5px", borderRadius: "9999px" }}>
              {totalCartItems}
            </span>
          )}
          <span style={{ fontSize: "11px", fontWeight: activeScreen === "shop" || activeScreen === "cart" ? 800 : 500 }}>Shop</span>
        </button>

        <button onClick={() => setActiveScreen("tips")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", cursor: "pointer", color: activeScreen === "tips" ? "#4e333b" : "#8c6873" }}>
          <span style={{ fontSize: "20px" }}>💡</span>
          <span style={{ fontSize: "11px", fontWeight: activeScreen === "tips" ? 800 : 500 }}>Tips</span>
        </button>

        <button onClick={() => triggerToast("👤 เข้าสู่ระบบด้วยบัญชี: Alex")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", cursor: "pointer", color: "#8c6873" }}>
          <span style={{ fontSize: "20px" }}>👤</span>
          <span style={{ fontSize: "11px", fontWeight: 500 }}>Profile</span>
        </button>
      </nav>
    </div>
  );
}
