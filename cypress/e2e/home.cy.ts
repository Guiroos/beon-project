describe("test home route", () => {
  it("should display the home page", () => {
    cy.visit("/");
    cy.get("#home-page").should("be.visible");
  });
});

describe("tests rendering components", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the search bar component", () => {
    cy.get("#search-bar").should("be.visible");
  });

  it("should render the search results", () => {
    cy.get("#search-results").should("be.visible").contains("100 livro(s) encontrado(s)");
  });

  it("should render the filter component", () => {
    cy.get("#filter-bar").should("be.visible");
  });

  it("should render the book table component", () => {
    cy.get("#book-table").should("be.visible");
  });
});

describe("tests in book table", () => {
  describe("tests in table", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("#book-table").should("be.visible");
    });

    it("should render 10 books in table", () => {
      cy.get("#table-body").find("tr").should("have.length", 10);
    });

    it("should have the Things Fall Apart as the first book", () => {
      cy.get("#table-body")
        .find("tr")
        .first()
        .find("td")
        .within(() => {
          cy.contains("Things Fall Apart");
          cy.contains("Chinua Achebe");
          cy.contains("English");
          cy.contains("1958");
          cy.get("#details-button").should("be.visible");
        });
    });

    it("should go the details page when the button is clicked", () => {
      cy.get("#book-table")
        .find("tbody")
        .find("tr")
        .first()
        .find("td")
        .within(() => {
          cy.get("#details-button").click();
        });
      cy.url().should("include", "/Things%20Fall%20Apart");
    });
  });

  describe("tests in pagination list", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("#book-table").should("be.visible");
    });

    it("should render 9 pagination li", () => {
      cy.get("#paginate-div").find("ul").find("li").should("have.length", 9);
    });

    it("should have the first page as selected", () => {
      cy.get("#paginate-div")
        .find("ul")
        .find("li:nth(1)")
        .should("have.class", "selected");
    });

    it("should go to the next page when the next button is clicked", () => {
      cy.get("#paginate-div").find("ul").find("li").last()
        .click();
      cy.get("#paginate-div").find("ul").find("li:nth(2)")
        .should("have.class", "selected");
    });

    it("should render 10 different books when the pagination button is clicked", () => {
      cy.get("#paginate-div").find("ul").find("li").last()
        .click();
      cy.get("#book-table")
        .find("tbody")
        .find("tr")
        .first()
        .find("td")
        .within(() => {
          cy.contains("The Decameron");
        });
    });
  });
});

describe("tests in search bar", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#search-bar").should("be.visible");
  });

  it("should search books named The Decameron", () => {
    cy.get("#search-bar-input").type("The Decameron");
    cy.get("#search-results").should("be.visible").contains("1 livro(s) encontrado(s)");
    cy.get("#table-body").find("tr").should("have.length", 1);
  });
  it("should search books by Fyodor Dostoevsky", () => {
    cy.get("#search-bar-input").type("Fyodor Dostoevsky");
    cy.get("#search-results").should("be.visible").contains("4 livro(s) encontrado(s)");
    cy.get("#table-body").find("tr").should("have.length", 4);
  });
  it("should search books in English", () => {
    cy.get("#search-bar-input").type("English");
    cy.get("#search-results").should("be.visible").contains("30 livro(s) encontrado(s)");
    cy.get("#table-body").find("tr").should("have.length", 10);
    cy.get("#paginate-div").find("ul").find("li").should("have.length", 5);
  });
  it("should search books in English between the years 1900 and 1950", () => {
    cy.get("#search-bar-input").type("English");
    cy.get("#initial-year").type("1900");
    cy.get("#final-year").type("1950");
    cy.get("#filter-button").click();
    cy.get("#search-results").should("be.visible").contains("9 livro(s) encontrado(s)");
    cy.get("#table-body").find("tr").should("have.length", 9);
    cy.get("#paginate-div").find("ul").find("li").should("have.length", 3);
  });
});

describe("tests in filter", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#filter-bar").should("be.visible");
  });
  it("should filter books between the years 1000 and 2000 and no search", () => {
    cy.get("#initial-year").type("1000");
    cy.get("#final-year").type("1500");
    cy.get("#filter-button").click();
    cy.get("#search-results").should("be.visible").contains("8 livro(s) encontrado(s)");
  });
  it("should filter books between the years 1000 and 2000 with search", () => {
    cy.get("#initial-year").type("1000");
    cy.get("#final-year").type("1500");
    cy.get("#filter-button").click();
    cy.get("#search-bar-input").type("The");
    cy.get("#search-results").should("be.visible").contains("5 livro(s) encontrado(s)");
  });
});
