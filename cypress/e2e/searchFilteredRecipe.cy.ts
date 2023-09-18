describe('Search for a filtered recipe', () => {
  it('Logs inn and searches for a filtered recipe', () => {
    cy.visit('https://cookease-frontend.herokuapp.com')

    cy.url().should('include', '/login')

    cy.get('#email').type('me@gmail.com')
    cy.get('#password').type('iamsogreat')

    cy.get('.w-50.mt-4').click();

    cy.contains('Filter').click();

    cy.get('#srch').type('Chicken')
    cy.get('#diff_option_1').click()
    cy.contains("Save").click()

  })
})