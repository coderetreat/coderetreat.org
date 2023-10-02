describe("Events are shown on the front page", () => {
  let testEvent;
  before(() => {
    cy.readFile("_data/events/TEST_EVENT.json").then((f) => (testEvent = f));
  });

  it("lists the test event", () => {
    cy.visit("http://localhost:4000");

    cy.get("#upcoming-events > div").as("upcomingEvents");
    cy.get("@upcomingEvents")
      .find(".lead")
      .scrollIntoView()
      .should((s) => {
        const text = s.text();
        expect(text).to.match(/view all \d+ events/);

        const [_, numberOfEvents] = /view all (\d+) events/.exec(text);
        expect(Number(numberOfEvents)).to.be.greaterThan(0);
      });

    cy.get("@upcomingEvents")
      .contains(testEvent.title)
      .parents("tr")
      .as("eventRow");

    cy.get("@eventRow").should("contain.text", "Virtual");
    cy.get("@eventRow").find("a").should("have.attr", "href", testEvent.url);
  });

  it("lists the event on the event page", () => {
    cy.visit("http://localhost:4000");
    cy.get("#upcoming-events > div > .lead").find("a").click();

    cy.get(".card")
      .contains(testEvent.title)
      .parents(".card")
      .as("testEventCard");

    cy.get("@testEventCard")
      .find(".card-header")
      .should("contain.text", "VIRTUAL")
      .should("contain.text", testEvent.date.start.substring(0, 10))
      .should("contain.text", testEvent.date.start.substring(11, 16));

    cy.get("@testEventCard")
      .find(".card-body:visible")
      .should("contain.text", testEvent.title)
      .should("contain.text", testEvent.spoken_language)
      .should("contain.text", "Ensemble");

    cy.get("@testEventCard").find(".card-header").click();

    cy.get("@testEventCard").should("contain.text", testEvent.description);
    cy.get("@testEventCard")
      .find("a")
      .contains("Sign-Up")
      .should("have.attr", "href", testEvent.url);
  });
});
