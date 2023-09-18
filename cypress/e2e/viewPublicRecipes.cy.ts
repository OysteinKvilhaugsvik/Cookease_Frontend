describe('View public recipes', () => {
  it('Tries to view public recipes without logging in', () => {

    cy.visit('https://cookease-frontend.herokuapp.com')

    cy.contains('Search').click();

    cy.url().should('include', '/search')

    //Finds the first recipeCard and clicks it
    cy.get('.card-footer').first().click()
  })
})