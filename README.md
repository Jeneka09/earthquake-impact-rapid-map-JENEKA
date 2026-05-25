# Earthquake Impact Rapid Map

Production-grade geospatial intelligence dashboard for the Real Rails Intelligence Library. Built with high-end fintech terminal aesthetics, providing real-time operational visibility into global seismic events and infrastructure exposure.

---

## 🌟 Features
- **Real-Time Geospatial Intelligence**: Live event feeds ingested directly from the USGS Earthquake Hazards API.
- **Impact Analysis Radius**: Dynamic exposure radius calculations powered by Turf.js, mapping severity relative to magnitude.
- **Infrastructure Overlays**: Toggleable intelligence layers for critical infrastructure (Hospitals, Power Grids) via OpenStreetMap.
- **Resilient Architecture**: Automatic fallback to local mock data systems ensuring operational continuity during API rate limits.
- **Bloomberg-Style UI**: Strict 70/30 split layout with Obsidian Black (#030712) background, glassmorphism elements, and cyan glow interactions.
- **Rapid Data Export**: Single-click GeoJSON generation for active intelligence payloads.

---

## 🛠️ Tech Stack
### Frontend
- **Next.js 14+** (App Router)
- **TypeScript** & **Tailwind CSS**
- **Leaflet** & **React Leaflet** (CartoDB Dark Matter tiles)
- **Turf.js** (Spatial Analysis)
- **Lucide React** (Iconography)

### Backend
- **FastAPI** (Python 3)
- **Pandas** & **GeoPandas** (Data Normalization)
- **Uvicorn** (ASGI Server)
- **Requests** (External API Ingestion)

---

## 📁 Folder Structure

```
earthquake-impact-rapid-map/
├── frontend/
│   ├── app/                   # Next.js App Router (page.tsx, layout.tsx)
│   ├── components/
│   │   ├── layout/            # Headers, FilterBars
│   │   ├── map/               # Leaflet IntelligenceMap
│   │   └── sidebar/           # 30% Intelligence Sidebar
│   ├── styles/                # globals.css (Real Rails UI overrides)
│   └── public/                # Static assets
│
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI Entry Point
│   │   ├── services/          # USGS ingestion & normalization
│   │   └── mock_data/         # Resilient fallback datasets
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 Setup Instructions & Installation

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
pip install -r requirements.txt
```
Start the FastAPI server:
```bash
python app/main.py
```
> The API will be active at `http://localhost:8000`

### 2. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```
Start the Next.js development server:
```bash
npm run dev
```
> The dashboard will be accessible at `http://localhost:3000`

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/` | GET | API Health check & status |
| `/earthquakes` | GET | Fetches live USGS data or falls back to mock dataset. Accepts `minMagnitude` query param. |
| `/analytics` | GET | Returns high-level operational metrics (Active Events, Zones). |
| `/infrastructure` | GET | Retrieves critical infrastructure coordinates (Hospitals, Power Grids) within a specified radius. |

---

## ⚙️ Environment Variables

Copy the provided `.env.example` files to `.env` in both the `frontend` and `backend` directories.

**Frontend (`frontend/.env`)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
# NEXT_PUBLIC_MAPBOX_TOKEN= (Optional if switching from CartoDB)
```

**Backend (`backend/.env`)**:
```env
USGS_API_URL=https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
ENV=development
```

---

## 📸 Screenshots

*(Placeholders for future UI captures)*
- [Dashboard Overview]
- [Infrastructure Overlays Active]
- [Mock Fallback Indicator]

---

## 🚀 Future Improvements
- Integrate active WorldPop raster data for true population exposure calculations.
- Expand Overpass API queries for live dynamic infrastructure loading based on map bounds.
- Implement WebSocket connections for true push-based real-time event updates.

---

## 📄 License
MIT License