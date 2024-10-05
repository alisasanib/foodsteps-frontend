import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Posts from "./";
import userReducer, { UserState } from "store/slices/userSlice";
import { useFetch } from "hooks/useFetch";
import { Post } from "types/Post.dto";

jest.mock("../../hooks/useFetch");

describe("<Posts />", () => {
  const renderWithStore = (initialState: { user: UserState }) => {
    const store = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: initialState,
    });

    return render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );
  };

  test("should render loading spinner when posts are being fetched", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderWithStore({
      user: { activeUser: "1" },
    });

    expect(screen.getByTestId("posts-spinner")).toBeInTheDocument();
  });

  test("should render posts after fetching", async () => {
    const mockPosts: Post[] = [
      { id: 1, userId: 1, title: "Post 1", body: "Body of post 1" },
      { id: 2, userId: 1, title: "Post 2", body: "Body of post 2" },
    ];

    (useFetch as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      error: null,
    });

    renderWithStore({
      user: { activeUser: "1" },
    });

    expect(await screen.findByText("Post 1")).toBeInTheDocument();
    expect(await screen.findByText("Post 2")).toBeInTheDocument();
  });

  test("should render input element and allows typing", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    renderWithStore({
      user: { activeUser: "1" },
    });

    const input = screen.getByPlaceholderText("Search posts");

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Test" } });

    expect(input).toHaveValue("Test");
  });

  test("should clear input when close icon is clicked", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    renderWithStore({
      user: { activeUser: "1" },
    });

    const input = screen.getByPlaceholderText("Search posts");

    fireEvent.change(input, { target: { value: "Test" } });
    expect(input).toHaveValue("Test");
    const closeIcon = screen.getByTestId("close-icon");
    fireEvent.click(closeIcon);
    expect(input).toHaveValue("");
  });

  test("should filter posts based on search input", async () => {
    const mockPosts: Post[] = [
      { id: 1, userId: 1, title: "First Post", body: "This is the first post." },
      { id: 2, userId: 1, title: "Second Post", body: "This is the second post." },
    ];

    (useFetch as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      error: null,
    });

    renderWithStore({
      user: { activeUser: "1" },
    });

    const input = screen.getByPlaceholderText("Search posts");

    expect(screen.getByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "First" } });

    await waitFor(() => {
      expect(screen.getByText("First Post")).toBeInTheDocument();
      expect(screen.queryByText("Second Post")).not.toBeInTheDocument();
    });
  });
});
