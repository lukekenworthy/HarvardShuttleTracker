   Our CS project is a webapp designed to integrate Google Maps (specifically, its route-finding
and directions services) with the Harvard shuttles. Currently, Google Maps supports a lot of public
routes like the MBTA; it is easy to simply pick an origin and a destination, and Google Maps will
state which stop to walk to, and which stop to get off at. Our implementation does essentially the
same thing, only with the Harvard Shuttles instead of the T.

   To run our webapp, navigate to within final and enter "export API_KEY=AIzaSyC3BuOlQBl1J0yq1PqSv81fo5ezOuanu3g"
and execute "flask run". Open the URL generated (in the format http://ide50-username.cs50.io:8080) to find our webapp. At the top right, you should
be able to pick between map view or satellite view. Underneath that should be two entry boxes, one
in which to enter the start point and one in which to enter the end point, either as a latitude/longitude
pair or as an actual name or address. Once you enter those and hit submit, you should see the path you
should take visualized on the map, as well as directions at the bottom that should state the shuttle to
take, where to get on, and where to get off.

   If you want to run a second request, you have to refresh the page to submit your new start and end
locations. Please note that this program currently uses only the Harvard Shuttles (though it would be
very simple to add new routes, simply by modifying the harvRoutes list), and thus, wouldn't be much use
if starting or ending outside of Boston. Also, due to the limitations of the free Google Maps API, it
takes a couple of seconds to find the optimal route. Our optimal route is defined as being the route
with the least walking, not the fastest or the shortest. In cases where two or more routes have the
same amount of walking, it will pick and display the shortest of those routes. Also, if you cannot get
to the Start Point or End Point by walking from a shuttle stop, or if your Stop Point or End Point is not
an actual location, then the program will not display a route.
