import React, { useEffect } from 'react';
import './confetti.css'; // Import the CSS file

function Confetti({ trigger }) {
    useEffect(() => {
        if (trigger) {
            createConfetti();
        }
    }, [trigger]);

    const createConfetti = () => {
        const numConfetti = 100;
        const confettiContainer = document.querySelector('.confetti-container');

        for (let i = 0; i < numConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${Math.random() * 100}vh`;
            confettiContainer.appendChild(confetti);

            // Remove confetti after animation completes
            setTimeout(() => {
                confetti.remove();
            }, 2000); // Match the duration of the animation
        }
    };

    const getRandomColor = () => {
        const colors = ['#ff0', '#0f0', '#00f', '#f00', '#0ff', '#f0f'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className='confetti-container'></div>
    );
}

export default Confetti;
