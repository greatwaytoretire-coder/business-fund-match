import { FundingOption, QuizResponse } from '../types';

// Converts string choices into real numbers to compare with lender requirements
function parseRevenue(val: string): number {
  if (val.includes('$50,000+')) return 50000;
  if (val.includes('$25,000-$50,000')) return 25000;
  if (val.includes('$10,000-$25,000')) return 10000;
  if (val.includes('$5,000-$10,000')) return 5000;
  return 0; // Under $5,000
}

function parseCreditScore(val: string): number {
  if (val.includes('700+')) return 700;
  if (val.includes('650-699')) return 650;
  if (val.includes('600-649')) return 600;
  if (val.includes('550-599')) return 550;
  if (val.includes('500-549')) return 500;
  return 0; // Below 500
}

function parseYearsInBusiness(val: string): number {
  if (val.includes('2+ years')) return 2;
  if (val.includes('1+ years')) return 1;
  if (val.includes('6-12 months')) return 0.5;
  if (val.includes('3-6 months')) return 0.25;
  return 0; // Less than 3 months
}

export function evaluateMatchingLenders(answers: QuizResponse, optionsList: FundingOption[]): FundingOption[] {
  const numericRevenue = parseRevenue(answers.annualRevenue);
  const numericCredit = parseCreditScore(answers.creditScore);
  const numericTime = parseYearsInBusiness(answers.yearsInBusiness);

  return optionsList.filter(lender => {
    return (
      numericRevenue >= lender.minRevenue &&
      numericCredit >= lender.minCredit &&
      numericTime >= lender.minYearsInBusiness
    );
  });
}