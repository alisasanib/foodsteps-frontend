### React Test

We have provided a simple React application with 2 pages:

<ul>
<li>A “Posts” page that lists the titles of a user’s posts.</li>
<li>A “User Details” page that displays some information about the active user.</li>
</ul>

We’ve used a publicly available [API](https://jsonplaceholder.typicode.com/).

Please add the following:

1. A dropdown in the top right corner of the application that allows us to select the active user.</li>
2. The ability to click on a post in the “Posts” page and expand it to see the post body.</li>
3. A search bar in the “Posts” page that matches the design specified [here](https://www.figma.com/design/4Lhm0Oj7EXsKzXvp7OIDEB/search-bar?node-id=0-1&t=GjAOQlc4I8XLUAQf-1).</li>
4. Any single test that checks whether the search bar is working as expected.</li>

We've used [Ant Design](https://ant.design/) for some of the components. You can use that or any other libraries you choose to complete the steps above.

To start the application run <code>npm install</code>, and then <code>npm start</code>.

We recommend spending about 2 hours on this task. If there is anything you missed or would have done differently given more time, feel free to comment what you would have done, or bring it up with us in the technical interview.

## Notes on Implementation

1. **State Management**:

   - Used **Redux** to store the active user ID and connected the necessary components to it, ensuring a consistent and efficient state management across the application.

2. **Layout Optimization**:

   - Extracted the page layout and rendered it once to avoid code duplication and unnecessary re-rendering. This improves maintainability and performance.

3. **Ant Design**:

   - Implemented search, select, collapsible card components using **Ant Design** to maintain consistency with the existing UI framework.

4. **Code Improvements**:

   - Fixed bugs in the code. Replaced the usage of array indexes as keys with unique identifiers, which prevents potential issues with component reordering and collapsing behavior.

5. **Tests**:
   - Added tests for the Posts page to check data fetching, loading, and search filtering functionalities.
