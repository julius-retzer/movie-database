describe('Movie Details', () => {
  beforeEach(() => {
    // Visit the homepage and search for a movie
    cy.visit('/');
    cy.get('[data-testid="search-input"]').type('Batman');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="movie-card"]').first().find('button').contains('View Details').click();
  });

  it('should display movie details correctly', () => {
    // Verify the movie details page elements
    cy.get('[data-testid="movie-details"]').should('exist');

    // Check for movie title
    cy.get('[data-testid="movie-details"]').find('h1, h2, h3, h4, h5, h6').should('exist');

    // Check for movie poster
    cy.get('[data-testid="movie-details"]').find('img').should('exist');
  });

  it('should allow adding a movie to favorites', () => {
    // Click the favorite button
    cy.get('[data-testid="movie-details"]').find('button[aria-label^="Add to"]').click();

    // Verify the button changes to indicate the movie is favorited
    cy.get('[data-testid="movie-details"]')
      .find('button[aria-label^="Remove from"]')
      .should('exist');
  });
});
