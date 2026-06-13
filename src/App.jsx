// src/App.jsx
import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import ProducePractice from './components/ProducePractice';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'practice'

  if (view === 'practice') return <ProducePractice onBack={() => setView('home')} />;
  return <HomeScreen onStart={() => setView('practice')} />;
}
