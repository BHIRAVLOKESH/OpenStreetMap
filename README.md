**OSM Drawing Application**
A frontend web application built with **React + TypeScript + Leaflet** that allows users to **draw, manage, and export geometrical shapes** on an OpenStreetMap layer.
This project was developed as part of a frontend development assignment to showcase **map handling, spatial validation, and clean React architecture**.

**Live Demo**
[https://stalwart-melba-353927.netlify.app/](https://stalwart-melba-353927.netlify.app/)


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
        "id": "958251ce-6445-45fb-a3e4-1186bc1f55e2",
        "shapeType": "LineString"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            17.754347,
            52.079081
          ],
          [
            24.368032,
            51.712917
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "766dd798-3c1d-4a6c-87be-43e8ddf3b57d",
        "shapeType": "Polygon"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              19.621999,
              50.470737
            ],
            [
              17.886181,
              48.486313
            ],
            [
              23.906612,
              48.588174
            ],
            [
              22.368546,
              50.414753
            ],
            [
              19.621999,
              50.470737
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "7d864f25-e18d-4f3a-b224-9e6d535efa1a",
        "shapeType": "Rectangle"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              31.46511,
              49.38139
            ],
            [
              31.46511,
              49.737774
            ],
            [
              31.684834,
              49.737774
            ],
            [
              31.684834,
              49.38139
            ],
            [
              31.46511,
              49.38139
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              13.887208140416474,
              53.427818494981416
            ],
            [
              13.647605329853294,
              53.42056627849449
            ],
            [
              13.410548913376152,
              53.398886847671875
            ],
            [
              13.178550381353936,
              53.36301078752619
            ],
            [
              12.954052268889305,
              53.3133188639643
            ],
            [
              12.739395768110366,
              53.25033680401982
            ],
            [
              12.536790738124486,
              53.17472817111887
            ],
            [
              12.348288737175372,
              53.08728550737179
            ],
            [
              12.175759568895687,
              52.988919949388624
            ],
            [
              12.020871687870375,
              52.880649549276036
            ],
            [
              11.885076658707339,
              52.7635865477845
            ],
            [
              11.769597716594895,
              52.638923852198666
            ],
            [
              11.675422343769263,
              52.507920968241116
            ],
            [
              11.603298661477563,
              52.371889624187304
            ],
            [
              11.553735344891725,
              52.23217930807514
            ],
            [
              11.527004700905076,
              52.09016291699739
            ],
            [
              11.523148505817675,
              51.94722269266036
            ],
            [
              11.541986180003782,
              51.8047365912444
            ],
            [
              11.583124877004902,
              51.6640652094776
            ],
            [
              11.645971081622745,
              51.52653936385216
            ],
            [
              11.729743341689431,
              51.39344839691639
            ],
            [
              11.833485797472086,
              51.266029264135064
            ],
            [
              11.95608221760685,
              51.14545643725055
            ],
            [
              12.096270297983612,
              51.03283264550604
            ],
            [
              12.252656027594174,
              50.929180464452706
            ],
            [
              12.423727971063068,
              50.83543475316736
            ],
            [
              12.60787136000167,
              50.75243593429144
            ],
            [
              12.80338192355319,
              50.68092410704999
            ],
            [
              13.008479422029652,
              50.62153398098907
            ],
            [
              13.22132087620388,
              50.57479061726039
            ],
            [
              13.440013508663759,
              50.541105964578506
            ],
            [
              13.662627432865586,
              50.520776178209864
            ],
            [
              13.887208140416474,
              50.5139797122904
            ],
            [
              14.111788847967363,
              50.520776178209864
            ],
            [
              14.334402772169192,
              50.541105964578506
            ],
            [
              14.55309540462907,
              50.57479061726039
            ],
            [
              14.765936858803295,
              50.62153398098907
            ],
            [
              14.97103435727976,
              50.68092410704999
            ],
            [
              15.166544920831281,
              50.75243593429144
            ],
            [
              15.350688309769883,
              50.83543475316736
            ],
            [
              15.521760253238776,
              50.929180464452706
            ],
            [
              15.678145982849337,
              51.03283264550604
            ],
            [
              15.818334063226098,
              51.14545643725055
            ],
            [
              15.94093048336086,
              51.266029264135064
            ],
            [
              16.04467293914352,
              51.39344839691639
            ],
            [
              16.128445199210205,
              51.52653936385216
            ],
            [
              16.19129140382805,
              51.66406520947759
            ],
            [
              16.232430100829166,
              51.8047365912444
            ],
            [
              16.251267775015272,
              51.94722269266036
            ],
            [
              16.247411579927874,
              52.09016291699739
            ],
            [
              16.22068093594122,
              52.23217930807514
            ],
            [
              16.171117619355385,
              52.371889624187304
            ],
            [
              16.098993937063685,
              52.507920968241116
            ],
            [
              16.004818564238054,
              52.638923852198666
            ],
            [
              15.889339622125613,
              52.7635865477845
            ],
            [
              15.753544592962573,
              52.880649549276036
            ],
            [
              15.598656711937263,
              52.98891994938861
            ],
            [
              15.426127543657579,
              53.08728550737179
            ],
            [
              15.237625542708463,
              53.17472817111887
            ],
            [
              15.035020512722582,
              53.25033680401982
            ],
            [
              14.820364011943644,
              53.3133188639643
            ],
            [
              14.595865899479016,
              53.36301078752619
            ],
            [
              14.363867367456796,
              53.398886847671875
            ],
            [
              14.126810950979657,
              53.42056627849449
            ],
            [
              13.887208140416474,
              53.427818494981416
            ]
          ]
        ]
      },
      "properties": {
        "id": "b526740c-ed2c-4308-a025-c9610de91828",
        "shapeType": "Polygon",
        "radius": 162002.26861445373
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

