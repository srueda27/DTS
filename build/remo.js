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
    // From each match get the winner of the match, and save the risers, limbs and arrows used for the competitors not registered.
    for (let i = 0; i < matches.length; i++) {
        const match_competitors = matches[i].competitors;
        const sets = matches[i].sets;
        const winner = matches[i].winner;
        if (!competitors.filter(competitor => competitor.name == match_competitors[0].name).length) {
            competitors.push(match_competitors[0]);
            risers.push(match_competitors[0].riser_brand);
            limbs.push(match_competitors[0].limb_brand);
            arrows.push(match_competitors[0].arrows_brand);
        }
        if (!competitors.filter(competitor => competitor.name == match_competitors[1].name).length) {
            competitors.push(match_competitors[1]);
            risers.push(match_competitors[1].riser_brand);
            limbs.push(match_competitors[1].limb_brand);
            arrows.push(match_competitors[1].arrows_brand);
        }
        winners.push(match_competitors.find(competitor => competitor.name == winner));
        let competitor_1 = '';
        let competitor_2 = '';
        // Calculate the total points per set per competitor. 
        for (const set of sets) {
            competitor_1 = Object.keys(set)[0];
            const set_points_1 = set_points_map.get(competitor_1) || [];
            competitor_2 = Object.keys(set)[1];
            const set_points_2 = set_points_map.get(competitor_2) || [];
            const total_set_1 = set[competitor_1].reduce((a, b) => {
                if (b == 'M' || b == 'X')
                    return a + arrows_values[b];
                return parseInt(b) + a;
            }, 0);
            set_points_1.push(total_set_1);
            const total_set_2 = set[competitor_2].reduce((a, b) => {
                if (b == 'M' || b == 'X')
                    return a + arrows_values[b];
                return parseInt(b) + a;
            }, 0);
            set_points_2.push(total_set_2);
            set_points_map.set(competitor_1, set_points_1);
            set_points_map.set(competitor_2, set_points_2);
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
    // From the list of arrows, risers, and limbs, count the number of times a brand was used.
    let risers_map = new Map();
    for (const riser of risers) {
        const risers_count = risers_map.get(riser) || 0;
        risers_map.set(riser, risers_count + 1);
    }
    let limbs_map = new Map();
    for (const limb of limbs) {
        const limbs_count = limbs_map.get(limb) || 0;
        limbs_map.set(limb, limbs_count + 1);
    }
    let arrows_map = new Map();
    for (const arrow of arrows) {
        const arrows_count = arrows_map.get(arrow) || 0;
        arrows_map.set(arrow, arrows_count + 1);
    }
    // Create the report object with the competitors with a wins property defined and the top 3 brands for limbs, risers, and arrows.
    const report = {
        winners: winners.filter(competitor => competitor.wins != undefined),
        top3_risers: Array.from(risers_map, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 3),
        top3_limbs: Array.from(limbs_map, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 3),
        top3_arrows: Array.from(arrows_map, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 3),
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
console.log(tournament_report(matches));
