# QA Automation Assignment

This project contains two automated test cases written using [Playwright](https://playwright.dev/) for end-to-end testing of a booking website. The goal was to simulate a user journey that includes selecting dates, performing a search, and adding an accommodation to the cart.

---

## Test Cases Overview

### 1. **Date Selection & Search Trigger**
- Opens the website
- Accepts cookies
- Selects check-in date via date picker
- Clicks the “Search” button to initiate a search

### 2. **Select & Add to Cart**
- Waits for the search results to load
- Clicks the first accommodation in the list
- Navigates to the details page
- Adds the accommodation to the cart

---

## 🔧 Tech Stack

- **Language:** JavaScript
- **Framework:** Playwright
- **Tools Used:** VS Code, Git, GitHub
- **OS:** Windows 11

---

## 🛠 How to Run the Tests

1. **Install dependencies**  
   Run this in the terminal:
   ```bash
   npm install