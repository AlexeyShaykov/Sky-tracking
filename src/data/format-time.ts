const formatTime = (dateStr: string | null | undefined): string => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

export default formatTime;