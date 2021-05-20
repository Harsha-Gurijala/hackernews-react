import React, { useContext } from 'react';
import { DarkThemeContext } from '../../Context/DarkThemeContext';
import './Styles/FakeComment.css';

export function FakeComment() {

    const { darkTheme } = useContext(DarkThemeContext);

    return (
        <div className={`fake-comment ${darkTheme ? 'fake-comment-dark' : ''}`}> </div>
    )
}
