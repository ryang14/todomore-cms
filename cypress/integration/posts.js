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

  it("Make sure post is empty", function() {
    cy.contains("New post name").click();
    cy.url().should("contain", "http://localhost:3000/blog/");
    cy.contains("h1", "New post name");
    cy.get('div[class="content"]').should("be.empty");
  });

  it("Edit post", function() {
    cy.contains("New post name").click();
    cy.url().should("contain", "http://localhost:3000/blog/");
    cy.contains("h1", "New post name");
    cy.wait(500);
    cy.contains("button", "Edit post").click();
    cy.get("trix-editor")
      .click()
      .type("New post content");
    cy.contains("button", "Save").click();
  });

  it("Make sure post has content", function() {
    cy.contains("New post name").click();
    cy.url().should("contain", "http://localhost:3000/blog/");
    cy.contains("h1", "New post name");
    cy.get('div[class="content"]').contains("New post content");
  });

  it("Delete a post", function() {
    cy.contains("New post name").click();
    cy.url().should("contain", "http://localhost:3000/blog/");
    cy.wait(500);
    cy.contains("button", "Delete post").click();
    cy.url().should("eq", "http://localhost:3000/blog");
  });
});
