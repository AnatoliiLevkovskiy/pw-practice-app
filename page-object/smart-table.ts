import { BasePage } from "./basePage";

export class SmartTable extends BasePage {
  readonly tableTitle = this.page.locator("nb-card").getByText("Smart Table");
  readonly tableHeaders = this.page.locator("nb-card thead tr").first().locator("th");
  readonly searchRow = this.page.locator("nb-card thead tr").last();
  readonly searchField = this.searchRow.locator("th");
  readonly rows = this.page.locator("nb-card tbody tr");
  readonly gridCellLocator = this.rows.getByRole("cell");
  readonly tableCellLocator = this.page.getByRole("cell");

  async sortByHeaderIndex(index: number) {
    await this.tableHeaders.nth(index).click();
  }

  async sortByHeaderName(header: string) {
    // await this.tableHeaders.filter({ hasText: header }).click();
    const index = await this.getIndexOfHeader(header);
    await this.tableHeaders.nth(index).click();
    await this.page.waitForTimeout(100)
  }

  async filter(field: string, value: string) {
    await this.searchField
      .filter({ has: this.page.getByPlaceholder(field) })
      .locator("input")
      .fill(value);
  }

  async getIndexOfHeader(headerName: string) {
    const arrayOfHeadersTexts = await this.tableHeaders.all();
    // for (let i = 0; i < arrayOfHeadersTexts.length; i++) {
    //   if ((await arrayOfHeadersTexts[i].innerText()) == headerName) {
    //     return i;
    //   }
    // }
    let text: string;
    let result: number = null;
    for (const [i, head] of arrayOfHeadersTexts.entries()) {
      text = (await head.textContent()).toLowerCase().trim();
      if (text == headerName.toLowerCase().trim()) {
        result = i;
        return result;
      }
    }
    if (result === null) throw new Error(`Can nor find "${text}" .`);
    else return result;
  }

  async getColumnValueFor1Row(index: number, rowIndex: number = 0) {
    let gridCell = this.rows.nth(rowIndex).locator(this.tableCellLocator);
    let cellValue = await gridCell.nth(index).textContent();
    return cellValue;
  }

  getAllRowValuesForColumn(columnIndex) {
    return this.rows.locator(`td:nth-child(${columnIndex + 1})`);
  }
  /**
   * Loops through the rows of the displayed table and extracts information matched with each columns header
   * as key-value pairs.
   */
  async getDataFromDisplayedTable() {
    const allRows = await this.rows.all();
    const allHeaders = await this.tableHeaders.all();
    const result = [];
    for (const row of allRows) {
      let rowDate = {};
      let rowColumns = await row.locator(this.tableCellLocator).all();
      for (let i = 1; i < rowColumns.length; i++) {
        let header = await allHeaders[i].textContent();
        rowDate[header] = await rowColumns[i].innerText();
      }

      result.push(rowDate);
    }
    return result;
  }
}
