/// <reference types="Cypress" />

context('Session', () => {
  it('creates new user', () => {
    cy.visit('http://0.0.0.0:3000/users/sign_up')

    cy.get('#user_email')
      .type('cypress@test.com')

    cy.get('#user_password')
      .type('test12')

    cy.get('#user_password_confirmation')
      .type('test12')

    cy.get('input[type="submit"]')
      .click()

    cy.get('#error_explanation').should('not.exist')

    cy.get('.notice')
      .should('have.text', 'Welcome! You have signed up successfully.')

    cy.url()
      .should('eq', 'http://0.0.0.0:3000/')

    cy.wait(1000)
  })

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

    cy.wait(1000)
  })
})
