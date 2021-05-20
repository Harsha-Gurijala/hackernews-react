import React from 'react';
import  { Story } from './Story';

import './Styles/StoriesList.css';

export function StoriesList({ storiesArr, pageNum, storiesPerPage }) {
    
    const storiesList = storiesArr.map((story, index) => {
        const storyNum = ((pageNum - 1) * storiesPerPage) + (index + 1);
        return (
            <li key={story.id}
                className={`stories-li`}>
                <Story 
                    storyObj={story}
                    storyNum={storyNum}
                    pageNum={pageNum}
                 />
            </li>
        );
    });

    return (
        <ol className='stories-ol'>
            {storiesList}
        </ol>
    );
}
