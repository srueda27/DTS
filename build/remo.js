"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products = [
    {
        name: 'ACB10',
        category: 'Compound',
        mininum_invesment: 5000,
        mininum_years: 5,
        annualInterest: 12,
        compoundingFrequency: 4
    },
    {
        name: 'ACB11',
        category: 'Compound',
        mininum_invesment: 7000,
        mininum_years: 3,
        annualInterest: 13,
        compoundingFrequency: 3
    },
    {
        name: 'ACB12',
        category: 'Compound',
        mininum_invesment: 15000,
        mininum_years: 3,
        annualInterest: 15,
        compoundingFrequency: 2
    },
    {
        name: 'DEF10',
        category: 'Simple',
        mininum_invesment: 2000,
        mininum_years: 5,
        annualInterest: 13
    },
    {
        name: 'DEF11',
        category: 'Simple',
        mininum_invesment: 3500,
        mininum_years: 3,
        annualInterest: 12.5
    },
    {
        name: 'DEF12',
        category: 'Simple',
        mininum_invesment: 8000,
        mininum_years: 3,
        annualInterest: 13
    }
];
const calculateCompoundInterest = function (initial_investment, annualInterestRate, compoundingFrequency, investmentYears) {
    const rate = annualInterestRate / 100; // Convert percentage to a decimal
    const futureValue = initial_investment * Math.pow((1 + rate / compoundingFrequency), compoundingFrequency * investmentYears);
    return futureValue;
};
const calculateSimpleInterest = function (initial_investment, annualInterestRate, investmentYears) {
    const rate = annualInterestRate / 100; // Convert percentage to a decimal
    const futureValue = initial_investment * (1 + rate * investmentYears);
    return futureValue;
};
function suggestProducts(client) {
    // Filter the products by minimum investment amount and minimum years to invest.
    const possibleProducts = products.filter(product => {
        if (client.initial_investment * 1.5 >= product.mininum_invesment &&
            client.investmentYears >= product.mininum_years)
            return product;
    });
    let suggestedProducts = [];
    // Based on the product category calculate the total investment and fill the suggestions list.
    for (const product of possibleProducts) {
        let totalInvestment = 0;
        if (product.category == 'Compound') {
            totalInvestment = calculateCompoundInterest(client.initial_investment, product.annualInterest, product.compoundingFrequency, client.investmentYears);
        }
        else {
            totalInvestment = calculateSimpleInterest(client.initial_investment, product.annualInterest, client.investmentYears);
        }
        suggestedProducts.push({
            product_name: product.name,
            product_category: product.category,
            mininum_invesment: product.mininum_invesment,
            mininum_years: product.mininum_years,
            initial_investment: client.initial_investment,
            final_investment: totalInvestment,
            total_years: client.investmentYears
        });
    }
    // Grouped the suggestions by category and ordered them by most final investment
    const compoundProducts = suggestedProducts.filter(product => product.product_category == 'Compound').sort((a, b) => b.final_investment - a.final_investment);
    const simpleProducts = suggestedProducts.filter(product => product.product_category == 'Simple').sort((a, b) => b.final_investment - a.final_investment);
    return [...compoundProducts, ...simpleProducts];
}
exports.default = suggestProducts;
const clientsSuggestions = suggestProducts({ initial_investment: 4000, investmentYears: 7 });
console.log(clientsSuggestions);
