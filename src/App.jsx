import { useState, useEffect } from 'react';
import PasswordGate from './components/PasswordGate';
import CakeScene from './components/CakeScene';
import BirthdayScene from './components/BirthdayScene';
import MusicControl from './components/MusicControl';
import useAudioPlayer from './hooks/useAudioPlayer';
import './styles/theme.css';
import './styles/animations.css';

// Password configuration - Change this to your desired password
const CORRECT_PASSWORD = '24102025';

// Note: Add your happy-birthday.mp3 file to src/assets/
// Using a placeholder path - will work once file is added
const MUSIC_PATH = '/src/assets/happy-birthday.mp3';

function App() {
  const [currentScene, setCurrentScene] = useState('password'); // 'password', 'cake', 'birthday'
  const [musicStarted, setMusicStarted] = useState(false);

  // Initialize audio player (don't auto-play)
  const { isPlaying, play, toggle } = useAudioPlayer(MUSIC_PATH, false);

  const handlePasswordSuccess = () => {
    setCurrentScene('cake');
    // Start music when password is correct
    if (!musicStarted) {
      play();
      setMusicStarted(true);
    }
  };

  const handleAllCandlesBlown = () => {
    setCurrentScene('birthday');
  };

  return (
    <div className="app">
      {currentScene === 'password' && (
        <PasswordGate
          correctPassword={CORRECT_PASSWORD}
          onSuccess={handlePasswordSuccess}
        />
      )}

      {currentScene === 'cake' && (
        <CakeScene onAllCandlesBlown={handleAllCandlesBlown} />
      )}

      {currentScene === 'birthday' && (
        <BirthdayScene />
      )}

      {/* Music Control - show only after music has started */}
      {musicStarted && (
        <MusicControl
          isPlaying={isPlaying}
          onToggle={toggle}
        />
      )}
    </div>
  );
}

export default App;
