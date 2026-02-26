const getUTCOffsetTimeZone = (timeZone: string): string => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' });

  const parts = formatter.formatToParts(now);
  const tzName = parts.find(part => part.type === 'timeZoneName')?.value || '';

  return tzName.replace('GMT', 'UTC') ?? 'UTC+0';
};

export default getUTCOffsetTimeZone; 