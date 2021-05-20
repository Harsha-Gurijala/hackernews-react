import React from 'react';

export function Text({ text }) {
    
    const createMarkup = text => {
        return {__html: `${text}`}
    };

    return (
        <p dangerouslySetInnerHTML={createMarkup(text)} />
    );
}
