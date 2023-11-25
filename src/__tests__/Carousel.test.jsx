import { expect, test } from "vitest";
import { render } from "@testing-library/react";
// import { StaticRouter } from "react-router-dom/server";
import Carousel from "../Carousel";

test("change active(hero) carousel image", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);
  const hero = await carousel.findByTestId("hero");
  //make sure the default image is the first image
  expect(hero.src).toContain(images[0]);
  //make sure that any image can be clicked and it will change the hero image
  for (let i = 0; i < images.length; i++) {
    const image = await carousel.findByTestId(`thumbnail-image-${i}`);
    await image.click();
    expect(hero.src).toContain(images[i]);
    expect(Array.from(image.classList)).toContain("active");
  }
  carousel.unmount();
});
