**OpenStreetMap free tiles**

A frontend web application built with **React + TypeScript + Leaflet** that allows users to **draw, manage, and export geometrical shapes** on an OpenStreetMap layer.
This project was developed as part of a frontend development assignment to showcase **map handling, spatial validation, and clean React architecture**.

**Live Demo**
https://magenta-naiad-9cef94.netlify.app/


**Features**
* Fully integrated **OpenStreetMap** using **Leaflet**
* Draw and manage various geometrical shapes:
  * Polygon
  * Rectangle
  * Circle
  * Polyline
* Configurable **shape count limits** per geometry type
* **Polygon overlap prevention**
* Centralized state management using **Zustand**
* Export all drawn shapes as **GeoJSON**
* Written entirely in **TypeScript**
* Clean, readable, and maintainable code

**Tech Stack**
* React
* TypeScript
* Vite
* Leaflet
* React-Leaflet
* Leaflet-Draw
* Zustand
* GeoJSON

**How the Application Works**
* The map is rendered using **React-Leaflet** with OpenStreetMap tiles
* Drawing tools are enabled using **Leaflet-Draw**
* When a user draws a shape:
  * Shape limits are checked
  * Overlap rules are applied
  * Valid shapes are stored in global state (**Zustand**)
* Each shape stores metadata such as:
  * Shape type
  * Unique ID
  * Radius (for circles)
* All drawn features can be exported as a **GeoJSON FeatureCollection**
**GeoJSON Export**
* A dedicated export button downloads all drawn shapes
* Output format: **FeatureCollection**
* Includes geometry and properties for each shape

Example:

{
  "type": "FeatureCollection",
  "features": [
    {
    
      "type": "Feature",
      "properties": {
        "shapeType": "Polygon"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": []
      }
    }
  ]
}


**Shape Validation Logic**
* Shape limits are configurable, not hardcoded
* Polygon-based shapes follow **overlap rules**
* Line strings can cross other shapes freely
* Validation occurs before storing shapes in state

**Run Locally**
1. Clone the repository:
git clone https://github.com/your-username/osm-drawing-app.git
2. Install dependencies:
npm install
3. Start development server:
npm run dev
4. Build for production:
npm run build

