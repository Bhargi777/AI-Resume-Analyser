# AI Resume Analyzer — Product Requirements Document

## Overview

AI-powered resume analysis platform that provides structured scoring, ATS insights, and actionable rewrite suggestions. Built for Vercel deployment with a React + TypeScript frontend and serverless AI backend.

---

## Goals

* Best-in-class resume feedback
* Recruiter-grade scoring
* Job description matching
* Fast (<5s insights)

---

## Target Users

* Students & fresh grads
* Job switchers
* International applicants
* Career coaches (secondary)

---

## Core Features

### 1. Resume Upload

* PDF, DOCX, TXT
* Drag & drop
* Secure parsing

---

### 2. Resume Parsing

Extract:

* Basics
* Skills
* Experience
* Education
* Projects

Output: structured JSON

---

### 3. Resume Scoring

Score breakdown:

* Content quality
* Formatting
* ATS compatibility
* Impact metrics
* Skills relevance

Output: 0–100 score + radar chart

---

### 4. AI Feedback

* Strengths
* Weaknesses
* Missing sections
* High-impact improvements
* Recruiter summary

---

### 5. ATS Checker

* Keyword density
* Formatting risks
* Parsing issues
* ATS score

---

### 6. Job Description Matching

* Match score
* Missing skills
* Keyword gaps
* Tailoring suggestions

---

### 7. Resume Rewriter

* Bullet rewriting
* STAR optimization
* Quantification suggestions
* Tone control

---

### 8. Version Comparison

* Resume A vs B
* Score delta
* Improvements summary

---

### 9. Export Reports

* PDF export
* Shareable link view

---

## Tech Stack

### Frontend

* Next.js (React)
* TypeScript
* TailwindCSS
* Framer Motion
* Recharts

### Backend

* Vercel serverless / edge functions
* AI provider abstraction

### AI Layer

* Structured prompts
* JSON schema validation
* Multi-model routing (future)

---

## APIs

* POST /api/analyze
* POST /api/match
* POST /api/rewrite
* POST /api/compare

---

## Performance

* <2s first load
* <5s analysis
* Mobile responsive
* Lighthouse > 90

---

## Privacy

* No default storage
* Ephemeral processing
* HTTPS encryption
* GDPR-ready

---

## Architecture Principles

* Edge-first
* Stateless backend
* Strict TypeScript
* Modular AI layer
* Component-driven UI

---

## Phases

### MVP

* Upload
* Parsing
* Scoring
* Feedback
* Dashboard

### Phase 2

* Job matching
* Rewrite engine
* Reports

### Phase 3

* Resume comparison
* AI interviews
* Career copilot

---

## Success Metrics

* <5s insights
* 4.5+ satisfaction
* 30% repeat usage

---

## Deliverables

* Production web app
* Deployed on Vercel
* Clean GitHub repo
* PRD.md included
