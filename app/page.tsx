"use client";

import React, { useState } from "react";

// --- โครงสร้างข้อมูล (TypeScript Interfaces) ---
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

// --- ข้อมูลจำลองต้นไม้เริ่มต้น ---
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
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
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
    image:
      "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=600&q=80",
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
    image:
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80",
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
    image:
      "https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?auto=format&fit=crop&w=600&q=80",
  },
];

// --- สินค้าในร้านค้าออนไลน์ (Shop) ---
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

export default function PlantlyApp() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("dashboard");
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [selectedPlant, setSelectedPlant] = useState<Plant>(INITIAL_PLANTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // States สำหรับระบบตะกร้าสินค้าและการสั่งซื้อ
  const [cart, setCart] = useState<CartItem[]>([]);
  const [newPlantName, setNewPlantName] = useState("");
  const [selectedPopular, setSelectedPopular] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // เปิดหน้าโปรไฟล์ต้นไม้
  const handleOpenPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setActiveScreen("profile");
  };

  // รดน้ำ / พ่นหมอก
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

  // เพิ่มสินค้าลงตะกร้า
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
    triggerToast(`🛒 เพิ่ม "${product.name}" ลงในตะกร้าแล้ว!`);
  };

  // ปรับจำนวนสินค้าในตะกร้า
  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.item.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  // คำนวณราคารวม
  const totalPrice = cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);

  // กดสั่งซื้อสำเร็จ
  const handleCheckout = () => {
    if (cart.length === 0) return;
    triggerToast("🎉 สั่งซื้อสินค้าสำเร็จแล้ว ขอบคุณที่ใช้บริการ Plantly!");
    setCart([]);
    setActiveScreen("dashboard");
  };

  // เพิ่มต้นไม้ใหม่เข้า My Plants
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-4 px-2 bg-[#efeae2]">
      {/* แถบควบคุมเมนูด้านบนสำหรับทดสอบ Prototype */}
      <div className="mb-3 flex flex-wrap gap-2 justify-center">
        {[
          { id: "dashboard", label: "1. Dashboard" },
          { id: "my-plants", label: "2. My Plants" },
          { id: "profile", label: "3. Profile" },
          { id: "add-plant", label: "4. Add Plant" },
          { id: "shop", label: "5. Shop (ร้านค้า)" },
          { id: "cart", label: `6. Cart (${cart.reduce((a, c) => a + c.quantity, 0)})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveScreen(tab.id as ScreenType)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              activeScreen === tab.id
                ? "bg-[#7f5a83] text-white shadow"
                : "bg-white/90 text-stone-600 hover:bg-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* กรอบจำลองหน้าจอมือถือขนาด 390x882 px ตามแบบ */}
      <div className="relative w-[390px] h-[882px] bg-[#FCF9F4] rounded-[42px] shadow-2xl border-[6px] border-[#2d2926] overflow-hidden flex flex-col justify-between">
        
        {/* Toast แจ้งเตือนสไตล์แอป */}
        {toastMsg && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#4a3b47] text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg animate-bounce">
            {toastMsg}
          </div>
        )}

        {/* =========================================================
            1. DASHBOARD SCREEN (หน้าแรก)
        ========================================================= */}
        {activeScreen === "dashboard" && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-20">
            <div className="bg-[#F9C6D4] pt-7 pb-4 px-5 flex items-center justify-between">
              <div className="w-8" />
              <div className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-[#d97793] font-bold text-xs">🌿</span>
                <span className="text-xl font-bold text-[#4e3d42] tracking-tight">Plantly</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Alex"
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>
            <div className="h-3 w-full bg-[#F9C6D4]" />

            <div className="px-5 pt-3">
              <h1 className="text-[22px] font-bold text-[#4a3f3d] flex items-center gap-1.5">
                Good Morning, Alex! ☀️
              </h1>
              <div className="flex items-center justify-between mt-3 mb-2.5">
                <h2 className="text-sm font-bold text-[#5c504d]">My Plant Corner</h2>
                <button
                  onClick={() => setActiveScreen("add-plant")}
                  className="text-xs font-semibold text-[#b86b82] hover:underline"
                >
                  + Add Plant
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {plants.slice(0, 4).map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => handleOpenPlant(plant)}
                    className="bg-white rounded-2xl p-2.5 shadow-sm border border-[#f0e8df] cursor-pointer hover:scale-[1.02] transition"
                  >
                    <div className="w-full h-32 rounded-xl overflow-hidden bg-[#f4f1ea] mb-2">
                      <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-sm text-[#3f3735] truncate">{plant.name}</h3>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                      {plant.status}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#8c7f7a] mt-0.5">
                      💧 Water in {plant.nextWater}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <h2 className="text-sm font-bold text-[#5c504d] mb-2.5">Upcoming Tasks:</h2>
                <div className="flex flex-col gap-2 items-start">
                  <button onClick={() => triggerToast("💧 รดน้ำ Monstera แล้ว")} className="flex items-center gap-2 bg-[#D7EEF7] text-[#3a5a68] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                    💧 Water Monstera
                  </button>
                  <button onClick={() => triggerToast("✨ พ่นหมอก Pilea แล้ว")} className="flex items-center gap-2 bg-[#E6D9F5] text-[#55426b] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                    ✨ Mist Pilea
                  </button>
                  <button onClick={() => triggerToast("🌿 ใส่ปุ๋ย Snake Plant แล้ว")} className="flex items-center gap-2 bg-[#FBE7B2] text-[#6b5624] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                    🌿 Fertilize Snake Plant
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            2. MY PLANTS SCREEN (คอลเลกชันต้นไม้)[cite: 3]
        ========================================================= */}
        {activeScreen === "my-plants" && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-20 relative">
            <div className="bg-[#DFC7F2] pt-7 pb-4 px-5">
              <div className="flex items-center justify-center gap-1.5 mb-3">
                <span className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-[#8e5cb5] text-xs">🌿</span>
                <span className="text-xl font-bold text-[#4a3957]">Plantly</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search plants..."
                  className="w-full bg-[#cbb0e2]/60 placeholder-[#7a688a] text-[#3d2e4a] text-xs rounded-full py-2.5 pl-4 pr-4 focus:outline-none"
                />
              </div>
            </div>
            <div className="h-3 w-full bg-[#DFC7F2]" />

            <div className="px-5 pt-2">
              <h2 className="text-base font-bold text-[#4a3f3d]">My Plants ({plants.length} Total)</h2>
              <div className="flex flex-col gap-3 mt-3">
                {filteredPlants.map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => handleOpenPlant(plant)}
                    className="bg-white rounded-2xl p-3 shadow-sm border border-[#efe7de] flex items-center gap-3 cursor-pointer hover:border-[#d5b8ec] transition"
                  >
                    <img src={plant.image} alt={plant.name} className="w-20 h-20 rounded-xl object-cover shrink-0 bg-[#f4f1ea]" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-[#3f3735] truncate">{plant.scientificName}</h3>
                      <p className="text-[11px] text-[#8c7f7a]">{plant.type} • {plant.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-[#8c7f7a]">Health Bar</span>
                        <div className="w-full h-2 bg-[#f1e6ee] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#e58ca8] to-[#b983e0] rounded-full" style={{ width: `${plant.health}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveScreen("add-plant")}
              className="absolute bottom-24 right-5 w-11 h-11 rounded-full bg-[#B7D7B8] text-[#2e4d30] shadow-lg flex items-center justify-center font-bold text-lg hover:scale-105 transition"
            >
              +
            </button>
          </div>
        )}

        {/* =========================================================
            3. PLANT PROFILE SCREEN (รายละเอียดต้นไม้)[cite: 3]
        ========================================================= */}
        {activeScreen === "profile" && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-20">
            <div className="bg-[#F9C6D4] pt-7 pb-3 px-5 flex items-center justify-between">
              <button onClick={() => setActiveScreen("my-plants")} className="text-xs font-semibold text-[#5c424a]">
                ← Back
              </button>
              <span className="text-xs font-bold text-[#4e3d42]">{selectedPlant.slug}</span>
              <div className="w-10" />
            </div>
            <div className="h-3 w-full bg-[#F9C6D4]" />

            <div className="px-5 pt-2">
              <h1 className="text-2xl font-bold text-[#4a3f3d]">{selectedPlant.name}</h1>
              <p className="text-xs text-[#8c7f7a] mb-3">{selectedPlant.location}</p>

              <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm mb-4">
                <img src={selectedPlant.image} alt={selectedPlant.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-2.5 left-2.5 bg-[#3a3330]/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                  ❤️ {selectedPlant.status} ({selectedPlant.health}%)
                </div>
              </div>

              <h2 className="text-xs font-bold text-[#5c504d] mb-2">Quick Actions:</h2>
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => handleQuickAction("water")} className="flex-1 bg-[#F4C4D4] text-[#5e3744] py-2 px-3 rounded-full text-xs font-bold">
                  💧 Water Now
                </button>
                <button onClick={() => handleQuickAction("mist")} className="flex-1 bg-[#DFC7F2] text-[#4b355c] py-2 px-3 rounded-full text-xs font-bold">
                  ✨ Mist Now
                </button>
              </div>

              <h2 className="text-xs font-bold text-[#5c504d] mb-2">Care Summary:</h2>
              <div className="bg-white rounded-2xl p-3.5 border border-[#efe7de] grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  <p className="font-bold text-[#4a3f3d]">☀️ Light</p>
                  <p className="text-[11px] text-[#8c7f7a]">{selectedPlant.light}</p>
                </div>
                <div>
                  <p className="font-bold text-[#4a3f3d]">💧 Water</p>
                  <p className="text-[11px] text-[#8c7f7a]">{selectedPlant.waterFreq}</p>
                </div>
                <div>
                  <p className="font-bold text-[#4a3f3d]">🌡️ Temp</p>
                  <p className="text-[11px] text-[#8c7f7a]">{selectedPlant.temp}</p>
                </div>
                <div>
                  <p className="font-bold text-[#4a3f3d]">🪴 Soil</p>
                  <p className="text-[11px] text-[#8c7f7a]">{selectedPlant.soil}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            4. ADD NEW PLANT SCREEN (เพิ่มต้นไม้)[cite: 3]
        ========================================================= */}
        {activeScreen === "add-plant" && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-20">
            <div className="bg-[#F9C6D4] pt-7 pb-3 px-5 flex items-center justify-between">
              <button onClick={() => setActiveScreen("dashboard")} className="text-xs font-semibold text-[#5c424a]">
                ✕ Close
              </button>
              <span className="text-sm font-bold text-[#4e3d42]">Add New Plant</span>
              <div className="w-10" />
            </div>
            <div className="h-3 w-full bg-[#F9C6D4]" />

            <div className="px-5 pt-2">
              <h2 className="text-sm font-bold text-[#4a3f3d] mb-2">Search/Identify</h2>
              <input
                type="text"
                value={newPlantName}
                onChange={(e) => setNewPlantName(e.target.value)}
                placeholder="Search by name or type..."
                className="w-full bg-[#ebe5dc] text-[#4a3f3d] placeholder-[#8c817c] text-xs rounded-full py-2.5 px-4 mb-3 focus:outline-none"
              />

              <h2 className="text-sm font-bold text-[#4a3f3d] mb-2">Most Popular:</h2>
              <div className="grid grid-cols-3 gap-2.5 mb-4">
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
                    className={`cursor-pointer rounded-xl p-1.5 text-center border ${
                      selectedPopular === item.name ? "bg-[#F9C6D4]/40 border-[#e08ca4]" : "bg-white border-[#efe7de]"
                    }`}
                  >
                    <img src={item.img} alt={item.name} className="w-full h-16 rounded-lg object-cover mb-1" />
                    <p className="text-[10px] font-bold text-[#4a3f3d]">{item.name}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddPlant}
                className="w-full bg-[#7f5a83] text-white font-bold text-xs py-3 rounded-full shadow-md mt-4 hover:bg-[#6b496f] transition"
              >
                Save & Add to My Plants
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            5. SHOP SCREEN (หน้าร้านค้า - สั่งซื้อต้นไม้/อุปกรณ์)
        ========================================================= */}
        {activeScreen === "shop" && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-20">
            <div className="bg-[#D4E8D4] pt-7 pb-4 px-5 flex items-center justify-between">
              <span className="text-xl font-bold text-[#355235]">🌿 Plantly Shop</span>
              <button
                onClick={() => setActiveScreen("cart")}
                className="bg-white px-3 py-1.5 rounded-full text-xs font-bold text-[#355235] shadow"
              >
                🛒 ตะกร้า ({cart.reduce((a, c) => a + c.quantity, 0)})
              </button>
            </div>
            <div className="h-3 w-full bg-[#D4E8D4]" />

            <div className="px-5 pt-3">
              <h2 className="text-sm font-bold text-[#4a3f3d] mb-3">เลือกซื้อต้นไม้และอุปกรณ์ดูแล</h2>
              <div className="grid grid-cols-2 gap-3">
                {SHOP_PRODUCTS.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-2xl p-2.5 shadow-sm border border-[#e8efe8] flex flex-col justify-between">
                    <div>
                      <div className="w-full h-28 rounded-xl overflow-hidden bg-[#f4f7f4] mb-2">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold">{prod.category}</span>
                      <h3 className="font-bold text-xs text-[#3f3735] line-clamp-1">{prod.name}</h3>
                      <p className="text-xs font-bold text-[#7f5a83] mt-1">฿{prod.price}</p>
                    </div>
                    <button
                      onClick={() => addToCart(prod)}
                      className="w-full bg-[#B7D7B8] text-[#2e4d30] font-bold text-[11px] py-1.5 rounded-xl mt-2 hover:bg-[#a3c9a4] transition"
                    >
                      + เพิ่มลงตะกร้า
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            6. CART & CHECKOUT SCREEN (ตะกร้าสินค้าและการชำระเงิน)
        ========================================================= */}
        {activeScreen === "cart" && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-20">
            <div className="bg-[#F5E0D3] pt-7 pb-4 px-5 flex items-center justify-between">
              <button onClick={() => setActiveScreen("shop")} className="text-xs font-semibold text-[#6e4d3b]">
                ← กลับไปร้านค้า
              </button>
              <span className="text-sm font-bold text-[#5c3a21]">ตะกร้าสินค้าของฉัน</span>
              <div className="w-10" />
            </div>
            <div className="h-3 w-full bg-[#F5E0D3]" />

            <div className="px-5 pt-3 flex-1 flex flex-col justify-between">
              <div>
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-stone-400 text-xs">
                    <p className="text-2xl mb-2">🛒</p>
                    ยังไม่มีสินค้าในตะกร้าของคุณ
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {cart.map(({ item, quantity }) => (
                      <div key={item.id} className="bg-white rounded-2xl p-3 border border-[#efe7de] flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-[#4a3f3d] truncate">{item.name}</h4>
                          <p className="text-xs text-[#7f5a83] font-semibold">฿{item.price * quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 font-bold text-xs flex items-center justify-center">-</button>
                          <span className="text-xs font-bold">{quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 font-bold text-xs flex items-center justify-center">+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="mt-4 bg-white rounded-2xl p-4 border border-[#efe7de]">
                  <div className="flex justify-between text-xs font-bold text-[#4a3f3d] mb-3">
                    <span>ยอดรวมทั้งหมด:</span>
                    <span className="text-sm text-[#7f5a83]">฿{totalPrice}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#7f5a83] text-white font-bold text-xs py-3 rounded-full shadow-md hover:bg-[#6b496f] transition"
                  >
                    ยืนยันการสั่งซื้อสินค้า (Checkout)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            BOTTOM NAVIGATION BAR (แถบเมนูด้านล่าง 5 ปุ่ม)[cite: 3]
        ========================================================= */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#F9C6D4] border-t border-[#f0b4c5] px-4 flex items-center justify-around z-40">
          <button
            onClick={() => setActiveScreen("dashboard")}
            className={`flex flex-col items-center gap-0.5 transition ${
              activeScreen === "dashboard" ? "text-[#4e333b] font-bold scale-105" : "text-[#8c6873]"
            }`}
          >
            <span className="text-base">🏠</span>
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={() => setActiveScreen("my-plants")}
            className={`flex flex-col items-center gap-0.5 transition ${
              activeScreen === "my-plants" || activeScreen === "profile" || activeScreen === "add-plant"
                ? "text-[#4e333b] font-bold scale-105"
                : "text-[#8c6873]"
            }`}
          >
            <span className="text-base">🌿</span>
            <span className="text-[10px]">My Plants</span>
          </button>

          <button
            onClick={() => setActiveScreen("shop")}
            className={`flex flex-col items-center gap-0.5 transition ${
              activeScreen === "shop" || activeScreen === "cart" ? "text-[#4e333b] font-bold scale-105" : "text-[#8c6873]"
            }`}
          >
            <span className="text-base">🛍️</span>
            <span className="text-[10px]">Shop</span>
          </button>

          <button
            onClick={() => triggerToast("💡 ทริคประจำวัน: รดน้ำต้นไม้ช่วงเช้าช่วยให้รากดูดซึมได้ดีที่สุด!")}
            className="flex flex-col items-center gap-0.5 text-[#8c6873] hover:text-[#4e333b]"
          >
            <span className="text-base">💡</span>
            <span className="text-[10px]">Tips</span>
          </button>

          <button
            onClick={() => triggerToast("👤 เข้าสู่ระบบด้วยบัญชี: Alex")}
            className="flex flex-col items-center gap-0.5 text-[#8c6873] hover:text-[#4e333b]"
          >
            <span className="text-base">👤</span>
            <span className="text-[10px]">Profile</span>
          </button>
        </div>

      </div>
    </div>
  );
}
