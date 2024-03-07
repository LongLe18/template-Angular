import moment from "moment";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "../constants/enums";

const formatDate = (date: any, format?: string) => {
  if (format) {
    return moment(date).format(format);
  }
  return moment(date).format("DD/MM/YYYY");
};

const addMonthsToDate = (dateCreate: any, monthsToAdd: number) => {
  // Convert the dateCreate string to a Date object
  const originalDate = new Date(dateCreate);

  // Check if the originalDate is a valid date
  if (isNaN(originalDate.getTime())) {
    return "Invalid Date"; // Handle invalid input
  }

  // Add months to the date
  originalDate.setMonth(originalDate.getMonth() + monthsToAdd);

  // Format the result back into the desired string format
  const formattedDate = originalDate.toISOString().slice(0, 10); // This assumes you want a YYYY-MM-DD format

  return moment(formattedDate).format("DD/MM/YYYY");
};

const formatDateWithHour = (date: any) => {
  return moment(date).format("DD/MM/YYYY - HH:mm:ss");
};

const convertDateToString = (
  date: any,
  format: DATE_TIME_FORMAT | null = null
): any => {
  const validDate = dayjs(date?.toString()).isValid();
  return date && validDate
    ? dayjs(date?.toString()).format(format ? format : undefined)
    : null;
};


export {
  formatDate,
  addMonthsToDate,
  formatDateWithHour,
  convertDateToString,
};
