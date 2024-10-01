# Twilio Voice Call Integration

This project demonstrates how to integrate Twilio's Voice API with a web application. The application allows users to make and receive voice calls directly from their browser, with features like audio device selection and real-time call volume indicators.

## Features

- Outbound voice calls from the browser using Twilio.
- Receive incoming calls with two-way audio.
- Real-time input/output volume monitoring.
- Block specific incoming numbers (e.g., reject calls from a "nemesis").
- Select speaker and ringtone devices dynamically.

## Prerequisites

Before running this application, you will need:

- A [Twilio account](https://www.twilio.com/try-twilio) with active Voice services.
- Twilio API Key and Secret from the Twilio Console.
- PHP installed on your server or local environment.
- Node.js (optional for frontend if applicable).
- HTTPS for browser microphone access.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/myselflohith/twilio_call_php.git
cd twilio_call_php
