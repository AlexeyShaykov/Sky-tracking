export const getFlagEmoji = (isoCountry: string) => {
  return isoCountry
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join('');
};