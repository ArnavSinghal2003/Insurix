export interface Policy {
  _id: string;
  title: string;
  description: string;
  category: string;
  claimAmount: number;
  monthlyPremium: number;
  image: {
    url: string;
  };
}
