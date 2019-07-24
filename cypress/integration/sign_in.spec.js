/// <reference types="Cypress" />

context('Sign In', () => {
  it('signs in an existing user', () => {
    cy.visit('http://0.0.0.0:3000/users/sign_in')

    cy.get('#user_email')
      .type('cypress@test.com')

    cy.get('#user_password')
      .type('test12')

    cy.get('input[type="submit"]')
      .click()

    cy.get('#error_explanation').should('not.exist')

    cy.get('.notice')
      .should('have.text', 'Signed in successfully.')

    cy.url()
      .should('eq', 'http://0.0.0.0:3000/')

    cy.wait(100)
  })
})
