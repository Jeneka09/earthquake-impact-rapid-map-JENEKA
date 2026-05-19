import requests
import json
import os
from datetime import datetime, timedelta
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point

class EarthquakeService:
    USGS_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    MOCK_FILE = os.path.join(os.path.dirname(__file__), "..", "mock_data", "mock_data.json")

    @classmethod
    def get_recent_earthquakes(cls, min_magnitude=0.0):
        try:
            response = requests.get(cls.USGS_URL, timeout=10)
            response.raise_for_status()
            data = response.json()
            return cls._process_usgs_data(data, min_magnitude)
        except Exception as e:
            print(f"Error fetching live data: {e}. Falling back to mock data.")
            return cls._get_mock_data(min_magnitude)

    @classmethod
    def _process_usgs_data(cls, data, min_magnitude):
        features = data.get("features", [])
        processed = []
        for feature in features:
            props = feature["properties"]
            geom = feature["geometry"]
            mag = props.get("mag", 0)
            
            if mag < min_magnitude:
                continue
                
            # Basic impact radius calculation based on magnitude
            # This is a simplified model for demonstration
            impact_radius = mag * 25 if mag > 4.5 else mag * 10
            
            processed.append({
                "id": feature["id"],
                "magnitude": mag,
                "location": props.get("place", "Unknown"),
                "coordinates": [geom["coordinates"][1], geom["coordinates"][0]], # [lat, lon]
                "timestamp": datetime.fromtimestamp(props["time"]/1000).isoformat(),
                "depth": geom["coordinates"][2],
                "impact_radius": round(impact_radius, 2),
                "alert": props.get("alert"),
                "tsunami": props.get("tsunami")
            })
        return processed

    @classmethod
    def _get_mock_data(cls, min_magnitude):
        if os.path.exists(cls.MOCK_FILE):
            with open(cls.MOCK_FILE, 'r') as f:
                data = json.load(f)
                return [eq for eq in data["earthquakes"] if eq["magnitude"] >= min_magnitude]
        return []

    @classmethod
    def get_impact_analysis(cls, earthquake_id, lat, lon, magnitude):
        # Placeholder for spatial analysis using GeoPandas
        # In a real scenario, we'd query population and infrastructure layers
        impact_radius = magnitude * 25
        
        # Mocking intelligence-driven response
        exposure_percentage = (magnitude / 9.0) * 100 # Normalized scale
        
        return {
            "id": earthquake_id,
            "exposure_score": round(exposure_percentage, 1),
            "intelligence": f"Estimated exposure is {round(exposure_percentage, 1)}% above regional average.",
            "status": "Critical" if magnitude > 6.0 else "Operational",
            "infrastructure_impact": {
                "hospitals": int(magnitude * 1.5),
                "power_stations": int(magnitude * 0.8),
                "roads": "Fragmented" if magnitude > 5.5 else "Stable"
            }
        }
