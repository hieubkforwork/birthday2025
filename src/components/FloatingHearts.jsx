import './FloatingHearts.css';

function FloatingHearts() {
    return (
        <div className="floating-hearts-container">
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="floating-heart-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${8 + Math.random() * 4}s`,
                        fontSize: `${20 + Math.random() * 15}px`,
                        opacity: 0.6 + Math.random() * 0.4
                    }}
                >
                    ❤️
                </div>
            ))}
        </div>
    );
}

export default FloatingHearts;
