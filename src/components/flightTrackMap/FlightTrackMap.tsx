/* eslint-disable react-hooks/purity */
import { useEffect, useMemo, useRef } from 'react';
import Map, { Layer, Marker, Source } from 'react-map-gl/maplibre';
import { MapPin, Plane } from 'lucide-react';
import type { MapRef } from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

import useCurrentFlight from '@/hooks/useCurrentFlight';
import useTheme from '@/providers/theme/useTheme';

import {
  createSplitGreatCircle,
  INITIAL_CENTER,
  routeDashedStyles,
  routeSolidStyles,
} from './flightTrackMap.utils';

import useAppSelector from '@/hooks/useAppSelector';
import { useGetAllFlights } from '@/hooks/useGetAllFlights';

import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { getCurrentCoordinates } from '../../data/flights.data';


const FlightTrackMap = () => {
  const { flight, setFlight } = useCurrentFlight();

  const { theme } = useTheme();

  const mapRef = useRef<MapRef>(null);

  const currentFlightNumberRef = useRef<string | null>(null);

  const { departure, arrival, live } = flight || {};


  const allAirports = useAppSelector((state) => state.airports.data);
  const {
    data: allFlightsData,
  } = useGetAllFlights(undefined, allAirports);

  const {
    longitude,
    latitude,
  } = live || {};

  const {
    longitude: fromLongitude,
    latitude: fromLatitude,
  } = departure || {};

  const {
    longitude: toLongitude,
    latitude: toLatitude,
  } = arrival || {};

  const otherFlightsCoordinates = useMemo(() => {
    if (!allFlightsData || !allFlightsData.data) return [];

    const filteredFlights = allFlightsData.data.filter((f: IFlightResponseData) => f.flight.number !== flight?.flight.number);

    return filteredFlights.map((f: IFlightResponseData) => {
      const randomProgress = f.progress || Math.floor(Math.random() * 99);
      const fromLatitude = Number(allAirports[f.departure.iata]?.latitude_deg);
      const fromLongitude = Number(allAirports[f.departure.iata]?.longitude_deg);

      const toLatitude = Number(allAirports[f.arrival.iata]?.latitude_deg);
      const toLongitude = Number(allAirports[f.arrival.iata]?.longitude_deg);

      const { latitude, longitude } = getCurrentCoordinates([fromLatitude, fromLongitude], [toLatitude, toLongitude], randomProgress);

      return {
        id: f.flight.number,
        longitude: isNaN(longitude) ? 0 : longitude,
        latitude: isNaN(latitude) ? 0 : latitude,
      }
    });
  }, [allFlightsData, allAirports, flight]);

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

  const { solidFeature, dashedFeature, snappedPoint, bearing } = useMemo(() => {
    if (
      !fromLongitude ||
      !fromLatitude ||
      !toLongitude ||
      !toLatitude ||
      !longitude ||
      !latitude
    ) {
      return {
        solidFeature: null,
        dashedFeature: null,
        snappedPoint: null,
        bearing: 0,
      };
    }

    const from: [number, number] = [fromLongitude, fromLatitude];
    const to: [number, number] = [toLongitude, toLatitude];
    const current: [number, number] = [longitude, latitude];

    return createSplitGreatCircle(from, to, current);
  }, [
    fromLongitude,
    fromLatitude,
    toLongitude,
    toLatitude,
    longitude,
    latitude,
  ]);

  const [snappedLongitude, snappedLatitude] = snappedPoint || [INITIAL_CENTER[0], INITIAL_CENTER[1]];

  useEffect(() => {
    if (!snappedLongitude || !snappedLatitude) {
      return;
    }

    if (currentFlightNumberRef.current && flight?.flight.number === currentFlightNumberRef.current) {
      return;
    }

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [snappedLongitude, snappedLatitude],
        zoom: 6,
        speed: 1,
      });
    }
    currentFlightNumberRef.current = flight?.flight.number || null;
  }, [snappedLongitude, snappedLatitude, flight?.flight.number]);


  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: snappedLongitude || INITIAL_CENTER[0],
        latitude: snappedLatitude || INITIAL_CENTER[1],
        zoom: 6,
      }}
      style={{ width: '100%', height: '100vh' }}
      mapStyle={
        theme === 'dark'
          ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
          : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
      }
    >
      {solidCoors.length === 2 && solidFeature && (
        <Source
          id="route-solid"
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: [solidFeature],
          }}
        >
          <Layer {...routeSolidStyles(theme)} />
        </Source>
      )}
      {dashedCoors.length === 2 && dashedFeature && (
        <Source
          id="route-dashed"
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: [dashedFeature],
          }}
        >
          <Layer {...routeDashedStyles(theme)} />
        </Source>
      )}
      {snappedPoint && (
        <Marker
          latitude={snappedPoint[1]}
          longitude={snappedPoint[0]}
        >
          <div
            style={{
              transform: `rotate(${bearing - 45}deg)`,
              transformOrigin: 'center',
              transition: 'transform 0.3s ease',
            }}
          >
            <Plane
              strokeWidth={0}
              size={28}
              className="fill-foreground"
            />
          </div>
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
