import './Candle.css';

function Candle({ isLit, position }) {
    return (
        <div
            className="candle-container"
            style={{
                position: 'absolute',
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)'
            }}
        >
            {/* Candle stick */}
            <div className="candle-stick"></div>

            {/* Flame (only show if lit) */}
            {isLit && (
                <div className="flame-container">
                    <div className="flame">
                        <div className="flame-inner"></div>
                    </div>
                </div>
            )}

            {/* Smoke puff when blown out */}
            {!isLit && (
                <div className="smoke"></div>
            )}
        </div>
    );
}

export default Candle;
