import React from 'react'

export function CommentsCount({ descendants, darkTheme }) {

    if (descendants < 1 || !descendants) return (
        <p className={`no-comments ${darkTheme ? 'dark-no-comments' : ''}`}>
            no comments
        </p>
    );

    return (
        <p className={`comments-exist ${darkTheme ? 'dark-comments-exist' : ''}`}>
            {`${descendants} comment${descendants > 1 ? 's' : ''}`}
        </p>
    );
}
