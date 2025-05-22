describe('Navigation', () => {
  it('should navigate between all main pages', () => {
    // Start at home page
    cy.visit('/');
    cy.url().should('include', '/');

    // Navigate to favorites page
    cy.contains('Favorites').click();
    cy.url().should('include', '/favorites');

    // Navigate back to home/search page
    cy.contains('Home').click();
    cy.url().should('match', /\/$/);
  });
});
