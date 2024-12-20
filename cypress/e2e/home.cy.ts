describe('Home', () => {
  const FRONTEND_URL = Cypress.env("FRONTEND_URL");
  const AUTH0_USERNAME = Cypress.env("AUTH0_USERNAME");
  const AUTH0_PASSWORD = Cypress.env("AUTH0_PASSWORD");
  const token = Cypress.env('auth0_token');
  beforeEach(() => {
    cy.loginToAuth0(
        AUTH0_USERNAME,
        AUTH0_PASSWORD
    )
  })
  before(() => {
    process.env.FRONTEND_URL = Cypress.env("FRONTEND_URL");
    process.env.BACKEND_URL = Cypress.env("BACKEND_URL");
  })
  it('Renders home', () => {
    cy.visit(FRONTEND_URL)
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiTypography-h6').should('have.text', 'Printscript');
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').should('be.visible');
    cy.get('.css-9jay18 > .MuiButton-root').should('be.visible');
    cy.get('.css-jie5ja').click();
    /* ==== End Cypress Studio ==== */
  })

  // You need to have at least 1 snippet in your DB for this test to pass
  it('Renders the first snippets', () => {
    cy.visit(FRONTEND_URL)
    const first10Snippets = cy.get('[data-testid="snippet-row"]')

    first10Snippets.should('have.length.greaterThan', 0)

    first10Snippets.should('have.length.lessThan', 10)
  })

  it('Can creat snippet find snippets by name', () => {
    cy.visit(FRONTEND_URL)
    const snippetData = {
      name: "Test name",
      content: "print(1)",
      version: "1.1",
      language: "printscript",
      extension: ".prs"
    }

    cy.intercept('GET', "/snippets/snippets/getAll", (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(200);
      });
    }).as('getSnippets');
    cy.wait(500);

    cy.request({
      method: 'POST',
      url: '/snippets/snippets/create', // Adjust if you have a different base URL configured in Cypress
      body: snippetData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      failOnStatusCode: false // Optional: set to true if you want the test to fail on non-2xx status codes
    }).then((response) => {
      expect(response.status).to.eq(201);

      expect(response.body.data.snippet.name).to.eq(snippetData.name)
      expect(response.body.data.snippet.content).to.eq(snippetData.content)
      expect(response.body.data.snippet.language.langName).to.eq(snippetData.language)
      expect(response.body.data.snippet).to.haveOwnProperty("snippetId")

      cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').clear();
      cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').type(snippetData.name + "{enter}");

      cy.wait("@getSnippets");
      cy.contains(snippetData.name).should('exist');
    })
  })
})
