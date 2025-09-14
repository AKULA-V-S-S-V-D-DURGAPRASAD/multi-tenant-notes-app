# 📝 Multi-Tenant SaaS Notes App

A demo **multi-tenant SaaS Notes Application** built with **Next.js** and deployed on **Vercel**.  
Supports **tenant isolation, role-based access, JWT authentication, and subscription limits** (Free vs Pro plan).  

Tenants included:
- **Acme**  
- **Globex**

---

## 🚀 Features

- **Multi-Tenancy** → Strict data isolation between Acme and Globex.  
- **Authentication & Roles**  
  - **Admin** → can invite users & upgrade subscription.  
  - **Member** → can create, view, edit, delete notes.  
- **Subscription Plans**  
  - Free: Max 3 notes per tenant.  
  - Pro: Unlimited notes (upgradeable via API).  
- **Notes API (CRUD)**  
  - `POST /notes` – Create note  
  - `GET /notes` – List notes  
  - `GET /notes/:id` – Retrieve note  
  - `PUT /notes/:id` – Update note  
  - `DELETE /notes/:id` – Delete note  
- **Frontend**  
  - Login with test accounts  
  - List, create, delete notes  
  - Show "Upgrade to Pro" banner when Free tenant limit is reached  

---

## 🔑 Test Accounts

All accounts use password: **`password`**

- `admin@acme.test` → Admin (Tenant: Acme)  
- `user@acme.test` → Member (Tenant: Acme)  
- `admin@globex.test` → Admin (Tenant: Globex)  
- `user@globex.test` → Member (Tenant: Globex)  

---

## ⚡ Quick Start (Local)

1. **Clone & install**
   ```bash
   git clone https://github.com/yourusername/multi-tenant-notes-app.git
   cd multi-tenant-notes-app
   npm install
   npm run dev
