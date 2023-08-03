const toReadableDate = (date: string | undefined): string => {
  const dateObj = new Date(date ?? "");
  return `${dateObj.getUTCDate()}/${
    dateObj.getUTCMonth() + 1
  }/${dateObj.getUTCFullYear()}`;
};

export { toReadableDate };
