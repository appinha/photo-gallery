import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  const setValueMock = vi.fn();
  const setErrorTextMock = vi.fn();
  const defaultProps = {
    title: "Title",
    placeholder: "placeholder",
    value: "",
    errorText: "errorText",
    setValue: setValueMock,
    setErrorText: setErrorTextMock,
  };

  it("renders the title", () => {
    render(<Input {...defaultProps} />);

    expect(screen.getByText("Title")).toBeDefined();
  });

  it("renders the placehodler", () => {
    render(<Input {...defaultProps} />);

    expect(screen.getByPlaceholderText("placeholder")).toBeDefined();
    expect(screen.getByDisplayValue("")).toBeDefined();
  });

  it("renders the value", async () => {
    render(<Input {...defaultProps} value="value" />);

    expect(screen.getByDisplayValue("value")).toBeDefined();
  });

  it("renders the error text", async () => {
    render(<Input {...defaultProps} errorText="error message" />);

    expect(screen.getByText("error message")).toBeDefined();
  });

  it("on value change, triggers the value setter callback with the new value", async () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByLabelText("Title");
    fireEvent.change(input, { target: { value: "another value" } });

    expect(setValueMock).toHaveBeenCalledTimes(1);
    expect(setValueMock).toHaveBeenCalledWith("another value");
  });

  it("on focus, triggers the error text setter callback to clear the error message", async () => {
    render(<Input {...defaultProps} errorText="error message" />);

    expect(screen.getByText("error message")).toBeDefined();

    const input = screen.getByLabelText("Title");
    fireEvent.focus(input);

    expect(setErrorTextMock).toHaveBeenCalledTimes(1);
    expect(setErrorTextMock).toHaveBeenCalledWith("");
  });
});
