The dashboard has the following requirements:

## Client

* Create a basic web application to display the SpaceX ship data returned from the backend API in a tabular format.
* Ability to filter the data on ship type (select), weight (number), home port (text).
* The filters should be positioned just above the table as shown in the UI mock.
* The filters should provide a "Search" button that fetches the ships using the filter values (default state fetches all ships).
* When the user clicks the search button, the FE application should validate the input data before sending the request to the backend API.
* Should provide a button for each row to allow the engineers to upload a ship icon (only jpg, jpeg, png allowed and upto size 100kb).

## Server
​
* Create an API to fetch a list of ships from the local database
* The API should implement a local cache, which is checked before querying the database
* If a record is not found in the database, call the spaceX API and store it in the database
* The API must also be able to filter the response based on the ship type, weight and home port (pagination is a bonus)
* All API endpoints should be secure from typical threats such as malicious headers and XSS.
* Validations the input data contained in the reqest for each endpoint.
* An icon upload route which accepts an image file (only jpg, jpeg, png allowed and upto size 100kb), and saves it to a ship, the icon should also be returned in the API route that fetches the list of ships.
​
## Bonus points:
​
* Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard for commit message. (+)
* Pagination in the API. (++)
* Pagination controls in the UI. (++)
* Correct handling of cache data, including clearing the cache when the source data is updated, take query filters and pagination into consideration. (+++)

See UI mock below

![UI Mock](ui-mock-simple.png)
