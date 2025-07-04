# 🎨 Color Palette Generator

The **Color Palette Generator** is a web-based tool that allows users to generate beautiful and random color palettes. Built using **HTML**, **CSS**, and **JavaScript**, this project works entirely on the frontend — no external APIs or backend services required.

---

## 🚀 Features

- 🔀 **Generate Random Palettes**  
  Instantly create a new set of 5 random colors with a single click.

- 🔒 **Lock Colors**  
  Lock individual colors to keep them unchanged while generating new ones.

- 📋 **Copy Hex Code**  
  Click any color to copy its hex value to the clipboard.

- 💾 **Save Palettes** *(optional feature)*  
  Save your favorite palettes to `localStorage` for future use.

- 🌙 **Dark Mode Toggle** *(optional feature)*  
  Switch between light and dark themes with one click.

- ✨ **Clean UI + Smooth Animations**  
  Minimalistic design with responsive layout and hover/transition effects.

---

## 💡 How It Works

- Colors are generated using JavaScript with `Math.random()` and converted to valid hex codes.
- The app listens for user events (clicks, locks, etc.) and dynamically updates the DOM.
- Saved palettes and theme preferences are stored using `localStorage`.

---

## 🛠️ Built With

- **HTML** – Markup structure for content display
- **CSS** – Styling and layout (with transitions and variables)
- **JavaScript (Vanilla)** – All app logic (DOM manipulation, events, color generation, local storage)

