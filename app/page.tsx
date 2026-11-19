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
    slug: "pink_orchid",
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
    health: 92,
    nextWater: "2 days",
    nextMist: "4 hours",
    light: "Low to Medium",
    waterFreq: "Twice a Week",
    temp: "18-25°C",
    soil: "Rich Moist Soil",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "4",
    slug: "hydrangea",
    name: "Hydrangea",
    scientificName: "Hydrangea Macrophylla",
    location: "Balcony",
    category: "Flowers",
    status: "Blooming 🌸",
    health: 95,
    nextWater: "1 day",
    nextMist: "5 hours",
    light: "Morning Sun",
    waterFreq: "Every 2 Days",
    temp: "16-24°C",
    soil: "Moist Loamy Soil",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "5",
    slug: "snake_plant",
    name: "Snake Plant",
    scientificName: "Sansevieria Trifasciata",
    location: "Living Room",
    category: "Indoor",
    status: "Healthy",
    health: 89,
    nextWater: "2 days",
    nextMist: "3 days",
    light: "Low to Bright",
    waterFreq: "Every 2 Weeks",
    temp: "16-27°C",
    soil: "Sandy / Cactus",
    image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "6",
    slug: "pilea_peperomioides",
    name: "Pilea",
    scientificName: "Pilea Peperomioides",
    location: "Living Room",
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
  },
];

const SHOP_PRODUCTS: ShopItem[] = [
  {
    id: "p1",
    name: "Pink Moth Orchid",
    category: "Flowers 🌸",
    price: 590,
    image: "https://images.unsplash.com/photo-1566924962158-6e595e5b7391?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p2",
    name: "Pastel Hydrangea",
    category: "Flowers 🌸",
    price: 650,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p3",
    name: "Peace Lily",
    category: "Flowers 🌸",
    price: 350,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p4",
    name: "Monstera Albo",
    category: "Indoor 🌿",
    price: 890,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p5",
    name: "Pink & Lilac Pot",
    category: "Pots 🪴",
    price: 240,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p6",
    name: "Flower Bloom Mist",
    category: "Care 🧴",
    price: 190,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
  },
];

type ScreenType = "dashboard" | "my-plants" | "profile" | "add-plant" | "shop" | "cart" | "tips" | "account";

