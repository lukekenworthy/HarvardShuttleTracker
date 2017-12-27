// Global Variables
var map;
var directionsService = new google.maps.DirectionsService;
var directionsService1 = new google.maps.DirectionsService;
var directionsService2 = new google.maps.DirectionsService;
var directionsDisplay;
var directionsDisplay1;
var directionsDisplay2;
var bestStops = [];
var durations = [];
var output = ""
var coordinatesOrigin = [];
var coordinatesEnd = [];
var counter = 0;

// Data
var harvRoutes = [{
        stops: [
            [42.381858, -71.125373],
            [42.375211, -71.119469],
            [42.372865, -71.115050],
            [42.372964, -71.117214]
        ],
        name: "Quad Yard Express"
    },

    {
        stops: [
            [42.337302, -71.103019],
            [42.340042, -71.101045],
            [42.339072, -71.096767],
            [42.342515, -71.091458],
            [42.350773, -71.089339],
            [42.359308, -71.093534],
            [42.365279, -71.103346],
            [42.369195, -71.110584],
            [42.370032, -71.112773],
            [42.372964, -71.117214],
            [42.370088, -71.113459],
            [42.368960, -71.110413],
            [42.364805, -71.102817],
            [42.359308, -71.093534],
            [42.350773, -71.089339],
            [42.348938, -71.097171],
            [42.344216, -71.101825],
            [42.340085, -71.101182]
        ],
        name: "M2"
    },

    {
        stops: [
            [42.381858, -71.125373],
            [42.375211, -71.119469],
            [42.372865, -71.115050],
            [42.371791, -71.118261],
            [42.368879, -71.115458],
            [42.367087, -71.124828],
            [42.371218, -71.121355],
            [42.371478, -71.120939]
        ],
        name: "Quad Stadium Express"
    },

    {
        stops: [
            [42.381858, -71.125373],
            [42.375211, -71.119469],
            [42.376299, -71.114374],
            [42.378144, -71.120037],
            [42.378787, -71.116738],
            [42.367087, -71.124828]
        ],
        name: "Quad Express"
    }, {
        stops: [
            [42.368879, -71.115458],
            [42.372010, -71.115222],
            [42.372964, -71.117214],
            [42.378144, -71.120037],
            [42.378787, -71.116738],
            [42.376299, -71.114374],
            [42.372865, -71.115050]
        ],
        name: "Mather Express"
    },

    {
        stops: [
            [42.364118, -71.130271],
            [42.371478, -71.120939],
            [42.373146, -71.119574],
            [42.371218, -71.121355]
        ],
        name: "Barry's Corner"
    },

    {
        stops: [
            [42.364142, -71.119043],
            [42.363767, -71.124037],
            [42.363294, -71.129128],
            [42.367087, -71.124828],
            [42.371478, -71.120939],
            [42.373146, -71.119574],
            [42.378144, -71.120037],
            [42.378787, -71.116738],
            [42.376299, -71.114374],
            [42.372865, -71.115050],
            [42.364613, -71.123396]
        ],
        name: "Allston Campus Express"
    },

    {
        stops: [
            [42.381858, -71.125373],
            [42.375211, -71.119469],
            [42.378144, -71.120037],
            [42.378787, -71.116738],
            [42.376299, -71.114374],
            [42.372865, -71.115050],
            [42.368879, -71.115458],
            [42.367039, -71.114931],
            [42.372010, -71.115222],
            [42.372964, -71.117214]
        ],
        name: "1636'er"
    },

    {
        stops: [
            [42.368879, -71.115458],
            [42.372010, -71.115222],
            [42.372964, -71.117214],
            [42.381858, -71.125373],
            [42.375211, -71.119469],
            [42.378144, -71.120037],
            [42.378787, -71.116738],
            [42.376299, -71.114374],
            [42.372865, -71.115050],
            [42.371791, -71.118261]
        ],
        name: "Crimson Cruiser"
    },

    {
        stops: [
            [42.368879, -71.115458],
            [42.367039, -71.114931],
            [42.372010, -71.115222],
            [42.372964, -71.117214],
            [42.381858, -71.125373],
            [42.375211, -71.119469],
            [42.378144, -71.120037],
            [42.378787, -71.116738],
            [42.376299, -71.114374],
            [42.372865, -71.115050],
            [42.371791, -71.118261]
        ],
        name: "Overnight"
    }
];


// Wait for DOM to load
$(document).ready(function() {
    initMap();
});

// Create map and listen for click
function initMap() {

    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: {
            lat: 42.374191,
            lng: -71.116735
        }
    });
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay1 = new google.maps.DirectionsRenderer;
    directionsDisplay2 = new google.maps.DirectionsRenderer;
    var geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function() {

        directionsDisplay.setMap(map);
        directionsDisplay1.setMap(map);
        directionsDisplay2.setMap(map);

        makeCoordinates(geocoder, map);
    });

}

