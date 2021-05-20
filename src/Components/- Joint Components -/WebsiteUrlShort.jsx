import React from 'react';

export function WebsiteUrlShort({ urlShort, darkTheme }) {

    return (
        <p className={`short-url ${darkTheme ? 'dark-short-url' : ''}`}>
            {urlShort}
        </p>
    );
}
