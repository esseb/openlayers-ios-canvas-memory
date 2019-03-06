import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import View from 'ol/View';

let map = null;
let vectorLayers = null;
const createMapButton = document.getElementById('create-map-button');
const destroyMapButton = document.getElementById('destroy-map-button');

function createMap() {
  createMapButton.disabled = true;
  destroyMapButton.disabled = false;

  map = new Map({
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    target: 'map',
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  });

  // Add several vector layers with one feature each.
  // This is a bit excessive, but demonstrates the problem.
  vectorLayers = [];
  for (var i = 0; i < 5; i++) {
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        text: new Text({
          font: '20px Arial',
          text: 'Feature',
          fill: new Fill({ color: '#000000' }),
          stroke: new Stroke({
            color: '#FFFFFF',
            width: 4
          })
        })
      })
    });

    vectorLayer.getSource().addFeature(
      new Feature({
        name: 'Feature',
        geometry: new Point([0, 0]),
        labelPoint: new Point([0, 0])
      })
    );

    map.addLayer(vectorLayer);
    vectorLayers.push(vectorLayer);
  }
}

function destroyMap() {
  createMapButton.disabled = false;
  destroyMapButton.disabled = true;

  map.setTarget(null);
  map = null;
  vectorLayers = null;
}

createMapButton.addEventListener('click', createMap);
destroyMapButton.addEventListener('click', destroyMap);

createMap();
