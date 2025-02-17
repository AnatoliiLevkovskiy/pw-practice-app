import { Locator, Page } from "@playwright/test";

export class Pagination {
  readonly page: Page;
  readonly rootElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rootElement = this.page.locator("ng2-smart-table-pager li");
  }

  async selectPage(pageNumber: string | number) {
    await this.rootElement.getByText(`${pageNumber}`, { exact: true }).click();
  }
}
