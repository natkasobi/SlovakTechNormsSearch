# Slovak Tech Norms Search

This project is a web application for searching and retrieving norms from the Slovak norms catalog. It provides a user-friendly interface for searching norms based on various criteria and allows users to download the search results as a CSV file.

## Website

You can access the Normy Search Application at the following URL:
https://natkasobi.github.io/SlovakTechNormsSearch/

## Files

The project consists of the following files:

1. `index.html`: The main HTML file that defines the structure and layout of the web application. It includes the search form with input fields for specifying search criteria such as standard designation, validity, language, Slovak name, English name, publication date, cancellation date, classification code, and ICS codes.

2. `pretty.css`: The CSS file that contains the styles for the web application. It defines the appearance of the search form, input fields, buttons, and the table displaying the search results. The styles are designed to provide an attractive and user-friendly interface.

3. `index.js`: The JavaScript file that handles the functionality of the web application. It includes the following main features:
   - Fetching norms data from the Slovak norms catalog API based on the specified search criteria.
   - Displaying the search results in a table format on the web page.
   - Providing a download functionality to export the search results as a CSV file.

## Usage

To use the Norms Search Application:

1. Open the index.html file in a web browser or visit https://natkasobi.github.io/SlovakTechNormsSearch/.

2. Fill in the desired search criteria in the provided input fields. You can search for standards based on their designation, validity, language, Slovak name, English name, publication date, cancellation date, classification code, and ICS codes.

3. Click the "Vyhľadať" (Search) button to retrieve the matching norms from the Slovak norms catalog API.

4. The search results will be displayed in a table format on the web page. The table includes columns for various attributes of the norms, such as catalogue number, designation, Slovak name, English name, URL, classification code, publication date, cancellation date, language, changes, validity, and more.

5. To download the search results as a CSV file, click the "Stiahnuť" (Download) button. The CSV file will be generated and downloaded automatically.

## Dependencies

The Norms Search Application relies on the following external dependencies:

- Google Fonts: The application uses the Gaegu and Poppins fonts from Google Fonts for styling the text elements.

## API

The application interacts with the Slovak norms catalog API to retrieve standards norms. The API endpoint used is `https://normy.normoff.gov.sk/api/standard/?`. The application sends GET requests to this endpoint with the specified search parameters to fetch the matching standards.

## Note

Please note that the application assumes the availability and accessibility of the Slovak standards catalog API. Make sure you have a stable internet connection and the API is accessible from your network.

If you encounter any issues or have any questions, please feel free to contact me.
