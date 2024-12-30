import { Speech } from '@google-cloud/speech';
import { DEFAULT_LANGUAGE, VOICE_SAMPLE_RATE } from '../config/constants.js';

const speech = new Speech();

export async function transcribeAudio(audioContent) {
  const request = {
    audio: {
      content: audioContent.toString('base64')
    },
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: VOICE_SAMPLE_RATE,
      languageCode: DEFAULT_LANGUAGE,
    }
  };

  const [response] = await speech.recognize(request);
  return response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
}