// src/App.js
import React, { useState, useEffect } from 'react';
import { wordCount, getFrequentWords, getFrequentPhrases, calculateTime } from './utils';
import './App.css';

const WordCountApp = () => {
  const [text, setText] = useState('');
  const [wordCountStats, setWordCountStats] = useState({});
  const [frequentWords, setFrequentWords] = useState([]);
  const [frequentPhrases, setFrequentPhrases] = useState([]);
  const [readingTime, setReadingTime] = useState('00:00');
  const [speakingTime, setSpeakingTime] = useState('00:00');

  useEffect(() => {
    if (text) {
      const wordCountStats = wordCount(text);
      setWordCountStats(wordCountStats);
      setFrequentWords(getFrequentWords(text, 5));  // Only top 5 words
      setFrequentPhrases(getFrequentPhrases(text, 5));  // Only top 5 phrases
      const { readingTime, speakingTime } = calculateTime(text);
      setReadingTime(readingTime);
      setSpeakingTime(speakingTime);
    } else {
      setWordCountStats({});
      setFrequentWords([]);
      setFrequentPhrases([]);
      setReadingTime('00:00');
      setSpeakingTime('00:00');
    }
  }, [text]);

  return (
    <div className="App">
      <div className="text-area">
        <h1>Word Count App</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
        />
      </div>
      <div className="stats1">
        <div className="card">
          <h3>Total words</h3>
          <p>{wordCountStats.totalWords || 0}</p>
        </div>

        <div className="card">
          <h3>Total characters</h3>
          <p>{wordCountStats.totalCharacters || 0}</p>
        </div>

        <div className="card">
          <h3>Reading Time</h3>
          <p>{readingTime}</p>
        </div>

        <div className="card">
          <h3>Speaking Time</h3>
          <p>{speakingTime}</p>
        </div>
      </div>
      <div className='stats2'>
      <div className="card">
          <h3>Most Frequent Words</h3>
          <div className="frequently-list">
            <ul>
              {frequentWords.map(([word, count]) => (
                <li key={word}>{word}: {count}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <h3>Most Frequent 2-Word Phrases</h3>
          <div className="frequently-list">
            <ul>
              {frequentPhrases.map(([phrase, count]) => (
                <li key={phrase}>{phrase}: {count}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCountApp;
