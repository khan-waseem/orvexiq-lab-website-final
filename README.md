# Orvexiq Lab

Official website for **Orvexiq Lab** — a digital product studio focused on designing scalable digital products, enterprise experiences, design systems, and AI-powered solutions.

## About the Project

This repository contains the production website for Orvexiq Lab.

The platform is being developed with a scalable architecture so the website can grow beyond the initial landing page without requiring major frontend restructuring.

### Current Scope

- Homepage / Landing Page
- Responsive Desktop, Tablet & Mobile Experience
- Reusable UI Components
- Three-Tier Design Token Architecture
- Decoupled Content Architecture
- SEO-ready foundation

### Planned Expansion

The architecture is prepared for future:

- Services Pages
- Case Studies
- Individual Case Study Pages
- Blog
- About
- Contact
- Back Office / Admin Portal
- CMS-managed content

## Tech Stack

- Next.js
- React
- TypeScript
- CSS Modules
- CSS Custom Properties
- Zod
- Figma
- GitHub

## Design System Architecture

The website uses a three-tier token architecture:

### 1. Primitive Tokens
Raw foundations including:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Blur
- Motion
- Sizing

### 2. Semantic Tokens
Purpose-driven tokens including:

- Surfaces
- Text roles
- Borders
- Brand colors
- Layout
- States

### 3. Component Tokens
Component-specific tokens for:

- Navigation
- Buttons
- Glass Cards
- Service Cards
- Tags
- CTA
- Testimonials
- Footer

This architecture allows the visual system to evolve without requiring changes throughout individual components.

## Content Architecture

Content is separated from presentation logic through a repository-based architecture.

UI components do not directly depend on static JSON files or a future CMS/database implementation.

This allows the current local content provider to later be replaced by the Orvexiq Lab Back Office / CMS while keeping the frontend architecture stable.

## Getting Started

Install dependencies:

```bash
npm install