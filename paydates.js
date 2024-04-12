// schedules in different time formats
const schedule = [
  { start: '09:00', end: '11:00' },
  { start: '10:30', end: '11:30' },
  { start: '11:00', end: '12:00' },
  { start: '12:00', end: '02:30 PM' },
  { start: '01:00 PM', end: '02:00 PM' },
];

// converts time string 'HH:mm' to minutes for comparision
function timeToMins(inputTime) {
  const time = inputTime.split(':')
  const [hour, minute] = time.map(time => parseInt(time));
  return hour * 60 + minute;
}

// converts time from 'HH:mm AM/PM' to 'HH:mm' (24-hour format)
function to24Hour(inputTime) {
  const [time, period] = inputTime.split(' ');
  const timeArray = time.split(':')
  let [hour, minute] = timeArray.map(time => parseInt(time));

  if (period === 'PM' && hour !== 12) {
      hour += 12;
  } else if (period === 'AM' && hour === 12) {
      hour = 0;
  }

  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

// converts schedule's array to 24-hour format
function convertSchedules(schedules) {
  return schedules.map(schedule => ({
      start: to24Hour(schedule.start),
      end: to24Hour(schedule.end)
  }));
}

// calculates overlapping time in minutes
function calcOverlapTime(inputSchedule) {
  const schedule = convertSchedules(inputSchedule);

  schedule.sort((a, b) => timeToMins(a.start) - timeToMins(b.start));

  let overlapingTime = 0;
  let lastEndTime = timeToMins(schedule[0].end);

  for (let i = 1; i < schedule.length; i++) {
      const startingTime = timeToMins(schedule[i].start);
      const endingTime = timeToMins(schedule[i].end);

      // if there is an overlap
      if (startingTime < lastEndTime) {
          // calculate overlap time 
          const overlap = Math.min(endingTime, lastEndTime) - startingTime;
          overlapingTime += overlap;

          console.log("Overlaping between", schedule[i - 1], "and", schedule[i]);
          console.log(`Overlap time: ${overlap} minutes`);
          console.log(`Total Overlap time: ${overlapingTime} minutes`);

          // update last end time with latest meeting end event
          lastEndTime = Math.max(endingTime, lastEndTime);
      } else {
          // update last end time
          lastEndTime = endingTime;
      }
  }

  return overlapingTime;
}

console.log("Total overlapping time of given schedule (in minutes):", calcOverlapTime(schedule));