# ReStore Items

### Link to Deployed Website
[ReStore Items](https://fantasticlion.github.io/ReStoreItems/)

### Goal and Value of the Application
The application allows users to browse different products available at Green Country ReStores and sort them by price and filter them by product type or release date. Users can also calculate the total price of their select products.

### Organization of Components
These components are included in this application:

- Sorting: Users can sort products according to product type, price (ascending), and price (descending).
- Filtering: Users can filter products according to product types and release dates.
- Product Cards: Each product is displayed as a ProductItem component.
- Favorites Aggregator: Aggregates products added to the favorite list.
- How Data is Passed Down Through Components
- Every product card displayed is a ProductItem component. Props are used to handle its different attributes and the aggregator component when the button is clicked to add or remove items to/from the list of favorites.

### How the User Triggers State Changes
The user triggers state changes by:

- Picking a different sorting method (the default method is to sort by product type).
- Filtering the products by their types or release dates.
- Adding or removing a product to/from their favorite list.
- Feel free to adjust any details or add more information as needed! If you have any other questions or need further assistance, just let me know.
