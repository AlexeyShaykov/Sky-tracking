const formatIscDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

export default formatIscDate;