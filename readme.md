### Project Enhancements

- For certain films an error goes to the console because the poster image cant load.
I have added a blank poster for these ones but can't stop the error appearing

- The app if fully keyboard accessible

- The header and search details stack on top of each other at screen size less than 600

- The user can choose to view the movies in a list or in a grid. The icon visible will
depend on what is currently selected

- Clicking on the poster will bring up a dialog box of more information

- On hover of the ratings a tooltip will appear with all of the rating for the movie

- Click on the Start Exploring icon will place focus into the search input

- Searching with nothing in the input field will place a red border around the input field

### Code  Structure

- I read an article about a router in vanilla JS. I know the requirements were for 2
html pages but I wanted to make use of this and wrote it as a single page app (this means
an error occurs if you refresh on the watchlist page)

- The JS has also been split into components

- I have used a constructor function to hold details about each page
