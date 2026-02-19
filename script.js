// Netflix Home Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
    
    // Hero Carousel Functionality
    let currentHeroSlide = 0;
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroIndicators = document.querySelectorAll('.indicator');
    const totalHeroSlides = heroSlides.length;

    function showHeroSlide(index) {
        // Hide all slides
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        heroSlides[index].classList.add('active');
        heroIndicators[index].classList.add('active');
    }

    function changeHeroSlide(direction) {
        currentHeroSlide += direction;
        
        if (currentHeroSlide >= totalHeroSlides) {
            currentHeroSlide = 0;
        } else if (currentHeroSlide < 0) {
            currentHeroSlide = totalHeroSlides - 1;
        }
        
        showHeroSlide(currentHeroSlide);
    }

    function goToHeroSlide(index) {
        currentHeroSlide = index;
        showHeroSlide(currentHeroSlide);
    }

    // Auto-advance hero carousel
    function startHeroCarousel() {
        setInterval(() => {
            changeHeroSlide(1);
        }, 5000); // Change slide every 5 seconds
    }

    // Start hero carousel
    if (totalHeroSlides > 1) {
        startHeroCarousel();
    }
});

// Main Application Initialization
async function initializeApp() {
    // Check if user is logged in
    if (!AuthManager.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Load API service
    const script = document.createElement('script');
    script.src = 'api-service.js';
    script.onload = async function() {
        // Check if API service loaded properly
        if (typeof window.netflixAPI === 'undefined') {
            console.error('Netflix API service not loaded');
            showNotification('API service failed to load', 'error');
            return;
        }
        
        console.log('API service loaded successfully');
        
        // Initialize user interface
        initializeUserInterface();
        
        // Initialize carousels
        initializeCarousels();
        
        // Load content for each category
        await loadAllContent();
        
        // Initialize search functionality
        initializeSearch();
        
        // Initialize navigation
        initializeNavigation();
        
        showNotification('Netflix Home Page loaded successfully!', 'success');
    };
    
    script.onerror = function() {
        console.error('Failed to load API service script');
        showNotification('Failed to load API service', 'error');
    };
    
    document.head.appendChild(script);
}

// Initialize user interface
function initializeUserInterface() {
    const currentUser = AuthManager.getCurrentUser();
    
    if (currentUser) {
        // Update user avatar with initials
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const userPlan = document.getElementById('userPlan');
        
        if (userAvatar) {
            const initials = currentUser.firstName.charAt(0).toUpperCase() + currentUser.lastName.charAt(0).toUpperCase();
            userAvatar.textContent = initials;
            userAvatar.style.background = '#e50914';
        }
        
        if (userName) {
            userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
        }
        
        if (userPlan) {
            userPlan.textContent = currentUser.plan || 'Basic Plan';
        }
        
        // Setup user dropdown
        setupUserDropdown();
    }
}

// Setup user dropdown menu
function setupUserDropdown() {
    const userAvatar = document.getElementById('userAvatar');
    const userDropdown = document.getElementById('userDropdown');
    const logoutLink = document.getElementById('logoutLink');
    
    if (userAvatar && userDropdown) {
        // Toggle dropdown on avatar click
        userAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            userDropdown.style.display = 'none';
        });
        
        // Prevent dropdown from closing when clicking inside
        userDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Handle logout
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                AuthManager.logout();
            });
        }
    }
}

// Carousel Management
class CarouselManager {
    constructor() {
        this.carousels = new Map();
        this.initializeAllCarousels();
    }

    initializeAllCarousels() {
        const carouselElements = document.querySelectorAll('.movie-carousel');
        carouselElements.forEach(carousel => {
            const id = carousel.id;
            const row = carousel.querySelector('.movie-row');
            const prevBtn = carousel.querySelector('.prev-btn');
            const nextBtn = carousel.querySelector('.next-btn');
            
            this.carousels.set(id, {
                element: carousel,
                row: row,
                prevBtn: prevBtn,
                nextBtn: nextBtn,
                currentIndex: 0,
                scrollAmount: 0
            });
            
            // Add event listeners
            prevBtn.addEventListener('click', () => this.scrollCarousel(id, 'prev'));
            nextBtn.addEventListener('click', () => this.scrollCarousel(id, 'next'));
            
            // Add mouse wheel support
            row.addEventListener('wheel', (e) => this.handleWheel(e, id));
        });
    }

