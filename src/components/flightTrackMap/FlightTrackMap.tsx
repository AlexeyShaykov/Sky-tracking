import { useEffect, useMemo, useRef } from 'react';
import Map, { Layer, Marker, Source } from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import useCurrentFlight from '@/hooks/useCurrentFlight';
import { MapPin, Plane } from 'lucide-react';
import { FLIGHTS } from '../flight-list/flights.data';
import { INITIAL_CENTER, routeDashedStyles, routeSolidStyles } from './flightTrackMap.utils';

const FlightTrackMap = () => {
  const { flight, setFlight } = useCurrentFlight();

  const mapRef = useRef<MapRef>(null);

  const { route, from, to } = flight || {};

  const { longitude, latitude } = route || {};
  const { longitude: fromLongitude, latitude: fromLatitude } = from || {};
  const { longitude: toLongitude, latitude: toLatitude } = to || {};

  const otherFlightsCoordinates = useMemo(() => {
    return FLIGHTS.filter((f) => f.id !== flight?.id).map((f) => ({
      id: f.id,
      longitude: f.route.longitude,
      latitude: f.route.latitude,
    }));
  }, [flight]);

  const [solidCoors, dashedCoors] = useMemo(() => {
    if (
      !fromLongitude ||
      !fromLatitude ||
      !toLongitude ||
      !toLatitude ||
      !longitude ||
      !latitude
    ) {
      return [[], []];
    }

    // const totalDistance = Math.sqrt(
    //   Math.pow(toLongitude - fromLongitude, 2) + Math.pow(toLatitude - fromLatitude, 2)
    // );
    // const traveledDistance = Math.sqrt(
    //   Math.pow(longitude - fromLongitude, 2) + Math.pow(latitude - fromLatitude, 2)
    // );

    // const progressRatio = traveledDistance / totalDistance;

    const solidCoors = [
      [fromLongitude, fromLatitude],
      [longitude, latitude],
    ];

    const dashedCoors = [
      [longitude, latitude],
      [toLongitude, toLatitude],
    ];

    return [solidCoors, dashedCoors];
  }, [
    fromLongitude,
    fromLatitude,
    toLongitude,
    toLatitude,
    longitude,
    latitude,
  ]);

  const solidGeojson: GeoJSON.Feature<GeoJSON.LineString> = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: solidCoors,
    },
    properties: {},
  };

  const dashedGeojson: GeoJSON.Feature<GeoJSON.LineString> = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: dashedCoors,
    },
    properties: {},
  };

  console.log('dashedCoors', dashedCoors);
  console.log('solidCoors', solidCoors);

  useEffect(() => {
    if (!longitude || !latitude) {
      return;
    }

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 6,
        speed: 1,
      });
    }
  }, [longitude, latitude]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: longitude || INITIAL_CENTER[0],
        latitude: latitude || INITIAL_CENTER[1],
        zoom: 6,
      }}
      style={{ width: '100%', height: '100vh' }}
      mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
    >
      {solidCoors.length === 2 && (
        <Source
          id="route-solid"
          type="geojson"
          data={solidGeojson}
        >
          <Layer {...routeSolidStyles} />
        </Source>
      )}
      {
        dashedCoors.length === 2 && (
          <Source
            id="route-dashed"
            type="geojson"
            data={dashedGeojson}
          >
            <Layer {...routeDashedStyles} />
          </Source>
        )
      }
      {longitude && latitude && (
        <Marker
          longitude={longitude}
          latitude={latitude}
          anchor="center"
        >
          <Plane
            fill="white"
            strokeWidth={0}
            size={26}
          />
        </Marker>
      )}
      {fromLongitude && fromLatitude && (
        <Marker
          longitude={fromLongitude}
          latitude={fromLatitude}
          anchor="center"
        >
          <MapPin
            fill="green"
            size={20}
          />
        </Marker>
      )}
      {toLongitude && toLatitude && (
        <Marker
          longitude={toLongitude}
          latitude={toLatitude}
          anchor="center"
        >
          <MapPin
            fill="green"
            size={20}
          />
        </Marker>
      )}
      {otherFlightsCoordinates.map(({ id, longitude, latitude }) => (
        <Marker
          key={id}
          longitude={longitude}
          latitude={latitude}
          anchor="center"
          onClick={() => {
            setFlight(id);
          }}
          className="cursor-pointer"
        >
          <Plane
            fill="white"
            strokeWidth={0}
            size={20}
            className="fill-foreground opacity-30"
          />
        </Marker>
      ))}
    </Map>
  );
};

export default FlightTrackMap;
