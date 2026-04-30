# Bharat Votes: The Largest Democracy's Navigation System

**Bharat Votes** is a premium, AI-powered interactive assistant designed to help Indian citizens navigate the electoral process. Built for the **Prompt Wars: Virtual** challenge, this application simplifies complex ECI (Election Commission of India) procedures into an intuitive, accessible journey.

## 🗳️ Key Features

- **Democratic Journey**: A step-by-step educational guide from registration to casting a vote.
- **AI Logistics Bot**: A non-partisan assistant powered by **Gemini 2.0 Flash** providing real-time answers about Form 6, EPIC cards, and polling booths.
- **Interactive Resources**: Verified links to NVSP, Electoral Search, and ECI resources.
- **Immersive UX**: Smooth transitions and motion-based feedback for a premium feel.

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript 5
- **Styling**: Tailwind CSS v4 + Framer Motion
- **AI Engine**: Google Gemini 2.0 Flash (via `@google/genai`)
- **Backend/Analytics**: Google Firebase (Firestore + Analytics)
- **Performance**: Optimized with Vite manual chunking and memoized components.
- **Quality Assurance**: Vitest + Testing Library

## 🛡️ Security & Performance Optimization

- **Sanitized Inputs**: All user queries are sanitized to prevent injection attacks and ensure prompt safety.
- **Code Efficiency**: 
  - Implementation of `React.memo` and `useMemo` for high-performance rendering.
  - Optimized build strategy using Vite's `manualChunks` to split large libraries (Firebase, GenAI, Lucide).
  - Minimal startup latency by removing synchronous network checks.
- **Strict Firestore Rules**: Robust schema validation ensures only valid data is logged for analytics.
- **Accessibility (A11y)**: 
  - WCAG-compliant keyboard navigation (Enter/Space support on interactive bars).
  - ARIA live regions for chat feedback and progress indicators.
  - "Skip to main content" support for screen readers.

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
   Create a `.env` file from `.env.example`. This is the **only** file you need to edit to configure the application:
   ```bash
   cp .env.example .env
   ```
   Fill in your `VITE_GEMINI_API_KEY` and Firebase credentials.

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Run Tests**:
   ```bash
   npm test
   ```

## 📜 Problem Statement Alignment

This application addresses the challenge of making electoral information accessible to 900M+ voters. By combining educational storytelling with conversational AI, it bridges the gap between complex official procedures and citizen needs, promoting informed democratic participation.
