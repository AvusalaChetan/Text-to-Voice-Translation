#  Text to Voice Translation 

Real-time text translation app built for a Lingo.dev hackathon. The client sends typed text over Socket.IO to a Node/Express server, which calls the Lingo.dev SDK and returns the translated text. The client can also read the translated text aloud with the Web Speech API.

## Features

- Text input to backend translation over Socket.IO
- Source/target language selection
- Live transcript display
- Text-to-speech playback using the Web Speech API

## Tech Stack

Client:
- React + TypeScript + Vite
- Tailwind CSS
- Socket.IO Client

Server:
- Node.js + Express + TypeScript
- Socket.IO
- Lingo.dev SDK

## Project Structure

```
client/   # React UI
server/   # Express + Socket.IO + Lingo.dev
```

## Prerequisites

- Node.js 
- Lingo.dev API key

## Setup

1) Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

2) Configure environment variables

```bash
cd server
cp .env.example .env
```

Set `LINGODOTDEV_API_KEY` in `server/.env`.

3) Run the app

```bash
# terminal 1
cd server
npm run dev

# terminal 2
cd client
npm run dev
```

Open `http://localhost:5173` in your browser.

## Usage

1) Choose source and target languages.
2) Enter text and press Enter or click Translate.
3) Read the translated text in the transcript panel.
4) Click Speak to play the translated text.

## Notes

- Text-to-speech uses the browser Web Speech API, so voice availability depends on the browser and OS.
- Translation is powered by Lingo.dev via the server.

## Credits

- Built for the Lingo.dev hackathon.
- UI direction and styling assistance provided by GitHub Copilot (GPT-5.2-Codex).
