// Helper function to get the week number in the year
function getWeekNumber(date) {
  var onejan = new Date(date.getFullYear(), 0, 1);
  var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  var dayOfYear = ((today - onejan + 86400000) / 86400000);
  return Math.ceil(dayOfYear / 7)
};

// Helper function to get the total value per series of competition days
function getPBCompetition(arrow_data) {
  let series_1 = arrow_data[0].flat(Infinity)
  let series_2 = arrow_data[1].flat(Infinity)

  series_1 = series_1.reduce((prev, curr) => prev + curr, 0)
  series_2 = series_2.reduce((prev, curr) => prev + curr, 0)

  return { series_1, series_2 }
}

// Helper function to get the total value per series of check days
function getPBCheck(arrow_data) {
  const arrows = arrow_data.flat(Infinity)
  let series = 0
  let curr_series = [] // variable to store the next 2 series to calculate the total check
  let series_list = [] // variable to store the series 
  let totalCheck_list = []  // variable to store the total value per check

  for (let i = 1; i <= arrows.length; i++) {
    series += arrows[i - 1]

    // Every 36 arrows is a series
    if (i % 36 == 0) {
      series_list.push(series)
      curr_series.push(series)
      series = 0
    }

    // Every 72 arrows is a check
    if (i % 72 == 0) {
      totalCheck_list.push(curr_series[0] + curr_series[1])
      curr_series = []
    }
  }

  return { totalCheck_list, series_list }
}

function summary_arrow_data(arrow_list) {
  let dailyTotals = {};
  let weeklyTotals = {};
  let monthlyTotals = {};
  let PB_competition_series = 0
  let PB_competition = 0
  let PB_check_series = 0
  let PB_check = 0
  let day_type_totals = {}

  arrow_list.forEach(day => {
    const date = new Date(day.date);
    const month = day.date.substring(0, 7);
    const week = `${date.getFullYear()}-W${getWeekNumber(date)}`;
    const day_type = !!day.type ? day.type : 'training'

    // Get the total per series in competition days and store the max value as PB
    if (!!day.type && day.type == 'competition') {
      const { series_1, series_2 } = getPBCompetition(day.arrows)
      PB_competition_series = Math.max(PB_competition_series, series_1, series_2)
      PB_competition = Math.max(PB_competition, series_1 + series_2)
    }

    // Get the total per series in check days and store the max value as PB
    if (!!day.type && day.type == 'check') {
      const { totalCheck_list, series_list } = getPBCheck(day.arrows)
      PB_check_series = Math.max(PB_check_series, ...series_list)
      PB_check = Math.max(PB_check, ...totalCheck_list)
    }

    // Flatten the array of arrows 
    const arrows = day.arrows.flat(Infinity);

    const totalArrows = arrows.length;
    const totalScore = arrows.reduce((acc, score) => acc + score, 0)
    const averageScore = Math.round(totalScore / totalArrows * 100) / 100;

    // Day type calculations
    day_type_totals[day_type] = day_type_totals[day_type] || { totalArrows: 0, totalScore: 0 }
    day_type_totals[day_type].totalArrows += totalArrows
    day_type_totals[day_type].totalScore += totalScore

    // Daily calculations
    dailyTotals[day.date] = { totalArrows, averageScore };

    // Weekly calculations
    weeklyTotals[week] = weeklyTotals[week] || { totalArrows: 0, totalScore: 0 };
    weeklyTotals[week].totalArrows += totalArrows;
    weeklyTotals[week].totalScore += arrows.reduce((acc, score) => acc + score, 0);

    // Monthly calculations
    monthlyTotals[month] = monthlyTotals[month] || { totalArrows: 0, totalScore: 0 };
    monthlyTotals[month].totalArrows += totalArrows;
    monthlyTotals[month].totalScore += arrows.reduce((acc, score) => acc + score, 0);
  });

  // Calculate averages for weeks, months, and day types
  const calculateAverage = (totals) => {
    Object.keys(totals).forEach(key => {
      const { totalArrows, totalScore } = totals[key];
      totals[key].averageScore = Math.round((totalScore / totalArrows) * 100) / 100;
      delete totals[key].totalScore;
    });
  }

  calculateAverage(weeklyTotals)
  calculateAverage(monthlyTotals)
  calculateAverage(day_type_totals)

  return { dailyTotals, weeklyTotals, monthlyTotals, day_type_totals, PB_check, PB_check_series, PB_competition, PB_competition_series };
}

const data = [
  {
    date: "2024-04-01",
    arrows: [9, 10, 10, 9, 8, 10, 7]
  },
  {
    date: "2024-04-02",
    type: "competition",
    arrows: [
      [
        [9, 8, 7, 9, 10, 8],
        [9, 8, 7, 9, 10, 8],
        [9, 8, 2, 9, 1, 8],
        [9, 1, 7, 9, 10, 8],
        [9, 8, 7, 4, 1, 8],
        [9, 7, 7, 9, 10, 8],
      ],
      [
        [9, 8, 7, 9, 10, 8],
        [9, 8, 7, 8, 1, 8],
        [9, 8, 2, 9, 10, 8],
        [9, 1, 7, 8, 10, 8],
        [9, 8, 7, 8, 1, 9],
        [9, 7, 7, 9, 10, 8],
      ]
    ]
  },
  {
    date: "2024-04-05",
    type: "check",
    arrows: [
      [9, 8, 7, 9, 10, 8, 9, 8, 9],
      [9, 8, 7, 9, 10, 8, 7, 9, 10],
      [9, 8, 2, 9, 1, 8, 9, 10, 8],
      [9, 1, 7, 9, 10, 8, 9, 10, 8],
      [9, 8, 7, 9, 10, 8],
      [9, 8, 7, 8, 1, 8],
      [9, 8, 2, 9, 10, 8],
      [9, 1, 7, 8, 10, 8],
      [9, 8, 7, 8, 1, 9],
      [9, 7, 7, 9, 10, 8],
      [9, 8, 2, 9, 1, 8, 9, 10, 8],
      [9, 1, 7, 9, 10, 8, 9, 10, 8],
      [9, 1, 7, 8, 10, 8],
      [9, 8, 7, 8, 1, 9],
      [9, 7, 7, 9, 10, 8],
      [9, 8, 7, 9, 10, 8, 9, 8, 9, 9, 8, 7, 9, 10, 8, 7, 9, 10],
      [9, 1, 7, 8, 10, 8, 9, 8, 7, 8, 1, 9, 9, 7, 7, 9, 10, 8]
    ]
  },
  {
    date: "2024-03-31",
    arrows: [9, 10, 10, 9, 8, 10, 7]
  },
];

console.log(summary_arrow_data(data))
