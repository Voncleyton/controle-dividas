const formatDate = (date: Date): string => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: tz,
  };

  const formatedDate = new Intl.DateTimeFormat('default', options).format(date);

  return formatedDate;
};

export default formatDate;
