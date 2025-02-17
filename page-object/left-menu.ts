import { BasePage } from "./basePage";

export class LeftMenuPageObject extends BasePage {
  private readonly root = this.page.locator("nb-menu");
  private readonly menuItemForums = this.page.getByTitle("Forums");
  private readonly dashboardMenuItem = this.page.getByTitle('IoT Dashboard');

  async openLeftMenu([menuGroup, menuItem]: itemPath) {
    const menuGroupLocator = this.root.getByTitle(menuGroup, {exact: true});
    if ((await menuGroupLocator.getAttribute("aria-expanded")) === "false") {
      await menuGroupLocator.click();
      await this.page.waitForTimeout(100);
    }

    await this.root
      .locator("li")
      .filter({ has: this.page.locator("ul").getByText(menuItem) })
      .click();
      await this.page.waitForTimeout(100);
  }

  async openDatepicker() {
    await this.menuItemForums.click();
  }

  async openDashboard() {
    await this.dashboardMenuItem.click();
  }
}

type itemPath = [menuGroup: string, menuItem: string];
