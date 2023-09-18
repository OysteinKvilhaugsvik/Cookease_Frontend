describe('Login and Sign up', () => {
  it('Tries to create a new user and then tries to log in', () => {

    //The user is already created, and this intercepts the creation of the same subsequest users
    cy.intercept('POST', '**/users', (req) => {
      req.reply({ statusCode: 200, body: {} })
    }).as('createUser')

    cy.visit('https://cookease-frontend.herokuapp.com')

    cy.contains('Sign up').click()

    cy.url().should('include', '/signup')

    cy.get('#usernameInput').type("Me")
    cy.get('#emailInput').type('me@gmail.com')
    cy.get('#passwordInput').type('iamsogreat')
    cy.get('#repeatPassword').type('iamsogreat')

    cy.contains('Register').click()

    cy.url().should('include', '/login')

    cy.get('#email').type('me@gmail.com')
    cy.get('#password').type('iamsogreat')

    cy.get('.w-50.mt-4').click();

    cy.url().should('include', '/search')

  })
})