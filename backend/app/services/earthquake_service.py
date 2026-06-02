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
    def calculate_impact_radius(cls, magnitude):
        if magnitude < 5.0:
            return 25.0
        elif 5.0 <= magnitude < 6.0:
            return 50.0
        elif 6.0 <= magnitude < 7.0:
            return 100.0
        else:
            return 150.0

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
                
            impact_radius = cls.calculate_impact_radius(mag)
            
            processed.append({
                "id": feature["id"],
                "magnitude": mag,
                "location": props.get("place", "Unknown"),
                "coordinates": [geom["coordinates"][1], geom["coordinates"][0]], # [lat, lon]
                "timestamp": datetime.fromtimestamp(props["time"]/1000).isoformat(),
                "depth": geom["coordinates"][2],
                "impact_radius": impact_radius,
                "alert": props.get("alert"),
                "tsunami": props.get("tsunami")
            })
        return processed

    @classmethod
    def _get_mock_data(cls, min_magnitude):
        if os.path.exists(cls.MOCK_FILE):
            with open(cls.MOCK_FILE, 'r') as f:
                data = json.load(f)
                processed_mock = []
                for eq in data["earthquakes"]:
                    if eq["magnitude"] >= min_magnitude:
                        eq["impact_radius"] = cls.calculate_impact_radius(eq["magnitude"])
                        processed_mock.append(eq)
                return processed_mock
        return []

    @classmethod
    def get_impact_analysis(cls, earthquake_id, lat, lon, magnitude):
        impact_radius = cls.calculate_impact_radius(magnitude)
        
        exposure_percentage = (magnitude / 9.0) * 100
        
        # Synthetic population estimation
        # Assuming an average density of 150 people per sq km for mock data
        area_sq_km = 3.14159 * (impact_radius ** 2)
        base_population = int(area_sq_km * 150)
        
        # Adjust population slightly based on magnitude to simulate denser urban centers for larger events (mock logic)
        adjusted_population = int(base_population * (1 + (magnitude - 4) * 0.2))
        density = round(adjusted_population / area_sq_km, 1) if area_sq_km > 0 else 0
        
        return {
            "id": earthquake_id,
            "exposure_score": round(exposure_percentage, 1),
            "intelligence": f"Estimated exposure is {round(exposure_percentage, 1)}% above regional average.",
            "status": "Critical" if magnitude > 6.0 else "Operational",
            "impact_radius_km": impact_radius,
            "population_estimate": {
                "total_affected": adjusted_population,
                "density_per_sqkm": density,
                "percentage_above_average": round(exposure_percentage, 1),
                "is_mock_data": True
            },
            "infrastructure_impact": {
                "hospitals": int(magnitude * 1.5),
                "power_stations": int(magnitude * 0.8),
                "roads": "Fragmented" if magnitude > 5.5 else "Stable"
            }
        }
