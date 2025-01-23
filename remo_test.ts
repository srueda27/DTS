// Constants
const myPriceOptions: number[] = [10, 20, 30, 40];
const friendPriceOptions: number[] = [15, 25, 35, 45];
const myTotalVariableCost: number = 5;
const friendTotalVariableCost: number = 7;
const myTotalFixedCost: number = 100;
const friendTotalFixedCost: number = 120;
const totalHoursWorkedPerMonth: number = 100;


/**
 * Checks if all elements in the price array are within the specified limits.
 * @param {number[]} prices - Array of numeric values representing prices.
 * @param {number} min - The minimum allowed value for the prices.
 * @param {number} max - The maximum allowed value for the prices.
 * @returns {boolean} Returns true if all prices are within the min and max limits, otherwise false.
 */
function checkPriceRange(prices: number[], min: number, max: number): boolean {
  return prices.every(price => price >= min && price <= max);
}

/**
 * Calculate market shares for both based on respective prices.
 * @param myPrice Your price for design services.
 * @param friendPrice Your friend's price for design services.
 * @returns An array containing your market share and your friend's market share.
 */
function calculateMarketSharesForBoth(myPrice: number, friendPrice: number): [number, number] {
  let myMarketShare = 0.5;
  let friendMarketShare = 0.5;

  // Adjust market shares based on price comparison
  if (myPrice < friendPrice) {
    const adjustmentBasedOnMarketShare = (friendPrice - myPrice) / 5 * 0.1;
    myMarketShare += adjustmentBasedOnMarketShare;
    friendMarketShare -= adjustmentBasedOnMarketShare;
  } else if (myPrice > friendPrice) {
    const adjustmentBasedOnMarketShare = (myPrice - friendPrice) / 5 * 0.1;
    myMarketShare -= adjustmentBasedOnMarketShare;
    friendMarketShare += adjustmentBasedOnMarketShare;
  }

  return [myMarketShare, friendMarketShare];
}

/**
 * Calculate profits for all combinations of pricing strategies for both.
 * @returns An array containing the profits for each pricing combination.
 */
function calculateProfitsForBoth(): [number, number, number, number][] {
  const results: [number, number, number, number][] = [];

  // Calculate profits for each combination of your and your friend's prices
  myPriceOptions.forEach(myPrice => {
    friendPriceOptions.forEach(friendPrice => {
      // Check if prices exceed minimum and maximum limits
      if (myPrice >= 10 && myPrice <= 40 && friendPrice >= 15 && friendPrice <= 45) {
        const [myMarketShare, friendMarketShare] = calculateMarketSharesForBoth(myPrice, friendPrice);

        const myTotalIncome = myPrice * totalHoursWorkedPerMonth * myMarketShare;
        const friendTotalIncome = friendPrice * totalHoursWorkedPerMonth * friendMarketShare;

        const myProfit = myTotalIncome - (myTotalVariableCost * totalHoursWorkedPerMonth * myMarketShare) - myTotalFixedCost;
        const friendProfit = friendTotalIncome - (friendTotalVariableCost * totalHoursWorkedPerMonth * friendMarketShare) - friendTotalFixedCost;

        results.push([myPrice, friendPrice, myProfit, friendProfit]);
      }
    });
  });

  return results;
}

/**
 * Determine Nash equilibrium from a list of profit results.
 * @param profits A list of tuples with (your price, your friend's price, your profit, your friend's profit).
 * @returns A list of tuples representing Nash equilibrium.
 */
function determineNashEquilibrium(profits: [number, number, number, number][]): [number, number, number, number][] {
  const nashEquilibrium: [number, number, number, number][] = [];
  console.log(profits)
  
  for (const [myPrice, friendPrice, myProfit, friendProfit] of profits) {
    // Find the best options for you and your friend
    const myBestOptions = profits.filter(([myP, friendP, profit,]) => friendP === friendPrice && myP !== myPrice && profit > myProfit);
    const myFriendBestOptions = profits.filter(([myP, friendP, , profit]) => myP === myPrice && friendP !== friendPrice && profit > friendProfit);

    console.log(myPrice, friendPrice, myProfit, friendProfit)
    console.log(`my best option: ${myBestOptions}, myfriend: ${myFriendBestOptions}`)
    // If no better options exist for either you or your friend, it is a Nash equilibrium
    if (myBestOptions.length === 0 && myFriendBestOptions.length === 0) {
      nashEquilibrium.push([myPrice, friendPrice, myProfit, friendProfit]);
    }
  }

  return nashEquilibrium;
}

/**
 * Determine the most optimal Nash equilibrium based on combined profits.
 * @param nashEquilibrium A list of tuples representing Nash equilibrium.
 * @returns The Nash equilibrium with the highest combined profit.
 */
function determineOptimalNash(nashEquilibrium: [number, number, number, number][]): [number, number, number, number][] {
  if (nashEquilibrium.length > 0) {
    // Find the maximum combined profit
    const maxProfit = Math.max(...nashEquilibrium.map(([_, __, myProfit, friendProfit]) => myProfit + friendProfit));

    // Filter equilibria with the maximum combined profit
    const optimalNash = nashEquilibrium.filter(([_, __, myProfit, friendProfit]) => myProfit + friendProfit === maxProfit);

    return optimalNash;
  }
  // For the possibility of ties in the optimal Nash equilibrium, which could occur if multiple equilibria have the same combined profit.
  return [];

}


function main() {

  if (!checkPriceRange(myPriceOptions, 10, 40) || !checkPriceRange(friendPriceOptions, 15, 45)) {
    console.error("Price options are out of the specified ranges.");
    return;  // Stop execution if validation fails
  }
  const profitResults = calculateProfitsForBoth();
  
  const nashEquilibrium = determineNashEquilibrium(profitResults);

  const optimalNash = determineOptimalNash(nashEquilibrium);

  console.log("All available Nash Equilibrium options:", nashEquilibrium);
  console.log("Most Optimal Nash Equilibrium:", optimalNash);
}

// Run main function
main();
