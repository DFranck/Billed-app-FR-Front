/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import store from "../__mocks__/store.js";

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    let newInstance;
    const email = "employee@test.tld";

    beforeEach(() => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      newInstance = new NewBill({
        document: document,
        onNavigate: jest.fn(),
        store: store,
      });
      localStorage.setItem("user", JSON.stringify({ email }));
    });

    test("Then the title should be 'Envoyer une note de frais'", () => {
      const titleContainer = document.querySelector(".content-title");
      const title = titleContainer.textContent;
      expect(title).toBe(" Envoyer une note de frais ");
      const form = screen.getByTestId("form-new-bill");
      expect(form).toBeVisible();
    });

    it("Then handleChangeFile should return fileName, fileUrl and billId", async () => {
      const mockedChangeFileEvent = {
        preventDefault: jest.fn(),
        target: {
          value: "C:\\fakepath\\test.jpg",
        },
      };
      await newInstance.handleChangeFile(mockedChangeFileEvent);
      expect({
        fileUrl: newInstance.fileUrl,
        fileName: newInstance.fileName,
        billId: newInstance.billId,
      }).toEqual({
        fileUrl: "https://localhost:3456/images/test.jpg",
        fileName: "test.jpg",
        billId: "1234",
      });
    });
    it("Then handleSubmit should match fakeBill", () => {
      const expectedBill = {
        email: "employee@test.tld",
        type: "Transports",
        name: "Test Name Value",
        amount: 521,
        date: "05/10/2023",
        vat: 27,
        pct: 11,
        commentary: "Test commentary here! ! ! ! ! ! # # # #",
        fileUrl: "Testfakeimg/pasici.jpg",
        fileName: "Test fake img",
        status: "pending",
      };
      const mockedSubmitEvent = {
        preventDefault: jest.fn(),
        target: {
          querySelector: jest.fn().mockImplementation((selector) => {
            switch (selector) {
              case 'select[data-testid="expense-type"]':
                return { value: "Transports" };
              case 'input[data-testid="expense-name"]':
                return { value: "Test Name Value" };
              case 'input[data-testid="amount"]':
                return { value: 521 };
              case 'input[data-testid="datepicker"]':
                return { value: "05/10/2023" };
              case 'input[data-testid="vat"]':
                return { value: 27 };
              case 'input[data-testid="pct"]':
                return { value: 11 };
              case 'textarea[data-testid="commentary"]':
                return { value: "Test commentary here! ! ! ! ! ! # # # #" };
              default:
                return null;
            }
          }),
        },
      };

      newInstance.fileUrl = "Testfakeimg/pasici.jpg";
      newInstance.fileName = "Test fake img";

      newInstance.updateBill = (bill) => {
        newInstance.testBill = bill;
      };
      newInstance.handleSubmit(mockedSubmitEvent);

      expect(newInstance.testBill).toEqual(expectedBill);
    });
  });
});
