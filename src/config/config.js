const config = {
    baseRoute: process.env.NEXT_PUBLIC_API_BASE_ROUTE,
    users: process.env.NEXT_PUBLIC_API_USERS_BASE_ROUTE,
    tweets: process.env.NEXT_PUBLIC_API_TWEETS_BASE_ROUTE,
    subscriptions: process.env.NEXT_PUBLIC_API_SUBSCRIPTIONS_BASE_ROUTE,
    videos: process.env.NEXT_PUBLIC_API_VIDEOS_BASE_ROUTE,
    comments: process.env.NEXT_PUBLIC_API_COMMENTS_BASE_ROUTE,
    likes: process.env.NEXT_PUBLIC_API_LIKES_BASE_ROUTE,
    dislikes: process.env.NEXT_PUBLIC_API_DISLIKES_BASE_ROUTE,
    playlists: process.env.NEXT_PUBLIC_API_PLAYLIST_BASE_ROUTE,
    dashboard: process.env.NEXT_PUBLIC_API_DASHBOARD_BASE_ROUTE,
    healthcheck: process.env.NEXT_PUBLIC_API_HEALTHCHECK_BASE_ROUTE
}

export default config;