import { expect, test } from "@playwright/test";
import { LeftMenuPageObject } from "../page-object/left-menu";
import { SmartTable } from "../page-object/smart-table";
import { table } from "console";
import { Pagination } from "../page-object/components/smart-table-pager";

test("simple test", async ({ page }) => {
  await page.goto("http://localhost:4200");
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  const checkBoxes = page.getByRole("checkbox");
  for (const box of await checkBoxes.all()) {
    await box.check({ force: true });
    await expect(box).toBeChecked();
  }
  // const arr = await checkBoxes.all();
  // arr.forEach(async (box)=>{
  //     await box.check({force: true});
  //     await expect(box).toBeChecked();
  // })
});

test("menu test", async ({ page }) => {
  const leftMenu = new LeftMenuPageObject(page);
  await page.goto("http://localhost:4200");
  await leftMenu.openLeftMenu(["Tables", "Smart Table"]);
  await leftMenu.page.waitForTimeout(2000);
});

test("smart table test", async ({ page }) => {
  const leftMenu = new LeftMenuPageObject(page);
  await page.goto("http://localhost:4200");
  await leftMenu.openLeftMenu(["Tables", "Smart Table"]);
  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  const targetRow = page.locator("td").nth(1).getByText("11");
  await targetRow.click();
});

test("test select menu items", async ({ page }) => {
  const leftMenu = new LeftMenuPageObject(page);
  const smartTable = new SmartTable(page);
  await page.goto("http://localhost:4200");
  await leftMenu.openLeftMenu(["Tables & Data", "Smart Table"]);
  await smartTable.sortByHeaderName("ID");
  await smartTable.sortByHeaderName("First Name");
  await smartTable.sortByHeaderName("Last Name");
  await smartTable.sortByHeaderName("Username");
  await smartTable.sortByHeaderName("E-mail");
  await smartTable.sortByHeaderName("ID");
  await smartTable.filter("ID", "11");
  await leftMenu.openDashboard();
  await leftMenu.openLeftMenu(["Tables & Data", "Smart Table"]);
  const t = await smartTable.getColumnValueFor1Row(3, 2);
  console.log(t);
  const allValuesForCell = smartTable.getAllRowValuesForColumn(1);
  console.log(await allValuesForCell.allTextContents());
  const tableData = await smartTable.getDataFromDisplayedTable();
  expect(tableData).toEqual(testData);
  // await leftMenu.openLeftMenu(['Charts','Echarts']);
  // await leftMenu.openDashboard();
  await leftMenu.page.waitForTimeout(2000);
});

test("test Pagination", async ({ page }) => {
  const leftMenu = new LeftMenuPageObject(page);
  const smartTable = new SmartTable(page);
  const pagination = new Pagination(page);
  await page.goto("http://localhost:4200");
  await leftMenu.openLeftMenu(["Tables & Data", "Smart Table"]);
  await pagination.selectPage("2");
  await page.screenshot({path: 'screenshot/test.png'});
  await page.waitForTimeout(2000);
});

const testData = [
  {
    " ID ": "1",
    " First Name ": "Mark",
    " Last Name ": "Otto",
    " Username ": "@mdo",
    " E-mail ": "mdo@gmail.com",
    " Age ": "28",
  },
  {
    " ID ": "2",
    " First Name ": "Jacob",
    " Last Name ": "Thornton",
    " Username ": "@fat",
    " E-mail ": "fat@yandex.ru",
    " Age ": "45",
  },
  {
    " ID ": "3",
    " First Name ": "Larry",
    " Last Name ": "Bird",
    " Username ": "@twitter",
    " E-mail ": "twitter@outlook.com",
    " Age ": "18",
  },
  {
    " ID ": "4",
    " First Name ": "John",
    " Last Name ": "Snow",
    " Username ": "@snow",
    " E-mail ": "snow@gmail.com",
    " Age ": "20",
  },
  {
    " ID ": "5",
    " First Name ": "Jack",
    " Last Name ": "Sparrow",
    " Username ": "@jack",
    " E-mail ": "jack@yandex.ru",
    " Age ": "30",
  },
  {
    " ID ": "6",
    " First Name ": "Ann",
    " Last Name ": "Smith",
    " Username ": "@ann",
    " E-mail ": "ann@gmail.com",
    " Age ": "21",
  },
  {
    " ID ": "7",
    " First Name ": "Barbara",
    " Last Name ": "Black",
    " Username ": "@barbara",
    " E-mail ": "barbara@yandex.ru",
    " Age ": "43",
  },
  {
    " ID ": "8",
    " First Name ": "Sevan",
    " Last Name ": "Bagrat",
    " Username ": "@sevan",
    " E-mail ": "sevan@outlook.com",
    " Age ": "13",
  },
  {
    " ID ": "9",
    " First Name ": "Ruben",
    " Last Name ": "Vardan",
    " Username ": "@ruben",
    " E-mail ": "ruben@gmail.com",
    " Age ": "22",
  },
  {
    " ID ": "10",
    " First Name ": "Karen",
    " Last Name ": "Sevan",
    " Username ": "@karen",
    " E-mail ": "karen@yandex.ru",
    " Age ": "33",
  },
];
