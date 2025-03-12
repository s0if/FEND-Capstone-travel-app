# Travel Planner Web App  

## Project Overview  
This project is a single-page web application designed to help users plan their trips by providing weather forecasts for their destination based on their departure date.  

## Project Objectives  
This project focuses on:  
- Setting up a server environment using Node.js and Express.  
- Configuring Webpack to compile and build the project.  
- Designing the application using Sass.  
- Implementing worker services for offline functions.  
- Fetching data from external APIs and dynamically updating the DOM.  
- Writing and running unit tests using Jest.  

## Technologies Used  
- **Front-end**: HTML, CSS (Sass), JavaScript  
- **Back-end**: Node.js, Express  
- **Build Tool**: Webpack  
- **Testing**: Jest  
- **APIs**: Geonames, Weatherbit, Pixabay  

## Installation  
1. Clone the repository:  
   ```bash
   git clone [repository-url]
   cd [project-directory]
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  

## Running the Application  
### Production Mode  
1. Build and start the production server:  
   ```bash
   npm run build-prod
   npm start
   ```  
   The application will be available at `http://localhost:8000`.  

### Development Mode  
1. Start the Webpack development server:  
   ```bash
   npm run build-dev
   ```  
   The development server will run at `http://localhost:8080` and will automatically reload when changes are made.  

## Running Tests  
Unit tests are written using Jest. To run the tests, use the following command:  
```bash
npm run test
```  
Test results will be displayed in the terminal.
