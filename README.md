# Jenny — Your AI Booking Manager

Jenny is an **AI Booking Manager** that turns complex executive scheduling into a single conversation.  
She books flights, meetings, and experiences in real time — coordinating every detail through natural chat and intelligent automation.  
One assistant, one itinerary, zero chaos.

![Jenny Demo](https://i.imgur.com/jXTXOiN.png)

---

## Inspiration

Travel planning and executive scheduling are often messy — too many apps, forms, and disconnected systems.  
We wanted to reimagine the experience as a single conversation:

> “Book me a weekend trip.”

and your AI handles the rest.

Jenny was inspired by watching travelers and professionals juggle flights, hotels, meetings, and transfers across multiple apps.  
We imagined a world where your phone talks directly to the cloud and plans the entire journey automatically.

---

## What It Does

Jenny is an **AI-powered booking assistant** that connects your voice or chat commands to real services in the cloud.

You can ask Jenny for anything travel-related — flights, hotels, rental cars, or local experiences — and it automatically orchestrates everything across APIs.  
Jenny visualizes this process as a dynamic network forming between your phone and connected endpoints — a real-time flow of data, decisions, and confirmations.

---

## How We Built It

### Architecture Overview

| Layer | Tool | Purpose |
|-------|------|----------|
| Voice + Chat Interface | Vapi / Verbal | Conversational AI for voice input, speech synthesis, and natural response |
| Backend Database | Amazon RDS | Stores user profiles, itineraries, and structured booking data |
| Data Extraction | Apify | Scrapes travel listings, prices, and local activities |
| AI Video / Visuals | Higgsfield.ai | Generates cinematic text-to-video demo scenes |
| Hosting & Deployment | Vercel | Serverless front-end and API hosting |

---

### Build Steps

1. Apify actor scrapes sample travel listings and pricing.  
2. Vapi + Verbal process voice input and generate conversational responses.  
3. Amazon RDS stores bookings and user itineraries.  
4. Higgsfield.ai produces the cinematic video demo (assistant scene → Uber scene → cloud connection → logo reveal).

\[
\text{Jenny}_{\text{cloud}} = f(\text{Voice Input}, \ \text{APIs}_{\text{flights, hotels, cars, activities}})
\]

---

## Challenges We Ran Into

- Managing real-time voice streaming and low-latency responses.  
- Handling API security and credentials across multiple services.  
- Keeping visual consistency across AI-generated video scenes.  
- Orchestrating backend responses in sync with conversational timing.  
- Coordinating automation, database, and front-end integration within hackathon deadlines.

---

## Accomplishments

- Built a working voice-driven booking prototype in less than a day.  
- Integrated Verbal for human-like voice synthesis and dialogue.  
- Designed a cinematic demo entirely with Higgsfield.ai.  
- Created a robust API-first architecture ready for multi-domain expansion.  
- Deployed a live, auto-synced chat experience using v0.app and Vercel.

---

## What We Learned

- How to connect voice AI → database → API → visualization pipelines efficiently.  
- How prompt tuning affects visual consistency in text-to-video generation.  
- How strong narrative visuals help non-technical users instantly understand AI flows.  
- The value of using Amazon RDS for reliability and scalability in multi-user environments.

---

## What’s Next for Jenny

- Integration with live travel APIs (Amadeus, Booking.com, Google Maps).  
- Real-time price optimization and dynamic rebooking.  
- Jenny Lite — an accessible travel version for budget users.  
- Expansion into enterprise and event scheduling use cases.  
- Developer SDK and API endpoints for third-party integrations.

---

## Tech Stack

Built with:  
[Vapi](https://vapi.ai) • [Verbal](https://verbal.io) • [Amazon RDS](https://aws.amazon.com/rds/) • [Apify](https://apify.com) • [Higgsfield.ai](https://higgsfield.ai) • [Vercel](https://vercel.com)

---

## Deployment Info

Automatically synced with your [v0.app](https://v0.app) deployments.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/plaidate/v0-shaders-chat-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/8Oo7erJe4y8)

### Overview

This repository stays in sync with your deployed chats on [v0.app](https://v0.app).  
Any changes made to your deployed app are automatically pushed here.

### Deployment

Your project is live at:  
**[https://vercel.com/plaidate/v0-shaders-chat-app](https://vercel.com/plaidate/v0-shaders-chat-app)**

### Build Your App

Continue building and customizing your app on:  
**[https://v0.app/chat/projects/8Oo7erJe4y8](https://v0.app/chat/projects/8Oo7erJe4y8)**

### How It Works

1. Create or modify your project using [v0.app](https://v0.app).  
2. Deploy your chat agents directly from the v0 interface.  
3. Changes are automatically pushed to this GitHub repository.  
4. Vercel continuously deploys the latest version from this repo.

---

## License

MIT License © 2025  
Created at the Burn Your Code Hackathon
