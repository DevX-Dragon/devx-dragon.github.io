---
title: "ESP32 Wi-Fi Weather Station"
description: "Built a full weather monitoring station from scratch on a breadboard first, then soldered the whole thing onto perfboard. Pulls temp/humidity from a DHT22 sensor and blasts it to a local web dashboard I coded. The ESP32 runs the whole show over Wi-Fi. Yes I burned my finger. Yes it was worth it."
tags: ["Hardware", "Software"]
images:
  - "/projects/weather-station/hero.jpg"
  - "/projects/weather-station/board.jpg"
  - "/projects/weather-station/dashboard.jpg"
repoUrl: "https://github.com/DevX-Dragon/esp32-weather-station"
date: "2024-03-15"
featured: true
status: "done"
---

## What is this thing

A Wi-Fi weather station that I soldered myself. ESP32 microcontroller as the brain, DHT22 sensor for temp + humidity readings, and a custom web dashboard that auto-refreshes every 30 seconds.

## The Hardware Stack

- **MCU:** ESP32-WROOM-32 (the one with the metal cap, not the ceramic antenna)
- **Sensor:** DHT22 — way more accurate than the DHT11
- **Display:** 0.96" OLED via I2C for local readout
- **Power:** USB-C breakout board → 3.3V LDO regulator
- All THT components on perfboard, hand-wired with 22AWG solid core

## What I learned

Decoupling capacitors are NOT optional. I ignored them the first time and got garbage readings. Also learned that desoldering is 10x harder than soldering, so measure twice, solder once.

## The Software Side

Firmware is written in Arduino C++. Dashboard is a tiny Node.js server that logs to SQLite and serves a React frontend. Both run on my home Raspberry Pi.
