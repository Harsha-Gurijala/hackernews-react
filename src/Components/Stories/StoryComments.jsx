import React, { useState, useEffect, useContext } from 'react';
import { StoryCommentsAndDetails } from './StoryCommentsAndDetails';
import { getStory, getStoryComments } from '../../Api Calls/apiCalls';
import { DarkThemeContext } from '../../Context/DarkThemeContext';
import { usePreventSetStateOnUnmount } from '../../Hooks/usePreventSetStateOnUnmount';
import { Link, useLocation } from 'react-router-dom';
import './Styles/StoryComments.css';

export function StoryComments(props) {

    const { darkTheme } = useContext(DarkThemeContext);

    const { pathname } = useLocation();

    const storyId = pathname.slice(pathname.lastIndexOf('_') + 1, pathname.length);

    const storiesType = pathname.slice(1, pathname.indexOf('_'));

    const [storyWithComments, setStoryWithComments] = useState(
        {status: 'isLoading', story: {}, comments: []}
    );

    const { status, story } = storyWithComments;

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
            getStory(storyId, abortSignal).then(res => 
                isMounted.current && setStoryWithComments(res)
            );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storyId]);

    useEffect(() => {
        story?.kids && getStoryComments(story.kids, abortSignal).then(res => 
            isMounted.current && setStoryWithComments(prevStoryWithComments => {
                return {
                    ...prevStoryWithComments, 
                    comments: [...res]
                }
            })
        );
        return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [story])

    return (
        <div className='story-comments-wrap'>
            <p className={`back-link ${darkTheme ? 'back-link-dark' : ''}`}>
                <Link 
                    to={`/${storiesType}_stories`}
                    className={`story-comments-link`}
                >
                    &lt; Back to {storiesType} stories
                </Link>
            </p>
            {
                {
                    'isLoading': 
                        <React.Fragment>
                            <p className={`fake-story-comm-details ${darkTheme ? 'fake-story-comm-det-dark' : ''}`}> </p>
                        </React.Fragment>,
                    'error': 
                        <p className='error'>
                            Network error. Refresh the browser, or try again later.
                        </p>,
                    'storyLoaded':
                        <StoryCommentsAndDetails
                            darkTheme={darkTheme}
                            storyWithComments={storyWithComments}
                        />                      
                }[status]
            }
        </div>
        
    );
}

