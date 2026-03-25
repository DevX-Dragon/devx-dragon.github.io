---
title: "KiCad Custom Keyboard PCB"
description: "Designed a 40% ortholinear keyboard PCB in KiCad from scratch. No off-the-shelf layouts—I drew every trace myself. Uses Gateron Yellow switches (lubed, obviously) and an RP2040 running QMK. This is my daily driver now."
tags: ["Hardware", "IRL"]
images:
  - "/projects/keyboard-pcb/render.jpg"
  - "/projects/keyboard-pcb/kicad.jpg"
repoUrl: "https://github.com/DevX-Dragon/ortho40-pcb"
date: "2024-05-20"
featured: true
status: "done"
---

## The Board

40% ortholinear layout. Every key is in a perfect grid. Either you love it or you think I'm insane. I've gotten used to it.

## Design Process

Started in KiCad 7, drew the schematic first then moved to PCB layout. Got the Gerbers manufactured at JLCPCB — 5 boards for less than the cost of a pizza. Two had bad solder bridges (user error), two are backups, one is on my desk right now.

## Components

All THT switches (no hot-swap sockets on this version), but the diodes are SMD 1N4148W because hand-soldering 40 SOD-123 pads builds character apparently.
