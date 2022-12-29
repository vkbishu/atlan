export const cleanQuery = (query) => {
  return query
    .replace(/\n/g, " ") // replace all new line characters with space character
    .replace(/\s{2,}/g, " ") // replace two or more space charater with a single space character
    .replace(/\s*?;\s?$/g, ""); // replace (;)
};

export const getDisplayTime = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${hour}:${minute}:${second}`;
};
