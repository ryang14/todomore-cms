describe("Test posts", () => {
  beforeEach(() => {
    cy.visit("/blog");
  });

  it("Create a post", function() {
    cy.get(".new-post").should("have.value", "");
    cy.get(".new-post")
      .type("New post name")
      .should("have.value", "New post name");
    cy.get(".new-post")
      .type("{enter}")
      .should("have.value", "");
    cy.contains("New post name");
  });

  it("Open post", function() {
    cy.contains("New post name").click();
    cy.url().should("contain", "http://localhost:3000/blog/");
    cy.contains("h1", "New post name");
  });

  it("Delete a post", function() {
    cy.contains("New post name").click();
    cy.url().should("contain", "http://localhost:3000/blog/");
    cy.wait(500);
    cy.contains("button", "Delete post").click();
    cy.url().should("eq", "http://localhost:3000/blog");
  });
});
