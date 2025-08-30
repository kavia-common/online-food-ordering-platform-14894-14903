# Foodly – Qwik City App ⚡️

Modern, light-themed food ordering frontend built with Qwik and QwikCity.

Features:
- Browse menu with search and category filter
- Add items to cart, adjust quantities, and checkout
- User registration and login (demo/local storage)
- View order history
- Responsive layout: header with navigation, main content, sidebar cart, footer

Color palette:
- Primary: #FF5722
- Secondary: #FFC107
- Accent: #4CAF50

Project structure:
- src/components: Header, Footer, MenuItemCard, SidebarCart
- src/lib: types and storage utilities
- src/routes: index (menu), orders (history), auth/login, auth/register

Environment variables:
- PUBLIC_API_BASE (optional): base URL for API calls. When set, the frontend will call your backend under this base. For example, set PUBLIC_API_BASE=/api.

Create .env:
1) Copy .env.example to .env
2) Adjust values for your environment

Scripts:
- npm start      Start dev server
- npm run build  Build production bundles
- npm run preview Build and preview production

Development
- Run: npm install && npm start
- App will start on http://localhost:3000
- During development, demo data is stored in localStorage.

Backend integration notes
- storage.ts currently uses localStorage for demo purposes.
- When connecting to your backend (e.g., food_website_database API), replace or augment the functions in src/lib/storage.ts to fetch from API_BASE: process.env-like import via import.meta.env.PUBLIC_API_BASE.

```env
PUBLIC_API_BASE=/api
```

Security and compliance
- Do not store secrets in PUBLIC_* variables; these are exposed to the client.
- Use a server adapter and secure auth flow when integrating with a real backend.
