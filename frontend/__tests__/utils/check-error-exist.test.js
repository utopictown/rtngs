import checkIfErrorExist from "../../utils/check-error-exist";

test("should return correct result", () => {
  const mockData = {
    a: "",
    b: "",
  };
  const res = checkIfErrorExist(mockData);
  expect(res).toBe(false);
});
