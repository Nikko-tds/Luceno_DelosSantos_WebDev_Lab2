# GearHub Mini E-Commerce

GearHub is a single-page React app for browsing tech accessories, filtering products, managing a cart, and processing a simulated checkout. State management relies entirely on React’s useReducer combined with createContext.

---

## Team Members
- Nikko Teopengco Delos Santos
- Lemuel Luceño

---

## Core Features and Requirements
**Product Browsing & Filtering:**
- Display a grid of products fetched from a static JSON file or mock data file.
- Filter products by category, max price range, and search query.
- Sort products by price (low-to-high, high-to-low) or title.

**Global Cart Management:**
- Slide-out / Drawer overlay for the Shopping Cart.
- Add items, remove items, and adjust item quantities (+ / -).
- Calculate real-time subtotal, and final grand total.

**User Experience Details:** 
- Badge counter on the cart icon reflecting the total item count (not just distinct line items).

---

## Prerequisites & Installation

Make sure you have [Node.js](https://nodejs.org/) installed on your machine. 

1. **Clone or open the project folder** in your terminal.
2. Make sure you are in the gearhub directory:
   ```bash
   cd gearhub
3. Install the required dependencies:
   ```bash
   npm install

---

## How to Run the Application
1. Start the dev server locally:
   ```bash
   npm run dev
2. Open your browser and navigate to http://localhost:3000 to view the application.

---

## Tech Stack

- Framework: **Next.js**
- Language: **TypeScript**
- Styling: **Tailwind CSS**
