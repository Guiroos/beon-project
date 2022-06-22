describe("test book details route", () => {
  it("should display the book details page", () => {
    cy.visit("/Things%20Fall%20Apart");
    cy.get("#details-page-0").should("be.visible");
  });
});

describe("test in tags", () => {
  beforeEach(() => {
    cy.visit("/Things%20Fall%20Apart");
    cy.get("#details-page-0").should("be.visible");
  });
  describe("should display all the tags from Things Fall Apart book", () => {
    it("should display the title", () => {
      cy.get("#book-title").should("be.visible").contains("Things Fall Apart");
    });

    it("should display the image", () => {
      cy.get("#book-image").should("be.visible").contains("images/things-fall-apart.jpg");
    });

    it("should display the author", () => {
      cy.get("#book-author").should("be.visible").contains("Chinua Achebe");
    });

    it("should display the published year", () => {
      cy.get("#book-published-year").should("be.visible").contains("1958");
    });

    it("should display the country", () => {
      cy.get("#book-country").should("be.visible").contains("Nigeria");
    });

    it("should display the language", () => {
      cy.get("#book-language").should("be.visible").contains("English");
    });

    it("should display the total pages", () => {
      cy.get("#book-total-pages").should("be.visible").contains("209");
    });

    it("should display the link", () => {
      cy.get("#book-link").should("be.visible").contains("Mais sobre o livro").should("have.attr", "href", "https://en.wikipedia.org/wiki/Things_Fall_Apart\n");
    });
  });

  describe("test in book link for info", () => {
    it("should go to wikipedia website", () => {
      cy.get("#book-link").invoke("removeAttr", "target").click();
      cy.url().should("include", "https://en.wikipedia.org/wiki/Things_Fall_Apart");
    });
  });
});
