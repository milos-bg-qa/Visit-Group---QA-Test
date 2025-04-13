import { test, expect } from "@playwright/test";
import { CalendarPage } from "../page-objects/CalendarPage";
import { SearchResultsPage } from "../page-objects/SearchResultsPage";

test.beforeEach(async ({ page }) => {
  // Open the URL
  await page.goto("https://www2.destinationgotland.se/en/accommodation");

  // Wait for 2 seconds to allow the cookie pop-up to show
  await page.waitForTimeout(2000);

  // Accept cookies
  const acceptCookiesButton = page.locator('button[aria-label="Godkänn alla"]');
  await acceptCookiesButton.click();
});

test("Select Date, Search Accommodations, and Complete Booking", async ({ page }) => {
  const calendarPage = new CalendarPage(page);

  // 1. Open calendar
  await calendarPage.openCalendar();

  // 2. Assert today's date is selected by default
  await calendarPage.assertTodayIsSelected();

  // 3. Select tomorrow's date and capture the day name + full date
  const { dayName, dateString } = await calendarPage.selectTomorrow();
  console.log(`Selected day is ${dayName}, ${dateString}`);

  // 4. Assert the day name under the input field is correct
  await calendarPage.assertDayNameUnderField(dayName);

  // 5. Assert if the selected date is in the current or next month
  const selectedMonth = await calendarPage.assertSelectedDateMonth();
  console.log(`Picked date is in the ${selectedMonth} month.`);

  // 6. Verify that 2 adults is selected by default in the dropdown
  const adultsDropdown = page.locator("#cb_numadults1");
  const selectedAdultsValue = await adultsDropdown.inputValue();
  expect(selectedAdultsValue).toBe("2");
  console.log(`${selectedAdultsValue} adults are selected`);

  // 7. Click the "Search" button
  const searchButton = page.locator("#CB_SearchButton");
  await searchButton.click();

  // Wait for the search results page to load
  await page.waitForURL(
    "https://www2.destinationgotland.se/en/accommodationsearch/search",
    {
      timeout: 10000,
    }
  );

  const searchResultsPage = new SearchResultsPage(page);

  // 8. Get and click the first accommodation, and store its name
  const selectedAccommodationName =
    await searchResultsPage.selectFirstAccommodationAndCaptureName();

  // 9. Book the accommodation
  await searchResultsPage.bookAccommodation();

  // 10. Verify that the user is redirected to the basket page
  await expect(page).toHaveURL("https://www2.destinationgotland.se/en/basket");
  await expect(page).toHaveTitle("Basket Destination Gotland");

  // 11. Verify that the correct accommodation is added to the basket
  const bookedAccommodation = page.locator("h2 > a");
  await expect(bookedAccommodation).toContainText(selectedAccommodationName);
});
