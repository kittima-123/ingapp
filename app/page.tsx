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
    name: "Monstera Albo Variegata",
    category: "Rare Plants",
    price: 890,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p2",
    name: "Ceramic Pastel Pot (Pink)",
    category: "Pots",
    price: 250,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p3",
    name: "Organic Plant Fertilizer",
    category: "Care",
    price: 180,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p4",
    name: "Calathea Rosepicta",
    category: "Indoor Plants",
    price: 420,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
  },
];

type ScreenType = "dashboard" | "my-plants" | "profile" | "add-plant" | "shop" | "cart";

export default function PlantlyWebApp() {
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
    triggerToast(
      action === "water" ? `💧 รดน้ำต้น ${selectedPlant.name} แล้ว!` : `✨ พ่นหมอกให้ ${selectedPlant.name} แล้ว!`
    );
  };

  const addToCart = (product: ShopItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item: product, quantity: 1 }];
    });
    triggerToast(`🛒 เพิ่ม "${product.name}" ลงตะกร้าแล้ว!`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.item.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
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
    <div style={{ minHeight: "100vh", backgroundColor: "#FCF9F4", color: "#4a3f3d", display: "flex", flexDirection: "column" }}>
      
      {/* Toast แจ้งเตือน */}
      {toastMsg && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
            backgroundColor: "#4a3b47",
            color: "#ffffff",
            padding: "10px 20px",
            borderRadius: "9999px",
            fontSize: "14px",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* =========================================================
          แถบเมนูด้านบนแบบเต็มหน้าจอ (Full-Width Header)
      ========================================================= */}
      <header
        style={{
          backgroundColor: "#F9C6D4",
          borderBottom: "1px solid #f0b4c5",
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* โลโก้ Plantly */}
          <button
            onClick={() => setActiveScreen("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              🌿
            </span>
            <span style={{ fontSize: "22px", fontWeight: 800, color: "#4e3d42" }}>
              Plantly
            </span>
          </button>

          {/* เมนูหลัก */}
          <nav style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            {[
              { id: "dashboard", label: "🏠 หน้าหลัก" },
              { id: "my-plants", label: `🌿 ต้นไม้ของฉัน (${plants.length})` },
              { id: "add-plant", label: "➕ เพิ่มต้นไม้" },
              { id: "shop", label: "🛍️ ร้านค้า" },
            ].map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActiveScreen(menu.id as ScreenType)}
                style={{
                  backgroundColor: activeScreen === menu.id ? "#ffffff" : "transparent",
                  color: "#4e3d42",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: activeScreen === menu.id ? 700 : 600,
                  cursor: "pointer",
                }}
              >
                {menu.label}
              </button>
            ))}
          </nav>

          {/* ตะกร้าสินค้า และรูปโปรไฟล์ขนาดพอดี */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setActiveScreen("cart")}
              style={{
                backgroundColor: "#7f5a83",
                color: "#ffffff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              🛒 ตะกร้า ({totalCartItems})
            </button>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Alex"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ffffff",
              }}
            />
          </div>
        </div>
      </header>

      {/* =========================================================
          พื้นที่แสดงผลหลักแบบเต็มหน้าจอ (Main Web Container)
      ========================================================= */}
      <main style={{ flex: 1, width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "28px 20px" }}>
        
        {/* 1. หน้า DASHBOARD */}
        {activeScreen === "dashboard" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: 800, margin: 0 }}>Good Morning, Alex! ☀️</h1>
                <p style={{ fontSize: "14px", color: "#8c7f7a", marginTop: "4px" }}>
                  ยินดีต้อนรับสู่ระบบจัดการและดูแลต้นไม้ส่วนตัวของคุณ
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setActiveScreen("add-plant")}
                  style={{ backgroundColor: "#F9C6D4", color: "#4e3d42", border: "none", padding: "10px 18px", borderRadius: "9999px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
                >
                  + เพิ่มต้นไม้ใหม่
                </button>
                <button
                  onClick={() => setActiveScreen("shop")}
                  style={{ backgroundColor: "#D4E8D4", color: "#2e4d30", border: "none", padding: "10px 18px", borderRadius: "9999px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
                >
                  🛍️ ไปที่ร้านค้า
                </button>
              </div>
            </div>

            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>My Plant Corner</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px" }}>
              {plants.map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => handleOpenPlant(plant)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    padding: "14px",
                    border: "1px solid #efe7de",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    style={{ width: "100%", height: "170px", objectFit: "cover", borderRadius: "14px", marginBottom: "10px" }}
                  />
                  <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 4px 0" }}>{plant.name}</h3>
                  <div style={{ fontSize: "13px", color: "#059669", fontWeight: 600 }}>● {plant.status}</div>
                  <div style={{ fontSize: "13px", color: "#8c7f7a", marginTop: "4px" }}>💧 Water in {plant.nextWater}</div>
                </div>
              ))}
            </div>

            {/* Upcoming Tasks */}
            <div style={{ marginTop: "32px", backgroundColor: "#ffffff", padding: "20px", borderRadius: "20px", border: "1px solid #efe7de" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>Upcoming Tasks (งานที่ต้องทำวันนี้):</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <button
                  onClick={() => triggerToast("💧 รดน้ำ Monstera เรียบร้อยแล้ว!")}
                  style={{ backgroundColor: "#D7EEF7", color: "#3a5a68", border: "none", padding: "10px 18px", borderRadius: "9999px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}
                >
                  💧 Water Monstera
                </button>
                <button
                  onClick={() => triggerToast("✨ พ่นหมอก Pilea เรียบร้อยแล้ว!")}
                  style={{ backgroundColor: "#E6D9F5", color: "#55426b", border: "none", padding: "10px 18px", borderRadius: "9999px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}
                >
                  ✨ Mist Pilea
                </button>
                <button
                  onClick={() => triggerToast("🌿 ใส่ปุ๋ย Snake Plant เรียบร้อยแล้ว!")}
                  style={{ backgroundColor: "#FBE7B2", color: "#6b5624", border: "none", padding: "10px 18px", borderRadius: "9999px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}
                >
                  🌿 Fertilize Snake Plant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. หน้า MY PLANTS */}
        {activeScreen === "my-plants" && (
          <div>
            <div style={{ backgroundColor: "#DFC7F2", padding: "24px", borderRadius: "24px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#4a3957", margin: 0 }}>My Plants ({plants.length} Total)</h1>
                <p style={{ fontSize: "13px", color: "#6a557a", marginTop: "4px" }}>คลิกที่การ์ดต้นไม้เพื่อดูรายละเอียดและกดรดน้ำ</p>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 ค้นหาชื่อต้นไม้..."
                style={{ padding: "10px 18px", borderRadius: "9999px", border: "none", width: "260px", fontSize: "14px", backgroundColor: "#ffffff" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
              {filteredPlants.map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => handleOpenPlant(plant)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    padding: "16px",
                    border: "1px solid #efe7de",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    style={{ width: "90px", height: "90px", borderRadius: "14px", objectFit: "cover", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 4px 0" }}>{plant.scientificName}</h3>
                    <p style={{ fontSize: "13px", color: "#8c7f7a", margin: "0 0 8px 0" }}>{plant.type} • {plant.location}</p>
                    <div style={{ width: "100%", height: "8px", backgroundColor: "#f1e6ee", borderRadius: "9999px", overflow: "hidden" }}>
                      <div style={{ width: `${plant.health}%`, height: "100%", backgroundColor: "#b983e0" }} />
                    </div>
                    <p style={{ fontSize: "12px", color: "#7f5a83", fontWeight: 700, marginTop: "4px" }}>Health: {plant.health}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. หน้า PLANT PROFILE */}
        {activeScreen === "profile" && (
          <div style={{ maxWidth: "750px", margin: "0 auto" }}>
            <button
              onClick={() => setActiveScreen("my-plants")}
              style={{ background: "none", border: "none", color: "#5c424a", fontWeight: 700, fontSize: "14px", cursor: "pointer", marginBottom: "16px" }}
            >
              ← กลับไปหน้ารายการต้นไม้
            </button>

            <div style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "24px", border: "1px solid #efe7de", display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <img
                src={selectedPlant.image}
                alt={selectedPlant.name}
                style={{ width: "260px", height: "260px", borderRadius: "20px", objectFit: "cover" }}
              />
              <div style={{ flex: 1, minWidth: "250px" }}>
                <span style={{ fontSize: "12px", color: "#b86b82", fontWeight: 700 }}>{selectedPlant.slug}</span>
                <h1 style={{ fontSize: "28px", fontWeight: 800, margin: "4px 0" }}>{selectedPlant.name}</h1>
                <p style={{ fontSize: "14px", color: "#8c7f7a", marginBottom: "16px" }}>
                  {selectedPlant.location} • ❤️ {selectedPlant.status} ({selectedPlant.health}%)
                </p>

                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                  <button
                    onClick={() => handleQuickAction("water")}
                    style={{ flex: 1, backgroundColor: "#F4C4D4", color: "#5e3744", border: "none", padding: "12px", borderRadius: "9999px", fontWeight: 700, cursor: "pointer" }}
                  >
                    💧 Water Now
                  </button>
                  <button
                    onClick={() => handleQuickAction("mist")}
                    style={{ flex: 1, backgroundColor: "#DFC7F2", color: "#4b355c", border: "none", padding: "12px", borderRadius: "9999px", fontWeight: 700, cursor: "pointer" }}
                  >
                    ✨ Mist Now
                  </button>
                </div>

                <div style={{ backgroundColor: "#FCF9F4", padding: "16px", borderRadius: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13px" }}>
                  <div><strong>☀️ Light:</strong> {selectedPlant.light}</div>
                  <div><strong>💧 Water:</strong> {selectedPlant.waterFreq}</div>
                  <div><strong>🌡️ Temp:</strong> {selectedPlant.temp}</div>
                  <div><strong>🪴 Soil:</strong> {selectedPlant.soil}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. หน้า ADD NEW PLANT */}
        {activeScreen === "add-plant" && (
          <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", padding: "28px", borderRadius: "24px", border: "1px solid #efe7de" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "16px" }}>➕ เพิ่มต้นไม้ใหม่เข้าสวน</h1>
            <input
              type="text"
              value={newPlantName}
              onChange={(e) => setNewPlantName(e.target.value)}
              placeholder="พิมพ์ชื่อต้นไม้ เช่น Monstera, Cactus..."
              style={{ width: "100%", padding: "12px 18px", borderRadius: "9999px", border: "1px solid #e0d6cc", backgroundColor: "#FCF9F4", fontSize: "14px", marginBottom: "20px", boxSizing: "border-box" }}
            />

            <p style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px" }}>หรือเลือกจากพันธุ์ยอดนิยม:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
              {[
                { name: "Fiddle Leaf Fig", img: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=300&q=80" },
                { name: "Pilea Peperomioides", img: "https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?auto=format&fit=crop&w=300&q=80" },
                { name: "Snake Plant", img: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=300&q=80" },
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    setSelectedPopular(item.name);
                    setNewPlantName(item.name);
                  }}
                  style={{
                    border: selectedPopular === item.name ? "2px solid #e08ca4" : "1px solid #efe7de",
                    borderRadius: "16px",
                    padding: "8px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <img src={item.img} alt={item.name} style={{ width: "100%", height: "90px", objectFit: "cover", borderRadius: "10px", marginBottom: "6px" }} />
                  <p style={{ fontSize: "12px", fontWeight: 700, margin: 0 }}>{item.name}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddPlant}
              style={{ width: "100%", backgroundColor: "#7f5a83", color: "#ffffff", border: "none", padding: "14px", borderRadius: "9999px", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}
            >
              บันทึกและเพิ่มเข้าสวนของฉัน
            </button>
          </div>
        )}

        {/* 5. หน้า SHOP (ร้านค้าออนไลน์ สั่งซื้อของได้จริง) */}
        {activeScreen === "shop" && (
          <div>
            <div style={{ backgroundColor: "#D4E8D4", padding: "24px", borderRadius: "24px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#2e4d30", margin: 0 }}>🛍️ Plantly Shop</h1>
                <p style={{ fontSize: "14px", color: "#476b47", marginTop: "4px" }}>เลือกซื้อต้นไม้ฟอกอากาศ กระถาง และอุปกรณ์ดูแล</p>
              </div>
              <button
                onClick={() => setActiveScreen("cart")}
                style={{ backgroundColor: "#ffffff", color: "#2e4d30", border: "none", padding: "10px 20px", borderRadius: "9999px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
              >
                🛒 ดูตะกร้าสินค้า ({totalCartItems})
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px" }}>
              {SHOP_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    padding: "14px",
                    border: "1px solid #e8efe8",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{ width: "100%", height: "170px", objectFit: "cover", borderRadius: "14px", marginBottom: "10px" }}
                    />
                    <span style={{ fontSize: "11px", color: "#059669", fontWeight: 700 }}>{prod.category}</span>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "4px 0" }}>{prod.name}</h3>
                    <p style={{ fontSize: "16px", fontWeight: 800, color: "#7f5a83", margin: "4px 0 12px 0" }}>฿{prod.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(prod)}
                    style={{ width: "100%", backgroundColor: "#B7D7B8", color: "#2e4d30", border: "none", padding: "10px", borderRadius: "12px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
                  >
                    + เพิ่มลงตะกร้า
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. หน้า CART (ตะกร้าสินค้าและการสั่งซื้อ) */}
        {activeScreen === "cart" && (
          <div style={{ maxWidth: "650px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <button
                onClick={() => setActiveScreen("shop")}
                style={{ background: "none", border: "none", color: "#6e4d3b", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
              >
                ← กลับไปเลือกซื้อสินค้า
              </button>
              <h1 style={{ fontSize: "22px", fontWeight: 800, margin: 0 }}>🛒 ตะกร้าสินค้าของฉัน</h1>
            </div>

            {cart.length === 0 ? (
              <div style={{ backgroundColor: "#ffffff", padding: "48px", borderRadius: "24px", textAlign: "center", border: "1px solid #efe7de" }}>
                <p style={{ fontSize: "40px", margin: "0 0 12px 0" }}>🛒</p>
                <p style={{ color: "#8c7f7a", marginBottom: "16px" }}>ยังไม่มีสินค้าในตะกร้าของคุณ</p>
                <button
                  onClick={() => setActiveScreen("shop")}
                  style={{ backgroundColor: "#D4E8D4", color: "#2e4d30", border: "none", padding: "10px 24px", borderRadius: "9999px", fontWeight: 700, cursor: "pointer" }}
                >
                  ไปที่ร้านค้า
                </button>
              </div>
            ) : (
              <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "24px", border: "1px solid #efe7de" }}>
                {cart.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    style={{ display: "flex", alignItems: "center", gap: "16px", paddingBottom: "16px", marginBottom: "16px", borderBottom: "1px solid #f0e8df" }}
                  >
                    <img src={item.image} alt={item.name} style={{ width: "64px", height: "64px", borderRadius: "12px", objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 4px 0" }}>{item.name}</h4>
                      <p style={{ fontSize: "14px", color: "#7f5a83", fontWeight: 700, margin: 0 }}>฿{item.price * quantity}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", fontWeight: 700, cursor: "pointer" }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 700 }}>{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", fontWeight: 700, cursor: "pointer" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "18px", fontWeight: 800, marginBottom: "20px" }}>
                  <span>ยอดรวมสุทธิ:</span>
                  <span style={{ color: "#7f5a83", fontSize: "22px" }}>฿{totalPrice}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  style={{ width: "100%", backgroundColor: "#7f5a83", color: "#ffffff", border: "none", padding: "14px", borderRadius: "9999px", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}
                >
                  ยืนยันการสั่งซื้อสินค้า (Checkout)
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
