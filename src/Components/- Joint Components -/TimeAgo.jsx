import React from 'react';
import { calculateTimeAgo } from '../../Utilities/functions';

export function TimeAgo({ time }) {

    const timeAgo = calculateTimeAgo(time);
    
    return (
        <p>
            {timeAgo}
        </p>
    );
}
