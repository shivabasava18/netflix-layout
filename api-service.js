// API Service for Netflix Movie Data
class NetflixAPIService {
    constructor() {
        this.apiKey = 'e547e17d4e91f3e62a571655cd1ccaff';
        this.baseURL = 'https://api.themoviedb.org/3';
        this.imageBaseURL = 'https://image.tmdb.org/t/p/w500';
        this.backdropBaseURL = 'https://image.tmdb.org/t/p/original';
    }

    // Generic API request method
    async makeRequest(endpoint, params = {}) {
        console.log(`API makeRequest called with endpoint: ${endpoint}`);
        // Return real movie data
        const result = this.getRealMovieData(endpoint, params);
        console.log(`API makeRequest returning:`, result);
        return result;
    }

    // Real movie data with working dummy images
    getRealMovieData(endpoint, params = {}) {
        const movieData = {
            '/trending/movie/week': {
                results: [
                    { id: 1, title: "Stranger Things", poster_path: "https://dummyimage.com/200x300/ff6b6b/ffffff&text=Stranger+Things", vote_average: 8.7, release_date: "2016-07-15", overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back." },
                    { id: 2, title: "The Crown", poster_path: "https://dummyimage.com/200x300/4ecdc4/ffffff&text=The+Crown", vote_average: 8.6, release_date: "2016-11-04", overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century." },
                    { id: 3, title: "Breaking Bad", poster_path: "https://dummyimage.com/200x300/95e1d3/ffffff&text=Breaking+Bad", vote_average: 9.5, release_date: "2008-01-20", overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine." },
                    { id: 4, title: "The Witcher", poster_path: "https://dummyimage.com/200x300/6c5ce7/ffffff&text=The+Witcher", vote_average: 8.2, release_date: "2019-12-20", overview: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world." },
                    { id: 5, title: "Money Heist", poster_path: "https://dummyimage.com/200x300/a29bfe/ffffff&text=Money+Heist", vote_average: 8.2, release_date: "2017-05-02", overview: "An unusual group of robbers attempt to pull off the perfect heist by kidnapping the bank manager." },
                    { id: 6, title: "Dark", poster_path: "https://dummyimage.com/200x300/2d3436/ffffff&text=Dark", vote_average: 8.7, release_date: "2017-12-01", overview: "A family saga with a supernatural twist, set in a German town." },
                    { id: 7, title: "Narcos", poster_path: "https://dummyimage.com/200x300/00b894/ffffff&text=Narcos", vote_average: 8.8, release_date: "2015-08-28", overview: "The story of drug kingpin Pablo Escobar." },
                    { id: 8, title: "The Queen's Gambit", poster_path: "https://dummyimage.com/200x300/e17055/ffffff&text=Queen+Gambit", vote_average: 8.6, release_date: "2020-10-23", overview: "Orphaned at a young age, Beth Harmon discovers a genius for chess." }
                ]
            },
            '/movie/popular': {
                results: [
                    { id: 9, title: "Dune: Part Two", poster_path: "https://dummyimage.com/200x300/f39c12/ffffff&text=Dune+2", vote_average: 8.8, release_date: "2024-03-01", overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family." },
                    { id: 10, title: "Oppenheimer", poster_path: "https://dummyimage.com/200x300/0984e3/ffffff&text=Oppenheimer", vote_average: 8.4, release_date: "2023-07-21", overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb." },
                    { id: 11, title: "Barbie", poster_path: "https://dummyimage.com/200x300/ff006e/ffffff&text=Barbie", vote_average: 7.0, release_date: "2023-07-21", overview: "Barbie suffers a crisis that leads her to question her world and her existence." },
                    { id: 12, title: "John Wick", poster_path: "https://dummyimage.com/200x300/2d3436/ffffff&text=John+Wick", vote_average: 7.4, release_date: "2014-10-24", overview: "An ex-hitman comes out of retirement to track down the gangsters that killed his dog." },
                    { id: 13, title: "The Dark Knight", poster_path: "https://dummyimage.com/200x300/2d3436/ffffff&text=Dark+Knight", vote_average: 9.0, release_date: "2008-07-18", overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham." },
                    { id: 14, title: "Inception", poster_path: "https://dummyimage.com/200x300/6c5ce7/ffffff&text=Inception", vote_average: 8.8, release_date: "2010-07-16", overview: "A thief who steals corporate secrets through dream-sharing technology." }
                ]
            },
            '/movie/now_playing': {
                results: [
                    { id: 15, title: "Dune: Part Two", poster_path: "https://dummyimage.com/200x300/f39c12/ffffff&text=Dune+2", vote_average: 8.8, release_date: "2024-03-01", overview: "Paul Atreides unites with Chani and the Fremen." },
                    { id: 16, title: "Kung Fu Panda 4", poster_path: "https://dummyimage.com/200x300/00b894/ffffff&text=KFP4", vote_average: 7.2, release_date: "2024-03-08", overview: "Po must train a new warrior while facing a new villain." },
                    { id: 17, title: "Godzilla x Kong", poster_path: "https://dummyimage.com/200x300/d63031/ffffff&text=GxK", vote_average: 6.8, release_date: "2024-03-29", overview: "Two ancient titans clash in a battle." },
                    { id: 18, title: "Civil War", poster_path: "https://dummyimage.com/200x300/2d3436/ffffff&text=Civil+War", vote_average: 7.1, release_date: "2024-04-12", overview: "A journey across a war-torn America." }
                ]
            },
            'action': {
                results: [
                    { id: 19, title: "Mad Max: Fury Road", poster_path: "https://dummyimage.com/200x300/e17055/ffffff&text=Mad+Max", vote_average: 8.1, release_date: "2015-05-15", overview: "In a post-apocalyptic wasteland, Max teams up with Furiosa to flee from cult leader Immortan Joe." },
                    { id: 20, title: "The Dark Knight", poster_path: "https://dummyimage.com/200x300/2d3436/ffffff&text=Dark+Knight", vote_average: 9.0, release_date: "2008-07-18", overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham." },
                    { id: 21, title: "John Wick", poster_path: "https://dummyimage.com/200x300/2d3436/ffffff&text=John+Wick", vote_average: 7.4, release_date: "2014-10-24", overview: "An ex-hitman comes out of retirement to track down the gangsters that killed his dog." },
                    { id: 22, title: "The Avengers", poster_path: "https://dummyimage.com/200x300/6c5ce7/ffffff&text=Avengers", vote_average: 8.4, release_date: "2019-04-24", overview: "The Avengers assemble to stop Thanos." },
                    { id: 23, title: "Mission: Impossible", poster_path: "https://dummyimage.com/200x300/0984e3/ffffff&text=M:I", vote_average: 7.7, release_date: "2018-07-27", overview: "Ethan Hunt and his team must track down stolen nuclear weapons." }
                ]
            },
            'comedy': {
                results: [
                    { id: 24, title: "The Hangover", poster_path: "https://dummyimage.com/200x300/f39c12/ffffff&text=Hangover", vote_average: 7.7, release_date: "2009-06-05", overview: "Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night." },
                    { id: 25, title: "Superbad", poster_path: "https://dummyimage.com/200x300/00b894/ffffff&text=Superbad", vote_average: 7.6, release_date: "2007-08-17", overview: "Two co-dependent high school seniors are forced to deal with separation anxiety." },
                    { id: 26, title: "Step Brothers", poster_path: "https://dummyimage.com/200x300/a29bfe/ffffff&text=Step+Brothers", vote_average: 6.9, release_date: "2008-07-25", overview: "Two aimless middle-aged losers still living at home are forced against their will to become roommates." },
                    { id: 27, title: "Anchorman", poster_path: "https://dummyimage.com/200x300/ff006e/ffffff&text=Anchorman", vote_average: 7.2, release_date: "2004-07-09", overview: "Ron Burgundy is San Diego's top-rated newsman." },
                    { id: 28, title: "Bridesmaids", poster_path: "https://dummyimage.com/200x300/e17055/ffffff&text=Bridesmaids", vote_average: 6.8, release_date: "2011-05-13", overview: "Competition between the maid of honor and a bridesmaid over who is the bride's best friend." }
                ]
            },
            'horror': {
                results: [
                    { id: 29, title: "The Conjuring", poster_path: "https://dummyimage.com/200x300/2d3436/ffffff&text=Conjuring", vote_average: 7.5, release_date: "2013-07-19", overview: "Paranormal investigators work to help a family terrorized by a dark presence in their farmhouse." },
                    { id: 30, title: "A Quiet Place", poster_path: "https://dummyimage.com/200x300/636e72/ffffff&text=Quiet+Place", vote_average: 7.5, release_date: "2018-05-04", overview: "A family must live in silence to avoid mysterious creatures that hunt by sound." },
                    { id: 31, title: "Get Out", poster_path: "https://dummyimage.com/200x300/2d3436/ffffff&text=Get+Out", vote_average: 7.7, release_date: "2017-02-24", overview: "A young African-American man visits his white girlfriend's family for the weekend." },
                    { id: 32, title: "Hereditary", poster_path: "https://dummyimage.com/200x300/636e72/ffffff&text=Hereditary", vote_average: 7.3, release_date: "2018-06-08", overview: "After the family matriarch passes away, a grieving family is haunted by tragic and disturbing occurrences." },
                    { id: 33, title: "It", poster_path: "https://dummyimage.com/200x300/d63031/ffffff&text=IT", vote_average: 7.3, release_date: "2017-09-06", overview: "In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster." }
                ]
            },
            'romantic': {
                results: [
                    { id: 34, title: "The Notebook", poster_path: "https://dummyimage.com/200x300/e17055/ffffff&text=Notebook", vote_average: 7.8, release_date: "2004-02-18", overview: "A poor yet passionate young man falls in love with a rich young woman." },
                    { id: 35, title: "La La Land", poster_path: "https://dummyimage.com/200x300/6c5ce7/ffffff&text=La+La+Land", vote_average: 8.0, release_date: "2016-12-07", overview: "A jazz musician and an aspiring actress fall in love while pursuing their dreams in Los Angeles." },
                    { id: 36, title: "Titanic", poster_path: "https://dummyimage.com/200x300/0984e3/ffffff&text=Titanic", vote_average: 7.9, release_date: "1997-12-19", overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic." },
                    { id: 37, title: "The Fault in Our Stars", poster_path: "https://dummyimage.com/200x300/ff006e/ffffff&text=Fault+Stars", vote_average: 7.7, release_date: "2014-06-06", overview: "Two teenage cancer patients begin a life-affirming journey to experience love." },
                    { id: 38, title: "Before Sunrise", poster_path: "https://dummyimage.com/200x300/a29bfe/ffffff&text=Before+Sunrise", vote_average: 8.1, release_date: "1995-01-27", overview: "An American man and a French woman meet on a train and spend one night together in Vienna." }
                ]
            },
            'documentary': {
                results: [
                    { id: 39, title: "Our Planet", poster_path: "https://dummyimage.com/200x300/00b894/ffffff&text=Our+Planet", vote_average: 9.3, release_date: "2019-04-05", overview: "Experience our planet's natural beauty and examine how climate change impacts all living creatures." },
                    { id: 40, title: "Making a Murderer", poster_path: "https://dummyimage.com/200x300/2d3436/ffffff&text=Murderer", vote_average: 8.6, release_date: "2015-12-18", overview: "Confrontations between an accused murderer and the American justice system." },
                    { id: 41, title: "Tiger King", poster_path: "https://dummyimage.com/200x300/f39c12/ffffff&text=Tiger+King", vote_average: 7.1, release_date: "2020-03-20", overview: "An exploration of big cat breeding and its bizarre underworld." },
                    { id: 42, title: "The Social Dilemma", poster_path: "https://dummyimage.com/200x300/6c5ce7/ffffff&text=Social+Dilemma", vote_average: 7.6, release_date: "2020-09-09", overview: "Tech experts sound the alarm on the dangerous impact of social networking." },
                    { id: 43, title: "Free Solo", poster_path: "https://dummyimage.com/200x300/636e72/ffffff&text=Free+Solo", vote_average: 8.2, release_date: "2018-09-28", overview: "Follow rock climber Alex Honnold's attempt to climb El Capitan without ropes." }
                ]
            },
            '/search/movie': {
                results: [
                    { id: 44, title: "The Matrix", poster_path: "https://dummyimage.com/200x300/6c5ce7/ffffff&text=Matrix", vote_average: 8.7, release_date: "1999-03-31", overview: "A computer hacker learns about the true nature of reality." },
                    { id: 45, title: "Interstellar", poster_path: "https://dummyimage.com/200x300/2d3436/ffffff&text=Interstellar", vote_average: 8.6, release_date: "2014-11-07", overview: "A team of explorers travel through a wormhole in space." }
                ]
            },
            '/search/tv': {
                results: [
                    { id: 46, name: "The Office", poster_path: "https://dummyimage.com/200x300/4ecdc4/ffffff&text=Office", vote_average: 8.9, first_air_date: "2005-03-24", overview: "A mockumentary about office life." },
                    { id: 47, name: "Friends", poster_path: "https://dummyimage.com/200x300/ff006e/ffffff&text=Friends", vote_average: 8.9, first_air_date: "1994-09-22", overview: "Six friends living in New York City." }
                ]
            }
        };
        
        return Promise.resolve(movieData[endpoint] || { results: [] });
    }

    // Get trending movies
    async getTrendingMovies(timeWindow = 'week') {
        try {
            const data = await this.makeRequest(`/trending/movie/${timeWindow}`);
            return this.formatMovieData(data.results);
        } catch (error) {
            console.error('Error fetching trending movies:', error);
            return this.getFallbackMovies('trending');
        }
    }

    // Get movies by category
    async getMoviesByCategory(category, page = 1) {
        console.log(`getMoviesByCategory called with category: ${category}`);
        try {
            let endpoint;
            
            switch(category) {
                case 'action':
                    endpoint = 'action';
                    break;
                case 'comedy':
                    endpoint = 'comedy';
                    break;
                case 'horror':
                    endpoint = 'horror';
                    break;
                case 'romantic':
                    endpoint = 'romantic';
                    break;
                case 'documentary':
                    endpoint = 'documentary';
                    break;
                case 'new-releases':
                    endpoint = '/movie/now_playing';
                    break;
                case 'popular':
                    endpoint = '/movie/popular';
                    break;
                default:
                    endpoint = '/movie/popular';
            }

            console.log(`Using endpoint: ${endpoint} for category: ${category}`);
            const data = await this.makeRequest(endpoint);
            console.log(`Data received:`, data);
            const formattedData = this.formatMovieData(data.results);
            console.log(`Formatted data:`, formattedData);
            return formattedData;
        } catch (error) {
            console.error(`Error fetching ${category} movies:`, error);
            return this.getFallbackMovies(category);
        }
    }

    // Get TV shows
    async getTVShows(category = 'popular') {
        try {
            const data = await this.makeRequest(`/tv/${category}`);
            return this.formatTVData(data.results);
        } catch (error) {
            console.error('Error fetching TV shows:', error);
            return this.getFallbackMovies('tv');
        }
    }

    // Search movies and TV shows
    async searchContent(query) {
        try {
            const [moviesData, tvData] = await Promise.all([
                this.makeRequest('/search/movie', { query }),
                this.makeRequest('/search/tv', { query })
            ]);

            const movies = this.formatMovieData(moviesData.results);
            const tvShows = this.formatTVData(tvData.results);

            return [...movies, ...tvShows].slice(0, 10);
        } catch (error) {
            console.error('Error searching content:', error);
            return [];
        }
    }

    // Get continue watching data
    async getContinueWatching() {
        return [
            { id: 1, title: "Stranger Things", poster: "https://dummyimage.com/200x113/ff6b6b/ffffff&text=Stranger+Things", progress: 65, episode: "S4:E1", type: "tv", year: 2016, rating: 8.7 },
            { id: 2, title: "The Crown", poster: "https://dummyimage.com/200x113/4ecdc4/ffffff&text=The+Crown", progress: 30, episode: "S5:E3", type: "tv", year: 2016, rating: 8.6 },
            { id: 3, title: "Money Heist", poster: "https://dummyimage.com/200x113/a29bfe/ffffff&text=Money+Heist", progress: 85, episode: "S5:E10", type: "tv", year: 2017, rating: 8.2 }
        ];
    }

    // Format movie data for display
    formatMovieData(movies) {
        return movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster: movie.poster_path || null,
            backdrop: movie.backdrop_path || null,
            rating: movie.vote_average,
            year: new Date(movie.release_date).getFullYear() || 'Unknown',
            type: 'movie',
            genre_ids: movie.genre_ids
        }));
    }

    // Format TV data for display
    formatTVData(tvShows) {
        return tvShows.map(show => ({
            id: show.id,
            title: show.name,
            overview: show.overview,
            poster: show.poster_path || null,
            backdrop: show.backdrop_path || null,
            rating: show.vote_average,
            year: new Date(show.first_air_date).getFullYear() || 'Unknown',
            type: 'tv',
            genre_ids: show.genre_ids
        }));
    }

    // Get fallback movies when API fails
    getFallbackMovies(category) {
        const fallbackMovies = {
            trending: [
                { id: 101, title: "Fallback Movie 1", poster: "https://dummyimage.com/200x300/ff6b6b/ffffff&text=Movie+1", rating: 8.5, year: 2023, type: "movie" },
                { id: 102, title: "Fallback Movie 2", poster: "https://dummyimage.com/200x300/4ecdc4/ffffff&text=Movie+2", rating: 7.8, year: 2023, type: "movie" }
            ],
            action: [
                { id: 103, title: "Action Fallback 1", poster: "https://dummyimage.com/200x300/d63031/ffffff&text=Action+1", rating: 8.0, year: 2023, type: "movie" }
            ],
            comedy: [
                { id: 104, title: "Comedy Fallback 1", poster: "https://dummyimage.com/200x300/f39c12/ffffff&text=Comedy+1", rating: 7.5, year: 2023, type: "movie" }
            ],
            horror: [
                { id: 105, title: "Horror Fallback 1", poster: "https://dummyimage.com/200x300/2d3436/ffffff&text=Horror+1", rating: 7.2, year: 2023, type: "movie" }
            ],
            romantic: [
                { id: 106, title: "Romance Fallback 1", poster: "https://dummyimage.com/200x300/e17055/ffffff&text=Romance+1", rating: 7.9, year: 2023, type: "movie" }
            ],
            documentary: [
                { id: 107, title: "Doc Fallback 1", poster: "https://dummyimage.com/200x300/00b894/ffffff&text=Doc+1", rating: 8.1, year: 2023, type: "movie" }
            ],
            'new-releases': [
                { id: 108, title: "New Release 1", poster: "https://dummyimage.com/200x300/6c5ce7/ffffff&text=New+1", rating: 8.3, year: 2024, type: "movie" }
            ],
            popular: [
                { id: 109, title: "Popular 1", poster: "https://dummyimage.com/200x300/a29bfe/ffffff&text=Popular+1", rating: 8.4, year: 2023, type: "movie" }
            ],
            tv: [
                { id: 110, title: "TV Show 1", poster: "https://dummyimage.com/200x300/ff006e/ffffff&text=TV+1", rating: 8.6, year: 2023, type: "tv" }
            ]
        };

        return fallbackMovies[category] || fallbackMovies.trending;
    }
}

// Export the API service
window.netflixAPI = new NetflixAPIService();
