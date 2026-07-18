import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { DEFAULT_STARTUP_DATA } from "./src/default_data";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
  console.log("GoogleGenAI initialized successfully on server-side.");
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not defined.");
}

// API Endpoints
app.get("/api/default-startup", (req, res) => {
  res.json(DEFAULT_STARTUP_DATA);
});

app.post("/api/generate-startup", async (req, res) => {
  const { concept } = req.body;

  if (!concept || typeof concept !== "string" || concept.trim() === "") {
    return res.status(400).json({ error: "The business concept or prompt is required." });
  }

  if (!ai) {
    return res.status(503).json({
      error: "AI service is currently unavailable. Please verify the GEMINI_API_KEY in Settings > Secrets.",
    });
  }

  try {
    console.log(`Generating startup assets for concept: "${concept}"...`);

    const systemInstruction = `You are an elite Venture Capital Incubator Director, Startup Brand Strategist, and Financial Analyst.
Your task is to take a business concept or prompt (e.g., "AI Travel Planner") and instantly generate a complete, premium, realistic acquisition-ready startup blueprint.

You must output a single JSON object that conforms strictly to this exact schema (no additional keys or markdown wrappers in the JSON itself):

{
  "concept": "The user's original concept",
  "brand": {
    "name": "Premium, memorable, short brand name (avoid generic placeholders)",
    "tagline": "Inspiring and punchy one-sentence tagline",
    "mission": "Compelling, professional mission statement",
    "brandVoice": "Description of the voice and tone (e.g., authoritative, warm, clinical, tech-forward)",
    "colorPalette": [
      { "name": "Primary", "hex": "#HEXCODE" },
      { "name": "Secondary", "hex": "#HEXCODE" },
      { "name": "Accent", "hex": "#HEXCODE" },
      { "name": "Dark", "hex": "#HEXCODE" },
      { "name": "Light", "hex": "#HEXCODE" }
    ],
    "typography": {
      "display": "Space Grotesk, Inter, Outfit, or Playfair Display",
      "body": "Inter, Roboto, or sans-serif"
    }
  },
  "logo": {
    "svgString": "A beautifully drafted, fully functional, clean, and modern raw SVG string. The SVG MUST have viewBox='0 0 100 100', be responsive, use currentColor or values from the color palette, and draw a meaningful minimalist icon (e.g., geometric tooth, robot, shield, lightning) suited for the business. DO NOT include raw text, triple quotes, or outer markdown around the SVG. Keep it as standard raw SVG markup starting with <svg> and ending with </svg>."
  },
  "websiteCopy": {
    "hero": {
      "title": "A highly compelling, high-converting header (e.g. 'The Dental Office of Tomorrow, Powered by AI')",
      "subtitle": "Detailed value-oriented sub-headline outlining the product's primary benefit",
      "cta": "Urgent and premium CTA text"
    },
    "features": [
      { "title": "Feature 1", "description": "Highly descriptive, value-driven description", "icon": "Lucide icon name (e.g., Activity, Mic, Calendar, Brain, Shield, BarChart2, Mail, Users)" },
      { "title": "Feature 2", "description": "Highly descriptive, value-driven description", "icon": "Lucide icon name" },
      { "title": "Feature 3", "description": "Highly descriptive, value-driven description", "icon": "Lucide icon name" }
    ],
    "testimonials": [
      { "quote": "Compelling customer quote showcasing massive ROI or utility", "author": "Dr. Sarah Miller", "role": "DDS, Founder of Miller Clinic" },
      { "quote": "Another glowing testimonial emphasizing pain-point resolution", "author": "John Doe", "role": "COO, Dental Care DSO" }
    ],
    "pricingSection": {
      "title": "Pricing Header",
      "subtitle": "Pricing Subtitle emphasizing high ROI and transparent pricing"
    },
    "footer": {
      "tagline": "A high-quality short footer branding statement"
    }
  },
  "businessModel": {
    "valueProposition": "A robust, multi-sentence executive-level description of the value proposition.",
    "keyPartners": ["Partner 1 (with brief explanation)", "Partner 2", "Partner 3"],
    "keyActivities": ["Activity 1 (with brief explanation)", "Activity 2", "Activity 3"],
    "customerSegments": ["Segment 1", "Segment 2", "Segment 3"],
    "revenueStreams": ["Stream 1", "Stream 2", "Stream 3"],
    "costStructure": ["Cost 1", "Cost 2", "Cost 3"]
  },
  "pricing": {
    "tiers": [
      {
        "name": "Starter (or equivalent)",
        "price": "$299 (or suitable value)",
        "period": "month",
        "description": "Short description of target fit",
        "features": ["Feature A", "Feature B", "Feature C", "Feature D"],
        "isPopular": false
      },
      {
        "name": "Growth / Professional",
        "price": "$699",
        "period": "month",
        "description": "Perfect for standard professional clinics/businesses",
        "features": ["Everything in Starter", "Feature E", "Feature F", "Feature G"],
        "isPopular": true
      },
      {
        "name": "Enterprise / Custom",
        "price": "Custom",
        "period": "pricing",
        "description": "For multi-office or large scale operations",
        "features": ["Custom integrations", "Dedicated SLA", "Unbounded usage", "Dedicated account support"],
        "isPopular": false
      }
    ]
  },
  "financialForecast": {
    "assumptions": {
      "growthRate": 15,
      "initialCustomers": 10,
      "averageRevenuePerCustomer": 600
    },
    "yearlyForecasts": [
      { "year": 1, "revenue": 72000, "expenses": 40000, "profit": 32000, "customers": 10 },
      { "year": 2, "revenue": 180000, "expenses": 90000, "profit": 90000, "customers": 25 },
      { "year": 3, "revenue": 450000, "expenses": 190000, "profit": 260000, "customers": 60 },
      { "year": 4, "revenue": 1100000, "expenses": 450000, "profit": 650000, "customers": 140 },
      { "year": 5, "revenue": 2500000, "expenses": 900000, "profit": 1600000, "customers": 300 }
    ]
  },
  "pitchDeck": {
    "slides": [
      { "title": "The Core Market Problem", "subtitle": "Detail the acute, expensive pain points currently faced by the industry.", "bullets": ["Bullet 1 with detail", "Bullet 2 with detail", "Bullet 3 with detail"], "layoutType": "problem" },
      { "title": "The AI-Enabled Solution", "subtitle": "Introduce our brand as the ultimate solution resolving these issues.", "bullets": ["How we solve pain point 1", "How we solve pain point 2", "How we solve pain point 3"], "layoutType": "solution" },
      { "title": "The Market & Opportunity", "subtitle": "Define the Addressable Market size (TAM/SAM/SOM) and favorable tailwinds.", "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"], "layoutType": "market" },
      { "title": "The Product Blueprint", "subtitle": "Demonstrate the feature set, native integrations, and workflow fit.", "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"], "layoutType": "product" },
      { "title": "High-Efficiency Business Model", "subtitle": "Explain the monetization, pricing layers, and acquisition strategy.", "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"], "layoutType": "businessModel" },
      { "title": "Executive Founding Team", "subtitle": "Establish clinical and technological expertise background.", "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"], "layoutType": "team" },
      { "title": "The Seed Request & Roadmap", "subtitle": "Ask for specific funding and break down allocations.", "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"], "layoutType": "ask" }
    ]
  },
  "buyerAcquisition": {
    "coldEmailTemplate": "A realistic, professionally crafted B2B cold email template using {{Practice Name}}, {{FirstName}}, etc. make it incredibly personalized and value-dense.",
    "linkedinOutreach": "A short, highly contextual LinkedIn invitation note.",
    "leadMagnetIdeas": ["Lead magnet title 1: with details", "Lead magnet title 2", "Lead magnet title 3"],
    "marketingChannels": [
      { "channel": "Channel name 1", "strategy": "Detailed actionable rollout strategy", "complexity": "Low / Medium / High" },
      { "channel": "Channel name 2", "strategy": "Detailed actionable rollout strategy", "complexity": "Low / Medium / High" },
      { "channel": "Channel name 3", "strategy": "Detailed actionable rollout strategy", "complexity": "Low / Medium / High" }
    ]
  },
  "prd": {
    "title": "Product Requirement Document Title",
    "overview": "A 1-2 sentence overview of the technical and product objectives.",
    "sections": [
      { "heading": "1. Executive Summary & Problem Statement", "content": "Detailed overview of product objectives and core user pains resolved." },
      { "heading": "2. User Personas & Target Audience", "content": "Key user personas (e.g. business owners, operators, tech leads) and their specific workflows." },
      { "heading": "3. Functional Requirements (MoSCoW Matrix)", "content": "Highly detailed prioritized list of features (Must-Have, Should-Have, Could-Have, Won't-Have)." },
      { "heading": "4. Technical Stack & System Architecture", "content": "System architecture, proposed databases, frontend/backend layout, APIs, and key technical integrations." },
      { "heading": "5. Security, Compliance & Regulatory Standards", "content": "Security measures (e.g., encryption, GDPR/HIPAA compliance, custom security checks, data isolation rules)." },
      { "heading": "6. Release Milestones & Success Metrics", "content": "Iterative launch plan, release criteria, alpha/beta phases, and primary success metrics (KPIs)." }
    ]
  }
}

CRITICAL: Return ONLY valid, parseable JSON. Do not add any conversational text before or after the JSON. Follow the keys exactly. Ensure the SVG logo markup is perfectly formatted inside the string, using double quotes where necessary or simple single quotes so it parses cleanly in JSON.`;

    const userPrompt = `Generate a fully completed startup blueprint for the concept: "${concept}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Gemini returned an empty text response.");
    }

    const parsedData = JSON.parse(textOutput.trim());
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error generating startup blueprint via Gemini:", error);
    res.status(500).json({
      error: "Failed to generate your startup blueprint.",
      details: error.message || String(error),
    });
  }
});

// Serve frontend with Vite in development, or compiled files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Configuring Vite Dev Server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Configuring static files for Production...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Acquisition Studio backend running on port ${PORT}`);
  });
}

startServer();
