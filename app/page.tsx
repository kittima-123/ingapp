"use client";

import React, { useState } from "react";
import {
  Home,
  Sprout,
  Users,
  Lightbulb,
  User,
  Search,
  Droplets,
  Sun,
  ArrowUpDown,
  ArrowLeft,
  X,
  Camera,
  Plus,
  Sparkles,
  Thermometer,
  Layers,
  CheckCircle2,
  Edit3,
  Heart,
} from "lucide-react";

// --- ข้อมูลจำลอง (Mock Data) ---
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

type ScreenType = "dashboard" | "my-plants" | "profile" | "add-plant";

export default function PlantlyPrototype() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("dashboard");
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [selectedPlant, setSelectedPlant] = useState<Plant>(INITIAL_PLANTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // State สำหรับหน้า Add New Plant
  const [newPlantName, setNewPlantName] = useState("");
  const [selectedPopular, setSelectedPopular] = useState<string | null>(null);

  // แจ้งเตือนเมื่อกดปุ่ม Action
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // เปิดหน้าโปรไฟล์ต้นไม้
  const handleOpenPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setActiveScreen("profile");
  };

  // กดรดน้ำหรือพ่นหมอก
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
      action === "water"
        ? `💧 Watered ${selectedPlant.name}!`
        : `✨ Misted ${selectedPlant.name}!`
    );
  };

  // เพิ่มต้นไม้ใหม่เข้า Collection
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
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
    };
    setPlants([newEntry, ...plants]);
    setNewPlantName("");
    setSelectedPopular(null);
    triggerToast(`🌱 Added ${nameToUse} to your corner!`);
    setActiveScreen("my-plants");
  };

  // กรองรายชื่อต้นไม้ในหน้า My Plants
  const filteredPlants = plants.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-4 px-2 bg-[#efeae2]">
      {/* แถบปุ่มสลับหน้าด่วนสำหรับทดสอบ Prototype */}
      <div className="mb-3 flex flex-wrap gap-2 justify-center">
        {(
          [
            { id: "dashboard", label: "1. Dashboard" },
            { id: "my-plants", label: "2. My Plants" },
            { id: "profile", label: "3. Plant Profile" },
            { id: "add-plant", label: "4. Add Plant" },
          ] as { id: ScreenType; label: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveScreen(tab.id)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              activeScreen === tab.id
                ? "bg-[#7f5a83] text-white shadow"
                : "bg-white/80 text-stone-600 hover:bg-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* กรอบจำลองหน้าจอมือถือขนาด 390x882 px */}
      <div className="relative w-[390px] h-[882px] bg-[#FCF9F4] rounded-[42px] shadow-2xl border-[6px] border-[#2d2926] overflow-hidden flex flex-col justify-between">
        {/* Toast แจ้งเตือน */}
        {toastMsg && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#4a3b47] text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg animate-bounce">
            {toastMsg}
          </div>
        )}

        {/* =========================================================
            หน้า 1: DASHBOARD (OVERVIEW)
        ========================================================= */}
        {activeScreen === "dashboard" && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-20">
            {/* Header สีชมพูขอบหยัก */}
            <div className="bg-[#F9C6D4] pt-7 pb-4 px-5 flex items-center justify-between relative">
              <div className="w-8" />
              <div className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-[#d97793]">
                  <Sprout className="w-4 h-4" />
                </span>
                <span className="text-xl font-bold text-[#4e3d42] tracking-tight">
                  Plantly
                </span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Alex"
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>
            <div className="h-3 w-full bg-[#F9C6D4] [clip-path:polygon(0_0,100%_0,100%_40%,95%_100%,90%_40%,85%_100%,80%_40%,75%_100%,70%_40%,65%_100%,60%_40%,55%_100%,50%_40%,45%_100%,40%_40%,35%_100%,30%_40%,25%_100%,20%_40%,15%_100%,10%_40%,5%_100%,0_40%)]" />

            {/* คำทักทาย */}
            <div className="px-5 pt-3">
              <h1 className="text-[22px] font-bold text-[#4a3f3d] flex items-center gap-1.5">
                Good Morning, Alex! <span className="text-amber-400">☀️</span>
              </h1>
              <div className="flex items-center justify-between mt-3 mb-2.5">
                <h2 className="text-sm font-bold text-[#5c504d]">
                  My Plant Corner
                </h2>
                <button
                  onClick={() => setActiveScreen("add-plant")}
                  className="text-xs font-semibold text-[#b86b82] hover:underline"
                >
                  + Add Plant
                </button>
              </div>

              {/* Grid การ์ดต้นไม้ 2x2 */}
              <div className="grid grid-cols-2 gap-3">
                {plants.slice(0, 4).map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => handleOpenPlant(plant)}
                    className="bg-white rounded-2xl p-2.5 shadow-sm border border-[#f0e8df] cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <div className="w-full h-32 rounded-xl overflow-hidden bg-[#f4f1ea] mb-2">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-sm text-[#3f3735] truncate">
                      {plant.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                      {plant.status}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#8c7f7a] mt-0.5">
                      <Droplets className="w-3 h-3 text-sky-400" />
                      Water in {plant.nextWater}
                    </div>
                  </div>
                ))}
              </div>

              {/* Upcoming Tasks */}
              <div className="mt-5">
                <h2 className="text-sm font-bold text-[#5c504d] mb-2.5">
                  Upcoming Tasks:
                </h2>
                <div className="flex flex-col gap-2 items-start">
                  <button
                    onClick={() => triggerToast("💧 Watered Monstera!")}
                    className="flex items-center gap-2 bg-[#D7EEF7] text-[#3a5a68] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs hover:brightness-95 transition"
                  >
                    <Droplets className="w-3.5 h-3.5 text-sky-600" />
                    Water Monstera
                  </button>
                  <button
                    onClick={() => triggerToast("✨ Misted Pilea!")}
                    className="flex items-center gap-2 bg-[#E6D9F5] text-[#55426b] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs hover:brightness-95 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    Mist Pilea
                  </button>
                  <button
                    onClick={() => triggerToast("🌿 Fertilized Snake Plant!")}
                    className="flex items-center gap-2 bg-[#FBE7B2] text-[#6b5624] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs hover:brightness-95 transition"
                  >
                    <Sprout className="w-3.5 h-3.5 text-amber-600" />
                    Fertilize Snake Plant
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            หน้า 2: MY PLANTS (COLLECTION)
        ========================================================= */}
        {activeScreen === "my-plants" && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-20 relative">
            {/* Header สีม่วงพาสเทล */}
            <div className="bg-[#DFC7F2] pt-7 pb-4 px-5">
              <div className="flex items-center justify-center gap-1.5 mb-3">
                <span className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-[#8e5cb5]">
                  <Sprout className="w-4 h-4" />
                </span>
                <span className="text-xl font-bold text-[#4a3957]">
                  Plantly
                </span>
              </div>

              {/* ช่องค้นหา */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#8c7a9c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search plants..."
                  className="w-full bg-[#cbb0e2]/60 placeholder-[#7a688a] text-[#3d2e4a] text-xs rounded-full py-2.5 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
            <div className="h-3 w-full bg-[#DFC7F2] [clip-path:polygon(0_0,100%_0,100%_40%,95%_100%,90%_40%,85%_100%,80%_40%,75%_100%,70%_40%,65%_100%,60%_40%,55%_100%,50%_40%,45%_100%,40%_40%,35%_100%,30%_40%,25%_100%,20%_40%,15%_100%,10%_40%,5%_100%,0_40%)]" />

            <div className="px-5 pt-2">
              <h2 className="text-base font-bold text-[#4a3f3d]">
                My Plants ({plants.length} Total)
              </h2>

              {/* แถบตัวกรอง (Filter Chips) */}
              <div className="flex items-center gap-1.5 my-3 overflow-x-auto no-scrollbar">
                {[
                  { label: "All", bg: "bg-[#F6C8D6] text-[#6e3b4b]" },
                  {
                    label: "Watering",
                    icon: <Droplets className="w-3 h-3" />,
                    bg: "bg-[#E5D4F3] text-[#563d6b]",
                  },
                  {
                    label: "Light",
                    icon: <Sun className="w-3 h-3" />,
                    bg: "bg-[#F5E0D3] text-[#6e4d3b]",
                  },
                  {
                    label: "A-Z",
                    icon: <ArrowUpDown className="w-3 h-3" />,
                    bg: "bg-[#DFC7F2] text-[#4e3663]",
                  },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => setActiveFilter(chip.label)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition ${
                      chip.bg
                    } ${
                      activeFilter === chip.label
                        ? "ring-2 ring-[#7f5a83]"
                        : "opacity-85"
                    }`}
                  >
                    {chip.icon}
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* รายการต้นไม้แบบ List Card */}
              <div className="flex flex-col gap-3">
                {filteredPlants.map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => handleOpenPlant(plant)}
                    className="bg-white rounded-2xl p-3 shadow-sm border border-[#efe7de] flex items-center gap-3 cursor-pointer hover:border-[#d5b8ec] transition"
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 bg-[#f4f1ea]"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-[#3f3735] truncate">
                        {plant.scientificName}
                      </h3>
                      <p className="text-[11px] text-[#8c7f7a]">
                        {plant.type}
                      </p>
                      <p className="text-[11px] text-[#6e625e]">
                        Location: {plant.location}
                      </p>

                      {/* Health Bar */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-[#8c7f7a] shrink-0">
                          Health Bar
                        </span>
                        <div className="w-full h-2 bg-[#f1e6ee] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#e58ca8] to-[#b983e0] rounded-full"
                            style={{ width: `${plant.health}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-1 text-[10px] text-[#7a6b85] font-medium mt-1">
                        <Droplets className="w-3 h-3 text-purple-400" />
                        Next water: Wed
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ปุ่ม Floating Action (+) */}
            <button
              onClick={() => setActiveScreen("add-plant")}
              className="absolute bottom-24 right-5 w-11 h-11 rounded-full bg-[#B7D7B8] text-[#2e4d30] shadow-lg flex items-center justify-center hover:scale-105 transition"
              title="Add New Plant"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* =========================================================
            หน้า 3: PLANT PROFILE (DETAILS)
        ========================================================= */}
        {activeScreen === "profile" && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-20">
            {/* Top Bar สีชมพู */}
            <div className="bg-[#F9C6D4] pt-7 pb-3 px-5 flex items-center justify-between">
              <button
                onClick={() => setActiveScreen("my-plants")}
                className="flex items-center gap-1 text-xs font-semibold text-[#5c424a] hover:opacity-75"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <span className="text-xs font-bold text-[#4e3d42]">
                {selectedPlant.slug}
              </span>
              <div className="w-10" />
            </div>
            <div className="h-3 w-full bg-[#F9C6D4] [clip-path:polygon(0_0,100%_0,100%_40%,95%_100%,90%_40%,85%_100%,80%_40%,75%_100%,70%_40%,65%_100%,60%_40%,55%_100%,50%_40%,45%_100%,40%_40%,35%_100%,30%_40%,25%_100%,20%_40%,15%_100%,10%_40%,5%_100%,0_40%)]" />

            <div className="px-5 pt-2">
              <h1 className="text-2xl font-bold text-[#4a3f3d]">
                {selectedPlant.name}
              </h1>
              <p className="text-xs text-[#8c7f7a] mb-3">
                {selectedPlant.location}
              </p>

              {/* รูปภาพขนาดใหญ่พร้อมป้าย Healthy */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm mb-4">
                <img
                  src={selectedPlant.image}
                  alt={selectedPlant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-[#3a3330]/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-[#f48fb1] fill-[#f48fb1]" />
                  {selectedPlant.status} ({selectedPlant.health}%)
                </div>
              </div>

              {/* Quick Actions */}
              <h2 className="text-xs font-bold text-[#5c504d] mb-2">
                Quick Actions:
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => handleQuickAction("water")}
                  className="flex-1 bg-[#F4C4D4] text-[#5e3744] py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition"
                >
                  <Droplets className="w-3.5 h-3.5" />
                  Water Now
                </button>
                <button
                  onClick={() => handleQuickAction("mist")}
                  className="flex-1 bg-[#DFC7F2] text-[#4b355c] py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Mist Now
                </button>
                <button
                  onClick={() => triggerToast("✏️ Edit mode enabled")}
                  className="bg-[#D5C3E8] text-[#4b355c] py-2 px-3.5 rounded-full text-xs font-bold flex items-center gap-1 active:scale-95 transition"
                >
                  <Edit3 className="w-3 h-3" />
                  Edit
                </button>
              </div>

              {/* Next Tasks */}
              <h2 className="text-xs font-bold text-[#5c504d] mb-2">
                Next Tasks:
              </h2>
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="bg-[#F9D6E2] p-3 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#593642]">Water</p>
                    <p className="text-[11px] text-[#7a5260]">
                      In {selectedPlant.nextWater}
                    </p>
                  </div>
                  <Droplets className="w-5 h-5 text-[#c96f8d]" />
                </div>
                <div className="bg-[#E6D4F5] p-3 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#493459]">Mist</p>
                    <p className="text-[11px] text-[#68507a]">
                      In {selectedPlant.nextMist}
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#936bb5]" />
                </div>
              </div>

              {/* Care Summary */}
              <h2 className="text-xs font-bold text-[#5c504d] mb-2">
                Care Summary:
              </h2>
              <div className="bg-white rounded-2xl p-3.5 border border-[#efe7de] grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                <div className="flex items-start gap-2">
                  <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#4a3f3d]">Light</p>
                    <p className="text-[11px] text-[#8c7f7a]">
                      {selectedPlant.light}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Droplets className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#4a3f3d]">Water</p>
                    <p className="text-[11px] text-[#8c7f7a]">
                      {selectedPlant.waterFreq}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Thermometer className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#4a3f3d]">Temp</p>
                    <p className="text-[11px] text-[#8c7f7a]">
                      {selectedPlant.temp}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Layers className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#4a3f3d]">Soil</p>
                    <p className="text-[11px] text-[#8c7f7a]">
                      {selectedPlant.soil}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            หน้า 4: ADD NEW PLANT (SETUP)
        ========================================================= */}
        {activeScreen === "add-plant" && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-20">
            {/* Header */}
            <div className="bg-[#F9C6D4] pt-7 pb-3 px-5 flex items-center justify-between">
              <button
                onClick={() => setActiveScreen("dashboard")}
                className="flex items-center gap-1 text-xs font-semibold text-[#5c424a]"
              >
                <X className="w-4 h-4" />
                Close
              </button>
              <span className="text-sm font-bold text-[#4e3d42]">
                Add New Plant
              </span>
              <div className="w-10" />
            </div>
            <div className="h-3 w-full bg-[#F9C6D4] [clip-path:polygon(0_0,100%_0,100%_40%,95%_100%,90%_40%,85%_100%,80%_40%,75%_100%,70%_40%,65%_100%,60%_40%,55%_100%,50%_40%,45%_100%,40%_40%,35%_100%,30%_40%,25%_100%,20%_40%,15%_100%,10%_40%,5%_100%,0_40%)]" />

            <div className="px-5 pt-2">
              {/* Step Indicator */}
              <div className="text-center mb-3">
                <p className="text-[11px] font-semibold text-[#7a6d69] mb-1.5">
                  Step 1 of 3
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#8cb369] ring-4 ring-[#8cb369]/20" />
                  <span className="w-12 h-0.5 bg-[#d8cfc6]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d8cfc6]" />
                  <span className="w-12 h-0.5 bg-[#d8cfc6]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d8cfc6]" />
                </div>
              </div>

              {/* Search / Identify */}
              <h2 className="text-sm font-bold text-[#4a3f3d] mb-2">
                Search/Identify
              </h2>
              <input
                type="text"
                value={newPlantName}
                onChange={(e) => setNewPlantName(e.target.value)}
                placeholder="Search by name or type..."
                className="w-full bg-[#ebe5dc] text-[#4a3f3d] placeholder-[#8c817c] text-xs rounded-full py-2.5 px-4 mb-3 focus:outline-none focus:ring-2 focus:ring-[#F9C6D4]"
              />

              {/* กล่องสแกน / อัปโหลดรูป */}
              <button
                onClick={() =>
                  triggerToast("📸 Camera ready! Snap a leaf to identify.")
                }
                className="w-full h-24 rounded-2xl border-2 border-dashed border-[#d6c9bc] bg-[#f7f2eb] flex flex-col items-center justify-center gap-1.5 text-[#7a6e68] hover:bg-[#f2ebe1] transition mb-4"
              >
                <Camera className="w-7 h-7 text-[#9c8e86]" />
                <span className="text-xs font-medium">
                  Tap to capture/upload
                </span>
              </button>

              {/* Most Popular */}
              <h2 className="text-sm font-bold text-[#4a3f3d] mb-2">
                Most Popular:
              </h2>
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {[
                  {
                    name: "Fiddle Leaf Fig",
                    img: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=300&q=80",
                  },
                  {
                    name: "Pilea Peperomioides",
                    img: "https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?auto=format&fit=crop&w=300&q=80",
                  },
                  {
                    name: "Snake Plant",
                    img: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=300&q=80",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    onClick={() => {
                      setSelectedPopular(item.name);
                      setNewPlantName(item.name);
                    }}
                    className={`cursor-pointer rounded-xl p-1.5 text-center transition border ${
                      selectedPopular === item.name
                        ? "bg-[#F9C6D4]/40 border-[#e08ca4]"
                        : "bg-white border-[#efe7de]"
                    }`}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-16 rounded-lg object-cover mb-1"
                    />
                    <p className="text-[10px] font-bold text-[#4a3f3d] leading-tight">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Categories */}
              <h2 className="text-sm font-bold text-[#4a3f3d] mb-2">
                Or select from categories
              </h2>
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div
                  onClick={() => setNewPlantName("Indoor Fern")}
                  className="bg-white rounded-xl p-2 border border-[#efe7de] flex items-center gap-2 cursor-pointer hover:border-[#d6b8ec]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=200&q=80"
                    alt="Foliage"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span className="text-xs font-bold text-[#4a3f3d]">
                    Indoor Foliage
                  </span>
                </div>
                <div
                  onClick={() => setNewPlantName("Echeveria Succulent")}
                  className="bg-white rounded-xl p-2 border border-[#efe7de] flex items-center gap-2 cursor-pointer hover:border-[#d6b8ec]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=200&q=80"
                    alt="Succulents"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span className="text-xs font-bold text-[#4a3f3d]">
                    Succulents & Cacti
                  </span>
                </div>
              </div>

              {/* ปุ่มยืนยันเพิ่มต้นไม้ */}
              <button
                onClick={handleAddPlant}
                className="w-full bg-[#7f5a83] hover:bg-[#6b496f] text-white font-bold text-xs py-3 rounded-full shadow-md flex items-center justify-center gap-1.5 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                Save & Add to My Plants
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            BOTTOM NAVIGATION BAR (แถบเมนูด้านล่างทั้ง 5 ปุ่ม)
        ========================================================= */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#F9C6D4] border-t border-[#f0b4c5] px-4 flex items-center justify-around">
          <button
            onClick={() => setActiveScreen("dashboard")}
            className={`flex flex-col items-center gap-0.5 transition ${
              activeScreen === "dashboard"
                ? "text-[#4e333b] font-bold scale-105"
                : "text-[#8c6873]"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={() => setActiveScreen("my-plants")}
            className={`flex flex-col items-center gap-0.5 transition ${
              activeScreen === "my-plants" || activeScreen === "profile"
                ? "text-[#4e333b] font-bold scale-105"
                : "text-[#8c6873]"
            }`}
          >
            <Sprout className="w-5 h-5" />
            <span className="text-[10px]">My Plants</span>
          </button>

          <button
            onClick={() => triggerToast("🌿 Community feed coming soon!")}
            className="flex flex-col items-center gap-0.5 text-[#8c6873] hover:text-[#4e333b]"
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px]">Community</span>
          </button>

          <button
            onClick={() => triggerToast("💡 Daily Tip: Mist tropical plants in the morning!")}
            className="flex flex-col items-center gap-0.5 text-[#8c6873] hover:text-[#4e333b]"
          >
            <Lightbulb className="w-5 h-5" />
            <span className="text-[10px]">Tips</span>
          </button>

          <button
            onClick={() => triggerToast("👤 Signed in as Alex")}
            className="flex flex-col items-center gap-0.5 text-[#8c6873] hover:text-[#4e333b]"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
