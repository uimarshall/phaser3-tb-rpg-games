import Model from "../src/helpers/Model";

describe("The scores should be set and read", () => {
	it("Should read the score", () => {
		Model.score = 30;
		expect(Model.score).toBe(30);
	});

	it("Should set the score", () => {
		Model.score = 50;
		expect(Model.score).toBe(50);
	});
	it("Should set the right score", () => {
		Model.score = 80;
		expect(Model.score).not.toBe(100);
	});
});
