import type { IFlight } from '@/types/flights.types';

export const getCurrentCoordinates = (
	from: [number, number],
	to: [number, number],
	progressPercent: number
): { latitude: number; longitude: number } => {
	const ratio = progressPercent / 100
	const lat = from[0] + (to[0] - from[0]) * ratio
	const lng = from[1] + (to[1] - from[1]) * ratio
	return { latitude: lat, longitude: lng }
}

export const FLIGHTS: IFlight[] = [
  {
    logo: '/logos/turkish.svg',
    id: 'TK143',
    aircraftReg: 'TC-JFP',
    airline: {
      name: 'Turkish Airlines',
      country: 'Turkey'
    },
    from: {
      city: 'Sofia',
      country: 'Bulgaria',
      countryCode: 'BG',
      timezone: 'UTC +3',
      code: 'SOF',
      longitude: 23.3964,
      latitude: 42.6959
    },
    to: {
      city: 'Beijing',
      country: 'China',
      countryCode: 'CN',
      timezone: 'UTC +8',
      code: 'PEK',
      longitude: 116.4074,
      latitude: 39.9042
    },
    airplane: {
      image: '/planes/turkish.png',
      name: 'Airbus A330'
    },
    colorGradient: ['#f9b9b9', '#d34f4f'],
    route: {
      speed: 870,
      altitude: 10600,
      ...getCurrentCoordinates([42.6959, 23.3964], [39.9042, 116.4074], 65)
    },
    progress: 65
  },
  {
    logo: '/logos/ryanair.svg',
    id: 'RN1782',
    aircraftReg: 'D-AISP',
    airline: {
      name: 'Ryanair',
      country: 'Ireland'
    },
    from: {
      city: 'Dublin',
      country: 'Ireland',
      countryCode: 'IE',
      timezone: 'UTC +1',
      code: 'DUB',
      longitude: -6.2603,
      latitude: 53.4213
    },
    to: {
      city: 'Larnaca',
      country: 'Cyprus',
      countryCode: 'CY',
      timezone: 'UTC +3',
      code: 'LCA',
      longitude: 33.6242,
      latitude: 34.9192
    },
    airplane: {
      image: '/planes/ryanair.png',
      name: 'Boeing 737-800'
    },
    colorGradient: ['#accffb', '#5281b1'],
    route: {
      speed: 840,
      altitude: 11200,
      ...getCurrentCoordinates([53.4213, -6.2603], [34.9192, 33.6242], 40)
    },
    progress: 40
  },
  {
    logo: '/logos/s7.svg',
    id: 'S7124',
    aircraftReg: 'RA-73415',
    airline: {
      name: 'S7 Airlines',
      country: 'Russia'
    },
    from: {
      city: 'Nice',
      country: 'France',
      countryCode: 'FR',
      timezone: 'UTC +2',
      code: 'NCE',
      longitude: 7.2589,
      latitude: 43.6584
    },
    to: {
      city: 'Tbilisi',
      country: 'Georgia',
      countryCode: 'GE',
      timezone: 'UTC +4',
      code: 'TBS',
      longitude: 44.8271,
      latitude: 41.7151
    },
    airplane: {
      image: '/planes/s7.png',
      name: 'Airbus A320neo'
    },
    colorGradient: ['#f0ffdd', '#d2f3ab'],
    route: {
      speed: 860,
      altitude: 10900,
      ...getCurrentCoordinates([43.6584, 7.2589], [41.7151, 44.8271], 25)
    },
    progress: 25
  },
  {
    logo: '/logos/swiss.svg',
    id: 'LX318',
    aircraftReg: 'HB-JHK',
    airline: {
      name: 'SWISS',
      country: 'Switzerland'
    },
    from: {
      city: 'Porto',
      country: 'Portugal',
      countryCode: 'PT',
      timezone: 'UTC +1',
      code: 'OPO',
      longitude: -8.611,
      latitude: 41.2481
    },
    to: {
      city: 'Baku',
      country: 'Azerbaijan',
      countryCode: 'AZ',
      timezone: 'UTC +4',
      code: 'GYD',
      longitude: 49.8671,
      latitude: 40.3777
    },
    airplane: {
      image: '/planes/swiss.png',
      name: 'Airbus A220-300'
    },
    colorGradient: ['#ffc7c7', '#cc6565'],
    route: {
      speed: 830,
      altitude: 10700,
      ...getCurrentCoordinates([41.2481, -8.611], [40.3777, 49.8671], 55)
    },
    progress: 55
  },
  {
    logo: '/logos/lufthansa.svg',
    id: 'LH401',
    aircraftReg: 'D-AIXD',
    airline: {
      name: 'Lufthansa',
      country: 'Germany'
    },
    from: {
      city: 'Burgas',
      country: 'Bulgaria',
      countryCode: 'BG',
      timezone: 'UTC +3',
      code: 'BOJ',
      longitude: 27.5159,
      latitude: 42.5698
    },
    to: {
      city: 'Muscat',
      country: 'Oman',
      countryCode: 'OM',
      timezone: 'UTC +4',
      code: 'MCT',
      longitude: 58.5938,
      latitude: 23.588
    },
    airplane: {
      image: '/planes/lufthansa.png',
      name: 'Airbus A350-900'
    },
    colorGradient: ['#b7cff7', '#5879ac'],
    route: {
      speed: 890,
      altitude: 11300,
      ...getCurrentCoordinates([42.5698, 27.5159], [23.588, 58.5938], 30)
    },
    progress: 30
  },
  {
    logo: '/logos/lufthansa.svg',
    id: 'AF128',
    aircraftReg: 'F-GZCP',
    airline: {
      name: 'Lufthansa',
      country: 'Germany'
    },
    from: {
      city: 'Madrid',
      country: 'Spain',
      countryCode: 'ES',
      timezone: 'UTC +1',
      code: 'MAD',
      longitude: -3.5676,
      latitude: 40.4722,
    },
    to: {
      city: 'Rome',
      country: 'Italy',
      countryCode: 'IT',
      timezone: 'UTC +2',
      code: 'FCO',
      longitude: 12.2509,
      latitude: 41.8003,
    },
    airplane: {
      image: '/planes/lufthansa.png',
      name: 'Airbus A350-900'
    },
    colorGradient: ['#f9d5d5', '#d36e6e'],
    route: {
      speed: 880,
      altitude: 11000,
      ...getCurrentCoordinates([40.4722, -3.5676], [41.8003, 12.2509], 80)
    },
    progress: 80
  }
]
