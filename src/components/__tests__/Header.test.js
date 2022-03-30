import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

import Header from "../Header";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('has a text Adey-abeba', () => {
    act(() => {
      render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>, container);
    });

    expect(container.textContent).toContain("Adey-Abeba");
});
