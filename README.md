# Bharat Votes: The Largest Democracy's Navigation System

**Bharat Votes** is a premium, AI-powered interactive assistant designed to help Indian citizens navigate the electoral process. Built for the **Prompt Wars: Virtual** challenge, this application simplifies complex ECI (Election Commission of India) procedures into an intuitive, accessible journey.

## 🗳️ Key Features

- **Democratic Journey**: A step-by-step educational guide from registration to casting a vote.
- **AI Logistics Bot**: A non-partisan assistant powered by **Gemini 2.0 Flash** providing real-time answers about Form 6, EPIC cards, and polling booths.
- **Direct Portal Integration**: Verified links to NVSP, Electoral Search, and ECI resources.
- **Indian Flag Palette**: A professional design system utilizing saffron-red and ink-black aesthetics.

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript 5
- **Styling**: Tailwind CSS v4 + Framer Motion
- **AI Engine**: Google Gemini 2.0 Flash
- **Backend/Analytics**: Google Firebase (Firestore + Auth)
- **Tooling**: Vite 6 + Vitest for Quality Assurance

## 🛡️ Security & Quality

- **Sanitized Inputs**: All user queries are sanitized to prevent common injection attacks.
- **Strict Firestore Rules**: Data logging is controlled by robust schema validation and privacy-first rules.
- **Accessibility (A11y)**: Built with semantic HTML, ARIA labels, and WCAG AA compliant contrast ratios.
- **Efficiency**: Optimized bundle size keeping the repository under 10MB.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Gemini API Key

### Local Setup

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   Add your `GEMINI_API_KEY`.

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Run Tests**:
   ```bash
   npx vitest
   ```

## 📜 Problem Statement Alignment

This application addresses the challenge of making electoral information accessible to 900M+ voters. By combining educational storytelling with a conversational AI, it bridge the gap between complex official procedures and citizen needs.

---
*Developed for Prompt Wars: Virtual Submission*
