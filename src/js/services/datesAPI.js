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

function getWeekDays(week) {
  const januaryFour = new Date(new Date().getFullYear(), 0, 4);
  const firstDayOfFirstWeek = new Date(januaryFour);
  firstDayOfFirstWeek.setDate(
    firstDayOfFirstWeek.getDate() - firstDayOfFirstWeek.getDay() + 1
  );
  const manipulatedDate = new Date(firstDayOfFirstWeek);
  manipulatedDate.setDate(manipulatedDate.getDate() + (week - 1) * 7);
  const weekDays = [];
  manipulatedDate.setDate(
    manipulatedDate.getDate() - manipulatedDate.getDay() + 1
  );
  for (var i = 0; i < 7; i++) {
    weekDays.push(new Date(manipulatedDate));
    manipulatedDate.setDate(manipulatedDate.getDate() + 1);
  }
  return weekDays;
}

function getDaysSinceDate(date) {
  const copyDate = new Date(date);
  const dateDiff = Math.trunc(
    (Date.now() - copyDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const listOfDate = [];
  for (var i = 0; i <= dateDiff; i++) {
    listOfDate.push(new Date(copyDate));
    copyDate.setDate(copyDate.getDate() + 1);
  }
  return listOfDate;
}

const datesApi = { getWeekNumber, getWeekDays, getDaysSinceDate };

export default datesApi;
