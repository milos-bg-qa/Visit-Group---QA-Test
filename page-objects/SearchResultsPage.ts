import { Page } from "@playwright/test";

// Page Object Model for the Search Results page
export class SearchResultsPage {
  constructor(private page: Page) {}

  /**
   * Selects the first accommodation in the search results,
   * captures and logs its name, then clicks the "Book Now" button.
   */
  async selectFirstAccommodationAndCaptureName(): Promise<string> {
    const firstAccommodation = this.page
      .locator(".Citybreak_ListingsAcc.cb-test-search-result")
      .first();

    // Get the accommodation name link inside the first result
    const nameAnchor = firstAccommodation.locator("a.fn");

    // Wait for the name element to be visible
    await nameAnchor.first().waitFor({ state: "visible", timeout: 5000 });

    const accommodationName = await nameAnchor.first().textContent();

    // Find and click the first "Book Now" button
    const firstBookNowButton = firstAccommodation
      .locator(
        ".Citybreak_Button.cb-btn.cb-btn-primary.cb_expandbutton.cb-test-book-now"
      )
      .first();

    await firstBookNowButton.click();

    // Log and return the accommodation name
    const name = accommodationName?.trim() || "Unknown";
    console.log(`Selected accommodation is: ${name}`);
    return name;
  }

  // Clicks a specific book button by its ID
  async bookAccommodation() {
    const bookButton = this.page.locator("#cb_alternative_book_16_P");
    await bookButton.click();
  }
}