    scrollCarousel(id, direction) {
        const carousel = this.carousels.get(id);
        if (!carousel) return;

        const row = carousel.row;
        const scrollAmount = 210; // Width of movie card + gap
        
        if (direction === 'prev') {
            row.scrollLeft -= scrollAmount;
        } else {
            row.scrollLeft += scrollAmount;
        }
        
        this.updateButtonStates(id);
    }

    handleWheel(e, id) {
        e.preventDefault();
        const carousel = this.carousels.get(id);
        if (!carousel) return;

        const row = carousel.row;
        row.scrollLeft += e.deltaY;
        this.updateButtonStates(id);
    }

    updateButtonStates(id) {
        const carousel = this.carousels.get(id);
        if (!carousel) return;

        const row = carousel.row;
        const prevBtn = carousel.prevBtn;
        const nextBtn = carousel.nextBtn;
        
        // Hide/show previous button
        prevBtn.style.display = row.scrollLeft > 0 ? 'flex' : 'none';
        
        // Hide/show next button
        nextBtn.style.display = row.scrollLeft < row.scrollWidth - row.clientWidth ? 'flex' : 'none';
    }

    addMovies(id, movies) {
        const carousel = this.carousels.get(id);
        if (!carousel) return;

        const row = carousel.row;
        row.innerHTML = '';
        
        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            row.appendChild(movieCard);
        });
        
        // Update button states
        this.updateButtonStates(id);
    }
}

// Create Movie Card Element
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.movieId = movie.id;
    card.dataset.movieType = movie.type || 'movie';
    
    // Create image
    const img = document.createElement('img');
    img.src = movie.poster || movie.poster_path || 'https://via.placeholder.com/200x113/333/fff?text=No+Image';
    img.alt = movie.title;
    img.loading = 'lazy';
    
    // Add error handling for images
    img.onerror = function() {
        this.src = `https://picsum.photos/seed/${movie.title.replace(/\s+/g, '')}/200/113`;
    };
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'movie-card-overlay';
    
    // Add continue watching progress if available
    if (movie.progress !== undefined) {
        const progressBar = document.createElement('div');
        progressBar.className = 'continue-watching-progress';
        const progressFill = document.createElement('div');
        progressFill.className = 'continue-watching-progress-bar';
        progressFill.style.width = `${movie.progress}%`;
        progressBar.appendChild(progressFill);
        card.appendChild(progressBar);
    }
    
    // Add title and metadata
    const title = document.createElement('div');
    title.className = 'movie-card-title';
    title.textContent = movie.title;
    
    const meta = document.createElement('div');
    meta.className = 'movie-card-meta';
    const metaText = [movie.year, movie.rating ? `⭐ ${movie.rating}` : '', movie.episode].filter(Boolean).join(' • ');
    meta.textContent = metaText;
    
    // Add action buttons
    const actions = document.createElement('div');
    actions.className = 'movie-card-actions';
    
    const playBtn = document.createElement('button');
    playBtn.className = 'movie-card-btn';
    playBtn.textContent = '▶ Play';
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playMovie(movie);
    });
    
    const moreBtn = document.createElement('button');
    moreBtn.className = 'movie-card-btn';
    moreBtn.textContent = 'ℹ More';
    moreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showMovieDetails(movie);
    });
    
    const listBtn = document.createElement('button');
    listBtn.className = 'movie-card-btn';
    listBtn.textContent = '+ My List';
    listBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToMyList(movie);
    });
    
    actions.appendChild(playBtn);
    actions.appendChild(moreBtn);
    actions.appendChild(listBtn);
    
    overlay.appendChild(title);
    overlay.appendChild(meta);
    overlay.appendChild(actions);
    
    // Add click event to card
    card.addEventListener('click', () => showMovieDetails(movie));
    
    card.appendChild(img);
    card.appendChild(overlay);
    
    return card;
}

