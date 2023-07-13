import { worker } from '../../src/mocks/browser';

let msw;
before(() => {
    msw = worker;
    cy.wrap(worker.start({onUnhandledRequest: 'bypass'}), { log: false})
})

Cypress.on('test:before:run', () => {
    if(!msw) return;

    msw.resetHandlers();
})

Cypress.Commands.add('interceptRequest', (handlers) => msw.resetHandlers(...handlers));