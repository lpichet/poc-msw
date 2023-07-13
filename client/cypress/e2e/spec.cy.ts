import { setGetUser, getThreeUsers, threeUsers, getUsersFail } from '../../src/mocks/handlers'

describe('POC MSW', () => {
  it('shoud display correctly', () => {
    cy.visit('/');
    cy.get('[data-testid="email-input"]').should('exist');
    cy.get('[data-testid="submit-input"]').should('exist');
  })


  it('shoud display 2 users', () => {
    cy.visit('/');
    cy.get('[data-testid="user-list"]').find('li').should('have.length', 2);
    cy.get('[data-testid="error-message"]').should('not.exist');
  })

  it('shoud display 3 users', () => {
    cy.interceptRequest([setGetUser(getThreeUsers)]);
    cy.visit('/');
    cy.get('[data-testid="user-list"]').find('li').should('have.length', 3);
    cy.get('[data-testid="error-message"]').should('not.exist');
  })

  it('shoud display error message when request fails', async () => {
    cy.interceptRequest([setGetUser(getUsersFail)]);
    cy.visit('/');
    cy.get('[data-testid="user-list"]').find('li').should('have.length', 0);
    cy.get('[data-testid="error-message"]').should('exist');
  })
})