import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import Pet from "../Pet";

test("displays a default thumbnail", async () => {
  //used StaticRouter because we don't have a browser environment (we work with node environment)
  //wrap the component in a router because it uses the router (Link)
  const pet = render(
    <StaticRouter>
      <Pet />
    </StaticRouter>
  );
  const petThumbnail = await pet.findByTestId("pet-thumbnail"); // using test id making it easier to find the element and independent of the implementationS
  expect(petThumbnail.src).toContain("none.jpg");
  pet.unmount();
});

test("displays a non-default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet images={["1.jpg", "2.jpg", "3.jpg"]} />
    </StaticRouter>
  );
  const petThumbnail = await pet.findByTestId("pet-thumbnail");
  expect(petThumbnail.src).toContain("1.jpg");
  pet.unmount();
});
