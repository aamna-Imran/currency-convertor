import inquirer from "inquirer";

// conversion rates API
let url =
  "https://v6.exchangerate-api.com/v6/ea8220ee1a03f0471844c0a6/latest/PKR";

// fetching conversion rates
let fetchData = async (data: any) => {
  let fetchRates = await fetch(data);
  let response = await fetchRates.json();
  return response.conversion_rates;
};
let Data = await fetchData(url);

// converting Object into array
// let countries = Object.keys(Data);

let answers = await inquirer.prompt([
  {
    type: "list",
    name: "firstCountry",
    message: "converting From ...",
    choices: Data
  },
  {
    type: "number",
    name: "amount",
    message: "Enter the amount : ",
  },
  {
    type: "list",
    name: "secondCountry",
    message: "converting To ...",
    choices: Data
  },
]);

// pair conversion rates API
let cnv = `https://v6.exchangerate-api.com/v6/ea8220ee1a03f0471844c0a6/pair/${answers.firstCountry}/${answers.secondCountry}`;

// fetching pair rates
let fetchCnv = async (data: any) => {
  let cnvRates = await fetch(data);
  let response = await cnvRates.json();
  return response.conversion_rate;
};
let conversionRate = await fetchCnv(cnv);

// calculation
let convertedRates = conversionRate * answers.amount;

console.log(`${answers.amount} ${answers.firstCountry} = ${convertedRates} ${answers.secondCountry}`);
