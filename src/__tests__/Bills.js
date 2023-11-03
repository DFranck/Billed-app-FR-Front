/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/dom";
import BillsUI from "../views/BillsUI.js";
import { bills } from "../fixtures/bills.js";
import { ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store.js";
import Bills from "../containers/Bills.js";
import { formatDate, formatStatus } from "../app/format.js";
import $ from 'jquery'
global.$ = global.jQuery = $
import router from "../app/Router.js";

describe("Given I am connected as an employee", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
      const root = document.createElement("div");
      root.setAttribute("id", "root");
      document.body.append(root);
      router();
      window.onNavigate(ROUTES_PATH.Bills);
      await waitFor(() => screen.getByTestId("icon-window"));
      const windowIcon = screen.getByTestId("icon-window");

      expect(windowIcon).toHaveClass("active-icon");
    });
    test("Then bills should be ordered from earliest to latest", () => {
      let billsTmp = Object.assign([], bills);
      document.body.innerHTML = BillsUI({ data: billsTmp });
      const dates = screen
        .getAllByText(
          /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i
        )
        .map((a) => a.innerHTML);
      const antiChrono = (a, b) => (a < b ? 1 : -1);
      const datesSorted = [...dates].sort(antiChrono);
      expect(dates).toEqual(datesSorted);
    });
    it("Then getBills should return expectedBills", async () => {
      const expectedBills = bills.map((bill) => ({
        ...bill,
        date: formatDate(bill.date),
        status: formatStatus(bill.status),
      }));
      const billsInstance = new Bills({
        document: document,
        onNavigate: jest.fn(),
        store: mockStore,
        localStorage: localStorageMock,
      });
      const instanceBill = await billsInstance.getBills();
      expect(instanceBill).toEqual(expectedBills);
    });
    it("should handleClickIconEye work correctly", () => {
      let billsTest = Object.assign([], bills);
      document.body.innerHTML = BillsUI({ data: billsTest });
      const billInstance = new Bills({
        document: document,
        onNavigate: jest.fn(),
        store: mockStore,
        localStorage: localStorageMock,
      });
      $.fn.modal = jest.fn(function(action){
        if(action==='show')
        this.addClass('show')
      })
      const iconEye = document.querySelectorAll(`div[data-testid="icon-eye"]`);
      iconEye.forEach((icon) => {
        icon.addEventListener("click", () => billInstance.handleClickIconEye(icon));
        console.log(icon);
      });
      expect(iconEye).toHaveLength(4)
      iconEye[0].click()
      const modalFile = document.getElementById('modaleFile')
      expect(modalFile).toHaveClass('show')
      const billUrl = iconEye[0].getAttribute("data-bill-url");
      expect(billUrl).toBe('https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a')
    });
    it("should getBills return 404 errors", async () => {
      const mockedStoreError = {
        bills() {
          return {
            list() {
              return Promise.reject({
                response: { status: 404 },
              });
            },
          };
        },
      };

      const billsInstance = new Bills({
        document: document,
        onNavigate: jest.fn(),
        store: mockedStoreError,
        localStorage: localStorageMock,
      });
      await expect(billsInstance.getBills()).rejects.toThrow("Not Found");
    });
    it("should getBills return 500 error", async () => {
      const mockedStoreError500 = {
        bills() {
          return {
            list() {
              return Promise.reject({
                response: { status: 500 },
              });
            },
          };
        },
      };
      const billsInstance = new Bills({
        document: document,
        onNavigate: jest.fn(),
        store: mockedStoreError500,
        localStorage: localStorageMock,
      });

      await expect(billsInstance.getBills()).rejects.toThrow(
        "Internal Server Error"
      );
    });
  });
});