export default function PlantlyPastelApp() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("dashboard");
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [selectedPlant, setSelectedPlant] = useState<Plant>(INITIAL_PLANTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [plantFilter, setPlantFilter] = useState<"All" | "Flowers" | "Indoor">("All");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName] = useState("Alex");
  const [customerAddress, setCustomerAddress] = useState("123/45 ถนนจรดวิถีถ่อง อ.เมือง จ.สุโขทัย 64000");
  const [orders, setOrders] = useState<{ id: string; total: number; count: number }[]>([]);

  const [newPlantName, setNewPlantName] = useState("");
  const [newPlantCategory, setNewPlantCategory] = useState<"Flowers" | "Indoor">("Flowers");
  const [selectedPopular, setSelectedPopular] = useState<{
    name: string;
    cat: "Flowers" | "Indoor";
    img: string;
  } | null>(null);

  const notify = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const openPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setActiveScreen("profile");
  };

  const handleCare = (type: "water" | "mist") => {
    const updatedList = plants.map((p) => {
      if (p.id === selectedPlant.id) {
        const next = {
          ...p,
          health: Math.min(100, p.health + 3),
          nextWater: type === "water" ? "7 days" : p.nextWater,
          nextMist: type === "mist" ? "24 hours" : p.nextMist,
        };
        setSelectedPlant(next);
        return next;
      }
      return p;
    });
    setPlants(updatedList);
    notify(
      type === "water"
        ? `💧 รดน้ำ ${selectedPlant.name} แล้ว (+3%)`
        : `✨ พ่นหมอกให้ ${selectedPlant.name} แล้ว (+3%)`
    );
  };

  const addToCart = (item: ShopItem) => {
    setCart((prev) => {
      const found = prev.find((c) => c.item.id === item.id);
      if (found) {
        return prev.map((c) => (c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { item, quantity: 1 }];
    });
    notify(`🛒 เพิ่ม "${item.name}" แล้ว`);
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const subtotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 1000 ? 0 : 45;
  const total = subtotal + shipping;
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const checkout = () => {
    if (cart.length === 0) return;
    const orderId = `PL-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrders([{ id: orderId, total, count: cartCount }, ...orders]);
    setCart([]);
    notify(`🎉 สั่งซื้อสำเร็จ! เลขที่ ${orderId}`);
    setActiveScreen("account");
  };

  const addNewPlant = () => {
    const finalName = newPlantName.trim() || selectedPopular?.name || "Pink Orchid";
    const finalImg =
      selectedPopular?.img ||
      (newPlantCategory === "Flowers"
        ? "https://images.unsplash.com/photo-1566924962158-6e595e5b7391?auto=format&fit=crop&w=600&q=80"
        : "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80");

    const created: Plant = {
      id: Date.now().toString(),
      slug: finalName.toLowerCase().replace(/\s+/g, "_"),
      name: finalName,
      scientificName: finalName,
      location: "Living Room",
      category: newPlantCategory,
      status: newPlantCategory === "Flowers" ? "Blooming 🌸" : "Healthy",
      health: 95,
      nextWater: "2 days",
      nextMist: "6 hours",
      light: "Bright Indirect",
      waterFreq: "Weekly",
      temp: "18-25°C",
      soil: newPlantCategory === "Flowers" ? "Orchid & Bloom Mix" : "Well-Draining",
      image: finalImg,
    };

    setPlants([created, ...plants]);
    setNewPlantName("");
    setSelectedPopular(null);
    notify(`🌸 เพิ่ม "${finalName}" เข้าสวนแล้ว`);
    setActiveScreen("dashboard");
  };

  const filteredPlants = plants.filter((p) => {
    const matchText =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = plantFilter === "All" || p.category === plantFilter;
    return matchText && matchCat;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(155deg, #FDF2F7 0%, #F7EEFC 55%, #FFF8FA 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px 12px",
        boxSizing: "border-box",
      }}
    >
      {/* การ์ดแอปโทนชมพู-ม่วงพาสเทลน่ารักละมุน */}
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          minHeight: "760px",
          background: "linear-gradient(180deg, #FFFBFD 0%, #FCF5FC 100%)",
          borderRadius: "30px",
          boxShadow: "0 20px 46px rgba(176, 118, 166, 0.16)",
          border: "1.5px solid #F6D8EA",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* แจ้งเตือนลอยด้านบน */}
        {toastMsg && (
          <div
            style={{
              position: "fixed",
              top: "18px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 999,
              background: "linear-gradient(135deg, #C96FA1 0%, #9E74C7 100%)",
              color: "#ffffff",
              padding: "9px 18px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 700,
              boxShadow: "0 8px 20px rgba(158, 116, 199, 0.3)",
              whiteSpace: "nowrap",
            }}
          >
            {toastMsg}
          </div>
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* =========================================================
              1. DASHBOARD
          ========================================================= */}
          {activeScreen === "dashboard" && (
            <>
              {/* Header ชมพู-ม่วงพาสเทล */}
              <div
                style={{
                  background: "linear-gradient(125deg, #FBC8DC 0%, #E7C8F5 100%)",
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255,255,255,0.75)",
                }}
              >
                <div
                  onClick={() => setActiveScreen("dashboard")}
                  style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                >
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "9999px",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      boxShadow: "0 3px 8px rgba(186, 118, 168, 0.2)",
                    }}
                  >
                    🌸
                  </span>
                  <span style={{ fontSize: "17px", fontWeight: 800, color: "#4D3248", letterSpacing: "-0.3px" }}>
                    Plantly
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {cartCount > 0 && (
                    <button
                      onClick={() => setActiveScreen("cart")}
                      style={{
                        backgroundColor: "#ffffff",
                        color: "#8A56A8",
                        border: "1px solid #EBD6F7",
                        borderRadius: "9999px",
                        padding: "4px 10px",
                        fontSize: "11px",
                        fontWeight: 800,
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(138,86,168,0.1)",
                      }}
                    >
                      🛒 {cartCount}
                    </button>
                  )}
                  <img
                    onClick={() => setActiveScreen("account")}
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="Alex"
                    style={{
                      width: "33px",
                      height: "33px",
                      borderRadius: "9999px",
                      objectFit: "cover",
                      border: "2px solid #ffffff",
                      boxShadow: "0 3px 8px rgba(158, 116, 199, 0.2)",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>

              <div style={{ padding: "18px 18px 14px 18px" }}>
                <h1 style={{ fontSize: "21px", fontWeight: 800, color: "#432D42", margin: "0 0 14px 0" }}>
                  Good Morning, {customerName}! ✨
                </h1>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#5E435C", margin: 0 }}>
                    My Plant Corner
                  </h2>
                  <button
                    onClick={() => setActiveScreen("add-plant")}
                    style={{
                      backgroundColor: "#FCE5F0",
                      border: "1px solid #F6C5DC",
                      borderRadius: "9999px",
                      color: "#B85284",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: "4px 10px",
                    }}
                  >
                    + Add Plant
                  </button>
                </div>

                {/* การ์ดต้นไม้และดอกไม้ 2x2 โทนชมพู-ม่วงพาสเทล */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {plants.slice(0, 4).map((plant, idx) => (
                    <div
                      key={plant.id}
                      onClick={() => openPlant(plant)}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "18px",
                        padding: "9px",
                        border: idx % 2 === 0 ? "1px solid #F7DCEB" : "1px solid #EADAF7",
                        boxShadow: "0 6px 16px rgba(176, 118, 166, 0.08)",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        style={{
                          width: "100%",
                          height: "96px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          marginBottom: "8px",
                        }}
                      />
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#432D42", marginBottom: "2px" }}>
                        {plant.name}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: plant.category === "Flowers" ? "#C95B8E" : "#8B63B5",
                          fontWeight: 600,
                          marginBottom: "2px",
                        }}
                      >
                        • {plant.status}
                      </div>
                      <div style={{ fontSize: "10px", color: "#977D95" }}>💧 Water in {plant.nextWater}</div>
                    </div>
                  ))}
                </div>

                {/* Upcoming Tasks โทนชมพูและม่วงพาสเทล */}
                <div style={{ marginTop: "18px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#5E435C", marginBottom: "8px" }}>
                    Upcoming Tasks:
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button
                      onClick={() => notify("💧 รดน้ำ Monstera เรียบร้อยแล้ว!")}
                      style={{
                        backgroundColor: "#FCE3F0",
                        color: "#874368",
                        border: "1px solid #F4C3DC",
                        borderRadius: "9999px",
                        padding: "8px 14px",
                        fontSize: "12px",
                        fontWeight: 600,
                        textAlign: "left",
                        cursor: "pointer",
                        boxShadow: "0 3px 8px rgba(201, 91, 142, 0.08)",
                      }}
                    >
                      💧 Water Monstera
                    </button>
                    <button
                      onClick={() => notify("✨ พ่นหมอกให้ Pink Orchid เรียบร้อยแล้ว!")}
                      style={{
                        backgroundColor: "#ECE0FA",
                        color: "#5D427D",
                        border: "1px solid #D7C2F2",
                        borderRadius: "9999px",
                        padding: "8px 14px",
                        fontSize: "12px",
                        fontWeight: 600,
                        textAlign: "left",
                        cursor: "pointer",
                        boxShadow: "0 3px 8px rgba(139, 99, 181, 0.08)",
                      }}
                    >
                      ✨ Mist Pink Orchid
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* =========================================================
              2. MY PLANTS
          ========================================================= */}
          {activeScreen === "my-plants" && (
            <>
              <div
                style={{
                  background: "linear-gradient(125deg, #F6C9DE 0%, #E1C5F5 100%)",
                  padding: "16px 18px",
                }}
              >
                <div style={{ textAlign: "center", fontSize: "16px", fontWeight: 800, color: "#4D3248", marginBottom: "10px" }}>
                  🌸 My Plants ({filteredPlants.length})
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search plants or flowers..."
                  style={{
                    width: "100%",
                    padding: "8px 14px",
                    borderRadius: "9999px",
                    border: "1px solid #F2D6EA",
                    fontSize: "12px",
                    backgroundColor: "rgba(255,255,255,0.92)",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ display: "flex", gap: "6px", marginTop: "10px", justifyContent: "center" }}>
                  {[
                    { id: "All", label: "All" },
                    { id: "Flowers", label: "🌸 Flowers" },
                    { id: "Indoor", label: "💜 Indoor" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setPlantFilter(f.id as "All" | "Flowers" | "Indoor")}
                      style={{
                        backgroundColor: plantFilter === f.id ? "#A464B8" : "rgba(255,255,255,0.75)",
                        color: plantFilter === f.id ? "#ffffff" : "#4D3248",
                        border: "none",
                        borderRadius: "9999px",
                        padding: "5px 12px",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {filteredPlants.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => openPlant(p)}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "18px",
                      padding: "10px",
                      border: "1px solid #F4DCEF",
                      boxShadow: "0 5px 14px rgba(176, 118, 166, 0.07)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: "64px", height: "64px", borderRadius: "13px", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", fontWeight: 800, color: "#432D42" }}>{p.name}</span>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            backgroundColor: p.category === "Flowers" ? "#FCE3F0" : "#ECE0FA",
                            color: p.category === "Flowers" ? "#B85284" : "#6A4791",
                          }}
                        >
                          {p.category === "Flowers" ? "🌸 Flower" : "💜 Leaf"}
                        </span>
                      </div>
                      <div style={{ fontSize: "11px", color: "#977D95", margin: "2px 0 6px 0" }}>{p.location}</div>
                      <div style={{ width: "100%", height: "6px", backgroundColor: "#F6E8FA", borderRadius: "9999px", overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${p.health}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #F09CC4 0%, #B482E0 100%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* =========================================================
              3. PLANT PROFILE
          ========================================================= */}
          {activeScreen === "profile" && (
            <div style={{ padding: "16px 18px" }}>
              <button
                onClick={() => setActiveScreen("dashboard")}
                style={{ background: "none", border: "none", color: "#9C5B86", fontWeight: 700, fontSize: "12px", cursor: "pointer", marginBottom: "8px", padding: 0 }}
              >
                ← Back
              </button>

              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#432D42", margin: "0 0 2px 0" }}>{selectedPlant.name}</h1>
              <p style={{ fontSize: "12px", color: "#977D95", margin: "0 0 12px 0" }}>
                {selectedPlant.scientificName} • {selectedPlant.location}
              </p>

              <div style={{ width: "100%", height: "185px", borderRadius: "20px", overflow: "hidden", position: "relative", marginBottom: "14px", boxShadow: "0 8px 18px rgba(176, 118, 166, 0.14)" }}>
                <img src={selectedPlant.image} alt={selectedPlant.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: "10px", left: "10px", backgroundColor: "rgba(92, 56, 89, 0.86)", color: "#fff", padding: "4px 11px", borderRadius: "9999px", fontSize: "11px", fontWeight: 600 }}>
                  💖 {selectedPlant.status} ({selectedPlant.health}%)
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                <button
                  onClick={() => handleCare("water")}
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #FBC7DE 0%, #F5ACC9 100%)",
                    color: "#5E2E49",
                    border: "none",
                    borderRadius: "9999px",
                    padding: "10px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  💧 Water Now
                </button>
                <button
                  onClick={() => handleCare("mist")}
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #E5C9F7 0%, #CFA9EB 100%)",
                    color: "#4C3366",
                    border: "none",
                    borderRadius: "9999px",
                    padding: "10px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  ✨ Mist Now
                </button>
              </div>

              <div style={{ backgroundColor: "#ffffff", borderRadius: "18px", padding: "14px", border: "1px solid #F4DCEF", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px", color: "#5E435C" }}>
                <div>
                  <strong>☀️ Light:</strong> <span style={{ color: "#8F748D" }}>{selectedPlant.light}</span>
                </div>
                <div>
                  <strong>💧 Water:</strong> <span style={{ color: "#8F748D" }}>{selectedPlant.waterFreq}</span>
                </div>
                <div>
                  <strong>🌡️ Temp:</strong> <span style={{ color: "#8F748D" }}>{selectedPlant.temp}</span>
                </div>
                <div>
                  <strong>🪴 Soil:</strong> <span style={{ color: "#8F748D" }}>{selectedPlant.soil}</span>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              4. ADD NEW PLANT
          ========================================================= */}
          {activeScreen === "add-plant" && (
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <h1 style={{ fontSize: "17px", fontWeight: 800, color: "#432D42", margin: 0 }}>Add New Plant 🌸</h1>
                <button
                  onClick={() => setActiveScreen("dashboard")}
                  style={{ background: "none", border: "none", fontSize: "12px", fontWeight: 700, color: "#977D95", cursor: "pointer" }}
                >
                  ✕ Close
                </button>
              </div>

              <input
                type="text"
                value={newPlantName}
                onChange={(e) => setNewPlantName(e.target.value)}
                placeholder="พิมพ์ชื่อต้นไม้ หรือต้นดอกไม้..."
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "9999px",
                  border: "1px solid #F0D2E8",
                  backgroundColor: "#ffffff",
                  fontSize: "12px",
                  marginBottom: "12px",
                  boxSizing: "border-box",
                }}
              />

              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                <button
                  onClick={() => setNewPlantCategory("Flowers")}
                  style={{
                    flex: 1,
                    padding: "7px",
                    borderRadius: "9999px",
                    border: "1px solid #F3C4DC",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    backgroundColor: newPlantCategory === "Flowers" ? "#FAD0E4" : "#FFF7FB",
                    color: "#7A3B5D",
                  }}
                >
                  🌸 ต้นดอกไม้
                </button>
                <button
                  onClick={() => setNewPlantCategory("Indoor")}
                  style={{
                    flex: 1,
                    padding: "7px",
                    borderRadius: "9999px",
                    border: "1px solid #D9C2F2",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    backgroundColor: newPlantCategory === "Indoor" ? "#E6D2FA" : "#F9F4FF",
                    color: "#573B78",
                  }}
                >
                  💜 ไม้ประดับ
                </button>
              </div>

              <div style={{ fontSize: "12px", fontWeight: 700, color: "#5E435C", marginBottom: "8px" }}>Most Popular:</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "18px" }}>
                {[
                  { name: "Pink Orchid", cat: "Flowers" as const, img: "https://images.unsplash.com/photo-1566924962158-6e595e5b7391?auto=format&fit=crop&w=300&q=80" },
                  { name: "Hydrangea", cat: "Flowers" as const, img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=300&q=80" },
                  { name: "Monstera", cat: "Indoor" as const, img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=300&q=80" },
                ].map((pop) => (
                  <div
                    key={pop.name}
                    onClick={() => {
                      setSelectedPopular(pop);
                      setNewPlantName(pop.name);
                      setNewPlantCategory(pop.cat);
                    }}
                    style={{
                      backgroundColor: "#ffffff",
                      border: selectedPopular?.name === pop.name ? "2px solid #D97BB0" : "1px solid #F4DCEF",
                      borderRadius: "14px",
                      padding: "6px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img src={pop.img} alt={pop.name} style={{ width: "100%", height: "66px", objectFit: "cover", borderRadius: "9px", marginBottom: "4px" }} />
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "#432D42" }}>{pop.name}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={addNewPlant}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #D97BB0 0%, #A575CF 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "12px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 6px 16px rgba(165, 117, 207, 0.28)",
                }}
              >
                Save & Add to My Plants
              </button>
            </div>
          )}

          {/* =========================================================
              5. SHOP
          ========================================================= */}
          {activeScreen === "shop" && (
            <>
              <div
                style={{
                  background: "linear-gradient(125deg, #FBC8DC 0%, #E7C8F5 100%)",
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#4D3248" }}>🛍️ Plantly Shop</div>
                  <div style={{ fontSize: "11px", color: "#7D5275" }}>ดอกไม้พาสเทล & กระถางน่ารัก</div>
                </div>
                <button
                  onClick={() => setActiveScreen("cart")}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#8A56A8",
                    border: "1px solid #EBD6F7",
                    borderRadius: "9999px",
                    padding: "6px 12px",
                    fontSize: "11px",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  🛒 Cart ({cartCount})
                </button>
              </div>

              <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {SHOP_PRODUCTS.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "18px",
                      padding: "8px",
                      border: "1px solid #F4DCEF",
                      boxShadow: "0 5px 14px rgba(176, 118, 166, 0.07)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "92px", objectFit: "cover", borderRadius: "12px", marginBottom: "6px" }} />
                      <div style={{ fontSize: "10px", color: "#C95B8E", fontWeight: 700 }}>{item.category}</div>
                      <div style={{ fontSize: "12px", fontWeight: 800, color: "#432D42", margin: "2px 0" }}>{item.name}</div>
                      <div style={{ fontSize: "13px", fontWeight: 800, color: "#8E5BB8" }}>฿{item.price}</div>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        width: "100%",
                        background: "linear-gradient(135deg, #FAD0E4 0%, #E7D0FA 100%)",
                        color: "#533459",
                        border: "none",
                        borderRadius: "11px",
                        padding: "7px",
                        fontSize: "11px",
                        fontWeight: 700,
                        marginTop: "8px",
                        cursor: "pointer",
                      }}
                    >
                      + Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* =========================================================
              6. CART
          ========================================================= */}
          {activeScreen === "cart" && (
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <button
                  onClick={() => setActiveScreen("shop")}
                  style={{ background: "none", border: "none", color: "#9C5B86", fontWeight: 700, fontSize: "12px", cursor: "pointer", padding: 0 }}
                >
                  ← Shop
                </button>
                <div style={{ fontSize: "15px", fontWeight: 800, color: "#432D42" }}>🛒 Your Cart</div>
                <div style={{ width: "30px" }} />
              </div>

              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 10px", color: "#977D95", fontSize: "13px" }}>
                  <div style={{ fontSize: "34px", marginBottom: "8px" }}>🌸</div>
                  ตะกร้ายังว่างอยู่ครับ
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
                    {cart.map(({ item, quantity }) => (
                      <div
                        key={item.id}
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: "16px",
                          padding: "10px",
                          border: "1px solid #F4DCEF",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img src={item.image} alt={item.name} style={{ width: "46px", height: "46px", borderRadius: "11px", objectFit: "cover" }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "12px", fontWeight: 700, color: "#432D42" }}>{item.name}</div>
                          <div style={{ fontSize: "12px", fontWeight: 800, color: "#8E5BB8" }}>฿{item.price * quantity}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <button
                            onClick={() => changeQty(item.id, -1)}
                            style={{ width: "24px", height: "24px", borderRadius: "9999px", border: "1px solid #EBD0E4", background: "#FFF9FC", fontWeight: 700, color: "#7A3B5D", cursor: "pointer" }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#432D42" }}>{quantity}</span>
                          <button
                            onClick={() => changeQty(item.id, 1)}
                            style={{ width: "24px", height: "24px", borderRadius: "9999px", border: "1px solid #EBD0E4", background: "#FFF9FC", fontWeight: 700, color: "#7A3B5D", cursor: "pointer" }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ backgroundColor: "#ffffff", borderRadius: "18px", padding: "12px", border: "1px solid #F4DCEF", marginBottom: "12px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#5E435C", marginBottom: "6px" }}>📍 ที่อยู่จัดส่ง:</div>
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      style={{ width: "100%", padding: "7px 10px", borderRadius: "10px", border: "1px solid #F0D2E8", fontSize: "11px", color: "#432D42", boxSizing: "border-box" }}
                    />
                  </div>

                  <div style={{ backgroundColor: "#ffffff", borderRadius: "18px", padding: "14px", border: "1px solid #F4DCEF" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#977D95", marginBottom: "4px" }}>
                      <span>ค่าสินค้า:</span>
                      <span>฿{subtotal}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#977D95", marginBottom: "8px" }}>
                      <span>ค่าจัดส่ง:</span>
                      <span>{shipping === 0 ? "ฟรี" : `฿${shipping}`}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 800, color: "#432D42", paddingTop: "8px", borderTop: "1px dashed #F0D2E8", marginBottom: "12px" }}>
                      <span>ยอดรวม:</span>
                      <span style={{ color: "#8E5BB8" }}>฿{total}</span>
                    </div>
                    <button
                      onClick={checkout}
                      style={{
                        width: "100%",
                        background: "linear-gradient(135deg, #D97BB0 0%, #A575CF 100%)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "9999px",
                        padding: "11px",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      ยืนยันการสั่งซื้อ (฿{total})
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* =========================================================
              7. TIPS
          ========================================================= */}
          {activeScreen === "tips" && (
            <div style={{ padding: "16px 18px" }}>
              <h1 style={{ fontSize: "18px", fontWeight: 800, color: "#432D42", margin: "0 0 12px 0" }}>💡 Care Tips</h1>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { title: "🌸 ดูแลกล้วยไม้ให้ออกดอกสวย", detail: "รับแสงรำไร รดน้ำเมื่อเครื่องปลูกเริ่มแห้ง และให้ปุ๋ยบำรุงดอกสัปดาห์ละครั้ง" },
                  { title: "💜 พ่นหมอกเพิ่มความสดชื่น", detail: "ช่วยเพิ่มความชื้นให้ดอกไม้และใบไม้ดูเงางามน่ารัก" },
                  { title: "☀️ หลีกเลี่ยงแดดบ่ายจัด", detail: "ไม้ดอกและไม้ประดับพาสเทลจะไม่กลีบช้ำหรือใบไหม้" },
                ].map((t, i) => (
                  <div key={i} style={{ backgroundColor: "#ffffff", borderRadius: "18px", padding: "12px", border: "1px solid #F4DCEF", boxShadow: "0 4px 12px rgba(176, 118, 166, 0.06)" }}>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#432D42", marginBottom: "4px" }}>{t.title}</div>
                    <div style={{ fontSize: "12px", color: "#8F748D", lineHeight: 1.45 }}>{t.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              8. ACCOUNT / PROFILE & ORDERS
          ========================================================= */}
          {activeScreen === "account" && (
            <div style={{ padding: "16px 18px" }}>
              <h1 style={{ fontSize: "18px", fontWeight: 800, color: "#432D42", margin: "0 0 12px 0" }}>👤 Profile</h1>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "18px", padding: "14px", border: "1px solid #F4DCEF", display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Alex"
                  style={{ width: "48px", height: "48px", borderRadius: "9999px", objectFit: "cover", border: "2px solid #F8CCE4" }}
                />
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 800, color: "#432D42" }}>{customerName}</div>
                  <div style={{ fontSize: "11px", color: "#977D95" }}>Plants & Flowers: {plants.length}</div>
                </div>
              </div>

              <div style={{ fontSize: "13px", fontWeight: 700, color: "#5E435C", marginBottom: "8px" }}>📦 Order History ({orders.length})</div>
              {orders.length === 0 ? (
                <div style={{ backgroundColor: "#ffffff", borderRadius: "18px", padding: "20px", border: "1px solid #F4DCEF", textAlign: "center", fontSize: "12px", color: "#977D95" }}>
                  ยังไม่มีประวัติการสั่งซื้อ
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {orders.map((o) => (
                    <div key={o.id} style={{ backgroundColor: "#ffffff", borderRadius: "15px", padding: "10px 12px", border: "1px solid #F4DCEF", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                      <div>
                        <strong>{o.id}</strong> • {o.count} ชิ้น
                      </div>
                      <span style={{ color: "#9C5BB8", fontWeight: 800 }}>฿{o.total}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* แถบเมนูด้านล่างโทนชมพู-ม่วงพาสเทล */}
        <div
          style={{
            background: "linear-gradient(125deg, #FBC8DC 0%, #E7C8F5 100%)",
            padding: "8px 10px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.75)",
          }}
        >
          {[
            { id: "dashboard", label: "Home", icon: "🏠", active: activeScreen === "dashboard" },
            {
              id: "my-plants",
              label: "My Plants",
              icon: "🌸",
              active: activeScreen === "my-plants" || activeScreen === "profile" || activeScreen === "add-plant",
            },
            { id: "shop", label: "Shop", icon: "🛍️", active: activeScreen === "shop" || activeScreen === "cart" },
            { id: "tips", label: "Tips", icon: "💡", active: activeScreen === "tips" },
            { id: "account", label: "Profile", icon: "👤", active: activeScreen === "account" },
          ].map((nav) => (
            <button
              key={nav.id}
              onClick={() => setActiveScreen(nav.id as ScreenType)}
              style={{
                background: nav.active ? "rgba(255,255,255,0.72)" : "none",
                border: "none",
                borderRadius: "13px",
                padding: "4px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                cursor: "pointer",
                color: nav.active ? "#4D2C49" : "#7D5275",
                boxShadow: nav.active ? "0 2px 6px rgba(158, 116, 199, 0.14)" : "none",
              }}
            >
              <span style={{ fontSize: "15px" }}>{nav.icon}</span>
              <span style={{ fontSize: "10px", fontWeight: nav.active ? 800 : 600 }}>{nav.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
