export const timeAgo = (date) => {
    const now = new Date(); // Get the current date and time
    const diffInMs = now - new Date(date);
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHours = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30); // Approximate month duration
    const diffInYears = Math.floor(diffInDays / 365); // Approximate year duration

    if (diffInSec < 60) {
        // Less than 1 minute ago
        if (diffInSec === 1) return "1 second ago";
        return `${diffInSec} seconds ago`;
    } else if (diffInMin < 60) {
        // Less than 1 hour ago
        if (diffInMin === 1) return "1 minute ago";
        return `${diffInMin} minutes ago`;
    } else if (diffInHours < 24) {
        // Less than 1 day ago
        if (diffInHours === 1) return "1 hour ago";
        return `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
        // Less than 1 week ago
        if (diffInDays === 1) return "1 day ago";
        return `${diffInDays} days ago`;
    } else if (diffInWeeks < 4) {
        // Less than 1 month ago (roughly 4 weeks)
        if (diffInWeeks === 1) return "1 week ago";
        return `${diffInWeeks} weeks ago`;
    } else if (diffInMonths < 12) {
        // Less than 1 year ago
        if (diffInMonths === 1) return "1 month ago";
        return `${diffInMonths} months ago`;
    } else {
        // More than 1 year ago
        if (diffInYears === 1) return "1 year ago";
        return `${diffInYears} years ago`;
    }
};
