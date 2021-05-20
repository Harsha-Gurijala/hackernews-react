import React from 'react';
import { FakeComment } from './FakeComment';

export function FakeCommentsList({ commentsCount=20 }) {

    //Create an arbitary array of thirty values 
    const fakeCommentsArr = Array.from({length: commentsCount}, (v, i) => i);

    const fakeCommentsList = fakeCommentsArr.map(num => 
        <li 
            key={num}
            className='story-comments-li'>
            <FakeComment />
        </li>
    );

    return (
        <ul className='story-comments-ul'>
            {fakeCommentsList}
        </ul>
    )
}