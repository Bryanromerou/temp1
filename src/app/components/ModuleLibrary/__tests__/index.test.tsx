import React from "react";
import { render } from "@testing-library/react";

import ModuleLibrary from "../ModuleLibrary";

describe("<ModuleLibrary  />", () => {
  it("should match snapshot", () => {
    const loadingIndicator = render(<ModuleLibrary />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
