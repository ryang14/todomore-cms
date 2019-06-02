describe('Test lists', () => {
  beforeEach(() => {
    cy.visit('/lists');
  });

  it('Create a list', function () {
    cy.get('.new-list').should('have.value', '');
    cy.get('.new-list').type('New list name').should('have.value', 'New list name');
    cy.get('.new-list').type('{enter}').should('have.value', '');
    cy.contains('New list name');
  });

  it('Delete a list', function () {
    cy.get('.list[name="New list name"]').contains('button', '×').wait(100).click();
    cy.get('.list[name="New list name"]').should("not.exist");
  });
});
