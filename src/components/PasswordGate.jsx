import { useState, useMemo } from 'react';
import './PasswordGate.css';

function PasswordGate({ correctPassword, onSuccess }) {
    const [password, setPassword] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [isFading, setIsFading] = useState(false);

    // Generate hearts positions once and keep them stable
    const hearts = useMemo(() => {
        return [...Array(20)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 10 + 15}px`
        }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === correctPassword) {
            // Correct password - fade out and transition
            setIsFading(true);
            setTimeout(() => {
                onSuccess();
            }, 500);
        } else {
            // Wrong password - shake animation
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
                setPassword('');
            }, 650);
        }
    };

    return (
        <div className={`password-gate ${isFading ? 'fading' : ''}`}>
            <div className="floating-hearts-bg">
                {hearts.map((heart) => (
                    <div
                        key={heart.id}
                        className="floating-heart"
                        style={{
                            left: heart.left,
                            animationDelay: heart.animationDelay,
                            fontSize: heart.fontSize
                        }}
                    >
                        ❤️
                    </div>
                ))}
            </div>

            <div className="password-content">
                <h1 className="password-title">🎂</h1>
                <h2 className="password-subtitle">Món Quà Đặc Biệt</h2>
                <p className="password-hint">Nhập mật khẩu để mở quà</p>

                <form onSubmit={handleSubmit} className={isShaking ? 'shake' : ''}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                        className="password-input"
                        autoFocus
                    />
                    <button type="submit" className="password-button">
                        🎁 Mở Quà
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PasswordGate;
