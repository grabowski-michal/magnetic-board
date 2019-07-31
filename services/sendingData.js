app.service("sendingData", function ($rootScope,$timeout, $http, $location, restoreBoard, $rootScope) {
    this.createMagnet = function (element) {
        // insert nowy wiersz, jeśli tworzysz cały magnes nowy
        data = {
            action: "createMagnet",
            board_name: $location.path().slice(1, $location.path().length),
            x: parseInt(element.css("left")),
            y: parseInt(element.css("top")),
            width: parseInt(element.css("width")),
            height: parseInt(element.css("height")),
            zindex: parseInt(element.css("z-index")),
            content: element.find(".content").html(),
            mileage: parseInt(element.attr("data-mileage"))
        };
        sendData(data);
    }
    this.updatePosition = function (element) {
        // update'uj x, y, jeśli pozycja się zmieni
        // update'uj z-index również

        data = {
            action: "updatePosition",
            board_name: $location.path().slice(1, $location.path().length),
            x: parseInt(element.css("left")),
            y: parseInt(element.css("top")),
            zindex: parseInt(element.css("z-index")),
            mileage: parseInt(element.attr("data-mileage"))
        }
        sendData(data);
    }
    this.updateZindex = function (element) {
        // update'uj tylko z-index jeżeli pozycja się nie zmieniła

        data = {
            action: "updateZindex",
            board_name: $location.path().slice(1, $location.path().length),
            zindex: parseInt(element.css("z-index")),
            mileage: parseInt(element.attr("data-mileage"))
        }
        sendData(data);
    }
    this.updateSize = function (element) {
        // update'uj width i height

        data = {
            action: "updateSize",
            board_name: $location.path().slice(1, $location.path().length),
            width: parseInt(element.css("width")),
            height: parseInt(element.css("height")),
            zindex: parseInt(element.css("z-index")),
            mileage: parseInt(element.attr("data-mileage"))
        }
        sendData(data);
    }
    this.updateContent = function (element) {
        // update'uj treść

        data = {
            action: "updateContent",
            board_name: $location.path().slice(1, $location.path().length),
            content: element.find(".content").html(),
            mileage: parseInt(element.attr("data-mileage"))
        }
        sendData(data);
    }
    this.removeMagnet = function (element) {
        // usuń cały wiersz zawierający magnes o danym mileage i nazwie tablicy

        data = {
            action: "removeMagnet",
            board_name: $location.path().slice(1, $location.path().length),
            mileage: parseInt(element.attr("data-mileage"))
        }
        sendData(data);
    }

    this.getData = function (scope) {
        data = {
            action: "getData",
            board_name: $location.path().slice(1, $location.path().length)
        }
        return(sendData(data, scope));
    }

    this.getMileage = function (scope) {
        data = {
            action: "getMileage",
            board_name: $location.path().slice(1, $location.path().length)
        }
        return (sendData(data, scope));
    }
    
    function sendData(data, scope) {
        console.log(data.action);
        var getData = false;
        var getMileage = false;
        if (data.action == "getData") getData = true;
        if (data.action == "getMileage") getMileage = true;

        $http({
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'php/backend.php',
        }).then(function successCallback(response) {
            if (getData == true) {
                restoreBoard.init(response.data, scope);
            } else if (getMileage == true) {
                if (response.data.length > 0) {
                    scope.mileage = (parseInt(response.data[0].mileage))
                    angular.element(document).find("#counter_if").show();
                    $timeout(function () {
                        $rootScope.mileage = parseInt(response.data[0].mileage);
                    }, 50);
                }
            }
            // console.log(response);
            // console.log("Success!");
        }, function errorCallback(response) {
            // console.log(response);
            console.log("Error with connection.");
        });
    }
})