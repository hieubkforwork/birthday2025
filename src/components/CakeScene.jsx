import { useState, useEffect } from 'react';
import Candle from './Candle';
import useMicBlowDetector from '../hooks/useMicBlowDetector';
import './CakeScene.css';

// Candle positions on the cake (20 candles)
// Adjusted positions relative to the cake-container (300x300)
// Layers are roughly: Top (width 160, y: bottom 130), Middle (width 220, y: bottom 90), Bottom (width 280, y: bottom 40)
// Container is flex-end, height 300px.
// Top layer top surface is approx at y = 300 - 130 - height/2? 
// Actually, using % is safer if container is fixed.
// Let's assume container is relative 300x300.
// Top Layer Top Surface ~ 35% from top
// Middle Layer Top Surface ~ 55% from top
// Bottom Layer Top Surface ~ 75% from top

// Single candle
const CANDLE_POSITIONS = [
    { x: 50, y: 18 }
];

const REQUIRED_BLOWS = 20;

function CakeScene({ onAllCandlesBlown }) {
    const [blowsLeft, setBlowsLeft] = useState(REQUIRED_BLOWS);
    const { isBlowing, volume, error, hasPermission, requestPermission } = useMicBlowDetector(30);
    const [showInstructions, setShowInstructions] = useState(true);
    // Blow detection logic - simplified for better responsiveness
    useEffect(() => {
        if (isBlowing && hasPermission && blowsLeft > 0) {
            // Decrement immediately when blow is detected
            setBlowsLeft(prev => Math.max(0, prev - 1));
        }
    }, [isBlowing, hasPermission]);

    // Check completion
    useEffect(() => {
        if (blowsLeft === 0) {
            setTimeout(() => {
                onAllCandlesBlown();
            }, 1000);
        }
    }, [blowsLeft, onAllCandlesBlown]);

    const isCandleLit = blowsLeft > 0;
    const litCount = blowsLeft; // For display purposes

    return (
        <div className="cake-scene">
            {!hasPermission && (
                <div className="permission-prompt">
                    <div className="permission-card">
                        <h2>🎤 Quyền Truy Cập Microphone</h2>
                        <p>Chúng tôi cần quyền truy cập microphone để bạn có thể thổi nến!</p>
                        {error && <p className="error-message">{error}</p>}
                        <button onClick={requestPermission} className="permission-button">
                            Cho Phép Microphone
                        </button>
                    </div>
                </div>
            )}

            {hasPermission && (
                <>
                    {showInstructions && litCount > 0 && (
                        <div className="instructions">
                            <p className="instruction-text">🎂 Em yêu thổi mạnh vào microphone để tắt nến nhéeeeeee 🎂</p>
                            <p className="candle-count">Còn {litCount} / 20 nến đang cháy 🔥</p>
                            <div className="volume-indicator">
                                <div
                                    className="volume-bar"
                                    style={{ width: `${Math.min(volume * 2, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <div className="cake-container">
                        <div className="plate"></div>

                        {/* Image Cake */}
                        <img
                            src="../../public/cake.png"
                            alt="Birthday Cake"
                            className="cake-image"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '300px',
                                objectFit: 'contain',
                                zIndex: 100,
                                position: 'relative',
                                transform: 'translateY(-40px)'   // dịch xuống 40px

                            }}
                        />

                        {/* Candles */}
                        {CANDLE_POSITIONS.map((pos, idx) => (
                            <Candle
                                key={idx}
                                isLit={isCandleLit}
                                position={pos}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default CakeScene;
