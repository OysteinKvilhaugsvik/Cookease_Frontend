describe('Create a new recipe', () => {
  it('Logs in with an existing user and reates a new recipe', () => {
    
    cy.intercept('POST', '**/recipes/**', (req) => {
      req.reply({ statusCode: 200, body: {} })
    }).as('createRecipe')

    cy.visit('https://cookease-frontend.herokuapp.com')

    cy.url().should('include', '/login')

    cy.get('#email').type('me@gmail.com')
    cy.get('#password').type('iamsogreat')

    cy.get('.w-50.mt-4').click();

    cy.contains('Create Recipe').click();

    cy.get('#recipeName').type('Chicken Fajitas')
    cy.get('#recipeDescription').type('Chicken Fajitas is simply a classic Tex-Mex dish that is quick and easy to make!')
    cy.get('select#visibility-select').select('Private')
    // cy.fixture('chicken-fajitas.jpg').then(fileContent => {
    //   cy.get('#imageUpload').attachFile({
    //     fileContent,
    //     fileName: 'chicken-fajitas.jpg',
    //     mimeType: 'image/jpeg'
    //   });
    // });
    cy.get('#tags-basic').type('Chicken{enter}').type('Fajitas{enter}')
    cy.get('select#difficulty-select').select('Medium')
    cy.get('#recipeHours').type('0')
    cy.get('#recipeMinutes').type('50')
    cy.get('#tags-basicIngredients').type('Chicken{enter}').type('Bell peppers{enter}')
                                    .type('Onion{enter}').type('Flour{enter}')

    cy.get('#recipeSteps').type('Cook the vegetables and chicken togeter in a pan')
    cy.contains('Add Step').click()
    cy.get('#recipeSteps').type('Add fajita seasoning and oil to the mix, and serve on tortillas')
    cy.contains('Add Step').click()
    cy.get('#recipeSteps').type('Enjoy!')
    cy.contains('Add Step').click()

    cy.contains('button', 'Create').click()

    cy.url().should('include', '/myrecipes')

  })
})