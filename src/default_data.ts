import { StartupAcquisitionData } from './types';

export const DEFAULT_STARTUP_DATA: StartupAcquisitionData = {
  concept: "AI Travel Planner",
  brand: {
    name: "VoyageAI",
    tagline: "Curated hyper-personalized travel itineraries powered by intelligence.",
    mission: "To make travel planning effortless, personalized, and unforgettable by turning complex logistics into ready-to-go adventures.",
    brandVoice: "Inspiring, adventurous, knowledgeable, yet simple and helpful. Like a trusted local guide with a passion for discovery.",
    colorPalette: [
      { name: "Ocean Indigo", hex: "#4F46E5" },
      { name: "Deep Charcoal", hex: "#09090B" },
      { name: "Coral Breeze", hex: "#F43F5E" },
      { name: "Golden Sand", hex: "#F59E0B" },
      { name: "Sky Mist", hex: "#F0F9FF" }
    ],
    typography: {
      display: "Outfit, Inter, sans-serif",
      body: "Inter, sans-serif"
    }
  },
  logo: {
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-24 h-24 text-indigo-600">
  <path d="M50 12 L85 85 L50 68 L15 85 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="50" cy="48" r="12" fill="none" stroke="#F43F5E" stroke-width="3"/>
  <path d="M50 36 L50 60 M38 48 L62 48" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
</svg>`
  },
  websiteCopy: {
    hero: {
      title: "Your Perfect Journey, Designed in Seconds",
      subtitle: "Stop spending hours scrolling travel blogs and managing spreadsheets. Generate custom daily itineraries, book unique local stays, and optimize your routes instantly.",
      cta: "Build Your Dream Itinerary"
    },
    features: [
      {
        title: "Hyper-Personalized Itineraries",
        description: "Our intelligence maps your travel pace, specific dietary needs, historical interests, and budget into the ultimate custom-fit day-by-day itinerary.",
        icon: "Compass"
      },
      {
        title: "Smart Route Optimization",
        description: "Maximize your adventure time. We dynamically order your daily activities to minimize transit fatigue and save up to 2.5 hours of backtracking daily.",
        icon: "MapPin"
      },
      {
        title: "Real-Time Weather Adaptation",
        description: "Sudden afternoon downpour? Our companion app automatically swaps out walking tours for hidden indoor markets and museums without missing a beat.",
        icon: "CloudRain"
      }
    ],
    testimonials: [
      {
        quote: "VoyageAI turned our 10-day family trip to Tokyo from a logistical headache into an absolute breeze. The restaurant recommendations were absolute neighborhood gold.",
        author: "Sarah Jenkins",
        role: "Busy Mother & Family Planner"
      },
      {
        quote: "I literally planned my entire weekend getaway to Rome on the train ride over. The smart route planning saved us countless hours of backtracking.",
        author: "Marcus Vance",
        role: "Solo Backpacker & Tech Founder"
      }
    ],
    pricingSection: {
      title: "Simple, Value-Packed Plans",
      subtitle: "Get started for free or upgrade to premium to unlock native booking engines, offline navigation sync, and unlimited daily AI regenerations."
    },
    footer: {
      tagline: "VoyageAI - Wander Smart, Plan Less."
    }
  },
  businessModel: {
    valueProposition: "VoyageAI eliminates traditional vacation planning stress by synthesizing hyper-personalized itineraries in seconds. It monetizes via high-margin hotel booking affiliate commissions and premium subscription tiers.",
    keyPartners: [
      "OTA Platforms: Expedia, Booking.com, and Viator APIs for real-time rates and instant booking integrations.",
      "Travel Influencers: Affiliate distribution networks to drive low-cost viral customer acquisition.",
      "Local Tour Operators: Direct partnerships for exclusive, highly rated local experiences and culinary workshops."
    ],
    keyActivities: [
      "AI itinerary routing model fine-tuning and integration with geo-databases",
      "API connectivity and caching layer construction with worldwide booking channels",
      "Influencer marketing operations and micro-community travel campaigns"
    ],
    customerSegments: [
      "Busy professionals wanting frictionless, pre-planned weekend getaways",
      "Families requiring multi-generational activities, low walking fatigue, and strict budgets",
      "Adventure seekers hunting for off-the-beaten-path culinary and hiking gems"
    ],
    revenueStreams: [
      "Premium 'Globetrotter' SaaS subscription providing offline map access and real-time re-routing",
      "5% to 12% booking affiliate commissions on flights, hotel stays, and local curated experience bookings",
      "White-label travel planning dashboards sold directly to boutique travel agencies"
    ],
    costStructure: [
      "Map APIs & Location data lookups (Google Maps, Mapbox geo-endpoints)",
      "High-performance cloud databases and LLM prompt inference costs",
      "Creator referral commissions and target performance ad spend"
    ]
  },
  pricing: {
    tiers: [
      {
        name: "Casual Explorer",
        price: "$0",
        period: "forever",
        description: "Perfect for planning single weekend getaways and exploring general recommendations.",
        features: [
          "Up to 3 Custom Itineraries",
          "Basic transit route layouts",
          "Public hotel & restaurant lists",
          "Web browser dashboard access",
          "Standard email support"
        ],
        isPopular: false
      },
      {
        name: "Globetrotter",
        price: "$9",
        period: "month",
        description: "The ideal plan for frequent travelers wanting offline support and full custom control.",
        features: [
          "Unlimited AI Travel Itineraries",
          "Advanced multi-city route optimization",
          "Offline mobile map synchronization",
          "Real-time weather recalculation module",
          "Priority 24/7 travel advisor chat"
        ],
        isPopular: true
      },
      {
        name: "VIP Concierge",
        price: "$29",
        period: "month",
        description: "For luxury travelers and remote workers seeking hand-picked itineraries and premium perks.",
        features: [
          "Everything in Globetrotter",
          "Pre-vetted boutique luxury recommendations",
          "Integrated one-click booking for all hotels",
          "Concierge phone-line callback support",
          "Airport lounge pass access discounts"
        ],
        isPopular: false
      }
    ]
  },
  financialForecast: {
    assumptions: {
      growthRate: 18,
      initialCustomers: 12,
      averageRevenuePerCustomer: 9
    },
    yearlyForecasts: [
      { year: 1, revenue: 120000, expenses: 70000, profit: 50000, customers: 1200 },
      { year: 2, revenue: 380000, expenses: 190000, profit: 190000, customers: 3800 },
      { year: 3, revenue: 950000, expenses: 420000, profit: 530000, customers: 9500 },
      { year: 4, revenue: 2100000, expenses: 850000, profit: 1250000, customers: 21000 },
      { year: 5, revenue: 4500000, expenses: 1600000, profit: 2900000, customers: 45000 }
    ]
  },
  pitchDeck: {
    slides: [
      {
        title: "The Friction of Modern Travel Planning",
        subtitle: "A simple 4-day vacation requires an average of 10+ hours of research, checking 15+ tabs, and wrestling with rigid static spreadsheets.",
        bullets: [
          "Fragmented research leads to travel fatigue before the holiday even begins.",
          "Standard blog reviews are highly biased, sponsored, or outdated.",
          "Static lists cannot adapt to local weather, transit delays, or personalized paces."
        ],
        layoutType: "problem"
      },
      {
        title: "Meet VoyageAI",
        subtitle: "The intelligent personal guide that turns complex travel logistics into beautiful ready-to-go adventures.",
        bullets: [
          "Generates highly tailored daily travel schedules matching exact food, pace, and interest tags.",
          "Intelligent geographical clustering saves travelers up to 2.5 hours of daily transit backtracks.",
          "Dynamic offline re-routing instantly adjusts plans based on local alerts, weather, or crowd conditions."
        ],
        layoutType: "solution"
      },
      {
        title: "A Rapidly Expanding Travel Sector",
        subtitle: "Capitalizing on the massive postwar shift toward experiential and personalized travel spend.",
        bullets: [
          "Total Addressable Market (TAM) exceeds $5.4 Billion in direct travel platform commission volume.",
          "Tailwind: Millennial and Gen-Z travelers spend 3x more hours planning hyper-specific personalized culinary/hiking trips.",
          "Primary capture: Independent mobile travelers seeking unique local spots, expanding to high-budget families."
        ],
        layoutType: "market"
      },
      {
        title: "Context-Aware Itinerary Engine",
        subtitle: "The technology powering VoyageAI is built for accuracy, speeds, and contextual adaptiveness.",
        bullets: [
          "Direct integration with global geo-databases, Yelp, Google Places, and OpenWeather networks.",
          "Proprietary travel graph groups activities into compact transit clusters automatically.",
          "Offline buffer caching ensures fully responsive map loading in foreign networks without cell coverage."
        ],
        layoutType: "product"
      },
      {
        title: "High-Margin Dual Revenue Streams",
        subtitle: "Combining direct SaaS subscriptions with automated high-volume affiliate sales.",
        bullets: [
          "B2B and B2C subscription models charging flat monthly fees for offline mobile sync.",
          "Integrated affiliate commissions earning 5% to 12% on direct hotel and excursion bookings.",
          "Viral influencer loops: Users share interactive travel links via social media, acquiring new users at near-zero CAC."
        ],
        layoutType: "businessModel"
      },
      {
        title: "Founders with Travel & Engineering Pedigree",
        subtitle: "Bridging travel management systems with cutting-edge machine learning backgrounds.",
        bullets: [
          "Co-Founder & CEO: Evelyn Carter - Former Operations Lead at Expedia with 10+ years in booking logistics.",
          "Co-Founder & CTO: Raj Patel - Former Staff ML Engineer at Google Maps, focused on routing algorithms.",
          "Advisors include prominent figures from travel media and high-scale consumer platform founders."
        ],
        layoutType: "team"
      },
      {
        title: "The Ask: $1.5M Seed Round",
        subtitle: "Expanding integration APIs and scaling consumer influencer loops to accelerate growth.",
        bullets: [
          "60% allocated to Core Product R&D to refine offline maps and expand hotel booking API pipelines.",
          "25% to Influencer Co-Marketing & Paid user acquisition campaigns.",
          "15% to legal, security compliance, and international travel licensing standard setup."
        ],
        layoutType: "ask"
      }
    ]
  },
  buyerAcquisition: {
    coldEmailTemplate: `Subject: Elevating [Agency Name] booking conversion by 30% with VoyageAI
    
Hi {{FirstName}},

I noticed that {{Agency Name}} specializes in crafting some of the highest-rated custom trips to Europe.

Many boutique agencies we speak with love sending patients on spectacular trips but are spending up to 8 hours per client manually building itinerary docs and copying hotel rates into PDFs.

We built VoyageAI to let travel designers instantly generate structured travel schedules custom-tailored to each client's preferences. It typically helps planners book trips 3x faster, boosting agency margin.

Do you have 5 minutes this Thursday for a quick look at how you can digitize your itinerary presentations?

Best,
Evelyn Carter
Co-Founder, VoyageAI
evelyn@voyage-ai.com`,
    linkedinOutreach: `Hi {{FirstName}}, I've been following your updates on growth at {{Agency Name}}. We work with boutique agencies and travel designers to automate custom itinerary generation and increase direct hotel bookings by up to 25%. Would love to share a short video showing how we build interactive plans in seconds. Let's connect!`,
    leadMagnetIdeas: [
      "The Tokyo Hidden Gem Guide: 10 Culinary Spots Missing from Every Blog Itinerary",
      "The Master Travel Spreadsheet: How to Track Budgets & Activities Across 3 Time Zones",
      "The Smart Packer's Handbook: Fit 2 Weeks of Outfits into a Standard Carry-on Bag"
    ],
    marketingChannels: [
      {
        channel: "Travel Influencer Partnerships (Affiliates)",
        strategy: "Partner with mid-tier travel vloggers on TikTok/Instagram. Provide them custom co-branded planning dashboards with shared 10% booking affiliate payouts.",
        complexity: "Medium - Relies on building trust and creator relations but drives high viral scale."
      },
      {
        channel: "Niche Travel SEO Content & Blogs",
        strategy: "Write hyper-specific travel guide pages ('3 Days in Kyoto for Foodies') with embedded VoyageAI generation widgets.",
        complexity: "Medium - High compounding value but takes 3-6 months to index on Google search."
      },
      {
        channel: "Paid Search Ads (High Purchase Intent)",
        strategy: "Run target ads on Google Search for terms like 'automatic itinerary maker', 'personalized travel planner app', or 'paris walking route optimizer'.",
        complexity: "Low - Instantly active but requires constant margin tracking and optimization."
      }
    ]
  },
  prd: {
    title: "VoyageAI - Product Requirement Document (PRD)",
    overview: "Product specification for a hyper-personalized AI Travel Planner designed to automate itinerary building, hotel selection, and walking routes.",
    sections: [
      {
        heading: "1. Executive Summary & Problem Statement",
        content: "Traditional leisure travelers spend upwards of 10-15 hours across 12 distinct search tabs to arrange a standard 4-day vacation. Consumers face high cognitive load comparing geographical distances, booking tickets, budgeting, and planning walking routes. VoyageAI resolves this by delivering a cohesive full-stack platform providing: (a) Immediate personalized itinerary synthesis, (b) Integrated maps routing optimization, and (c) Live re-routing modules adjusting to weather fluctuations."
      },
      {
        heading: "2. User Personas & Target Audience",
        content: "- **Dr. Emily Vance (Solo Business Traveler)**: Wants to maximize short free hours in foreign cities with low friction, seeking quiet local cafes and fast walking routes.\n- **Sarah Jenkins (Family Coordinator)**: Arranges multi-generational trips with low walking fatigue, child-friendly parks, strict budgets, and structured backup plans."
      },
      {
        heading: "3. Functional Requirements (MoSCoW Matrix)",
        content: "- **Must Have**:\n  - Dynamic travel schedule builder accepting food, pacing, and interest preference inputs.\n  - Real-time map rendering with synchronized visual transit routes.\n  - Complete export to PDF, print-friendly formats, and mobile calendar synchronization (Google Calendar / ICS).\n- **Should Have**:\n  - Seamless affiliate checkout integration to book flights/hotels inside the planner dashboard.\n  - Weather lookup module triggering backup indoor alternatives during heavy rains.\n- **Could Have**:\n  - Multi-user joint collaboration allowing real-time itinerary editing with friends.\n  - Offline buffer state for mobile maps without data access.\n- **Won't Have (v1)**:\n  - Direct insurance booking claims and custom flight schedule flight delay re-bookings."
      },
      {
        heading: "4. Technical Stack & System Architecture",
        content: "- **Frontend**: React client SPA, Tailwind CSS utility layers, Lucide icons, and Recharts/D3 dashboards.\n- **Backend Services**: Node.js/Express REST server.\n- **AI Orchestration**: Google Gemini models via @google/genai SDK to generate structured JSON schemas for custom day schedules.\n- **Data Storage**: Cloud SQL / PostgreSQL (user accounts, saved trips) & Firestore (real-time collaboration changes).\n- **External APIs**: Google Maps SDK, Yelp/Places API, OpenWeatherMap, and OTA affiliate integration brokers."
      },
      {
        heading: "5. Security, Compliance, & Non-Functional Requirements",
        content: "- **Data Security**: Secure token authentication, SSL end-to-end encryption (TLS 1.3), PCI-DSS compliance for all checkout integrations.\n- **Performance**: AI itinerary synthesis must resolve in <3.5 seconds; map panning latency <200ms.\n- **Availability**: 99.95% system uptime with auto-scaling to absorb peak summer holiday vacation spikes."
      },
      {
        heading: "6. Success Metrics & Release Plan",
        content: "- **Key Metrics**:\n  - Creation Success: Target >=80% of users completing itinerary generation.\n  - Premium Conversions: Over 3.5% of active explorers upgrading to Globetrotter.\n  - Retention: Over 30% of users opening the app again for their next holiday trip.\n- **Milestones**:\n  - Q1: Closed Beta with 1,000 frequent travelers.\n  - Q2: Launch booking integrations; complete full penetration testing.\n  - Q3: Global public release with influencer travel affiliate networks."
      }
    ]
  }
};
