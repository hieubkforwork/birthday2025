import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for managing audio playback
 * @param {string} src - Audio file path
 * @param {boolean} autoPlay - Whether to auto-play on mount
 * @returns {object} Audio control methods and state
 */
function useAudioPlayer(src, autoPlay = false) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Create audio element
        audioRef.current = new Audio(src);
        audioRef.current.loop = true; // Loop the music
        audioRef.current.volume = 0.5; // Set default volume to 50%

        // Event listeners
        const handleCanPlay = () => setIsLoaded(true);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audioRef.current.addEventListener('canplay', handleCanPlay);
        audioRef.current.addEventListener('play', handlePlay);
        audioRef.current.addEventListener('pause', handlePause);
        audioRef.current.addEventListener('ended', handleEnded);

        // Auto-play if requested
        if (autoPlay) {
            audioRef.current.play().catch(err => {
                console.warn('Auto-play prevented:', err);
            });
        }

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('canplay', handleCanPlay);
                audioRef.current.removeEventListener('play', handlePlay);
                audioRef.current.removeEventListener('pause', handlePause);
                audioRef.current.removeEventListener('ended', handleEnded);
            }
        };
    }, [src, autoPlay]);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(err => {
                console.error('Play failed:', err);
            });
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const toggle = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    };

    const setVolume = (volume) => {
        if (audioRef.current) {
            audioRef.current.volume = Math.max(0, Math.min(1, volume));
        }
    };

    return {
        isPlaying,
        isLoaded,
        play,
        pause,
        toggle,
        setVolume
    };
}

export default useAudioPlayer;
