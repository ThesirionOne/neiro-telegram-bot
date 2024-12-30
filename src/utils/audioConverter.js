import ffmpeg from 'fluent-ffmpeg';
import { VOICE_SAMPLE_RATE } from '../config/constants.js';

export async function convertAudioToWav(inputBuffer) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputBuffer)
      .toFormat('wav')
      .outputOptions([
        '-acodec pcm_s16le',
        `-ar ${VOICE_SAMPLE_RATE}`,
        '-ac 1'
      ])
      .on('end', () => {
        resolve(outputBuffer);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}