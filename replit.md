# PirateOne - Your Ultimate Streaming Platform

## Overview
PirateOne is a modern, Netflix-style streaming platform built entirely with HTML, CSS, and JavaScript. It features a dark theme, seamless API integration, and a user-friendly interface for browsing movies, TV shows, and anime.

## Features
- **Dark Theme UI**: Pure black (#000000) background with #44BB91 accent color
- **Modern Sidebar**: Dual-box sidebar layout (1:4 ratio) with smooth rounded corners
  - Upper box: Home and Search navigation
  - Lower box: Movies, TV Shows, Anime, Manga + History, WatchList, Settings
- **Hero Slideshow**: Dynamic featured content with movie description, rating, and action buttons
- **Search Bar**: Prominent top search bar with quick navigation
- **Account Management**: Optional login/register with account circle icon
- **Homepage**: Trending Movies, Trending Shows, and Trending Anime sections
- **Browse Pages**: Dedicated pages for Movies, TV Shows, and Anime with pagination
- **Video Player**: Embedded video playback using Videasy.net API integration
- **Authentication**: Client-side login/register system using localStorage
- **User Profile**: View watch history and ratings
- **Settings**: Customize playback and display preferences
- **Rating System**: Rate content and track your ratings
- **Responsive Design**: Optimized for desktop and mobile devices
- **Custom Branding**: "Made by Pratik" tag with logo placeholder

## API Integration
1. **TMDb API** (themoviedb.org)
   - Fetches movie and TV show data
   - Provides movie/TV show IDs for video playback
   - Search functionality

2. **AniList API** (anilist.co)
   - Fetches anime data using GraphQL
   - Trending, popular, and top-rated anime

3. **Videasy.net API**
   - Embeds videos using TMDb IDs
   - Seamless playback integration

## Setup Instructions

### 1. Get TMDb API Key
1. Visit https://www.themoviedb.org/
2. Create a free account
3. Go to Settings > API
4. Request an API key (select "Developer" option)
5. Fill out the form (you can say it's for educational/personal use)
6. Copy your API Key (v3 auth)

### 2. Add API Key to Secrets
The TMDB_API_KEY has already been added to your Replit Secrets. The application will automatically use this key from the environment variable. If you need to update it:
1. Open the Secrets panel in Replit
2. Update the TMDB_API_KEY value
3. Restart the workflow

### 3. Using the Application
The server is automatically running on port 5000. Just open the webview to access PirateOne!

**First-time users**: You'll need to register an account to use PirateOne. Click "Sign up now" on the login page.

## Project Structure
```
/
├── index.html          # Homepage
├── login.html          # Login page
├── register.html       # Registration page
├── profile.html        # User profile
├── settings.html       # Settings page
├── player.html         # Video player
├── movies.html         # Browse movies
├── tvshows.html        # Browse TV shows
├── anime.html          # Browse anime
├── search.html         # Search page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   ├── api.js          # API integration (TMDb, AniList, Videasy)
│   ├── auth.js         # Authentication logic with avatar generation
│   ├── layout.js       # Shared UI components (avatars, branding)
│   ├── main.js         # Homepage functionality
│   ├── player.js       # Video player logic
│   ├── browse.js       # Browse pages logic
│   ├── search.js       # Search functionality
│   └── search-suggestions.js  # Search autocomplete
└── server.py           # Python HTTP server

```

## How It Works
1. **User Flow**:
   - Register/Login → Browse content → Search/Select content → Watch video → Rate content

2. **Video Playback**:
   - User searches for content → TMDb API fetches data and IDs → IDs passed to Videasy.net API → Video plays in embedded player

3. **Data Storage**:
   - All user data (auth, history, ratings) stored in browser's localStorage
   - No backend database required

## Technologies Used
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**: 
  - TMDb API (movies & TV shows data)
  - AniList GraphQL API (anime data)
  - Videasy.net Embed API (video playback)
  - DiceBear Avatars API (user profile pictures)
- **Storage**: Browser localStorage
- **Server**: Python HTTP Server

## Recent Changes
- 2025-11-07: Avatar and branding enhancements
  - Integrated DiceBear Avatars API for unique user profile pictures
  - Each user gets a random, unique avatar based on their email/ID
  - Avatars display in profile dropdown and account circle
  - Made "Made by Pratik" branding clickable to redirect to portfolio
  - Created layout.js for shared UI components across all pages
  - Search page now fully functional with auto-redirect and filters
- 2025-11-07: Complete UI/UX redesign with new layout
  - Implemented dark black (#000000) and #44BB91 color theme
  - Created dual-box sidebar layout with 1:4 ratio and smooth rounded corners
  - Added hero slideshow section for featured content
  - Redesigned top navigation with centered search bar and account options
  - Added footer disclaimer and "made by pratik" branding
  - All navigation items now include SVG icons
- 2024-01-07: Initial project creation
  - Complete frontend implementation with all features
  - API integration for TMDb, AniList, and Videasy.net
  - Responsive design and mobile optimization

## User Preferences
- Dark theme with Netflix-inspired design
- Static frontend-only implementation
- No backend server or database
- All features client-side with localStorage

## Attribution
**Made by Pratik**

## Notes
- This is a demo/educational project
- API keys should be kept secure in production
- Videasy.net API may have usage limits
- Anime playback through Videasy may be limited (depends on Videasy's anime support)
