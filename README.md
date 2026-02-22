# AI Resume Analyzer 🚀

A production-grade AI-powered resume analysis platform designed to help job seekers bypass ATS (Applicant Tracking Systems) and land more interviews. Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Google Gemini AI**.

![Analyzer Preview](https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2000)

## ✨ Core Features

- **📊 Comprehensive Analysis**: 0-100 scoring based on content quality, formatting, impact metrics, and alignment.
- **🤖 Smart ATS Checker**: Deep-dive into how machines read your resume. Identifies keyword density and formatting risks.
- **🎯 Job Description Match**: Paste any job description to get a tailored match score and identified skill gaps.
- **✍️ AI Bullet Rewriter**: Instantly optimize weak bullet points using the STAR method for maximum impact.
- **🔄 Version Comparison**: Compare two different versions of your resume to see which one performs better.
- **📄 Export & Share**: Export your results to a professional PDF or share a dynamic link with others.

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Engine**: [Google Gemini 1.5 Pro](https://aistudio.google.com/) via [AI SDK](https://sdk.vercel.ai/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) + [Lucide Icons](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Parsing**: [pdf-parse](https://www.npmjs.com/package/pdf-parse)

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ 
- A Google AI Studio API Key ([Get it here](https://aistudio.google.com/app/apikey))

### 2. Installation
```bash
git clone https://github.com/Bhargi777/AI-Resume-Analyser.git
cd AI-Resume-Analyser
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root:
```env
GEMINI_API_KEY=your_api_key_here
```

### 4. Run Development
```bash
npm run dev
```

## 🌐 Deployment

This app is optimized for **Vercel** with Edge Runtime support. See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed deployment instructions.

## 📄 License
This project is for demonstration and personal use.
