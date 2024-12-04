// src/utils.js
import _ from 'lodash';
import { removeStopwords } from 'stopword';

// Helper function to count words
export const wordCount = (text) => {
  const words = text.split(/\s+/);
  return {
    totalWords: words.length,
    totalCharacters: text.length,
  };
};

// Helper function to convert minutes to MM:SS format
const formatTime = (minutes) => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

// Helper function to get frequent words
export const getFrequentWords = (text, n) => {
    const words = text.split(/\s+/);
    const filteredWords = removeStopwords(words);
    const wordCount = _.countBy(filteredWords);
    return _.take(
      Object.entries(wordCount).sort(([, a], [, b]) => b - a),
      n
    );
  };

// Helper function to get frequent 2-word phrases
export const getFrequentPhrases = (text, n) => {
  const words = text.split(/\s+/);
  const filteredWords = removeStopwords(words);
  const phrases = [];
  for (let i = 0; i < filteredWords.length - 1; i++) {
    phrases.push(filteredWords[i] + ' ' + filteredWords[i + 1]);
  }
  const phraseCount = _.countBy(phrases);
  return _.take(
    Object.entries(phraseCount).sort(([, a], [, b]) => b - a),
    n
  );
};

// Function to calculate reading/speaking time and format it as MM:SS
export const calculateTime = (text) => {
    const words = text.split(/\s+/).length;
    const averageReadingSpeed = 250; // words per minute
    const averageSpeakingSpeed = 150; // words per minute

    // Calculate time in minutes
    const readingTimeInMinutes = words / averageReadingSpeed;
    const speakingTimeInMinutes = words / averageSpeakingSpeed;

    // Format time
    const formattedReadingTime = formatTime(readingTimeInMinutes);
    const formattedSpeakingTime = formatTime(speakingTimeInMinutes);

    return { readingTime: formattedReadingTime, speakingTime: formattedSpeakingTime };
};
  