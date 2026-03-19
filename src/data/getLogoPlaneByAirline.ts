const AIRLINE_LOGO_PLANES: {
  logo: string;
  aircraft: string;
  name: string;
}[] = [
  {
		name: 'Turkish Airlines',
		logo: '/logos/turkish.svg',
		aircraft: '/planes/turkish.png',
	},
	{
		name: 'Ryanair',
		logo: '/logos/ryanair.svg',
		aircraft: '/planes/ryanair.png',
	},
	{
		name: 'S7 Airlines',
		logo: '/logos/s7.svg',
		aircraft: '/planes/s7.png',
	},
	{
		name: 'SWISS International Air Lines',
		logo: '/logos/swiss.svg',
		aircraft: '/planes/swiss.png',
	},
	{
		name: 'Lufthansa',
		logo: '/logos/lufthansa.svg',
		aircraft: '/planes/lufthansa.png',
	},
	{
		name: 'Air New Zealand',
		logo: '/logos/air-new-zealand.svg',
		aircraft: '/planes/air-new-zealand-plane.svg',
	},
	{
		name: 'Cebu Pacific Air',
		logo: '/logos/cebu-pacific-air.svg',
		aircraft: '/planes/cebu-pacific-air-plane.svg',
	},
	{
		name: 'China Eastern Airlines',
		logo: '/logos/china-eastern.svg',
		aircraft: '/planes/china-eastern-plane.svg',
	},
	{
		name: 'Air China',
		logo: '/logos/china.svg',
		aircraft: '/planes/china-plane.svg',
	},
	{
		name: 'EgyptAir',
		logo: '/logos/egypt-air.svg',
		aircraft: '/planes/egypt-air-plane.svg',
	},
	{
		name: 'Garuda Indonesia',
		logo: '/logos/garuda-indonesia.svg',
		aircraft: '/planes/garuda-indonesia-plane.svg',
	},
	{
		name: 'Hainan Airlines',
		logo: '/logos/hainan-airlines.svg',
		aircraft: '/planes/hainan-airlines-plane.svg',
	},
	{
		name: 'Hawaiian Airlines',
		logo: '/logos/hawaiian-airlines.svg',
		aircraft: '/planes/hawaiian-airlines-plane.svg',
	},
	{
		name: 'IndiGo',
		logo: '/logos/indigo.svg',
		aircraft: '/planes/indigo-plane.svg',
	},
	{
		name: 'Juneyao Airlines',
		logo: '/logos/juneyao-airlines.svg',
		aircraft: '/planes/juneyao-airlines-plane.svg',
	},
	{
		name: 'Mandarin Airlines',
		logo: '/logos/mandarin-airlines.svg',
		aircraft: '/planes/mandarin-airlines-plane.svg',
	},
	{
		name: 'Qatar Airways',
		logo: '/logos/qatar.svg',
		aircraft: '/planes/qatar-plane.svg',
	},
	{
		name: 'Royal Jordanian Airlines',
		logo: '/logos/royal-jordanian.svg',
		aircraft: '/planes/royal-jordanian-plane.svg',
	},
	{
		name: 'SF Airlines',
		logo: '/logos/sf.svg',
		aircraft: '/planes/sf-plane.svg',
	},
	{
		name: 'Shandong Airlines',
		logo: '/logos/shandong.svg',
		aircraft: '/planes/shandong-plane.svg',
	},
	{
		name: 'Shenzhen Airlines',
		logo: '/logos/shenzhen-airlines.svg',
		aircraft: '/planes/shenzhen-airlines-plane.svg',
	},
	{
		name: 'Singapore Airlines',
		logo: '/logos/singapore.svg',
		aircraft: '/planes/singapore-plane.svg',
	},
	{
		name: 'SmartLynx Airlines',
		logo: '/logos/smartlynx.svg',
		aircraft: '/planes/smartlynx-plane.svg',
	},
	{
		name: 'Freebird Airlines',
		logo: '/logos/freebird-airlines.svg',
		aircraft: '/planes/freebird-airlines-plane.svg',
	}
];

const getLogoPlaneByAirline = (airlineName: string | null) => {
  if (!airlineName) {
    return '/planes/default-plane.svg';
  }
  const airline = AIRLINE_LOGO_PLANES.find((a) => a.name === airlineName);
  if (!airline) {
    return '/logos/default-airline-plane.svg';
  }
  return airline.aircraft;
};

const getLogoByAirline = (airlineName: string) => {
  const airline = AIRLINE_LOGO_PLANES.find((a) => a.name === airlineName);
  if (!airline) {
    return '/logos/default-airline.svg';
  }
  return airline.logo;
};

export {
  getLogoPlaneByAirline,
  getLogoByAirline,
};