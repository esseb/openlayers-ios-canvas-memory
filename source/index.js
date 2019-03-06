import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

let map = null;
let layers = null;
const createMapButton = document.getElementById('create-map-button');
const destroyMapButton = document.getElementById('destroy-map-button');
const layerSelect = document.getElementById('layer-select');

const layerTypes = [
  {
    id: 'standard',
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  {
    id: 'wikimedia',
    url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
  },
  {
    id: 'humanitarian',
    url: 'http://{a-b}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
  }
];

function createMap() {
  createMapButton.disabled = true;
  destroyMapButton.disabled = false;

  layers = [];
  for (const layerType of layerTypes) {
    layers.push(
      new TileLayer({
        source: new OSM({
          url: layerType.url
        }),
        visible: layerType.id === 'standard' ? true : false
      })
    );
  }

  map = new Map({
    layers: layers,
    target: 'map',
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  });
}

function destroyMap() {
  createMapButton.disabled = false;
  destroyMapButton.disabled = true;

  map.setTarget(null);
  map = null;
  layers = null;
}

function changeLayer(event) {
  for (let i = 0; i < layers.length; i++) {
    layers[i].setVisible(event.target.selectedIndex === i);
  }
}

createMapButton.addEventListener('click', createMap);
destroyMapButton.addEventListener('click', destroyMap);
layerSelect.addEventListener('change', changeLayer);

createMap();
