import { Page, Locator, expect } from "@playwright/test";

// Page Object Model for the Calendar widget
export class CalendarPage {
  page: Page;
  calendarTrigger: Locator;
  dateInputField: Locator;
  dayNameUnderField: Locator;
  calendar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.calendarTrigger = page.locator("#Citybreak_trigger_from");
    this.dateInputField = page.locator("#cb_form_datefrom");
    this.dayNameUnderField = page.locator("#cb_accommodation_datefrom_byline");
    this.calendar = page.locator(".ui-datepicker-calendar");
  }

  // Method to open the calendar
  async openCalendar() {
    await this.calendarTrigger.click();
  }

  // Method to assert that today's date is selected by default
  async assertTodayIsSelected() {
    const today = new Date();
    const todayDay = today.getDate();
    const todaySelected = this.page.locator(
      ".cb-ui-state-highlight.cb-ui-state-active"
    );
    await expect(todaySelected).toHaveText(todayDay.toString());
  }

  // Method to click tomorrow's date and return the day name and full date
  async selectTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tomorrowDay = tomorrow.getDate();

    // Get day name
    const tomorrowDayName = tomorrow.toLocaleString("en-US", {
      weekday: "long",
    });

    // Get full date
    const tomorrowDateString = tomorrow.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const tomorrowLocator = this.page.locator(
      `td.selen-cal-target-date-${tomorrowDay} a.cb-ui-state-default`
    );
    await expect(tomorrowLocator).toBeVisible({ timeout: 5000 });
    await tomorrowLocator.click();

    return {
      dayName: tomorrowDayName,
      dateString: tomorrowDateString,
    };
  }

  // Method to assert the day name under the input field
  async assertDayNameUnderField(expectedDayName: string) {
    await expect(this.dayNameUnderField).toHaveText(expectedDayName);
  }

  // Method to determine if the selected date is in the current or next month
  async assertSelectedDateMonth() {
    const activeDate = this.page.locator(
      "a.cb-ui-state-default.cb-ui-state-active"
    );
    await expect(activeDate).toBeVisible({ timeout: 5000 });

    const activeDateClass = await activeDate.getAttribute("class");
    return activeDateClass?.includes("cb-ui-priority-secondary")
      ? "next"
      : "current";
  }
}
