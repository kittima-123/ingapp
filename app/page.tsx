"use client";

import React, { useState } from "react";

interface Plant {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  location: string;
  type: string;
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
  category: string;
  price: number;
  image: string;
}

interface CartItem {
  item: ShopItem;
  quantity: number;
}

const INITIAL_PLANTS: Plant[] = [
  {
    id: "1",
    slug: "monstera_deliciosa",
    name: "Monstera",
    scientificName: "Monstera Deliciosa",
    location: "Living Room",
    type: "Indoor",
    status: "Healthy",
    health: 92,
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
    slug: "snake_plant",
    name: "Snake Plant",
    scientificName: "Sansevieria Trifasciata",
    location: "Living Room",
    type: "Indoor",
    status: "Healthy",
    health: 88,
    nextWater: "2 days",
    nextMist: "3 days",
    light: "Low to Bright",
    waterFreq: "Every 2 Weeks",
    temp: "16-27°C",
    soil: "Sandy / Cactus",
    image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "3",
    slug: "fiddle_leaf_fig",
    name: "Fiddle Leaf Fig",
    scientificName: "Ficus Lyrata",
    location: "Living Room",
    type: "Indoor",
    status: "Healthy",
    health: 85,
    nextWater: "2 days",
    nextMist: "12 hours",
    light: "Bright Filtered",
    waterFreq: "Weekly",
    temp: "18-24°C",
    soil: "Loamy Well-Drain",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "4",
    slug: "pilea_peperomioides",
    name: "Pilea",
    scientificName: "Pilea Peperomioides",
    location: "Living Room",
    type: "Indoor",
    status: "Healthy",
    health: 95,
    nextWater: "2 days",
    nextMist: "5 hours",
    light: "Bright Indirect",
    waterFreq: "Weekly",
    temp: "15-24°C",
    soil: "Peat-based",
    image: "https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?auto=format&fit=crop&w=600&q=80",
  },
];

const SHOP_PRODUCTS: ShopItem[] = [
  {
    id: "p1",
    name: "Monstera Albo",
    category: "Rare Plants",
    price: 890,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p2",
    name: "Ceramic Pot (Pink)",
    category: "Pots",
    price: 250,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p3",
    name: "Organic Fertilizer",
    category: "Care",
    price: 180,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p4",
    name: "Calathea Rosepicta",
    category: "Indoor",
    price: 420,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
  },
];

type ScreenType = "dashboard" | "my-plants" | "profile" | "add-plant" | "shop" | "cart";

