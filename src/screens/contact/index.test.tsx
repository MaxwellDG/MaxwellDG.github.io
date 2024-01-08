import { act, fireEvent, render, screen } from '@testing-library/react';
import Contact from './';

jest.useFakeTimers();

beforeEach(() => {
  render(<Contact />);
})

describe("Contact component", () => {
  it("renders without crashing", () => {
    const headings = screen.getAllByRole("heading")
    expect(headings[0]).toHaveTextContent("Contact us");
  });

  it('should allow user to input name, email, and message, and then submit form', async () => {
    const textboxes: HTMLInputElement[] = screen.getAllByRole('textbox')

    fireEvent.change(textboxes[0], { target: { value: 'John Doe' } });
    fireEvent.change(textboxes[1], { target: { value: 'john.doe@example.com' } });
    fireEvent.change(textboxes[2], { target: { value: 'Hello, this is a test message.' } });

    expect(textboxes[0].value).toBe('John Doe');
    expect(textboxes[1].value).toBe('john.doe@example.com');
    expect(textboxes[2].value).toBe('Hello, this is a test message.');

    const button = screen.getByRole('button')
    expect(button.textContent).toBe('Send');
    act(() => {
      fireEvent.click(button)
    })
    expect(button.textContent).toBe('Received!');
    expect(textboxes[0].value).toBe('');

    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(button.textContent).toBe('Send');
    jest.clearAllTimers()
  });
});
