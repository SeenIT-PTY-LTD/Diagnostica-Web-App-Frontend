export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateToDDMMYYYY = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDateMMDDYYYY = (dateValue) => {
  const date = new Date(dateValue);

  if (isNaN(date)) return ""; // handle invalid date

  const month = String(date.getMonth() + 1).padStart(2, "0"); // months start at 0
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};
