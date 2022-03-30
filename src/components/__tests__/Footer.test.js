import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Footer from "../Footer";

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

it('has a text Copyright and Adey-abeba', () => {
    act(() => {
      render(<Footer />, container);
    });

    expect(container.textContent).toContain("Copyright");
    expect(container.textContent).toContain("Adey-Abeba");
});
