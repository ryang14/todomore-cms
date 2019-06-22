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

  it('Make sure list is empty', function () {
    cy.wait(500).get('.list[name="New list name"]').find('.item').should("not.exist");
  });
  
  it('Add an item', function () {
    cy.get('.list[name="New list name"]').find('.new-item').should('have.value', '');
    cy.get('.list[name="New list name"]').find('.new-item').type('New item name').should('have.value', 'New item name');
    cy.get('.list[name="New list name"]').find('.new-item').type('{enter}').should('have.value', '');
    cy.get('.list[name="New list name"]').contains('New item name');
  });

  it('Delete an item', function () {
    cy.get('.item[name="New item name"]').contains('button', '×').wait(500).click();
  });

  it('Make sure list is empty', function () {
    cy.wait(500).get('.list[name="New list name"]').find('.item').should("not.exist");
  });

  it('Delete a list', function () {
    cy.get('.list[name="New list name"]').contains('button', '×').wait(500).click();
    cy.get('.list[name="New list name"]').should("not.exist");
  });
});
