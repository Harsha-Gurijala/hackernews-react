export const handleLongUrl = url => {
    //if there is no url the story comes from hackernews website:
    if (!url) return 'news.ycombinator.com';
    //Match the values between http(s) and the first next slash(/)
    const longUrl = url.match(/https:\/\/(.*?)\/|http:\/\/(.*?)\//);
    /*If match is null, url is short, and we need to slice out
    'http(s)://' from it: */
    if (!longUrl) {
        if (url.includes('https://')) {
            return url.slice(8);
        }
        else if (url.includes('http://')) {
            return url.slice(7)
        }
        return url;
    }
    //Filter out returned boolean values from matched array:
    const filterUrl = longUrl.filter(Boolean);
    //Wanted value is the last value in array:
    const shortUrl = filterUrl[filterUrl.length - 1];
    //If the value contains 'www.' we slice it out:
    if (shortUrl.includes('www.')) {
        return shortUrl.slice(4);
    }
    return shortUrl;
};


export const calculateTimeAgo = storyTime => {
    const dateNowInSec = (new Date().getTime() / 1000).toFixed()
    const secondsAgo = dateNowInSec - storyTime;
    const minutesAgo = (secondsAgo / 60).toFixed();
    const hoursAgo = (secondsAgo / 3600).toFixed();
    const daysAgo = (secondsAgo / (3600 * 24)).toFixed();

    const singularOrNot = (timeAgo, timeUnit) => {
        const singular = timeAgo + ` ${timeUnit} ago`;
        const plural = timeAgo + ` ${timeUnit}s ago`;
        return timeAgo < 2 ? singular : plural;
    }

    if (secondsAgo < 60) return singularOrNot(secondsAgo, 'second');
    if (minutesAgo < 60) return singularOrNot(minutesAgo, 'minute');
    if (hoursAgo < 24) return singularOrNot(hoursAgo, 'hour');
    else return singularOrNot(daysAgo, 'day');
};

/* Recursive function for getting the count of nested comments (replies)
below selected (collapsed) comment in StoryCommentsList component: */
export const nestedCommentsCount = (commentComments, accum) => {
    if (!commentComments) return;
    const calculateNested = commentComments.reduce((acc, comment) => {
        const commentsSum = acc + comment.comments.length;
        const nestedCommentsSum = nestedCommentsCount(comment.comments, commentsSum);
        return nestedCommentsSum;
    }, accum);
    return calculateNested;
}