export interface FundingOption {
  name: string;
  type: string;
  description: string;
  minRevenue: number;
  minCredit: number;
  minYearsInBusiness: number;
  maxAmount: number;
  seoSlug: string;
}

export interface QuizResponse {
  // Question 1
  fundingAmountNeeded: string;
  // Question 2
  yearsInBusiness: string;
  // Question 3
  annualRevenue: string;
  // Question 4
  creditScore: string;
  // Question 5
  hasBusinessBankAccount: string;
  // Question 6
  hasExistingLoans: string;
  // Question 7
  fundingPurpose: string;
  // Question 8
  businessStructure: string;
  // Question 9
  businessState: string;
  // Question 10 (Contact Information)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}