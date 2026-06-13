// src/hooks/useSimulator.js
// Central game logic: manages scenario state, step progression,
// scanned items, timing, mistakes, and scoring.

import { useState, useEffect, useRef, useCallback } from 'react';
import { SCENARIOS, TAX_RATE } from '../data/scenarios';

// Score calculation constants
const BASE_SCORE = 1000;
const MISTAKE_PENALTY = 50;
const TIME_BONUS_THRESHOLD = 120; // seconds
const TIME_BONUS_PER_SECOND = 2;

export default function useSimulator() {
  // ---------- Mode & Navigation ----------
  const [mode, setMode] = useState('home'); // 'home' | 'playing' | 'results'
  const [hintsEnabled, setHintsEnabled] = useState(true);

  // ---------- Scenario State ----------
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [scannedItems, setScannedItems] = useState([]);

  // ---------- Feedback ----------
  const [feedback, setFeedback] = useState(null); // { type: 'correct'|'wrong', message }
  const [lastPressedKey, setLastPressedKey] = useState(null);

  // ---------- Stats ----------
  const [mistakes, setMistakes] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [scenarioResults, setScenarioResults] = useState([]);
  const [enteredDigits, setEnteredDigits] = useState('');

  // ---------- Timer ----------
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const currentScenario = SCENARIOS[currentScenarioIndex];
  const currentStep = currentScenario?.steps[currentStepIndex];

  // Start the timer when playing begins
  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  // ---------- Start Practice ----------
  const startPractice = useCallback((beginnerMode = true) => {
    setHintsEnabled(beginnerMode);
    setCurrentScenarioIndex(0);
    setCurrentStepIndex(0);
    setScannedItems([]);
    setMistakes(0);
    setElapsedTime(0);
    setScenarioResults([]);
    setFeedback(null);
    setEnteredDigits('');
    setMode('playing');
    startTimer();
  }, [startTimer]);

  // ---------- Show Feedback ----------
  const showFeedback = useCallback((type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 1800);
  }, []);

  // ---------- Advance to next step or scenario ----------
  const advanceStep = useCallback(() => {
    const nextStep = currentStepIndex + 1;
    if (nextStep < currentScenario.steps.length) {
      // Move to next step in the same scenario
      setCurrentStepIndex(nextStep);
    } else {
      // Scenario complete — record result
      const result = {
        scenario: currentScenario.title,
        mistakes,
        time: elapsedTime,
        score: Math.max(0, BASE_SCORE - mistakes * MISTAKE_PENALTY + 
          Math.max(0, (TIME_BONUS_THRESHOLD - elapsedTime) * TIME_BONUS_PER_SECOND)),
      };
      const nextScenarioIndex = currentScenarioIndex + 1;
      if (nextScenarioIndex < SCENARIOS.length) {
        // Move to next scenario
        setScenarioResults(prev => [...prev, result]);
        setCurrentScenarioIndex(nextScenarioIndex);
        setCurrentStepIndex(0);
        setScannedItems([]);
        setEnteredDigits('');
        setMistakes(0);
        showFeedback('correct', `✅ Scenario complete! Moving to: ${SCENARIOS[nextScenarioIndex].title}`);
      } else {
        // All scenarios done
        setScenarioResults(prev => [...prev, result]);
        stopTimer();
        setMode('results');
      }
    }
  }, [currentStepIndex, currentScenario, currentScenarioIndex, mistakes, elapsedTime, showFeedback, stopTimer]);

  // ---------- Handle Key Press ----------
  const handleKeyPress = useCallback((keyId) => {
    if (mode !== 'playing' || !currentStep) return;

    setLastPressedKey(keyId);
    setTimeout(() => setLastPressedKey(null), 200);

    // Numeric digit handling — accumulate for cash entry steps
    const numericKeys = ['0','1','2','3','4','5','6','7','8','9'];
    
    if (keyId === currentStep.expectedKey) {
      // ✅ CORRECT KEY PRESSED
      // If this step has an autoScan item, add it to the cart
      if (currentStep.autoScan) {
        setScannedItems(prev => [...prev, { ...currentStep.autoScan, id: Date.now() }]);
      }

      // If this is a numeric step, track digits
      if (numericKeys.includes(keyId)) {
        setEnteredDigits(prev => prev + keyId);
      }

      showFeedback('correct', '✓ Correct!');
      advanceStep();
    } else {
      // ❌ WRONG KEY PRESSED
      setMistakes(prev => prev + 1);
      showFeedback('wrong', `✗ Wrong key! ${hintsEnabled ? `Try: ${currentStep.expectedKey}` : 'Read the instruction carefully.'}`);
    }
  }, [mode, currentStep, advanceStep, showFeedback, hintsEnabled]);

  // ---------- Skip to Results (for testing) ----------
  const skipToResults = useCallback(() => {
    stopTimer();
    setMode('results');
  }, [stopTimer]);

  // ---------- Go Home ----------
  const goHome = useCallback(() => {
    stopTimer();
    setMode('home');
    setScannedItems([]);
    setMistakes(0);
    setElapsedTime(0);
  }, [stopTimer]);

  // ---------- Computed values ----------
  const subtotal = scannedItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    return sum + price;
  }, 0);
  const tax = Math.max(0, subtotal * TAX_RATE);
  const total = subtotal + tax;

  const totalScore = scenarioResults.reduce((sum, r) => sum + r.score, 0);

  return {
    // State
    mode,
    hintsEnabled,
    currentScenario,
    currentStep,
    currentStepIndex,
    currentScenarioIndex,
    scannedItems,
    feedback,
    lastPressedKey,
    mistakes,
    elapsedTime,
    scenarioResults,
    enteredDigits,
    subtotal,
    tax,
    total,
    totalScore,
    // Actions
    startPractice,
    handleKeyPress,
    skipToResults,
    goHome,
    setHintsEnabled,
  };
}
