
export interface KeyFactor {
  factor: string;
  score: number;
  analysis: string;
}

export interface ComparableSale {
  domain: string;
  price: number;
}

export interface AppraisalResult {
  estimatedValue: number;
  valueRange: string;
  explanation: string;
  keyFactors: KeyFactor[];
  comparableSales: ComparableSale[];
  similarAvailableDomains: string[];
}
