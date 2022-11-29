# Development

### Link to Deployed Website
https://fantasticlion.github.io/react-stencil/

### Goal and Value of the Application
The application allows users to browse different Apple products and sort them by price and filter them by product type or whether they are released in 2022. Users can also pick their favorite products.

### Usability Principles Considered
This application is pretty easy to navigate. Users sort the products by product types or price by clicking the radio buttons under "Sort By" and filter the products by product types or release time by clicking the check boxes under "Product Type" and "Release Time". Users click the button in every product card to add or remove products to/from their favortie list and press the reset button to reset the page.

### Organization of Components
These components are included in this application：
1. Sorting according to product type, price (ascending), and price (descending)
2. Filtering according to product types and year of release
3. Product cards displayed (each is a ProductItem component)
4. Aggregator for products added to favorite list

### How Data is Passed Down Through Components
Every product card displayed is a ProductItem component and props is used to handle its different attributes and the aggregator component when the button is clicked to add or remove stuff to/from the list of favorites.

### How the User Triggers State Changes
The user triggers state changes when picking a different sorting method (the default method is to sort by product type), filter the products by their types or whether they are released in 2022, and add or remove a product to/from their favorite list.
