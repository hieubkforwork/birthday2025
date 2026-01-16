import './MusicControl.css';

function MusicControl({ isPlaying, onToggle }) {
    return (
        <button
            className="music-control"
            onClick={onToggle}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
            {isPlaying ? '⏸️' : '▶️'}
        </button>
    );
}

export default MusicControl;
