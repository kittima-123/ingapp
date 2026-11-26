"use client";

import React, { useState, useEffect } from "react";

export default function AlarmLockApp() {
  const [screen, setScreen] = useState(1);
  const [currentTime, setCurrentTime] = useState("07:30");
  const [ampm, setAmpm] = useState("AM");
  const [currentDate, setCurrentDate] = useState("Mon, Oct 28");

  const [alarmTime, setAlarmTime] = useState("07:30");
  const [lockUntilAlarm, setLockUntilAlarm] = useState(true);
  const [vibrate, setVibrate] = useState(false);

  const [num1, setNum1] = useState(24);
  const [num2, setNum2] = useState(17);
  const [userInput, setUserInput] = useState("");

  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const currentAmpm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      setCurrentTime(`${String(hours).padStart(2, "0")}:${minutes}`);
      setAmpm(currentAmpm);
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const openMathChallenge = () => {
    setNum1(Math.floor(Math.random() * 40) + 10);
    setNum2(Math.floor(Math.random() * 40) + 10);
    setUserInput("");
    setScreen(4);
  };

  const pressNum = (n: number) => {
    if (userInput.length < 4) setUserInput((prev) => prev + n.toString());
  };

  const checkMath = () => {
    if (parseInt(userInput, 10) === num1 + num2) {
      alert("🎉 ถูกต้อง! ปลดล็อกหน้าจอสำเร็จ");
      setScreen(1);
    } else {
      alert("❌ คำตอบยังไม่ถูก ลองใหม่อีกครั้งนะ!");
      setUserInput("");
    }
  };

  return (
    <div className="app-wrapper">
      <div className="phone-frame">
        <div className="notch" />

        {screen === 1 && (
          <div className="screen">
            <div>
              <div className="clock-display">
                {currentTime}
                <span className="ampm">{ampm}</span>
              </div>
              <div className="date-text">{currentDate}</div>
            </div>
            <div className="mascot-box">☁️✨</div>
            <div style={{ fontSize: "60px" }}>🔒</div>
            <button className="btn-cute" onClick={() => setScreen(2)}>
              ตั้งเวลาปลุก &amp; ล็อก ↗
            </button>
          </div>
        )}

        {screen === 2 && (
          <div className="screen">
            <div className="title-3d">✨ Set Alarm &amp; Lock ✨</div>
            <div className="time-picker-circle">
              <div style={{ fontSize: "28px", marginBottom: "5px" }}>🐰</div>
              <input
                type="time"
                className="time-input"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
              />
            </div>
            <div style={{ width: "100%" }}>
              <div className="setting-row">
                <span>ล็อกหน้าจอจนกว่าจะปลุก</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={lockUntilAlarm}
                    onChange={(e) => setLockUntilAlarm(e.target.checked)}
                  />
                  <span className="slider" />
                </label>
              </div>
              <div className="setting-row">
                <span>ระบบสั่นเตือน (Vibrate)</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={vibrate}
                    onChange={(e) => setVibrate(e.target.checked)}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
            <button className="btn-cute btn-primary" onClick={() => setScreen(3)}>
              เริ่มล็อกหน้าจอ ✨
            </button>
          </div>
        )}

        {screen === 3 && (
          <div className="screen screen-night">
            <div>
              <div className="clock-display" style={{ fontSize: "52px" }}>
                06h 45m
                <br />
                Left
              </div>
              <div className="date-text" style={{ color: "#f3e8ff", marginTop: "15px" }}>
                ล็อกจนถึงเวลา {alarmTime}
              </div>
            </div>
            <div className="mascot-box">🐰💤🌙</div>
            <div style={{ width: "100%" }}>
              <div className="title-3d" style={{ fontSize: "24px", marginBottom: "20px" }}>
                Sleep Soundly...
              </div>
              <div className="emergency-link" onClick={openMathChallenge}>
                ปลดล็อกฉุกเฉิน (แก้โจทย์เลข)
              </div>
            </div>
          </div>
        )}

        {screen === 4 && (
          <div className="screen">
            <div className="title-3d">⭐ Solve to Unlock ⭐</div>
            <div className="math-box">
              <div className="math-question">{num1} + {num2} = ?</div>
              <div className="math-input-display">{userInput}</div>
            </div>
            <div className="numpad">
              {numbers.map((num) => (
                <button key={num} className="num-btn" onClick={() => pressNum(num)}>
                  {num}
                </button>
              ))}
              <div />
              <button className="num-btn" onClick={() => pressNum(0)}>0</button>
              <div />
            </div>
            <div className="action-row">
              <button className="btn-cute" style={{ padding: "12px" }} onClick={() => setUserInput("")}>
                CLEAR
              </button>
              <button className="btn-cute btn-primary" style={{ padding: "12px" }} onClick={checkMath}>
                ENTER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
