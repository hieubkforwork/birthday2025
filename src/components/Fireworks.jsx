import { useEffect } from 'react';
import gsap from 'gsap';
import './Fireworks.css';

function Fireworks() {
    useEffect(() => {
        const createFirework = () => {
            const container = document.querySelector('.fireworks-container');
            if (!container) return;

            const firework = document.createElement('div');
            firework.className = 'firework';

            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.6);

            firework.style.left = `${x}px`;
            firework.style.top = `${y}px`;

            container.appendChild(firework);

            // Create particles
            const colors = ['#FFD7E9', '#E9D6FF', '#FF5470', '#FFC0CB', '#FFE4E1'];
            const particleCount = 15; // Reduced from 30 for performance

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                firework.appendChild(particle);

                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = 50 + Math.random() * 50;

                gsap.to(particle, {
                    x: Math.cos(angle) * velocity,
                    y: Math.sin(angle) * velocity,
                    opacity: 0,
                    scale: 0,
                    duration: 1 + Math.random(),
                    ease: 'power2.out',
                    onComplete: () => {
                        firework.remove();
                    }
                });
            }
        };

        // Create fireworks at intervals
        const interval = setInterval(createFirework, 2500); // Increased from 1500ms

        return () => clearInterval(interval);
    }, []);

    return <div className="fireworks-container"></div>;
}

export default Fireworks;
