import React from 'react'

export function Title({ storyUrl, title, darkTheme }) {

    return (
        <h2>
            <a 
                href={storyUrl} 
                target='_blank' 
                rel='noopener noreferrer'
                className={`title-link ${darkTheme ? 'dark-link' : ''}`}
            >
            {title}
            </a>
        </h2>
    );
}
