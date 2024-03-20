"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tournament_report(matches) {
    const arrows_values = {
        'M': 0,
        'X': 10
    };
    // Declare variables to store the list of winners and risers, limbs and arrows used in the tournament. 
    // Declare a variable competitors to keep a record of competitors already registered.
    let risers = [];
    let limbs = [];
    let arrows = [];
    let winners = [];
    let competitors = [];
    let set_points_map = new Map();
    // Define a function expression to count the total points per set, and update the value for the competitor
    const calculateTotalSetPoints = function (set, set_points_map, arrows_values) {
        for (const competitor in set) {
            const set_points = set_points_map.get(competitor) || [];
            const total_set_points = set[competitor].reduce((total, arrow) => {
                if (arrow === 'M' || arrow === 'X') {
                    return total + arrows_values[arrow];
                }
                return total + parseInt(arrow);
            }, 0);
            set_points.push(total_set_points);
            set_points_map.set(competitor, set_points);
        }
    };
    // Define a function expression to add the competitor's used brands to their counting arrays if the competitor's data is not already recorded.
    const recordCompetitorsData = function (index, match_competitors) {
        const competitor = match_competitors[index];
        if (!competitors.some(comp => comp.name === competitor.name)) {
            competitors.push(competitor);
            risers.push(competitor.riser_brand);
            limbs.push(competitor.limb_brand);
            arrows.push(competitor.arrows_brand);
        }
    };
    // From each match get the winner of the match calculate the total points per set per
    //  and save the risers, limbs and arrows used for the competitors.
    for (let i = 0; i < matches.length; i++) {
        const match_competitors = matches[i].competitors;
        const sets = matches[i].sets;
        const winner = matches[i].winner;
        recordCompetitorsData(0, match_competitors);
        recordCompetitorsData(1, match_competitors);
        winners.push(match_competitors.find(competitor => competitor.name == winner));
        for (const set of sets) {
            calculateTotalSetPoints(set, set_points_map, arrows_values);
        }
    }
    // Calculate from the competitors who won a match, what is the highest number of wins, 
    //  and keep the competitor (or competitors) who won the most
    let winners_map = new Map();
    for (const winner of winners) {
        const wins = winners_map.get(winner.name) || 0;
        winners_map.set(winner.name, wins + 1);
    }
    let max_wins = 0;
    winners_map.forEach(wins => {
        if (wins > max_wins)
            max_wins = wins;
    });
    winners_map.forEach((wins, name) => {
        if (wins != max_wins)
            winners_map.delete(name);
    });
    // Calculate the average points por set (down to 1 decimal) of the competitor with the highest wins, and assign the wins and average property.
    for (const [winner, wins] of winners_map) {
        const sets = set_points_map.get(winner).length;
        const set_average = Math.round(((set_points_map.get(winner).reduce((prev, curr) => prev + curr, 0)) / sets) * 10) / 10;
        const competitor = winners.filter(competitor => competitor.name == winner)[0];
        competitor.average_set = set_average;
        competitor.wins = wins;
    }
    // Create a function expression to count the occurrences of brands in an array.
    const countOccurrences = function (items) {
        const itemMap = new Map();
        for (const item of items) {
            const count = itemMap.get(item) || 0;
            itemMap.set(item, count + 1);
        }
        return itemMap;
    };
    const risers_map = countOccurrences(risers);
    const limbs_map = countOccurrences(limbs);
    const arrows_map = countOccurrences(arrows);
    // Define an arrow function to get the top 3 brands and their counts, from a map.
    const getTop3 = (map) => Array.from(map, ([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
    // Create the report object with the competitors with a wins property defined and the top 3 brands for limbs, risers, and arrows.
    const report = {
        winners: winners.filter(competitor => competitor.wins != undefined),
        top3_risers: getTop3(risers_map),
        top3_limbs: getTop3(limbs_map),
        top3_arrows: getTop3(arrows_map),
    };
    return report;
}
exports.default = tournament_report;
const matches = [
    {
        competitors: [
            {
                name: 'Sebastian',
                age: 21,
                arrows_brand: 'Easton ACC',
                category: 'Mayor',
                limb_brand: 'WNS',
                riser_brand: 'Hoyt'
            },
            {
                name: 'Julian',
                age: 21,
                arrows_brand: 'Easton X10',
                category: 'Mayor',
                limb_brand: 'MK',
                riser_brand: 'Sebastian Flute'
            }
        ],
        sets: [
            {
                'Sebastian': ['9', '10', '9'],
                'Julian': ['9', '9', '9']
            },
            {
                'Sebastian': ['9', '9', '10'],
                'Julian': ['9', '9', '9']
            },
            {
                'Sebastian': ['9', '10', '9'],
                'Julian': ['9', '9', '9']
            },
        ],
        winner: 'Sebastian'
    },
    {
        competitors: [
            {
                name: 'Milton',
                age: 21,
                arrows_brand: 'Black Eagle',
                category: 'Mayor',
                limb_brand: 'Hoyt',
                riser_brand: 'W&W'
            },
            {
                name: 'Julian',
                age: 21,
                arrows_brand: 'Easton X10',
                category: 'Mayor',
                limb_brand: 'MK',
                riser_brand: 'Sebastian Flute'
            }
        ],
        sets: [
            {
                'Milton': ['9', '10', '9'],
                'Julian': ['9', '9', '9']
            },
            {
                'Milton': ['9', '9', '10'],
                'Julian': ['9', '9', '9']
            },
            {
                'Milton': ['9', '10', '9'],
                'Julian': ['9', '9', '9']
            },
        ],
        winner: 'Milton'
    },
    {
        competitors: [
            {
                name: 'Santiago',
                age: 21,
                arrows_brand: 'Black Eagle',
                category: 'Mayor',
                limb_brand: 'WNS',
                riser_brand: 'Hoyt'
            },
            {
                name: 'Julian',
                age: 21,
                arrows_brand: 'Easton X10',
                category: 'Mayor',
                limb_brand: 'MK',
                riser_brand: 'Sebastian Flute'
            }
        ],
        sets: [
            {
                'Santiago': ['9', '10', '9'],
                'Julian': ['9', '9', '9']
            },
            {
                'Santiago': ['9', '9', '10'],
                'Julian': ['9', '9', '9']
            },
            {
                'Santiago': ['9', '10', '9'],
                'Julian': ['9', '9', '9']
            },
        ],
        winner: 'Santiago'
    },
    {
        competitors: [
            {
                name: 'Sebastian',
                age: 21,
                arrows_brand: 'Easton ACC',
                category: 'Mayor',
                limb_brand: 'WNS',
                riser_brand: 'Hoyt'
            },
            {
                name: 'Santiago',
                age: 21,
                arrows_brand: 'Black Eagle',
                category: 'Mayor',
                limb_brand: 'WNS',
                riser_brand: 'Hoyt'
            }
        ],
        sets: [
            {
                'Sebastian': ['9', '8', '9'],
                'Santiago': ['9', '9', '10']
            },
            {
                'Sebastian': ['9', '9', '9'],
                'Santiago': ['9', 'X', '9']
            },
            {
                'Sebastian': ['9', '10', '9'],
                'Santiago': ['X', 'X', '9']
            },
        ],
        winner: 'Santiago'
    }
];
const report = tournament_report(matches);
console.log(report);
