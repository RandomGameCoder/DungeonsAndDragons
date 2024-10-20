export const API_KEY = "AIzaSyBuc9C2wxDVUJoocUT-4hllK1C6ZA4vOLA";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
export const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});

console.log("finished")