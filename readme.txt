CabsOnline - This repo is for AUT COMP721-Web Development Assignment 2
Cabs Online, your cab is right next to you


purpose
The purpose of this assignment is to demonstrate understanding on AJAX methodology for Web 2.0


Files in this folder:

- Three files for booking page:
    - booking.html: For display the user booking page.
    - booking.js: Handle AJAX call and onclick events.
    - booking.php: Converts HTTP request to database command.

- Three files for admin page:
    - admin.html: For display driver overview page
    - admin.js: Handle AJAX call for admin.html
    - admin.php: Converts HTTP request to database command.

- Shared file:
    - SQLfunction.php: For constructing SQL queries and submit to MySQL database.

- icon folder:
    - consists of multiple icon files for different devices and different browsers

- logo.png: The logo for this website

- mysqlcommand.txt: The SQL command used in this project to create database table.


How to use this website?

For passenger looking for a cab
- Open the bookings.html
- Enter the personal details to complete the bookings:
    - Customer Name (required)
    - Phone Number (required)
    - Street details 
        - unit number (optional)
        - street number (required)
        - street name (required)
    - Suburb details
        - source suburb (optional)
        - destination suburb (optional)
    - Time
        - Pick-Up Date (required)
        The selected date must not be earlier than the current date
        - Pick-Up Time (required)
        The selected time must not be earlier than the current time
- After filling in all the necessary field, you can now click "Book A Cab" button to send a booking request to the system server.

For driver looking for passenger
- Open admin.html
- If you want to search for a specific booking
    - Enter a valid booking reference number in the search field
    - Then click the search button
- If you want to search for all the booking for the next 2 hours from now
    - Leave the search field blank
    - Then click the search button

- After the above process, the tabel with the search result will be displayed. At the end of each entry in the table, there is a assign button for that specific booking request. You can assign yourself to a booking request by clicking the "assign taxi" button at the end of the entry. 


Addition Note

List of things out of scope for this assignment:
- authentication
- querying services for drivers
- monitoring services

Although the above list are necessary for a real application, but they are out of scope for this assignment.
However, I will update these features if time allows me to do so.

