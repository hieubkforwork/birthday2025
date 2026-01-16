import { useState } from 'react';
import LetterModal from './LetterModal';
import Fireworks from './Fireworks';
import FloatingHearts from './FloatingHearts';
import Confetti from './Confetti';
import avatarImg from '../assets/avatar.jpg';
import './BirthdayScene.css';

function BirthdayScene() {
    const [showLetter, setShowLetter] = useState(false);

    return (
        <div className="birthday-scene">
            {/* Background decorations */}
            <Fireworks />
            <FloatingHearts />
            <Confetti />

            {/* Main content */}
            <div className="birthday-content">
                {/* Avatar - Replace with actual image */}
                <div className="avatar-container">
                    <div className="avatar">
                        <img src={avatarImg} alt="Avatar" style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%'
                        }} />
                    </div>
                </div>

                <p className="avatar-caption" style={{
                    fontSize: '3rem',
                    fontFamily: 'var(--font-script)',
                    color: 'var(--accent-neon)',
                    marginTop: 'var(--spacing-md)',
                    textAlign: 'center',
                    textShadow: 'var(--glow-text)'
                }}>
                    Chúc mừng sinh nhật tình yêu của anh!
                </p>

                <button
                    className="letter-button"
                    onClick={() => setShowLetter(true)}
                >
                    💌 Mở Thư
                </button>
            </div>

            {/* Letter Modal */}
            {showLetter && (
                <LetterModal onClose={() => setShowLetter(false)} />
            )}
        </div>
    );
}

export default BirthdayScene;
