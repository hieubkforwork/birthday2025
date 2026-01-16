import { useState, useEffect } from 'react';

// Custom hook for detecting microphone "blow" (loud sound)
const useMicBlowDetector = (threshold = 50) => {
    const [isBlowing, setIsBlowing] = useState(false);
    const [volume, setVolume] = useState(0);
    const [error, setError] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);

    const requestPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setHasPermission(true);

            // Create Audio Context
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const analyserNode = audioCtx.createAnalyser();
            const microphone = audioCtx.createMediaStreamSource(stream);

            analyserNode.fftSize = 256;
            microphone.connect(analyserNode);

            setAudioContext(audioCtx);
            setAnalyser(analyserNode);
        } catch (err) {
            setError('Microphone permission denied. Please allow microphone access to blow out candles.');
            console.error('Microphone error:', err);
        }
    };

    useEffect(() => {
        if (!analyser) return;

        let animationId;

        const analyzeAudio = () => {
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);

            // Calculate average volume
            const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            setVolume(average);

            // Detect "blow" if volume exceeds threshold
            if (average > threshold) {
                setIsBlowing(true);
                // Reset after short delay
                setTimeout(() => setIsBlowing(false), 200);
            }

            animationId = requestAnimationFrame(analyzeAudio);
        };

        analyzeAudio();

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [analyser, threshold]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioContext) {
                audioContext.close();
            }
        };
    }, [audioContext]);

    return {
        isBlowing,
        volume,
        error,
        hasPermission,
        requestPermission
    };
};

export default useMicBlowDetector;
