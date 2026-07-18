export interface BrandAsset {
  name: string;
  tagline: string;
  mission: string;
  brandVoice: string;
  colorPalette: Array<{ name: string; hex: string }>;
  typography: { display: string; body: string };
}

export interface LogoAsset {
  svgString: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface WebsiteCopyAsset {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Feature[];
  testimonials: Testimonial[];
  pricingSection: {
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
  };
}

export interface BusinessModelAsset {
  valueProposition: string;
  keyPartners: string[];
  keyActivities: string[];
  customerSegments: string[];
  revenueStreams: string[];
  costStructure: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
}

export interface PricingAsset {
  tiers: PricingTier[];
}

export interface YearForecast {
  year: number;
  revenue: number;
  expenses: number;
  profit: number;
  customers: number;
}

export interface FinancialForecastAsset {
  assumptions: {
    growthRate: number;
    initialCustomers: number;
    averageRevenuePerCustomer: number;
  };
  yearlyForecasts: YearForecast[];
}

export interface PitchSlide {
  title: string;
  subtitle: string;
  bullets: string[];
  layoutType: 'problem' | 'solution' | 'market' | 'product' | 'businessModel' | 'team' | 'ask';
}

export interface PitchDeckAsset {
  slides: PitchSlide[];
}

export interface MarketingChannel {
  channel: string;
  strategy: string;
  complexity: string;
}

export interface BuyerAcquisitionAsset {
  coldEmailTemplate: string;
  linkedinOutreach: string;
  leadMagnetIdeas: string[];
  marketingChannels: MarketingChannel[];
}

export interface PrdSection {
  heading: string;
  content: string;
}

export interface ProductRequirementAsset {
  title: string;
  overview: string;
  sections: PrdSection[];
}

export interface StartupAcquisitionData {
  concept: string;
  brand: BrandAsset;
  logo: LogoAsset;
  websiteCopy: WebsiteCopyAsset;
  businessModel: BusinessModelAsset;
  pricing: PricingAsset;
  financialForecast: FinancialForecastAsset;
  pitchDeck: PitchDeckAsset;
  buyerAcquisition: BuyerAcquisitionAsset;
  prd: ProductRequirementAsset;
}