// Load Content for All Categories
async function loadAllContent() {
    console.log('Starting to load all content...');
    
    const categories = [
        { id: 'continue-watching', loader: 'getContinueWatching' },
        { id: 'trending-now', loader: 'getTrendingMovies' },
        { id: 'new-releases', loader: () => window.netflixAPI.getMoviesByCategory('new-releases') },
        { id: 'action-movies', loader: () => window.netflixAPI.getMoviesByCategory('action') },
        { id: 'comedy-movies', loader: () => window.netflixAPI.getMoviesByCategory('comedy') },
        { id: 'horror-movies', loader: () => window.netflixAPI.getMoviesByCategory('horror') },
        { id: 'romantic-movies', loader: () => window.netflixAPI.getMoviesByCategory('romantic') },
        { id: 'documentaries', loader: () => window.netflixAPI.getMoviesByCategory('documentary') }
    ];

    // Load all categories in parallel
    const loadPromises = categories.map(async (category) => {
        try {
            console.log(`Loading category: ${category.id}`);
            showLoading(category.id);
            
            let movies;
            if (typeof category.loader === 'string') {
                movies = await window.netflixAPI[category.loader]();
            } else {
                movies = await category.loader();
            }
            
            console.log(`Loaded ${movies.length} movies for ${category.id}`);
            carouselManager.addMovies(category.id, movies);
        } catch (error) {
            console.error(`Error loading ${category.id}:`, error);
            showError(category.id);
        }
    });

    await Promise.all(loadPromises);
    console.log('All content loaded');
}

// Loading and Error States
function showLoading(categoryId) {
    const carousel = document.getElementById(categoryId);
    const row = carousel.querySelector('.movie-row');
    row.innerHTML = '<div class="loading">Loading...</div>';
}

function showError(categoryId) {
    const carousel = document.getElementById(categoryId);
    const row = carousel.querySelector('.movie-row');
    row.innerHTML = '<div class="error">Failed to load content. Please try again.</div>';
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchInput.parentElement.appendChild(searchResults);

    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        searchTimeout = setTimeout(async () => {
            try {
                const results = await window.netflixAPI.searchContent(query);
                displaySearchResults(results, searchResults);
            } catch (error) {
                console.error('Search error:', error);
            }
        }, 300);
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) {
            searchResults.classList.add('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-search')) {
            searchResults.classList.remove('active');
        }
    });
}

function displaySearchResults(results, container) {
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<div class="search-result-item">No results found</div>';
        container.classList.add('active');
        return;
    }

    results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        
        const poster = document.createElement('img');
        poster.className = 'search-result-poster';
        poster.src = result.poster || result.poster_path || 'https://via.placeholder.com/60x90/333/fff?text=No+Image';
        poster.alt = result.title;
        
        // Add error handling for search images
        poster.onerror = function() {
            this.src = `https://picsum.photos/seed/${result.title.replace(/\s+/g, '')}/60/90`;
        };
        
        const info = document.createElement('div');
        info.className = 'search-result-info';
        
        const title = document.createElement('div');
        title.className = 'search-result-title';
        title.textContent = result.title;
        
        const meta = document.createElement('div');
        meta.className = 'search-result-meta';
        meta.textContent = `${result.year} • ${result.type === 'tv' ? 'TV Show' : 'Movie'} • ⭐ ${result.rating}`;
        
        info.appendChild(title);
        info.appendChild(meta);
        
        item.appendChild(poster);
        item.appendChild(info);
        
        item.addEventListener('click', () => {
            showMovieDetails(result);
            container.classList.remove('active');
            document.querySelector('.search-input').value = '';
        });
        
        container.appendChild(item);
    });
    
    container.classList.add('active');
}

// Navigation Functionality
function initializeNavigation() {
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // User avatar menu
    const userAvatar = document.querySelector('.user-avatar');
    userAvatar.addEventListener('click', () => {
        showNotification('User menu would be implemented here');
    });
}

// Movie Actions
function playMovie(movie) {
    showNotification(`Playing: ${movie.title}`);
    // In a real app, this would open the video player
}

function showMovieDetails(movie) {
    showNotification(`Showing details for: ${movie.title}`);
    // In a real app, this would open a modal or navigate to details page
    console.log('Movie details:', movie);
}

function addToMyList(movie) {
    showNotification(`Added to My List: ${movie.title}`);
    // In a real app, this would update the user's list
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#e50914' : '#46d369'};
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize Carousels
let carouselManager;

function initializeCarousels() {
    carouselManager = new CarouselManager();
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.classList.remove('active');
        }
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = '';
            searchInput.blur();
        }
    }
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
