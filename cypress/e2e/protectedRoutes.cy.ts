describe('Protected routes test', () => {
  const AUTH0_USERNAME = Cypress.env("AUTH0_USERNAME");
  const AUTH0_PASSWORD = Cypress.env("AUTH0_PASSWORD");
  const auth0Url = `https://${Cypress.env('auth0_domain')}`;
  it('should redirect to login when accessing a protected route unauthenticated', () => {
    // Visit the protected route
    cy.visit('/');

    cy.wait(1000)

    cy.origin(auth0Url, () => {
      // Check if the URL is redirected to the login page
      cy.url().should('include', '/login');
    });
  });

  it('should display login content', () => {
    // Visit the login page
    cy.visit('/');

    // Look for text that is likely to appear on a login page
    cy.origin(auth0Url, () => {
      // Look for text that is likely to appear on a login page
      cy.contains('Log in').should('exist');
      cy.contains('Password').should('exist'); // Adjust the text based on actual content
    });
  });

  it('should not redirect to login when the user is already authenticated', () => {
    cy.loginToAuth0(
        AUTH0_USERNAME,
        AUTH0_PASSWORD
    )

    cy.visit('/');

    cy.wait(1000)

    // Check if the URL is redirected to the login page
    cy.url().should('not.include', '/login');
  });

})
