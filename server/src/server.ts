import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {createServer} from "http";
import type {Socket} from "socket.io";
import {Server} from "socket.io";
import {AUDIO_MESSAGE, TRANSCRIPT} from "./const/event.js";
import {GoogleGenAI} from "@google/genai";
import {LingoDotDevEngine} from "lingo.dev/sdk";
import {translate} from './translate.js'

const app = express();

const PORT = process.env.PORT || 8080;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

if (!process.env.GEMINI_API_KEY)
  throw new Error("GEMINI_API_KEY is not set in .env file");

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

io.on("connection", (socket: Socket) => {
  console.log("connected", socket.id);

  socket.on(AUDIO_MESSAGE, async (payload) => {
    const {buffer, mimeType, sourceLanguage, targetLanguage} = payload;
    console.log(sourceLanguage,targetLanguage)

    const prompt = `Transcribe this audio in ${sourceLanguage}. Return only the text.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: Buffer.from(buffer).toString("base64"),
                },
              },
              {text: prompt},
            ],
          },
        ],
      });

      // Access the text from candidates
      const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log("Transcribed text:", text);

      // lingo.dev sdk is used to translate
      if (text) {
        const translatedText = await translate(text, sourceLanguage, targetLanguage);
        console.log("Translated text:", translatedText);
        socket.emit(TRANSCRIPT, {transcript: translatedText});
      }
    } catch (error) {
      console.error("Error:", error);
      socket.emit("error", {message: "Transcription failed"});
    }
  });

  socket.on("disconnect", () => console.log("disconnect", socket.id));
});

server.listen(PORT, () => console.log("Server running on port 8080"));