// Retrieves the coordinates of the start location based on user input.
function makeCoordinates(geocoder, resultsMap) {
    var address = document.getElementById('start').value;
    var hello = geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == 'OK') {
            coordinatesOrigin.push(results[0].geometry.location.lat());
            coordinatesOrigin.push(results[0].geometry.location.lng());
            makeMoreCoordinates(geocoder, resultsMap)
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

// Retrieves the coordinates of the end location based on user input.
function makeMoreCoordinates(geocoder, resultsMap) {
    var endAddress = document.getElementById('end').value;
    var hello = geocoder.geocode({
        'address': endAddress
    }, function(results, status) {
        if (status == 'OK') {
            coordinatesEnd.push(results[0].geometry.location.lat());
            coordinatesEnd.push(results[0].geometry.location.lng());

            for (route of harvRoutes) {
                var opStops = combinedClosestDistance(route.stops, coordinatesOrigin, coordinatesEnd)
                var waypointsList = [{
                    location: convertToLatLng(opStops.originStop)
                }, {
                    location: convertToLatLng(opStops.destinationStop)
                }]
                bestStops.push({
                    origin: convertToLatLng(coordinatesOrigin),
                    waypoints: waypointsList,
                    destination: convertToLatLng(coordinatesEnd)
                });
            }
            calcOptimal(bestStops)
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

// Calculates the optimal route to take and which stops to use on that route.
function calcOptimal(cbArray) {
    var directionsCalculateO = new google.maps.DirectionsService;
    directionsCalculateO.route({
        origin: cbArray[counter].origin,
        waypoints: cbArray[counter].waypoints,
        destination: cbArray[counter].destination,
        travelMode: 'WALKING'
    }, function(response, status) {
        if (status == "OK") {
            sleep(100)
            if (counter >= cbArray.length - 1) {

                var opRouteL = optimalLeastWalkingRoute(coordinatesOrigin, coordinatesEnd);
                var opRoute = durations[0];

                //finds the route with the shortest walking
                for (route of durations) {
                    if (route.duration < opRoute.duration) {
                        opRoute = route;
                    }
                }

                //draws the final route
                mapVisualizeDriving(opRoute.originStop, opRoute.destinationStop, opRoute.route);
                mapVisualizeWalking(coordinatesOrigin, opRoute.originStop);
                mapVisualizeWalking2(opRoute.destinationStop, coordinatesEnd);

                addMarker(convertToLatLng(opRoute.originStop), map, "Start!");
                addMarker(convertToLatLng(opRoute.destinationStop), map, "End!");

                output += "Walk from the green \"A\" pin to the \"Start!\" pin then take the ";
                output += opRoute.route;
                output += " to the \"End!\" pin and get off, then walk to the red \"B\" pin and you're at your destination!";

                document.getElementById("insert").innerHTML = output;
            } else {

                //pushes a new object to the list, the optimal route for a given shuttle route, with the walking time.
                var routeInfo = response.routes[0];
                var totDur = routeInfo.legs[0].duration.value + routeInfo.legs[2].duration.value;
                durations.push({
                    route: harvRoutes[counter].name,
                    originStop: undoLatLng(cbArray[counter].waypoints[0].location),
                    destinationStop: undoLatLng(cbArray[counter].waypoints[1].location),
                    duration: totDur
                });
                counter++;
                calcOptimal(cbArray);
            }
        }
    });
}

// Gives a visual of the shuttle route from the beginning stop to the end stop.
// Actually gives driving directions from the beginning stop to the end stop using all of the stops in between as waypoints, but
// the result is comparable to the route itself.
function mapVisualizeDriving(start, end, name) {

    var nameMatch = false;
    var counter = 0;
    var position = 0;
    for (route of harvRoutes) {
        if (route.name == name) {
            nameMatch = true;
            position = counter;
        }
        counter += 1;
    }
    if (nameMatch == false) {
        window.alert(route.name);
    }

    counter1 = 0;
    startCounter = 0;
    endCounter = 0;

    for (stop of harvRoutes[position].stops) {
        if (arraysEqual(start, stop)) {
            startCounter = counter1;
        }
        if (arraysEqual(end, stop)) {
            endCounter = counter1;
        }
        counter1++;
    }

    var startLocation = convertToLatLng([harvRoutes[position].stops[startCounter][0], harvRoutes[position].stops[startCounter][1]]);
    var endLocation = convertToLatLng([harvRoutes[position].stops[endCounter][0], harvRoutes[position].stops[endCounter][1]]);
    waypts = [];
    whileCounter = startCounter + 1;

    while (true) {
        if (whileCounter == harvRoutes[position].stops.length) {
            whileCounter = 0;
            continue;
        }

        if (whileCounter == endCounter) {
            break;
        }

        var tempWayptLocation = new Object();
        tempWayptLocation.lat = harvRoutes[position].stops[whileCounter][0];
        tempWayptLocation.lng = harvRoutes[position].stops[whileCounter][1];

        waypts.push({
            location: tempWayptLocation,
            stopover: true
        });

        whileCounter++;
    }
    directionsService.route({
        origin: startLocation,
        destination: endLocation,
        waypoints: waypts,
        travelMode: "DRIVING"
    }, function(response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        }
    });
}

// Gives a visualization of the walking route from the start location provided by the user to the origin stop.
function mapVisualizeWalking(origin, destination) {
    var originNew = convertToLatLng(origin);
    var destinationNew = convertToLatLng(destination);

    directionsService1.route({
        origin: originNew,
        destination: destinationNew,
        travelMode: "WALKING"
    }, function(response, status) {
        if (status == 'OK') {
            directionsDisplay1.setDirections(response);
        } else {
            sleep(100);
            mapVisualizeWalking(origin, destination);
        }
    });
}

// Gives a visualization of the walking route from the destination stop to the end location provided by the user.
function mapVisualizeWalking2(origin, destination) {

    var originNew = convertToLatLng(origin);
    var destinationNew = convertToLatLng(destination);

    directionsService2.route({
        origin: originNew,
        destination: destinationNew,
        travelMode: "WALKING"
    }, function(response, status) {
        if (status == 'OK') {
            directionsDisplay2.setDirections(response);
        } else {
            sleep(100);
            mapVisualizeWalking2(origin, destination);
        }
    });
}

// Adds a marker to the map with a label.
function addMarker(location, map, label) {
    var marker = new google.maps.Marker({
        position: location,
        label: label,
        map: map,
        zIndex: 100
    });
}

// Compares two arrays. Not an exhaustive checker, but works for our purposes.
function arraysEqual(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (!(a[i] == b[i])) {
            return false;
        }
    }
    return true;
}

// Finds the Euclidean distance between two points.
function euclidDistance(firstList, secondList) {
    x1 = firstList[0];
    x2 = secondList[0];
    y1 = firstList[1];
    y2 = secondList[1];

    distance = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)))
    return distance;
}


