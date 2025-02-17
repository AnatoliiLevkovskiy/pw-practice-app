import { expect, test as base } from "@playwright/test";
import { LeftMenuPageObject } from "../page-object/left-menu";
import { Pagination } from "../page-object/components/smart-table-pager";

type MyFixture = {
  leftMenu: LeftMenuPageObject;
} & { someConst: string };

const test = base.extend<MyFixture>({
  leftMenu: async ({ page }, use) => {
    await use(new LeftMenuPageObject(page));
  },
  someConst: ["my const", { option: true }],
});

// test.use({ someConst: "const from test use({const:'value'})" });
test("simple test", async ({ page, someConst }) => {
  await page.goto("http://localhost:4200");
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  const checkBoxes = page.getByRole("checkbox");
  for (const box of await checkBoxes.all()) {
    await box.check({ force: true });
    await expect(box).toBeChecked();
  }
  console.log(someConst);
});

test("test Pagination", async ({ page, leftMenu }) => {
  const pagination = new Pagination(page);
  await page.goto("http://localhost:4200");
  await leftMenu.openLeftMenu(["Tables & Data", "Smart Table"]);
  await pagination.selectPage("2");
  await page.screenshot({ path: "screenshot/test.png" });
  await page.waitForTimeout(2000);
});