export default function PlantlyAppUI() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("dashboard");
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [selectedPlant, setSelectedPlant] = useState<Plant>(INITIAL_PLANTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [newPlantName, setNewPlantName] = useState("");
  const [selectedPopular, setSelectedPopular] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleOpenPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setActiveScreen("profile");
  };

  const handleQuickAction = (action: "water" | "mist") => {
    const updated = plants.map((p) => {
      if (p.id === selectedPlant.id) {
        const updatedPlant = {
          ...p,
          health: Math.min(100, p.health + 3),
          nextWater: action === "water" ? "7 days" : p.nextWater,
          nextMist: action === "mist" ? "24 hours" : p.nextMist,
        };
        setSelectedPlant(updatedPlant);
        return updatedPlant;
      }
      return p;
    });
    setPlants(updated);
    triggerToast(action === "water" ? `💧 รดน้ำต้น ${selectedPlant.name} แล้ว!` : `✨ พ่นหมอกให้ ${selectedPlant.name} แล้ว!`);
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

  const totalPrice = cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);
  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    triggerToast("🎉 สั่งซื้อสินค้าสำเร็จแล้ว ขอบคุณที่ใช้บริการ Plantly!");
    setCart([]);
    setActiveScreen("dashboard");
  };

  const handleAddPlant = () => {
    const nameToUse = newPlantName.trim() || selectedPopular || "Calathea Orbifolia";
    const newEntry: Plant = {
      id: Date.now().toString(),
      slug: nameToUse.toLowerCase().replace(/\s+/g, "_"),
      name: nameToUse,
      scientificName: nameToUse,
      location: "Living Room",
      type: "Indoor",
      status: "Healthy",
      health: 90,
      nextWater: "4 days",
      nextMist: "8 hours",
      light: "Bright Indirect",
      waterFreq: "Weekly",
      temp: "18-25°C",
      soil: "Well-Draining",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
    };
    setPlants([newEntry, ...plants]);
    setNewPlantName("");
    setSelectedPopular(null);
    triggerToast(`🌱 เพิ่ม ${nameToUse} เข้าสวนของคุณแล้ว!`);
    setActiveScreen("my-plants");
  };

  const filteredPlants = plants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3efe6", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
      
      {/* Toast แจ้งเตือน */}
      {toastMsg && (
        <div style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 9999, backgroundColor: "#4a3b47", color: "#ffffff", padding: "8px 16px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
          {toastMsg}
        </div>
      )}

      {/* หน้าต่างแอปพลิเคชันมือถือ (App Container) */}
      <div style={{ width: "100%", maxWidth: "410px", height: "840px", backgroundColor: "#FCF9F4", borderRadius: "32px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", border: "1px solid #e2dbcd" }}>
        
        {/* ส่วนเนื้อหาภายในแอป (Scrollable Body) */}
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: "80px" }}>
          
          {/* 1. หน้า DASHBOARD */}
          {activeScreen === "dashboard" && (
            <div>
              {/* Header สีพาสเทลชมพู */}
              <div style={{ backgroundColor: "#F9C6D4", padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🌿</span>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: "#4e3d42" }}>Plantly</span>
                </div>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Alex" style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }} />
              </div>

              <div style={{ padding: "16px" }}>
                <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#4a3f3d", margin: "0 0 4px 0" }}>Good Morning, Alex! ☀️</h1>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", marginBottom: "12px" }}>
                  <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#5c504d", margin: 0 }}>My Plant Corner</h2>
                  <button onClick={() => setActiveScreen("add-plant")} style={{ background: "none", border: "none", color: "#b86b82", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                    + Add Plant
                  </button>
                </div>

                {/* Grid ต้นไม้ 2 คอลัมน์แบบแอป */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {plants.slice(0, 4).map((plant) => (
                    <div
                      key={plant.id}
                      onClick={() => handleOpenPlant(plant)}
                      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "10px", border: "1px solid #f0e8df", cursor: "pointer" }}
                    >
                      <img src={plant.image} alt={plant.name} style={{ width: "100%", height: "110px", objectFit: "cover", borderRadius: "12px", marginBottom: "8px" }} />
                      <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 2px 0", color: "#3f3735" }}>{plant.name}</h3>
                      <div style={{ fontSize: "11px", color: "#059669", fontWeight: 600 }}>● {plant.status}</div>
                      <div style={{ fontSize: "10px", color: "#8c7f7a", marginTop: "2px" }}>💧 Water in {plant.nextWater}</div>
                    </div>
                  ))}
                </div>

                {/* Upcoming Tasks */}
                <div style={{ marginTop: "20px" }}>
                  <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#5c504d", marginBottom: "10px" }}>Upcoming Tasks:</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button onClick={() => triggerToast("💧 รดน้ำ Monstera แล้ว")} style={{ backgroundColor: "#D7EEF7", color: "#3a5a68", border: "none", padding: "8px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, textAlign: "left", cursor: "pointer" }}>
                      💧 Water Monstera
                    </button>
                    <button onClick={() => triggerToast("✨ พ่นหมอก Pilea แล้ว")} style={{ backgroundColor: "#E6D9F5", color: "#55426b", border: "none", padding: "8px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, textAlign: "left", cursor: "pointer" }}>
                      ✨ Mist Pilea
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. หน้า MY PLANTS */}
          {activeScreen === "my-plants" && (
            <div>
              <div style={{ backgroundColor: "#DFC7F2", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px" }}>🌿</span>
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "#4a3957" }}>Plantly</span>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search plants..."
                  style={{ width: "100%", padding: "8px 14px", borderRadius: "9999px", border: "none", fontSize: "12px", backgroundColor: "rgba(255,255,255,0.8)", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ padding: "16px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#4a3f3d", marginBottom: "12px" }}>My Plants ({plants.length} Total)</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {filteredPlants.map((plant) => (
                    <div
                      key={plant.id}
                      onClick={() => handleOpenPlant(plant)}
                      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "10px", border: "1px solid #efe7de", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
                    >
                      <img src={plant.image} alt={plant.name} style={{ width: "65px", height: "65px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 2px 0", color: "#3f3735" }} className="truncate">{plant.scientificName}</h3>
                        <p style={{ fontSize: "11px", color: "#8c7f7a", margin: "0 0 6px 0" }}>{plant.location}</p>
                        <div style={{ width: "100%", height: "6px", backgroundColor: "#f1e6ee", borderRadius: "9999px", overflow: "hidden" }}>
                          <div style={{ width: `${plant.health}%`, height: "100%", backgroundColor: "#b983e0" }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. หน้า PLANT PROFILE */}
          {activeScreen === "profile" && (
            <div style={{ padding: "16px" }}>
              <button onClick={() => setActiveScreen("my-plants")} style={{ background: "none", border: "none", color: "#5c424a", fontWeight: 700, fontSize: "12px", cursor: "pointer", marginBottom: "12px" }}>
                ← Back
              </button>

              <h1 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 2px 0" }}>{selectedPlant.name}</h1>
              <p style={{ fontSize: "12px", color: "#8c7f7a", marginBottom: "12px" }}>{selectedPlant.location}</p>

              <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden", marginBottom: "16px", position: "relative" }}>
                <img src={selectedPlant.image} alt={selectedPlant.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: "10px", left: "10px", backgroundColor: "rgba(58,51,48,0.8)", color: "#fff", padding: "4px 10px", borderRadius: "9999px", fontSize: "11px" }}>
                  ❤️ {selectedPlant.status} ({selectedPlant.health}%)
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <button onClick={() => handleQuickAction("water")} style={{ flex: 1, backgroundColor: "#F4C4D4", color: "#5e3744", border: "none", padding: "10px", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                  💧 Water Now
                </button>
                <button onClick={() => handleQuickAction("mist")} style={{ flex: 1, backgroundColor: "#DFC7F2", color: "#4b355c", border: "none", padding: "10px", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                  ✨ Mist Now
                </button>
              </div>

              <div style={{ backgroundColor: "#ffffff", padding: "14px", borderRadius: "16px", border: "1px solid #efe7de", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px" }}>
                <div><strong>☀️ Light:</strong> <br/><span style={{ color: "#8c7f7a" }}>{selectedPlant.light}</span></div>
                <div><strong>💧 Water:</strong> <br/><span style={{ color: "#8c7f7a" }}>{selectedPlant.waterFreq}</span></div>
                <div><strong>🌡️ Temp:</strong> <br/><span style={{ color: "#8c7f7a" }}>{selectedPlant.temp}</span></div>
                <div><strong>🪴 Soil:</strong> <br/><span style={{ color: "#8c7f7a" }}>{selectedPlant.soil}</span></div>
              </div>
            </div>
          )}

          {/* 4. หน้า ADD NEW PLANT */}
          {activeScreen === "add-plant" && (
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h1 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>Add New Plant</h1>
                <button onClick={() => setActiveScreen("dashboard")} style={{ background: "none", border: "none", fontSize: "12px", fontWeight: 700, color: "#8c7f7a", cursor: "pointer" }}>✕ Close</button>
              </div>

              <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "6px" }}>Search / Identify</label>
              <input
                type="text"
                value={newPlantName}
                onChange={(e) => setNewPlantName(e.target.value)}
                placeholder="Search by name or type..."
                style={{ width: "100%", padding: "10px 14px", borderRadius: "9999px", border: "1px solid #d6c9bc", backgroundColor: "#f7f2eb", fontSize: "12px", marginBottom: "16px", boxSizing: "border-box" }}
              />

              <h2 style={{ fontSize: "13px", fontWeight: 700, marginBottom: "10px" }}>Most Popular:</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                {[
                  { name: "Fiddle Leaf", img: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=300&q=80" },
                  { name: "Pilea", img: "https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?auto=format&fit=crop&w=300&q=80" },
                  { name: "Snake Plant", img: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=300&q=80" },
                ].map((item) => (
                  <div
                    key={item.name}
                    onClick={() => { setSelectedPopular(item.name); setNewPlantName(item.name); }}
                    style={{ border: selectedPopular === item.name ? "2px solid #e08ca4" : "1px solid #efe7de", borderRadius: "12px", padding: "6px", textAlign: "center", cursor: "pointer", backgroundColor: "#fff" }}
                  >
                    <img src={item.img} alt={item.name} style={{ width: "100%", height: "65px", objectFit: "cover", borderRadius: "8px", marginBottom: "4px" }} />
                    <p style={{ fontSize: "10px", fontWeight: 700, margin: 0 }} className="truncate">{item.name}</p>
                  </div>
                ))}
              </div>

              <button onClick={handleAddPlant} style={{ width: "100%", backgroundColor: "#7f5a83", color: "#fff", border: "none", padding: "12px", borderRadius: "9999px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
                Save & Add to My Plants
              </button>
            </div>
          )}

          {/* 5. หน้า SHOP (ร้านค้าออนไลน์) */}
          {activeScreen === "shop" && (
            <div style={{ padding: "16px" }}>
              <div style={{ backgroundColor: "#D4E8D4", padding: "16px", borderRadius: "16px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h1 style={{ fontSize: "16px", fontWeight: 800, color: "#2e4d30", margin: 0 }}>🛍️ Plantly Shop</h1>
                  <p style={{ fontSize: "11px", color: "#476b47", margin: "2px 0 0 0" }}>เลือกซื้อต้นไม้และอุปกรณ์</p>
                </div>
                <button onClick={() => setActiveScreen("cart")} style={{ backgroundColor: "#fff", color: "#2e4d30", border: "none", padding: "6px 12px", borderRadius: "9999px", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>
                  🛒 ({totalCartItems})
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {SHOP_PRODUCTS.map((prod) => (
                  <div key={prod.id} style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "10px", border: "1px solid #e8efe8", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <img src={prod.image} alt={prod.name} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "10px", marginBottom: "6px" }} />
                      <span style={{ fontSize: "9px", color: "#059669", fontWeight: 700 }}>{prod.category}</span>
                      <h3 style={{ fontSize: "12px", fontWeight: 700, margin: "2px 0" }} className="truncate">{prod.name}</h3>
                      <p style={{ fontSize: "12px", fontWeight: 800, color: "#7f5a83", margin: 0 }}>฿{prod.price}</p>
                    </div>
                    <button onClick={() => addToCart(prod)} style={{ width: "100%", backgroundColor: "#B7D7B8", color: "#2e4d30", border: "none", padding: "6px", borderRadius: "8px", fontWeight: 700, fontSize: "11px", marginTop: "8px", cursor: "pointer" }}>
                      + ใส่ตะกร้า
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. หน้า CART (ตะกร้าสินค้าและการสั่งซื้อ) */}
          {activeScreen === "cart" && (
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <button onClick={() => setActiveScreen("shop")} style={{ background: "none", border: "none", color: "#6e4d3b", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>← ร้านค้า</button>
                <h1 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>ตะกร้าสินค้า</h1>
              </div>

              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#8c7f7a", fontSize: "13px" }}>
                  <p style={{ fontSize: "30px", margin: "0 0 8px 0" }}>🛒</p>
                  ไม่มีสินค้าในตะกร้า
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                    {cart.map(({ item, quantity }) => (
                      <div key={item.id} style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "12px", border: "1px solid #efe7de", display: "flex", alignItems: "center", gap: "10px" }}>
                        <img src={item.image} alt={item.name} style={{ width: "45px", height: "45px", borderRadius: "8px", objectFit: "cover" }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: "12px", fontWeight: 700, margin: "0 0 2px 0" }} className="truncate">{item.name}</h4>
                          <p style={{ fontSize: "11px", color: "#7f5a83", fontWeight: 700, margin: 0 }}>฿{item.price * quantity}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ width: "22px", height: "22px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", fontWeight: 700, fontSize: "11px", cursor: "pointer" }}>-</button>
                          <span style={{ fontSize: "12px", fontWeight: 700 }}>{quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ width: "22px", height: "22px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", fontWeight: 700, fontSize: "11px", cursor: "pointer" }}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ backgroundColor: "#fff", padding: "14px", borderRadius: "16px", border: "1px solid #efe7de" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 800, marginBottom: "12px" }}>
                      <span>ยอดรวมสุทธิ:</span>
                      <span style={{ color: "#7f5a83" }}>฿{totalPrice}</span>
                    </div>
                    <button onClick={handleCheckout} style={{ width: "100%", backgroundColor: "#7f5a83", color: "#fff", border: "none", padding: "12px", borderRadius: "9999px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
                      ยืนยันการสั่งซื้อ (Checkout)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* =========================================================
            BOTTOM NAVIGATION BAR (แถบเมนูด้านล่างแบบแอปมือถือจริง)
        ========================================================= */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "65px", backgroundColor: "#F9C6D4", borderTop: "1px solid #f0b4c5", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 10px", zIndex: 40 }}>
          
          <button onClick={() => setActiveScreen("dashboard")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", color: activeScreen === "dashboard" ? "#4e333b" : "#8c6873" }}>
            <span style={{ fontSize: "18px" }}>🏠</span>
            <span style={{ fontSize: "10px", fontWeight: activeScreen === "dashboard" ? 700 : 500 }}>Home</span>
          </button>

          <button onClick={() => setActiveScreen("my-plants")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", color: activeScreen === "my-plants" || activeScreen === "profile" || activeScreen === "add-plant" ? "#4e333b" : "#8c6873" }}>
            <span style={{ fontSize: "18px" }}>🌿</span>
            <span style={{ fontSize: "10px", fontWeight: activeScreen === "my-plants" || activeScreen === "profile" || activeScreen === "add-plant" ? 700 : 500 }}>My Plants</span>
          </button>

          <button onClick={() => setActiveScreen("shop")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", color: activeScreen === "shop" || activeScreen === "cart" ? "#4e333b" : "#8c6873" }}>
            <span style={{ fontSize: "18px" }}>🛍️</span>
            <span style={{ fontSize: "10px", fontWeight: activeScreen === "shop" || activeScreen === "cart" ? 700 : 500 }}>Shop</span>
          </button>

          <button onClick={() => triggerToast("💡 ทริค: รดน้ำต้นไม้ช่วงเช้าจะดีที่สุด!")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", color: "#8c6873" }}>
            <span style={{ fontSize: "18px" }}>💡</span>
            <span style={{ fontSize: "10px", fontWeight: 500 }}>Tips</span>
          </button>

          <button onClick={() => triggerToast("👤 เข้าสู่ระบบด้วยบัญชี: Alex")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", color: "#8c6873" }}>
            <span style={{ fontSize: "18px" }}>👤</span>
            <span style={{ fontSize: "10px", fontWeight: 500 }}>Profile</span>
          </button>

        </div>

      </div>
    </div>
  );
}
