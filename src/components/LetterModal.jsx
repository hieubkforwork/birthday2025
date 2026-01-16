import { useState, useEffect } from 'react';
import './LetterModal.css';

// CUSTOMIZE: Edit this letter content
const LETTER_CONTENT = {
    greeting: "Em yêu ơi,",
    paragraphs: [
        "Chúc mừng sinh nhật em - người anh yêu thương nhất! ❤️ ",

        "Hôm nay là một ngày thật đặc biệt nà, ngày mà thế giới chào đón một thiên thần xinh đẹp xuất hiện và thiên thần ấy bây giờ làm cho cuộc sống của anh có ý nghĩa hơn nhiều. ❤️ ",

        "Chúc cho thiên thần của anh có một ngày sinh nhật thật trọn vẹn, ngập tràn niềm vui, tiếng cười và hạnh phúc bên gia đình, bên anh và những người luôn yêu thương em. ❤️ ",

        "Bước sang tuổi mới, tuổi đôi mươi đẹp nhất đời người, anh chúc em luôn mạnh khỏe, ngày càng xinh đẹp hơn nữa, gặp thật nhiều may mắn và gặt hái được nhiều thành công trong cuộc sống. ❤️ ",

        "Chúc em sẽ thật hạnh phúc khi ở bên anh nhé. Anh thật sự cảm thấy mình là người may mắn khi được em lựa chọn, được ở bên và đồng hành cùng em trên chặng đường phía trước. ❤️ ",

        "Gửi đến em thật nhiều yêu thương và thật nhiều nụ hôn ngọt ngào nhất. ❤️ "
    ],
    signature: "Yêu em rất nhiều,\n Minh Hiếu ❤️ "
};

function LetterModal({ onClose }) {
    const [currentParagraph, setCurrentParagraph] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (!isTyping) return;

        const fullText = LETTER_CONTENT.paragraphs[currentParagraph];
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayedText(fullText.substring(0, currentIndex));
                currentIndex += 2;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    if (currentParagraph < LETTER_CONTENT.paragraphs.length - 1) {
                        setCurrentParagraph(prev => prev + 1);
                        setDisplayedText('');
                    } else {
                        setIsTyping(false);
                    }
                }, 1000);
            }
        }, 80); // Typing speed

        return () => clearInterval(typingInterval);
    }, [currentParagraph, isTyping]);

    const skipTyping = () => {
        setIsTyping(false);
        setCurrentParagraph(LETTER_CONTENT.paragraphs.length - 1);
        setDisplayedText('');
    };

    return (
        <div className="letter-modal-overlay" onClick={onClose}>
            <div className="letter-modal" onClick={(e) => e.stopPropagation()}>
                <button className="letter-close" onClick={onClose}>✕</button>

                <div className="letter-paper">
                    <div className="letter-header">
                        <h2>{LETTER_CONTENT.greeting}</h2>
                    </div>

                    <div className="letter-body">
                        {LETTER_CONTENT.paragraphs.map((para, idx) => {
                            if (idx < currentParagraph) {
                                return <p key={idx} className="letter-paragraph">{para}</p>;
                            } else if (idx === currentParagraph) {
                                return (
                                    <p key={idx} className="letter-paragraph typing">
                                        {displayedText}
                                        {isTyping && <span className="typing-cursor">|</span>}
                                    </p>
                                );
                            }
                            return null;
                        })}

                        {!isTyping && (
                            <div className="letter-signature">
                                {LETTER_CONTENT.signature.split('\n').map((line, idx) => (
                                    <div key={idx}>{line}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    {isTyping && (
                        <button className="skip-typing-btn" onClick={skipTyping}>
                            Bỏ qua hiệu ứng →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LetterModal;
