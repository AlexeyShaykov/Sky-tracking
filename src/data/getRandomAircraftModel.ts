const aircraftModels = [
  'Boeing 737-800',
  'Boeing 747-400',
  'Boeing 757-200',
  'Boeing 767-300',
  'Boeing 777-200',
  'Boeing 787-8',
  'Boeing 787-9',
  'Airbus A319',
  'Airbus A320',
  'Airbus A321',
  'Airbus A330-200',
  'Airbus A330-300',
  'Airbus A340-600',
  'Airbus A350-900',
  'Airbus A380-800',
  'Embraer E175',
  'Embraer E190',
  'ATR 72-600',
];

const getRandomAircraftModel = (): string => {
  return aircraftModels[Math.floor(Math.random() * aircraftModels.length)];
};

export default getRandomAircraftModel;