// Given a list of stops, this finds the two stops with the least amount of Euclidean distance between two points.
function combinedClosestDistance(stopList, origin, destination) {
    originDistances = [];
    for (stop of stopList) {
        originObject = new Object;
        originObject.stop = stop
        originObject.distance = euclidDistance(stop, origin);
        originDistances.push(originObject);
    }

    destinationDistances = [];
    for (stop of stopList) {
        destinationObject = new Object;
        destinationObject.stop = stop
        destinationObject.distance = euclidDistance(stop, destination);
        destinationDistances.push(destinationObject);
    }

    originDistances.sort(function(a, b) {
        return a.distance - b.distance
    });
    destinationDistances.sort(function(a, b) {
        return a.distance - b.distance
    });

    optimalStops = new Object;
    optimalStops.originStop = originDistances[0].stop;
    optimalStops.destinationStop = destinationDistances[0].stop;
    optimalStops.combinedDistance = originDistances[0].distance + destinationDistances[0].distance;

    return optimalStops;
}

// Finds the route and two stops with the least amount amount of combined euclidean distance between the two stops
// and the origin and destination point.
function optimalLeastWalkingRoute(origin, destination) {
    var stopTimeList = [];

    for (routes of harvRoutes) {
        routeSpecs = new Object();
        routeSpecs.route = routes.name;
        var holder = combinedClosestDistance(routes.stops, origin, destination)
        routeSpecs.combinedDistance = holder.combinedDistance;
        routeSpecs.originStop = holder.originStop;
        routeSpecs.destinationStop = holder.destinationStop
        stopTimeList.push(routeSpecs);
    }

    stopTimeList.sort(function(a, b) {
        return a.combinedDistance - b.combinedDistance
    });

    return stopTimeList[0]
}

// Converts a [lat, lng] array to a LatLng object.
function convertToLatLng(list) {
    var yes = new Object();
    yes.lat = list[0];
    yes.lng = list[1];
    return yes;
}

// Converts a LatLng object to a [lat, lng] array.
function undoLatLng(latLngObject) {
    var list = [];
    list.push(latLngObject.lat);
    list.push(latLngObject.lng);

    return list;
}

// Makes the program pause temporarily. From StackOverflow.
function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {}
}