// Authentication Check - Load this first on all pages
(function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('netflix_currentUser') || 'null');
    
    // If not logged in and not on login/register pages, redirect to login
    if (!currentUser && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
        window.location.href = 'login.html';
        return;
    }
    
    // If logged in and on login/register pages, redirect to home
    if (currentUser && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
        window.location.href = 'netflix.html';
        return;
    }
})();
