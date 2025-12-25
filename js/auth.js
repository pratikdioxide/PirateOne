// auth.js - Backend version (Neon Postgres + JWT)
// Date: December 2025

// ──────────────────────────────────────────────────────────────
// Constants & Helpers
// ──────────────────────────────────────────────────────────────

const TOKEN_KEY = 'cineverse_token';
const USER_KEY = 'cineverse_user';

// You can keep this function if you want fallback avatar generation
// (though backend will provide avatar now)
const AVATAR_STYLES = ['avataaars', 'bottts', 'personas', 'lorelei', 'adventurer', 'pixel-art', 'fun-emoji'];

function generateAvatarUrl(seed) {
    const randomStyle = AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];
    return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${encodeURIComponent(seed)}`;
}

// ──────────────────────────────────────────────────────────────
// Authentication Functions
// ──────────────────────────────────────────────────────────────

/**
 * Register new user - talks to backend
 * @returns {Promise<boolean>} success
 */
async function register(name, email, password) {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            const data = await response.json();
            alert(data.error || 'Registration failed');
            return false;
        }

        const { token, user } = await response.json();

        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return true;
    } catch (error) {
        console.error('Registration error:', error);
        alert('Something went wrong. Please try again later.');
        return false;
    }
}

/**
 * Login user - talks to backend
 * @returns {Promise<boolean>} success
 */
async function login(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const data = await response.json();
            alert(data.error || 'Login failed');
            return false;
        }

        const { token, user } = await response.json();

        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return true;
    } catch (error) {
        console.error('Login error:', error);
        alert('Something went wrong. Please try again later.');
        return false;
    }
}

function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = 'login.html'; // or '/' depending on your flow
}

function getCurrentUser() {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
}

function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function isLoggedIn() {
    return !!getToken() && !!getCurrentUser();
}

function checkAuth() {
    // You can add token validation/expiration check here in future
    return isLoggedIn();
}

/**
 * Update user's display name
 * @param {string} newName
 */
async function updateUserName(newName) {
    const token = getToken();
    if (!token || !newName?.trim()) return false;

    try {
        const response = await fetch('/api/user/update-name', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name: newName.trim() })
        });

        if (!response.ok) throw new Error('Update failed');

        const updatedUser = await response.json();

        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
        return true;
    } catch (error) {
        console.error('Name update failed:', error);
        return false;
    }
}

// ──────────────────────────────────────────────────────────────
// Watch History & Ratings (Backend version)
// ──────────────────────────────────────────────────────────────

/**
 * Get full watch history from backend
 */
async function getWatchHistory() {
    const token = getToken();
    if (!token) return [];

    try {
        const response = await fetch('/api/history', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) logout();
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch history:', error);
        return [];
    }
}

/**
 * Add movie/tv/anime to watch history
 * @param {Object} item - { id, type, title, poster }
 */
async function addToWatchHistory(item) {
    const token = getToken();
    if (!token) return;

    try {
        await fetch('/api/history/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(item)
        });
        // No need to handle local state anymore - backend manages it
    } catch (error) {
        console.error('Failed to add to history:', error);
    }
}

/**
 * Get user ratings from backend
 */
async function getRatings() {
    const token = getToken();
    if (!token) return [];

    try {
        const response = await fetch('/api/ratings', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) logout();
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch ratings:', error);
        return [];
    }
}

/**
 * Add or update rating for an item
 */
async function addRating(item, rating) {
    const token = getToken();
    if (!token) return;

    try {
        await fetch('/api/ratings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ...item,
                rating: Number(rating)
            })
        });
    } catch (error) {
        console.error('Failed to save rating:', error);
    }
}

/**
 * Get rating for specific content
 */
async function getRating(id, type) {
    const ratings = await getRatings();
    const found = ratings.find(r => r.id === id && r.type === type);
    return found ? found.rating : 0;
}

// ──────────────────────────────────────────────────────────────
// Export everything (same interface as before)
// ──────────────────────────────────────────────────────────────

window.cineverseAuth = {
    register,
    login,
    logout,
    getCurrentUser,
    isLoggedIn,
    checkAuth,
    updateUserName,
    getWatchHistory,
    addToWatchHistory,
    getRatings,
    addRating,
    getRating,
    generateAvatarUrl
};

console.log('cineverseAuth global object loaded successfully');