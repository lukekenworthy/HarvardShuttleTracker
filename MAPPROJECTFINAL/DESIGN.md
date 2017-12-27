   Our project chiefly utilizes the Directions Service from the Google Maps Javascript API. We start with
the input origin and destination, geocoding both to lat/lng objects through separate functions because of the
asynchronous nature of the geocoding API.

   We have a array of routes (each route object comprising a array of stops, as arrays of latitude/longitude and the
name of the route). We cycle through each route and find, for each route, the closest stop to the origin
and the closest stop to the destination using their Euclidean distance from the orirgin and destination
stops. Though this may not be the stop with the absolute least walking, it is generally going to be
very close; using the directions service to find these stops, based on estimated walking time, as we
had originally intended, is unfortunately limited by the Google Maps API itself, which limits the
number of requests made on both a per-second and per-day quota. This approach allows to to reach a compromise
between speed and optimization, so that each optimal route takes only two or three seconds to calculate
instead of 10+.

   Upon finding the optimal stops to embark and disembark for each shuttle, we push to a array called bestStops
an object with the origin and destination (both geocoded to Google Lat/Lng objects) and waypoints, an array comprising
the optimal embarking and disembarking stops.

   We then have a counter initialized to zero and a calcOptimal function, a recursive function that
takes the bestStops array as an argument and makes a call to the API, plotting a route from the origin
to the first stop to the second stop to the destination. The recursive function, if the call succeeds,
sleeps for 100 ms so as to not overload the Google Maps API quota. If the counter is less than the
length of bestStops - 1, we pull the total walking time (the duration of the first leg plus the duration of
the third leg) and add that to an array (called durations) of objects, each object being the route name, the origin stop,
the destination stop, and the walking time. If not, we can consider our durations array populated, find the
route in durations with the least walking, and draw the three separate legs.  The function is recursive so as to force
the drawing to be executed only after every callback to the API is successfully executed; the asynchronity
of the API calls otherwise can result in the optimal route being evaluated after the drawing functions
(which therefore have nothing to draw).