import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Results from "../Results";

test("renders without error", async () => {
  const { asFragment } = render(<Results pets={[]} />);
  expect(asFragment()).toMatchSnapshot();
});
