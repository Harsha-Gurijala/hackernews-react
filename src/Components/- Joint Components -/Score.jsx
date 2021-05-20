import React from 'react';

export function Score({ score }) {

    const showScore = () => {
        if (!score || score < 1) return 'no points';
        if (score === 1) return `${score} point`;
        else return `${score} points`
    }

    return (
        <p>
           {showScore()}
        </p>
    );
}
