โค้ดแอป **Plantly** ฉบับปรับปรุงใหม่ โดย **เอากรอบหน้าจอมือถือ (`390x882` px) ออกทั้งหมด** และปรับให้แสดงผลแบบ **เต็มหน้าจอ (Full-screen Web App / Responsive)** ใช้งานได้จริงทั้งบนหน้าจอคอมพิวเตอร์และมือถือ พร้อมระบบคลิกเปลี่ยนหน้า ดูแลต้นไม้ และสั่งซื้อสินค้าครบถ้วนครับ

### 📋 คัดลอกโค้ดทั้งหมดนี้ไปวางในไฟล์ `app/page.tsx`

```tsx
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
  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

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
    <div className="min-h-screen w-full bg-[#FCF9F4] text-[#4a3f3d] flex flex-col justify-between">
      
      {/* Toast แจ้งเตือนมุมบน */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#4a3b47] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* =========================================================
          TOP NAVIGATION BAR (แถบเมนูหลักด้านบน เต็มความกว้างหน้าจอ)
      ========================================================= */}
      <header className="sticky top-0 z-40 bg-[#F9C6D4] border-b border-[#f0b4c5] shadow-xs">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* โลโก้ Plantly */}
          <button
            onClick={() => setActiveScreen("dashboard")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#d97793] text-base shadow-2xs">
              🌿
            </span>
            <span className="text-2xl font-bold text-[#4e3d42] tracking-tight">
              Plantly
            </span>
          </button>

          {/* เมนูสำหรับหน้าจอคอมพิวเตอร์ */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#6e4c56]">
            <button
              onClick={() => setActiveScreen("dashboard")}
              className={`hover:text-[#3b252b] transition ${
                activeScreen === "dashboard" ? "text-[#3b252b] underline underline-offset-4 font-bold" : ""
              }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => setActiveScreen("my-plants")}
              className={`hover:text-[#3b252b] transition ${
                activeScreen === "my-plants" || activeScreen === "profile" || activeScreen === "add-plant"
                  ? "text-[#3b252b] underline underline-offset-4 font-bold"
                  : ""
              }`}
            >
              🌿 My Plants ({plants.length})
            </button>
            <button
              onClick={() => setActiveScreen("shop")}
              className={`hover:text-[#3b252b] transition ${
                activeScreen === "shop" ? "text-[#3b252b] underline underline-offset-4 font-bold" : ""
              }`}
            >
              🛍️ Shop
            </button>
            <button
              onClick={() => triggerToast("💡 ทริคประจำวัน: รดน้ำต้นไม้ช่วงเช้าช่วยให้รากดูดซึมได้ดีที่สุด!")}
              className="hover:text-[#3b252b] transition"
            >
              💡 Tips
            </button>
          </nav>

          {/* ปุ่มตะกร้าสินค้า + โปรไฟล์ */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveScreen("cart")}
              className="bg-white/90 hover:bg-white text-[#4e3d42] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs flex items-center gap-1.5 transition"
            >
              🛒 ตะกร้า
              {totalCartItems > 0 && (
                <span className="bg-[#7f5a83] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {totalCartItems}
                </span>
              )}
            </button>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Alex"
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN CONTENT AREA (เนื้อหาแต่ละหน้า แบบเต็มหน้าจอ)
      ========================================================= */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-10">
        
        {/* ---------------------------------------------------------
            1. DASHBOARD SCREEN
        --------------------------------------------------------- */}
        {activeScreen === "dashboard" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#4a3f3d] flex items-center gap-2">
                  Good Morning, Alex! ☀️
                </h1>
                <p className="text-sm text-[#8c7f7a] mt-0.5">
                  ยินดีต้อนรับสู่สวนต้นไม้ส่วนตัวของคุณ
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveScreen("add-plant")}
                  className="bg-[#F9C6D4] hover:bg-[#f4b3c5] text-[#4e3d42] text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-2xs transition"
                >
                  + เพิ่มต้นไม้ใหม่
                </button>
                <button
                  onClick={() => setActiveScreen("shop")}
                  className="bg-[#D4E8D4] hover:bg-[#c2dec2] text-[#2e4d30] text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-2xs transition"
                >
                  🛍️ ซื้อต้นไม้เพิ่ม
                </button>
              </div>
            </div>

            {/* My Plant Corner Grid */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-[#5c504d]">My Plant Corner</h2>
              <button
                onClick={() => setActiveScreen("my-plants")}
                className="text-xs font-semibold text-[#7f5a83] hover:underline"
              >
                ดูทั้งหมด ({plants.length}) →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {plants.slice(0, 4).map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => handleOpenPlant(plant)}
                  className="bg-white rounded-2xl p-3 shadow-sm border border-[#f0e8df] cursor-pointer hover:scale-[1.02] hover:border-[#e0b8c5] transition"
                >
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-[#f4f1ea] mb-2.5">
                    <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-base text-[#3f3735] truncate">{plant.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    {plant.status}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#8c7f7a] mt-1">
                    💧 Water in {plant.nextWater}
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Tasks */}
            <div className="mt-8 bg-white rounded-2xl p-5 border border-[#f0e8df] shadow-2xs">
              <h2 className="text-base font-bold text-[#5c504d] mb-3">Upcoming Tasks:</h2>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => triggerToast("💧 รดน้ำ Monstera เรียบร้อยแล้ว!")}
                  className="flex items-center gap-2 bg-[#D7EEF7] hover:brightness-95 text-[#3a5a68] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition"
                >
                  💧 Water Monstera
                </button>
                <button
                  onClick={() => triggerToast("✨ พ่นหมอก Pilea เรียบร้อยแล้ว!")}
                  className="flex items-center gap-2 bg-[#E6D9F5] hover:brightness-95 text-[#55426b] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition"
                >
                  ✨ Mist Pilea
                </button>
                <button
                  onClick={() => triggerToast("🌿 ใส่ปุ๋ย Snake Plant เรียบร้อยแล้ว!")}
                  className="flex items-center gap-2 bg-[#FBE7B2] hover:brightness-95 text-[#6b5624] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition"
                >
                  🌿 Fertilize Snake Plant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------
            2. MY PLANTS SCREEN (คอลเลกชันต้นไม้)
        --------------------------------------------------------- */}
        {activeScreen === "my-plants" && (
          <div>
            <div className="bg-[#DFC7F2] rounded-3xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#4a3957]">
                  My Plants ({plants.length} Total)
                </h1>
                <p className="text-xs text-[#6a557a]">จัดการและตรวจสอบสุขภาพต้นไม้ทั้งหมดของคุณ</p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 ค้นหาชื่อต้นไม้..."
                  className="w-full sm:w-64 bg-white/80 placeholder-[#7a688a] text-[#3d2e4a] text-xs rounded-full py-2.5 px-4 focus:outline-none"
                />
                <button
                  onClick={() => setActiveScreen("add-plant")}
                  className="bg-[#7f5a83] hover:bg-[#69486d] text-white text-xs font-bold px-4 py-2.5 rounded-full shrink-0 transition"
                >
                  + เพิ่มต้นไม้
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPlants.map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => handleOpenPlant(plant)}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#efe7de] flex items-center gap-4 cursor-pointer hover:border-[#d5b8ec] transition"
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-24 h-24 rounded-xl object-cover shrink-0 bg-[#f4f1ea]"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base text-[#3f3735] truncate">{plant.scientificName}</h3>
                    <p className="text-xs text-[#8c7f7a] mt-0.5">{plant.type} • Location: {plant.location}</p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <span className="text-xs text-[#8c7f7a] shrink-0">Health</span>
                      <div className="w-full h-2.5 bg-[#f1e6ee] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#e58ca8] to-[#b983e0] rounded-full"
                          style={{ width: `${plant.health}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#7f5a83]">{plant.health}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------
            3. PLANT PROFILE SCREEN (รายละเอียดต้นไม้)
        --------------------------------------------------------- */}
        {activeScreen === "profile" && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setActiveScreen("my-plants")}
              className="text-sm font-semibold text-[#5c424a] hover:underline mb-4 inline-block"
            >
              ← กลับไปหน้ารายการต้นไม้
            </button>

            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-[#efe7de]">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative w-full sm:w-64 h-64 rounded-2xl overflow-hidden shrink-0">
                  <img src={selectedPlant.image} alt={selectedPlant.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-[#3a3330]/80 text-white text-xs font-medium px-3 py-1 rounded-full">
                    ❤️ {selectedPlant.status} ({selectedPlant.health}%)
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#b86b82]">{selectedPlant.slug}</span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#4a3f3d]">{selectedPlant.name}</h1>
                    <p className="text-sm text-[#8c7f7a] mb-4">{selectedPlant.location}</p>

                    <h2 className="text-xs font-bold text-[#5c504d] mb-2">Quick Actions:</h2>
                    <div className="flex gap-2.5 mb-5">
                      <button
                        onClick={() => handleQuickAction("water")}
                        className="flex-1 bg-[#F4C4D4] hover:brightness-95 text-[#5e3744] py-2.5 px-4 rounded-full text-xs font-bold transition"
                      >
                        💧 Water Now
                      </button>
                      <button
                        onClick={() => handleQuickAction("mist")}
                        className="flex-1 bg-[#DFC7F2] hover:brightness-95 text-[#4b355c] py-2.5 px-4 rounded-full text-xs font-bold transition"
                      >
                        ✨ Mist Now
                      </button>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xs font-bold text-[#5c504d] mb-2">Care Summary:</h2>
                    <div className="bg-[#FCF9F4] rounded-2xl p-4 border border-[#efe7de] grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="font-bold text-[#4a3f3d]">☀️ Light</p>
                        <p className="text-[#8c7f7a]">{selectedPlant.light}</p>
                      </div>
                      <div>
                        <p className="font-bold text-[#4a3f3d]">💧 Water</p>
                        <p className="text-[#8c7f7a]">{selectedPlant.waterFreq}</p>
                      </div>
                      <div>
                        <p className="font-bold text-[#4a3f3d]">🌡️ Temp</p>
                        <p className="text-[#8c7f7a]">{selectedPlant.temp}</p>
                      </div>
                      <div>
                        <p className="font-bold text-[#4a3f3d]">🪴 Soil</p>
                        <p className="text-[#8c7f7a]">{selectedPlant.soil}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------
            4. ADD NEW PLANT SCREEN (เพิ่มต้นไม้ใหม่)
        --------------------------------------------------------- */}
        {activeScreen === "add-plant" && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 shadow-sm border border-[#efe7de]">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-[#4e3d42]">Add New Plant</h1>
              <button onClick={() => setActiveScreen("dashboard")} className="text-xs font-semibold text-stone-500 hover:text-stone-800">
                ✕ ปิดหน้าต่าง
              </button>
            </div>

            <label className="block text-xs font-bold text-[#4a3f3d] mb-2">ค้นหาหรือพิมพ์ชื่อต้นไม้</label>
            <input
              type="text"
              value={newPlantName}
              onChange={(e) => setNewPlantName(e.target.value)}
              placeholder="เช่น Monstera, Cactus, Fern..."
              className="w-full bg-[#f5f0e8] text-[#4a3f3d] placeholder-[#8c817c] text-sm rounded-full py-3 px-4 mb-5 focus:outline-none focus:ring-2 focus:ring-[#F9C6D4]"
            />

            <h2 className="text-xs font-bold text-[#4a3f3d] mb-2.5">หรือเลือกจากพันธุ์ยอดนิยม:</h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
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
                  className={`cursor-pointer rounded-2xl p-2 text-center border transition ${
                    selectedPopular === item.name ? "bg-[#F9C6D4]/40 border-[#e08ca4]" : "bg-[#FCF9F4] border-[#efe7de]"
                  }`}
                >
                  <img src={item.img} alt={item.name} className="w-full h-24 rounded-xl object-cover mb-2" />
                  <p className="text-xs font-bold text-[#4a3f3d]">{item.name}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddPlant}
              className="w-full bg-[#7f5a83] hover:bg-[#6b496f] text-white font-bold text-sm py-3.5 rounded-full shadow-md transition"
            >
              บันทึกและเพิ่มเข้าสวนของฉัน
            </button>
          </div>
        )}

        {/* ---------------------------------------------------------
            5. SHOP SCREEN (หน้าร้านค้าออนไลน์ สั่งซื้อสินค้า)
        --------------------------------------------------------- */}
        {activeScreen === "shop" && (
          <div>
            <div className="bg-[#D4E8D4] rounded-3xl p-5 mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#2e4d30]">🌿 Plantly Shop</h1>
                <p className="text-xs text-[#476b47]">เลือกซื้อต้นไม้ฟอกอากาศ กระถางพาสเทล และปุ๋ยบำรุง</p>
              </div>
              <button
                onClick={() => setActiveScreen("cart")}
                className="bg-white hover:bg-stone-50 px-4 py-2 rounded-full text-xs font-bold text-[#2e4d30] shadow-xs transition"
              >
                🛒 ตะกร้าของฉัน ({totalCartItems})
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {SHOP_PRODUCTS.map((prod) => (
                <div key={prod.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#e8efe8] flex flex-col justify-between">
                  <div>
                    <div className="w-full h-40 rounded-xl overflow-hidden bg-[#f4f7f4] mb-3">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold">{prod.category}</span>
                    <h3 className="font-bold text-sm text-[#3f3735] mt-0.5">{prod.name}</h3>
                    <p className="text-sm font-bold text-[#7f5a83] mt-1">฿{prod.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(prod)}
                    className="w-full bg-[#B7D7B8] hover:bg-[#a3c9a4] text-[#2e4d30] font-bold text-xs py-2.5 rounded-xl mt-3 transition"
                  >
                    + เพิ่มลงตะกร้า
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------
            6. CART & CHECKOUT SCREEN (ตะกร้าสินค้าและการสั่งซื้อ)
        --------------------------------------------------------- */}
        {activeScreen === "cart" && (
          <div className="max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setActiveScreen("shop")} className="text-sm font-semibold text-[#6e4d3b] hover:underline">
                ← กลับไปหน้าร้านค้า
              </button>
              <h1 className="text-xl font-bold text-[#4a3f3d]">ตะกร้าสินค้าของฉัน</h1>
            </div>

            {cart.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#efe7de]">
                <p className="text-4xl mb-3">🛒</p>
                <p className="text-sm text-stone-500 mb-4">ยังไม่มีสินค้าในตะกร้าของคุณ</p>
                <button
                  onClick={() => setActiveScreen("shop")}
                  className="bg-[#D4E8D4] text-[#2e4d30] text-xs font-bold px-5 py-2.5 rounded-full"
                >
                  ไปเลือกดูสินค้า
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-5 border border-[#efe7de] shadow-sm">
                <div className="flex flex-col gap-3 mb-6">
                  {cart.map(({ item, quantity }) => (
                    <div key={item.id} className="flex items-center gap-4 pb-3 border-b border-stone-100">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-[#4a3f3d] truncate">{item.name}</h4>
                        <p className="text-xs text-[#7f5a83] font-semibold">฿{item.price * quantity}</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center text-base font-bold text-[#4a3f3d] mb-4">
                  <span>ยอดรวมสุทธิ:</span>
                  <span className="text-xl text-[#7f5a83]">฿{totalPrice}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#7f5a83] hover:bg-[#6b496f] text-white font-bold text-sm py-3.5 rounded-full shadow-md transition"
                >
                  ยืนยันการสั่งซื้อสินค้า (Checkout)
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* =========================================================
          BOTTOM NAVIGATION BAR (แสดงเฉพาะบนหน้าจอมือถือขนาดเล็ก)
      ========================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#F9C6D4] border-t border-[#f0b4c5] px-4 flex items-center justify-around z-40">
        <button
          onClick={() => setActiveScreen("dashboard")}
          className={`flex flex-col items-center gap-0.5 ${
            activeScreen === "dashboard" ? "text-[#4e333b] font-bold" : "text-[#8c6873]"
          }`}
        >
          <span className="text-base">🏠</span>
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => setActiveScreen("my-plants")}
          className={`flex flex-col items-center gap-0.5 ${
            activeScreen === "my-plants" || activeScreen === "profile" || activeScreen === "add-plant"
              ? "text-[#4e333b] font-bold"
              : "text-[#8c6873]"
          }`}
        >
          <span className="text-base">🌿</span>
          <span className="text-[10px]">My Plants</span>
        </button>

        <button
          onClick={() => setActiveScreen("shop")}
          className={`flex flex-col items-center gap-0.5 ${
            activeScreen === "shop" || activeScreen === "cart" ? "text-[#4e333b] font-bold" : "text-[#8c6873]"
          }`}
        >
          <span className="text-base">🛍️</span>
          <span className="text-[10px]">Shop</span>
        </button>

        <button
          onClick={() => triggerToast("💡 ทริคประจำวัน: รดน้ำต้นไม้ช่วงเช้าช่วยให้รากดูดซึมได้ดีที่สุด!")}
          className="flex flex-col items-center gap-0.5 text-[#8c6873]"
        >
          <span className="text-base">💡</span>
          <span className="text-[10px]">Tips</span>
        </button>

        <button
          onClick={() => triggerToast("👤 เข้าสู่ระบบด้วยบัญชี: Alex")}
          className="flex flex-col items-center gap-0.5 text-[#8c6873]"
        >
          <span className="text-base">👤</span>
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>
    </div>
  );
}

```
