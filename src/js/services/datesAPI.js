function getWeekNumber(date) {
  let manipulatedDate;
  manipulatedDate = date
    ? new Date(date)
    : new Date(new Date().getFullYear(), 11, 31);

  manipulatedDate.setHours(0, 0, 0, 0);
  manipulatedDate.setDate(
    manipulatedDate.getDate() + 3 - ((manipulatedDate.getDay() + 6) % 7)
  );
  var week1 = new Date(manipulatedDate.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((manipulatedDate.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}

const datesApi = { getWeekNumber };

export default datesApi;
