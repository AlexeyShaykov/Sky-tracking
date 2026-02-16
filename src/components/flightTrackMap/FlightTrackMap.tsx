import Map, { Layer, Source } from 'react-map-gl/maplibre';
import type { LayerProps } from 'react-map-gl/maplibre';
import type { FeatureCollection } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';

const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.4, 37.8],
      },
      properties: { title: '915 Front Street, San Francisco, California' },
    },
  ],
};

const layerStyle: LayerProps = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

const FlightTrackMap = () => {
  return (
    <Map
			initialViewState={{
				longitude: 32.45,
				latitude: 37.85,
				zoom: 8
			}}
			style={{ width: '100%', height: '100vh' }}
			mapStyle='https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
		>
			<Source id='my-data' type='geojson' data={geojson}>
				<Layer {...layerStyle} />
			</Source>
    </Map>
  );
};

export default FlightTrackMap;
