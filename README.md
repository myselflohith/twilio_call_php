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
```

### 2. Install Dependencies
PHP

```bash
composer install
```

### 3. Configure Environment Variables

Create a .env file in the root directory:

```bash
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_API_KEY=your_api_key
TWILIO_API_SECRET=your_api_secret
TWILIO_APP_SID=your_twiml_app_sid
```
Replace the placeholders with your Twilio credentials.

### 4. Run the PHP Backend

```bash
php -S localhost:8000
```

## Usage
### 1. Making Calls:

- Enter a phone number and click "Call" to initiate an outbound call.
- Monitor the call status and volume indicators in real time.

### 2. Receiving Calls:

- When an incoming call arrives, the caller’s number is displayed.
- You can accept or reject the call (e.g., reject blocked numbers).

### 3.Audio Device Selection:

- Select speakers and ringtone devices from the dropdown menus.
- Adjust audio settings based on available devices.

## Key Functions
- Twilio.Device.setup(token): Initializes Twilio with an access token.
- Twilio.Device.connect(params): Connects a call using specified parameters.
- Twilio.Device.incoming(): Handles incoming calls with custom logic.
- bindVolumeIndicators(conn): Monitors input/output call volume.

### Twilio Configuration
Ensure your Twilio number routes incoming calls to the correct TwiML app via the Twilio Console.

### Troubleshooting
- Token Issues: Verify .env credentials if token generation fails.
- Audio Devices: Ensure HTTPS and microphone permissions are enabled in the browser.

### Contributing

Pull requests are welcome! For significant changes, please open an issue to discuss proposed updates.