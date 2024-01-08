import CoinCard from ".";
import { act, fireEvent, render, screen } from "@testing-library/react";

describe("Renders CoinCard and conditionally renders different sections at appropriate times", () => {
  const mockProps = {
    asset: {
      time: new Date(),
      asset_id_quote: "BTC",
      rate: 10000,
    },
    index: 0,
    isFocused: false,
    setFocusedAsset: jest.fn(),
    updateFavourites: jest.fn(),
  };

  const { rerender } = render(<CoinCard {...mockProps} isFavourite={false} />);

  it("renders favourites button and changes colour when clicked", async () => {
    const favButton = await screen.findByTestId("button-fav");
    const favIcon = await screen.findByTestId("icon-fav");

    const notFavourite = favIcon.style.color;
    expect(notFavourite).toBe("rgb(36, 36, 38)");
    act(() => {
      fireEvent.click(favButton);
      rerender(<CoinCard {...mockProps} isFavourite />)
    });
    const favourited = favIcon.style.color;
    expect(favourited).toBe("yellow");
  });
});
