export type ToolTabType = 'appraisal' | 'generator' | 'extractor';
export type PageType = ToolTabType | 'about' | 'contact' | 'login' | 'signup';
export type Theme = 'light' | 'dark';

export interface User {
  name: string;
  email: string;
}

export interface ComparableSale {
  domain: string;
  price: number;
}

export interface AppraisalResult {
  domainName: string;
  estimatedValue: number;
  resaleRange: string;
  brandabilityScore: number;
  seoScore: number;
  tldQuality: string;
  comparableSales: ComparableSale[];
}

export interface GeneratedDomain {
  name: string;
  status: 'Likely Available' | 'Maybe Taken' | 'Likely Taken';
}

export type ExtractedDomains = Record<string, string[]>;