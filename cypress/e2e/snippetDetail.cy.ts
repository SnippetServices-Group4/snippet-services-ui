describe('Add snippet tests', () => {
  const AUTH0_USERNAME = Cypress.env("AUTH0_USERNAME");
  const AUTH0_PASSWORD = Cypress.env("AUTH0_PASSWORD");
  beforeEach(() => {
    cy.loginToAuth0 (
        AUTH0_USERNAME,
        AUTH0_PASSWORD
    )
    cy.intercept('GET', "/permissions/user/getAll", {
      statusCode: 200,
    }).as("getUser")
    cy.intercept('GET', "/snippets/snippets/getAll").as("getSnippets")

    cy.visit("/")

    cy.wait("@getSnippets")
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').click();
    cy.wait("@getUser");
  })

  it('Can share a snippet', () => {
    cy.get('[aria-label="Share"]').click();
    cy.get('.MuiAutocomplete-input').click({ force: true }); // Open the dropdown by clicking the input field
    cy.get('.MuiAutocomplete-input').type('S'); // Type the user's name
    cy.wait(500); // Wait for the dropdown options to load
    cy.get('.MuiAutocomplete-input').type('{downarrow}'); // Press the down arrow key
    cy.get('.MuiAutocomplete-input').type('{enter}'); // Press the enter key
    cy.get('.css-sl0tgw .css-1akjk4o').click({ force: true }); // Ensure the correct selector for the Share button
    cy.wait(2000);
  });

  it('Can format snippets', function() {
    cy.get('[data-testid="ReadMoreIcon"] > path').click();
  });

  it('Can save snippets', function() {
    cy.get('.css-10egq61 > .MuiBox-root > div > .npm__react-simple-code-editor__textarea').click();
    cy.get('.css-10egq61 > .MuiBox-root > div > .npm__react-simple-code-editor__textarea').type("Some new line");
    cy.get('[data-testid="SaveIcon"] > path').click();
  });

  it('Can delete snippets', function() {
    cy.get('[data-testid="DeleteIcon"] > path').click({ force: true });
    cy.get('.css-1ys8sim').click({ force: true }); // Press the DELETE button
  });
})
