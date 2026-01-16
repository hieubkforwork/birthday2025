import { useEffect } from 'react';
import './Confetti.css';

function Confetti() {
    useEffect(() => {
        const container = document.querySelector('.confetti-container');
        if (!container) return;

        const colors = ['#FFD7E9', '#E9D6FF', '#FF5470', '#FFC0CB', '#FFE4E1', '#FFFFFF'];

        // Create confetti pieces
        for (let i = 0; i < 50; i++) { // Reduced from 100 for performance
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
            container.appendChild(confetti);
        }

        // Auto-remove after 8 seconds
        const timeout = setTimeout(() => {
            container.innerHTML = '';
        }, 8000);

        return () => {
            clearTimeout(timeout);
            container.innerHTML = '';
        };
    }, []);

    return <div className="confetti-container"></div>;
}

export default Confetti;
