import type { LayerProps } from 'react-map-gl/maplibre';

export const INITIAL_CENTER = [32.45, 37.85];

export const routeSolidStyles: LayerProps = {
  id: 'route-solid',
  type: 'line',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#73433F',
    'line-width': 2,
    'line-opacity': 1,
  },
};

export const routeDashedStyles: LayerProps = {
  id: 'route-dashed',
  type: 'line',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#fff',
    'line-width': 1,
    'line-opacity': 0.5,
    'line-dasharray': [4, 4],
  },
};