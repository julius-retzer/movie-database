describe('Favorites', () => {
  beforeEach(() => {
    // Clear localStorage to start with a clean state
    cy.clearLocalStorage();

    // Visit the homepage, search for a movie, and add it to favorites
    cy.visit('/');
    cy.get('[data-testid="search-input"]').type('Batman');
    cy.get('[data-testid="search-button"]').click();

    // Add the first movie to favorites
    cy.get('[data-testid="movie-card"]').first().find('button[aria-label^="Add to"]').click();
  });

  it('should display favorites on the favorites page', () => {
    // Navigate to favorites page
    cy.visit('/favorites');

    // Verify that at least one movie card is displayed
    cy.get('.MuiCard-root').should('have.length.at.least', 1);
  });

  it('should allow removing a movie from favorites', () => {
    // Navigate to favorites page
    cy.visit('/favorites');

    // Verify we have at least one favorite movie
    cy.get('.MuiCard-root').should('exist');

    // Remove the first movie from favorites
    cy.get('.MuiCard-root').first().contains('button', 'Remove').click();

    // Verify that the empty state message is displayed
    cy.contains("You haven't added any movies to your favorites yet").should('be.visible');
  });

  it('should navigate to movie details from favorites page', () => {
    // Navigate to favorites page
    cy.visit('/favorites');

    // Click on the first movie card
    cy.get('.MuiCard-root').first().click();

    // Verify we've navigated to the details page
    cy.url().should('include', '/movie/');

    // Verify the movie details are displayed
    cy.get('[data-testid="movie-details"]').should('exist');
  });
});
