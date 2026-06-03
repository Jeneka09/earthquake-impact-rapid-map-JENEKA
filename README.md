# POC-36 · Earthquake Impact Rapid Map · Real Rails Intelligence Library · Data & Intelligence Rail

A production-style full-stack intelligence dashboard for monitoring global seismic events and infrastructure impact — built as part of the Real Rails Internship Program at Boston Institute of Analytics.

## 📸 Preview
Live dark dashboard showing real-time global earthquake activity with magnitude-scaled impact radii, infrastructure exposure mapping, and synthetic population estimations.

## ✨ Features

| Feature | Description |
| :--- | :--- |
| 🗺️ **Interactive Map** | World map with pulsing event markers and dynamic magnitude-based impact radii |
| 📊 **Live Metrics** | Total active events and critical exposure zones |
| 🧠 **Population Estimate** | Synthetic population calculation computing total affected residents and density within the impact zone |
| 🏥 **Infrastructure Overlays** | Toggleable intelligence layers for critical infrastructure (Hospitals, Power Grids) |
| 🚨 **Selection Insight** | Deep-dive statistics and exposure score for any selected seismic event |
| 🎯 **Filters** | Dynamic filtering by minimum magnitude and time window |
| ❓ **Why This Matters** | Explanation panel for operational visibility into infrastructure exposure |
| 🚂 **Who Controls The Rail** | Key stakeholders like USGS, WorldPop, and OpenStreetMap |
| 📥 **Rapid Export** | Single-click GeoJSON generation for active intelligence payloads |

## 🛠️ Tech Stack

**Frontend**
- **Next.js 14** — React framework with App Router
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **Leaflet.js** & **React Leaflet** — Interactive map rendering
- **Turf.js** — Spatial analysis

**Backend**
- **Python FastAPI** — High-performance REST API
- **Pandas** & **GeoPandas** — Data analysis and spatial mapping
- **Uvicorn** — ASGI server
- **Requests** — External API ingestion

## 📂 Project Structure

```
earthquake-impact-rapid-map/
├── backend/
│   ├── app/
│   │   ├── main.py                    # FastAPI app with all API endpoints
│   │   ├── services/
│   │   │   └── earthquake_service.py  # USGS ingestion & impact logic
│   │   └── mock_data/                 # Resilient fallback datasets
│   └── requirements.txt               # Python dependencies
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── layout/                # Headers and Filter Bars
│   │   │   ├── map/                   # IntelligenceMap (Leaflet)
│   │   │   └── sidebar/               # Intelligence Sidebar
│   │   └── page.tsx                   # Main dashboard page
│   ├── styles/                        # globals.css
│   └── tailwind.config.ts             # Tailwind configuration
├── .env.example                       # Environment variables template
├── .gitignore
└── README.md
```

## 🚀 Getting Started

**Prerequisites**
- Node.js 18+
- Python 3.9+
- npm or yarn

**1. Clone the repository**
```bash
git clone https://github.com/Real-Rails-Interns-Batch2/earthquake-impact-rapid-map-JENEKA.git
cd earthquake-impact-rapid-map-JENEKA
```

**2. Set up environment variables**
```bash
cp .env.example .env
```
*(Perform this in both the frontend and backend directories)*

**3. Start the backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
python app/main.py
```
Backend runs on: `http://localhost:8000`

**4. Start the frontend**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:3000`

## 🔌 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/` | GET | API health check & status |
| `/earthquakes` | GET | Fetches live USGS data or falls back to mock dataset |
| `/analytics` | GET | Aggregate metrics (Active Events, Zones) |
| `/infrastructure` | GET | Retrieves critical infrastructure coordinates |
| `/population-impact` | GET | Synthetic population estimation calculation |

## 📊 Data Sources

| Source | Status | Description |
| :--- | :--- | :--- |
| **USGS** | Live / Mock Fallback | Real-time seismic event data feeds |
| **WorldPop** | Synthetic | Population density and exposure mapping |
| **OpenStreetMap** | Synthetic | Critical infrastructure locations |

*Note: Synthetic data is clearly labelled per Real Rails manifesto guidelines. All mock data is representative of real-world patterns.*

## 🎨 Dashboard Panels

**Why This Matters**
Practical emergency-intelligence PoC with strong visual clarity. Operational visibility into infrastructure exposure is critical for rapid response and resource allocation.

**Who Controls The Rail**
Emergency response infrastructure is governed by a patchwork of national geological surveys (USGS), international population data providers (WorldPop), and localized open-source mapping contributors (OpenStreetMap).

## 👩‍💻 Built By
**JENEKA AD - Earthquake Impact Rapid Map POC #36**