describe('Movie Search', () => {
  beforeEach(() => {
    // Visit the homepage/search page before each test
    cy.visit('/');
  });

  it('should display the search input and button', () => {
    // Check if search input exists
    cy.get('[data-testid="search-input"]').should('exist');

    // Check if search button exists
    cy.get('[data-testid="search-button"]').should('exist');
  });

  it('should search for movies and display results', () => {
    // Type a search term
    cy.get('[data-testid="search-input"]').type('Batman');

    // Click the search button
    cy.get('[data-testid="search-button"]').click();

    // Wait for results to load and verify they appear
    cy.get('[data-testid="movie-card"]').should('be.visible');
    cy.get('[data-testid="movie-card"]').should('have.length.at.least', 1);

    // Verify that search results contain the search term (case insensitive)
    cy.get('[data-testid="movie-title"]')
      .first()
      .invoke('text')
      .should('match', /batman/i);
  });

  it('should navigate to movie details when clicking on a movie', () => {
    // Search for movies
    cy.get('[data-testid="search-input"]').type('Batman');
    cy.get('[data-testid="search-button"]').click();

    // Wait for results and click on the 'View Details' button of the first movie
    cy.get('[data-testid="movie-card"]').first().find('button').contains('View Details').click();

    // Verify we've navigated to the details page
    cy.url().should('include', '/movie/');

    // Verify the movie details are displayed
    cy.get('[data-testid="movie-details"]').should('exist');
  });
});
