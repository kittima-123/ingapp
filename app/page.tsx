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
    status: "Healthy ♡",
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
    health: 93,
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
    status: "Healthy ♡",
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
    status: "Healthy ♡",
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
    name: "Peace Lily Bloom",
    category: "Flowers 🌸",
    price: 350,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p4",
    name: "Monstera Albo",
    category: "Indoor ♡",
    price: 890,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p5",
    name: "Rose Coral Pot",
    category: "Pots 🪴",
    price: 240,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p6",
    name: "Pilea Baby",
    category: "Indoor ♡",
    price: 290,
    image: "https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?auto=format&fit=crop&w=600&q=80",
  },
];

type ScreenType = "dashboard" | "my-plants" | "profile" | "add-plant" | "shop" | "cart" | "tips" | "account";

export default function PlantlyPinkCoralApp() {
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
      status: newPlantCategory === "Flowers" ? "Blooming 🌸" : "Healthy ♡",
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

  const scallopedEdge: React.CSSProperties = {
    height: "9px",
    width: "100%",
    backgroundImage: "radial-gradient(circle at 9px 0, #FBC6C6 9px, transparent 10px)",
    backgroundSize: "18px 9px",
    opacity: 0.85,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "radial-gradient(circle at top left, #FFEBF0 0%, #FFE4E6 52%, #FFF7F8 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "18px 12px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          minHeight: "768px",
          background: "linear-gradient(180deg, #FFFDFD 0%, #FFF3F5 100%)",
          borderRadius: "34px",
          boxShadow: "0 24px 56px rgba(196, 98, 118, 0.18), 0 0 0 2px #FAD6DC",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {toastMsg && (
          <div
            style={{
              position: "fixed",
              top: "18px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 999,
              background: "linear-gradient(135deg, #E26B8A 0%, #D96565 100%)",
              color: "#ffffff",
              padding: "9px 18px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 700,
              boxShadow: "0 10px 24px rgba(217, 101, 101, 0.32)",
              whiteSpace: "nowrap",
            }}
          >
            {toastMsg}
          </div>
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {activeScreen === "dashboard" && (
            <>
              <div>
                <div
                  style={{
                    background: "linear-gradient(125deg, #FFC2D4 0%, #FBBAB8 100%)",
                    padding: "15px 18px 12px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    onClick={() => setActiveScreen("dashboard")}
                    style={{ display: "flex", alignItems: "center", gap: "9px", cursor: "pointer" }}
                  >
                    <span
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "14px",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "17px",
                        boxShadow: "0 4px 10px rgba(196, 88, 108, 0.22)",
                        border: "1.5px solid #FFE0E6",
                      }}
                    >
                      🌺
                    </span>
                    <div>
                      <div style={{ fontSize: "17px", fontWeight: 800, color: "#4D2832", lineHeight: 1.1 }}>
                        Plantly ♡
                      </div>
                      <div style={{ fontSize: "9px", fontWeight: 800, color: "#964A5B", letterSpacing: "0.5px" }}>
                        PINK CORAL
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {cartCount > 0 && (
                      <button
                        onClick={() => setActiveScreen("cart")}
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#C44D67",
                          border: "1.5px solid #FAD0D8",
                          borderRadius: "9999px",
                          padding: "5px 11px",
                          fontSize: "11px",
                          fontWeight: 800,
                          cursor: "pointer",
                          boxShadow: "0 3px 8px rgba(196, 77, 103, 0.14)",
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
                        width: "34px",
                        height: "34px",
                        borderRadius: "9999px",
                        objectFit: "cover",
                        border: "2.5px solid #ffffff",
                        boxShadow: "0 4px 10px rgba(196, 88, 108, 0.24)",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
                <div style={scallopedEdge} />
              </div>

              <div style={{ padding: "14px 18px 16px 18px" }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #FFF0F3 0%, #FFEAE9 100%)",
                    borderRadius: "22px",
                    padding: "12px 14px",
                    border: "1.5px dashed #F5C0C8",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h1 style={{ fontSize: "19px", fontWeight: 800, color: "#4A2630", margin: "0 0 2px 0" }}>
                      Good Morning, {customerName}! 🌸
                    </h1>
                    <div style={{ fontSize: "11px", color: "#996874", fontWeight: 600 }}>
                      ส่งความรักให้ต้นไม้และดอกไม้กันนะ ♡
                    </div>
                  </div>
                  <span
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#D14968",
                      border: "1px solid #F9CCD4",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "5px 10px",
                      borderRadius: "9999px",
                      boxShadow: "0 2px 8px rgba(209, 73, 104, 0.12)",
                    }}
                  >
                    ♡ {plants.length}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "11px",
                  }}
                >
                  <h2 style={{ fontSize: "14px", fontWeight: 800, color: "#5E3540", margin: 0 }}>
                    My Plant Corner ✨
                  </h2>
                  <button
                    onClick={() => setActiveScreen("add-plant")}
                    style={{
                      background: "linear-gradient(135deg, #FFDEE6 0%, #FFD6D4 100%)",
                      border: "1px solid #F5BAC5",
                      borderRadius: "9999px",
                      color: "#C44362",
                      fontSize: "11px",
                      fontWeight: 800,
                      cursor: "pointer",
                      padding: "4px 11px",
                      boxShadow: "0 2px 6px rgba(196, 67, 98, 0.1)",
                    }}
                  >
                    + Add Plant
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {plants.slice(0, 4).map((plant, idx) => (
                    <div
                      key={plant.id}
                      onClick={() => openPlant(plant)}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "22px",
                        padding: "8px",
                        border: idx % 2 === 0 ? "1.5px solid #FAD2DC" : "1.5px solid #F9CECC",
                        boxShadow: "0 8px 18px rgba(196, 98, 118, 0.09)",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        style={{
                          width: "100%",
                          height: "94px",
                          objectFit: "cover",
                          borderRadius: "16px",
                          marginBottom: "7px",
                        }}
                      />
                      <div style={{ padding: "0 3px 2px 3px" }}>
                        <div style={{ fontSize: "13px", fontWeight: 800, color: "#4A2630", marginBottom: "3px" }}>
                          {plant.name}
                        </div>
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: "10px",
                            color: plant.category === "Flowers" ? "#D14669" : "#C95A5A",
                            backgroundColor: plant.category === "Flowers" ? "#FFE4EC" : "#FFE4E3",
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            fontWeight: 700,
                            marginBottom: "4px",
                          }}
                        >
                          {plant.status}
                        </span>
                        <div style={{ fontSize: "10px", color: "#996E79", fontWeight: 600 }}>
                          💧 Water in {plant.nextWater}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 800, color: "#5E3540", marginBottom: "8px" }}>
                    Upcoming Tasks ♡
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button
                      onClick={() => notify("💧 รดน้ำ Monstera เรียบร้อยแล้ว!")}
                      style={{
                        background: "linear-gradient(135deg, #FFE0E9 0%, #FAD0DC 100%)",
                        color: "#87354E",
                        border: "1.5px solid #F7B8CA",
                        borderRadius: "9999px",
                        padding: "9px 15px",
                        fontSize: "12px",
                        fontWeight: 700,
                        textAlign: "left",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(209, 73, 104, 0.1)",
                      }}
                    >
                      💧 Water Monstera
                    </button>
                    <button
                      onClick={() => notify("✨ พ่นหมอกให้ Pink Orchid เรียบร้อยแล้ว!")}
                      style={{
                        background: "linear-gradient(135deg, #FFE0DE 0%, #F9C8C5 100%)",
                        color: "#853636",
                        border: "1.5px solid #F5B2AE",
                        borderRadius: "9999px",
                        padding: "9px 15px",
                        fontSize: "12px",
                        fontWeight: 700,
                        textAlign: "left",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(201, 90, 90, 0.1)",
                      }}
                    >
                      ✨ Mist Pink Orchid
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeScreen === "my-plants" && (
            <>
              <div
                style={{
                  background: "linear-gradient(125deg, #FFC2D4 0%, #FBBAB8 100%)",
                  padding: "16px 18px 14px 18px",
                }}
              >
                <div style={{ textAlign: "center", fontSize: "16px", fontWeight: 800, color: "#4D2832", marginBottom: "10px" }}>
                  🌸 My Plants ({filteredPlants.length})
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search plants or flowers..."
                  style={{
                    width: "100%",
                    padding: "9px 14px",
                    borderRadius: "9999px",
                    border: "1.5px solid #F7CFD8",
                    fontSize: "12px",
                    backgroundColor: "rgba(255,255,255,0.95)",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ display: "flex", gap: "6px", marginTop: "10px", justifyContent: "center" }}>
                  {[
                    { id: "All", label: "All ♡" },
                    { id: "Flowers", label: "🌸 Flowers" },
                    { id: "Indoor", label: "🌺 Indoor" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setPlantFilter(f.id as "All" | "Flowers" | "Indoor")}
                      style={{
                        backgroundColor: plantFilter === f.id ? "#C94F6D" : "rgba(255,255,255,0.8)",
                        color: plantFilter === f.id ? "#ffffff" : "#4D2832",
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
                      borderRadius: "20px",
                      padding: "10px",
                      border: "1.5px solid #FAD2DC",
                      boxShadow: "0 6px 15px rgba(196, 98, 118, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: "64px", height: "64px", borderRadius: "15px", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", fontWeight: 800, color: "#4A2630" }}>{p.name}</span>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            backgroundColor: p.category === "Flowers" ? "#FFE3EC" : "#FFE3E2",
                            color: p.category === "Flowers" ? "#C94769" : "#C45454",
                          }}
                        >
                          {p.category === "Flowers" ? "🌸 Flower" : "🌺 Leaf"}
                        </span>
                      </div>
                      <div style={{ fontSize: "11px", color: "#996E79", margin: "2px 0 6px 0" }}>{p.location}</div>
                      <div style={{ width: "100%", height: "7px", backgroundColor: "#FDE4EA", borderRadius: "9999px", overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${p.health}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #F78FB0 0%, #E57373 100%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeScreen === "profile" && (
            <div style={{ padding: "16px 18px" }}>
              <button
                onClick={() => setActiveScreen("dashboard")}
                style={{
                  backgroundColor: "#FFE4EC",
                  border: "1px solid #F7BCCA",
                  borderRadius: "9999px",
                  color: "#A84261",
                  fontWeight: 700,
                  fontSize: "11px",
                  cursor: "pointer",
                  marginBottom: "10px",
                  padding: "4px 12px",
                }}
              >
                ← Back
              </button>

              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#4A2630", margin: "0 0 2px 0" }}>{selectedPlant.name} ♡</h1>
              <p style={{ fontSize: "12px", color: "#996E79", margin: "0 0 12px 0" }}>
                {selectedPlant.scientificName} • {selectedPlant.location}
              </p>

              <div
                style={{
                  width: "100%",
                  height: "185px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative",
                  marginBottom: "14px",
                  border: "2px solid #FAD2DC",
                  boxShadow: "0 10px 22px rgba(196, 98, 118, 0.16)",
                }}
              >
                <img src={selectedPlant.image} alt={selectedPlant.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    background: "linear-gradient(135deg, rgba(186, 62, 98, 0.92) 0%, rgba(196, 78, 78, 0.92) 100%)",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  💖 {selectedPlant.status} ({selectedPlant.health}%)
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                <button
                  onClick={() => handleCare("water")}
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #FFC0D4 0%, #F797B6 100%)",
                    color: "#5E2438",
                    border: "none",
                    borderRadius: "9999px",
                    padding: "10px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(247, 151, 182, 0.36)",
                  }}
                >
                  💧 Water Now
                </button>
                <button
                  onClick={() => handleCare("mist")}
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #FFBDBB 0%, #F29491 100%)",
                    color: "#5E2525",
                    border: "none",
                    borderRadius: "9999px",
                    padding: "10px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(242, 148, 145, 0.36)",
                  }}
                >
                  ✨ Mist Now
                </button>
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "20px",
                  padding: "14px",
                  border: "1.5px solid #FAD2DC",
                  boxShadow: "0 6px 16px rgba(196, 98, 118, 0.07)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  fontSize: "12px",
                  color: "#5E3540",
                }}
              >
                <div>
                  <strong>☀️ Light:</strong> <span style={{ color: "#946873" }}>{selectedPlant.light}</span>
                </div>
                <div>
                  <strong>💧 Water:</strong> <span style={{ color: "#946873" }}>{selectedPlant.waterFreq}</span>
                </div>
                <div>
                  <strong>🌡️ Temp:</strong> <span style={{ color: "#946873" }}>{selectedPlant.temp}</span>
                </div>
                <div>
                  <strong>🪴 Soil:</strong> <span style={{ color: "#946873" }}>{selectedPlant.soil}</span>
                </div>
              </div>
            </div>
          )}

          {activeScreen === "add-plant" && (
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <h1 style={{ fontSize: "17px", fontWeight: 800, color: "#4A2630", margin: 0 }}>Add New Plant 🌸</h1>
                <button
                  onClick={() => setActiveScreen("dashboard")}
                  style={{ background: "none", border: "none", fontSize: "12px", fontWeight: 700, color: "#996E79", cursor: "pointer" }}
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
                  border: "1.5px solid #F7C7D2",
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
                    padding: "8px",
                    borderRadius: "9999px",
                    border: "1.5px solid #F7B8CA",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    backgroundColor: newPlantCategory === "Flowers" ? "#FFC9DC" : "#FFF7F9",
                    color: "#82324B",
                  }}
                >
                  🌸 ต้นดอกไม้
                </button>
                <button
                  onClick={() => setNewPlantCategory("Indoor")}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "9999px",
                    border: "1.5px solid #F5B4B1",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    backgroundColor: newPlantCategory === "Indoor" ? "#FFC6C3" : "#FFF7F7",
                    color: "#803232",
                  }}
                >
                  🌺 ไม้ประดับ
                </button>
              </div>

              <div style={{ fontSize: "12px", fontWeight: 800, color: "#5E3540", marginBottom: "8px" }}>Most Popular ♡</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "18px" }}>
                {[
                  { name: "Pink Orchid", cat: "Flowers" as const, img: "https://images.unsplash.com/photo-1566924962158-6e595e5b7391?auto=format&fit=crop&w=300&q=80" },
                  { name: "Peace Lily", cat: "Flowers" as const, img: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=300&q=80" },
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
                      border: selectedPopular?.name === pop.name ? "2px solid #E06384" : "1.5px solid #FAD2DC",
                      borderRadius: "16px",
                      padding: "6px",
                      textAlign: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(196, 98, 118, 0.07)",
                    }}
                  >
                    <img src={pop.img} alt={pop.name} style={{ width: "100%", height: "66px", objectFit: "cover", borderRadius: "12px", marginBottom: "4px" }} />
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "#4A2630" }}>{pop.name}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={addNewPlant}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #E06384 0%, #D96565 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "12px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 8px 18px rgba(217, 101, 101, 0.3)",
                }}
              >
                Save & Add to My Plants ♡
              </button>
            </div>
          )}

          {activeScreen === "shop" && (
            <>
              <div
                style={{
                  background: "linear-gradient(125deg, #FFC2D4 0%, #FBBAB8 100%)",
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#4D2832" }}>🛍️ Plantly Shop</div>
                  <div style={{ fontSize: "11px", color: "#8C4556" }}>ดอกไม้ชมพู-แดง & กระถางน่ารัก</div>
                </div>
                <button
                  onClick={() => setActiveScreen("cart")}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#C44D67",
                    border: "1.5px solid #FAD0D8",
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
                      borderRadius: "20px",
                      padding: "8px",
                      border: "1.5px solid #FAD2DC",
                      boxShadow: "0 6px 15px rgba(196, 98, 118, 0.08)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "92px", objectFit: "cover", borderRadius: "14px", marginBottom: "6px" }} />
                      <div style={{ fontSize: "10px", color: "#D14669", fontWeight: 700 }}>{item.category}</div>
                      <div style={{ fontSize: "12px", fontWeight: 800, color: "#4A2630", margin: "2px 0" }}>{item.name}</div>
                      <div style={{ fontSize: "13px", fontWeight: 800, color: "#C95353" }}>฿{item.price}</div>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        width: "100%",
                        background: "linear-gradient(135deg, #FFC8DA 0%, #FFC3C1 100%)",
                        color: "#5E2839",
                        border: "none",
                        borderRadius: "12px",
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

          {activeScreen === "cart" && (
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <button
                  onClick={() => setActiveScreen("shop")}
                  style={{ background: "none", border: "none", color: "#A84261", fontWeight: 700, fontSize: "12px", cursor: "pointer", padding: 0 }}
                >
                  ← Shop
                </button>
                <div style={{ fontSize: "15px", fontWeight: 800, color: "#4A2630" }}>🛒 Your Cart ♡</div>
                <div style={{ width: "30px" }} />
              </div>

              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 10px", color: "#996E79", fontSize: "13px" }}>
                  <div style={{ fontSize: "34px", marginBottom: "8px" }}>🌺</div>
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
                          borderRadius: "18px",
                          padding: "10px",
                          border: "1.5px solid #FAD2DC",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img src={item.image} alt={item.name} style={{ width: "46px", height: "46px", borderRadius: "12px", objectFit: "cover" }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "12px", fontWeight: 700, color: "#4A2630" }}>{item.name}</div>
                          <div style={{ fontSize: "12px", fontWeight: 800, color: "#C95353" }}>฿{item.price * quantity}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <button
                            onClick={() => changeQty(item.id, -1)}
                            style={{ width: "24px", height: "24px", borderRadius: "9999px", border: "1px solid #F5C7D2", background: "#FFF8FA", fontWeight: 700, color: "#82324B", cursor: "pointer" }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#4A2630" }}>{quantity}</span>
                          <button
                            onClick={() => changeQty(item.id, 1)}
                            style={{ width: "24px", height: "24px", borderRadius: "9999px", border: "1px solid #F5C7D2", background: "#FFF8FA", fontWeight: 700, color: "#82324B", cursor: "pointer" }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ backgroundColor: "#ffffff", borderRadius: "20px", padding: "12px", border: "1.5px solid #FAD2DC", marginBottom: "12px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#5E3540", marginBottom: "6px" }}>📍 ที่อยู่จัดส่ง:</div>
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      style={{ width: "100%", padding: "7px 10px", borderRadius: "10px", border: "1px solid #F7C7D2", fontSize: "11px", color: "#4A2630", boxSizing: "border-box" }}
                    />
                  </div>

                  <div style={{ backgroundColor: "#ffffff", borderRadius: "20px", padding: "14px", border: "1.5px solid #FAD2DC" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#996E79", marginBottom: "4px" }}>
                      <span>ค่าสินค้า:</span>
                      <span>฿{subtotal}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#996E79", marginBottom: "8px" }}>
                      <span>ค่าจัดส่ง:</span>
                      <span>{shipping === 0 ? "ฟรี ♡" : `฿${shipping}`}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 800, color: "#4A2630", paddingTop: "8px", borderTop: "1px dashed #F7C7D2", marginBottom: "12px" }}>
                      <span>ยอดรวม:</span>
                      <span style={{ color: "#C95353" }}>฿{total}</span>
                    </div>
                    <button
                      onClick={checkout}
                      style={{
                        width: "100%",
                        background: "linear-gradient(135deg, #E06384 0%, #D96565 100%)",
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

          {activeScreen === "tips" && (
            <div style={{ padding: "16px 18px" }}>
              <h1 style={{ fontSize: "18px", fontWeight: 800, color: "#4A2630", margin: "0 0 12px 0" }}>💡 Care Tips ♡</h1>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { title: "🌸 ดูแลกล้วยไม้ให้ออกดอกสวย", detail: "รับแสงรำไร รดน้ำเมื่อเครื่องปลูกเริ่มแห้ง และให้ปุ๋ยบำรุงดอกสัปดาห์ละครั้ง" },
                  { title: "🌺 พ่นหมอกเพิ่มความสดชื่น", detail: "ช่วยเพิ่มความชื้นให้ดอกไม้สีชมพู-แดงและใบไม้ดูสดใส" },
                  { title: "☀️ หลีกเลี่ยงแดดบ่ายจัด", detail: "ไม้ดอกและไม้ประดับพาสเทลจะไม่กลีบช้ำหรือใบไหม้" },
                ].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "20px",
                      padding: "12px",
                      border: "1.5px solid #FAD2DC",
                      boxShadow: "0 5px 14px rgba(196, 98, 118, 0.08)",
                    }}
                  >
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#4A2630", marginBottom: "4px" }}>{t.title}</div>
                    <div style={{ fontSize: "12px", color: "#946873", lineHeight: 1.45 }}>{t.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeScreen === "account" && (
            <div style={{ padding: "16px 18px" }}>
              <h1 style={{ fontSize: "18px", fontWeight: 800, color: "#4A2630", margin: "0 0 12px 0" }}>👤 Profile ♡</h1>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "22px",
                  padding: "14px",
                  border: "1.5px solid #FAD2DC",
                  boxShadow: "0 6px 15px rgba(196, 98, 118, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Alex"
                  style={{ width: "48px", height: "48px", borderRadius: "9999px", objectFit: "cover", border: "2px solid #FFC2D6" }}
                />
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 800, color: "#4A2630" }}>{customerName}</div>
                  <div style={{ fontSize: "11px", color: "#996E79" }}>Plants & Flowers: {plants.length}</div>
                </div>
              </div>

              <div style={{ fontSize: "13px", fontWeight: 800, color: "#5E3540", marginBottom: "8px" }}>📦 Order History ({orders.length})</div>
              {orders.length === 0 ? (
                <div style={{ backgroundColor: "#ffffff", borderRadius: "20px", padding: "20px", border: "1.5px solid #FAD2DC", textAlign: "center", fontSize: "12px", color: "#996E79" }}>
                  ยังไม่มีประวัติการสั่งซื้อ
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        padding: "10px 12px",
                        border: "1.5px solid #FAD2DC",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "12px",
                      }}
                    >
                      <div>
                        <strong>{o.id}</strong> • {o.count} ชิ้น
                      </div>
                      <span style={{ color: "#C95353", fontWeight: 800 }}>฿{o.total}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div
          style={{
            background: "linear-gradient(125deg, #FFC2D4 0%, #FBBAB8 100%)",
            padding: "8px 10px 10px 10px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            borderTop: "1.5px solid rgba(255,255,255,0.85)",
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
                background: nav.active ? "rgba(255,255,255,0.82)" : "none",
                border: "none",
                borderRadius: "15px",
                padding: "5px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                cursor: "pointer",
                color: nav.active ? "#4D2030" : "#8C4556",
                boxShadow: nav.active ? "0 3px 8px rgba(196, 77, 103, 0.16)" : "none",
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
