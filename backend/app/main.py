from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from services.earthquake_service import EarthquakeService
from datetime import datetime

app = FastAPI(title="Earthquake Impact Rapid Map API")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Earthquake Impact Rapid Map Intelligence API", "status": "active"}

@app.get("/earthquakes")
async def get_earthquakes(min_mag: float = Query(0.0, alias="minMagnitude")):
    """Fetch live earthquake data with optional magnitude filtering."""
    events = EarthquakeService.get_recent_earthquakes(min_mag)
    return {
        "count": len(events),
        "timestamp": datetime.now().isoformat(),
        "data": events,
        "is_mock": not bool(events) # Simple flag for demo
    }

@app.get("/population-impact")
async def get_population_impact(lat: float, lon: float, magnitude: float):
    """Calculate population impact for a specific coordinate and magnitude."""
    # This would typically use WorldPop or similar datasets
    # For this POC, we return intelligence-driven mock analysis
    impact = EarthquakeService.get_impact_analysis("impact_query", lat, lon, magnitude)
    return impact

@app.get("/infrastructure")
async def get_infrastructure(lat: float, lon: float, radius: float):
    """Retrieve critical infrastructure within a given radius (km)."""
    # This would use OSM/Overpass API
    # Mocking for the POC
    return {
        "hospitals": [
            {"name": "Emergency Medical Center A", "lat": lat + 0.01, "lon": lon - 0.01},
            {"name": "Regional Trauma Center", "lat": lat - 0.02, "lon": lon + 0.015}
        ],
        "power_grid": [
            {"name": "Substation 42", "lat": lat + 0.005, "lon": lon + 0.005}
        ]
    }

@app.get("/analytics")
async def get_analytics():
    """Summary metrics for the dashboard."""
    return {
        "total_active_events": 124,
        "critical_exposure_zones": 3,
        "infrastructure_at_risk": 45,
        "last_update": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
