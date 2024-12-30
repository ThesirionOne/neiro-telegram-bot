// Simple speech-to-text service using Whisper API
import { openai } from '../config/openai.js';

export async function transcribeAudio(audioBuffer) {
  try {
    const response = await openai.audio.transcriptions.create({
      file: audioBuffer,
      model: "whisper-1",
      language: "es"
    });
    
    return response.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw new Error('Could not transcribe audio message');
  }
}
