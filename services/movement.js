app.service("movement", function ($rootScope, $timeout, sendingData) {
    this.init = function (element, scope) {
        var width, height;
        var lastX, lastY, lastZIndex, lastWidth, lastHeight;

        element.addClass("page");

        if (element.attr("data-mileage") == undefined) {
            scope.mileage++;
            element.attr("data-mileage", scope.mileage);
        }
        /*else if (parseInt(element.attr("data-mileage")) > parseInt(scope.mileage)) {
            scope.mileage = parseInt(element.attr("data-mileage"));
        }*/

        if (element.attr("data-x") != undefined)
            element.css({ left: parseInt(element.attr("data-x")) + "px" })

        if (element.attr("data-y") != undefined)
            element.css({ top: parseInt(element.attr("data-y")) + "px" })

        if (element.attr("data-width") == undefined)
            width = parameters.newWidth;
        else width = parseInt(element.attr("data-width"));

        if (element.attr("data-height") == undefined)
            height = parameters.newHeight;
        else height = parseInt(element.attr("data-height"));
        
        var borderWidth = parameters.newBorderWidth;

        element.css({
            width: width + "px",
            height: height + "px",
            border: borderWidth + "px solid black",
        });

        if (isChrome) element.css("cursor", "-webkit-grab");
        else element.css("cursor", "grab");

        var startMoving = false;
        var addibleLeft, addibleTop;
        var staticLeft, staticTop;

        if (element.attr("data-zindex") == undefined)
            $rootScope.elements.push(element);
        else {
            $rootScope.elements[parseInt(element.attr("data-zindex")) - 1] = element;
        }

        if (element.attr("data-zindex") == undefined) 
            element.css("z-index", $rootScope.elements.length);
        else element.css("z-index", parseInt(element.attr("data-zindex")));

        var elementMove = function (event) {
            if ($rootScope.button != true) {
                if (startMoving == true) {
                    startMoving = false;
                    addibleLeft = event.pageX;
                    addibleTop = event.pageY;
                }

                if (parseInt(angular.element(document).find("body").css("width")) >= ((event.pageX) - (addibleLeft - staticLeft)) + (element.width() + parameters.newBorderWidth*2) && 0 <= ((event.pageX) - (addibleLeft - staticLeft))) {
                    element.css("left", ((event.pageX) - (addibleLeft - staticLeft)) + "px");
                } else if (0 > ((event.pageX) - (addibleLeft - staticLeft))) {
                    element.css("left", "0px");
                } else {
                    element.css("left", (parseInt(angular.element(document).find("body").css("width")) - element.width() - parameters.newBorderWidth*2) + "px");
                }

                if (parseInt(angular.element(document).find("body").css("height")) >= ((event.pageY) - (addibleTop - staticTop)) + (element.height() + parameters.newBorderWidth * 2) && 0 <= ((event.pageY) - (addibleTop - staticTop))) {
                    element.css("top", ((event.pageY) - (addibleTop - staticTop)) + "px");
                } else if (0 > ((event.pageY) - (addibleTop - staticTop))) {
                    element.css("top", "0px");
                } else {
                    element.css("top", (parseInt(angular.element(document).find("body").css("height")) - element.height() - parameters.newBorderWidth * 2) + "px");
                }
            }
        };

        element.on("mousedown", function () {
            lastX = parseInt(element.css("left"));
            lastY = parseInt(element.css("top"));
            lastZIndex = parseInt(element.css("z-index"));
            lastWidth = parseInt(element.css("width"));
            lastHeight = parseInt(element.css("height"));
            startMoving = true;
            staticLeft = parseInt(element.css("left"));
            staticTop = parseInt(element.css("top"));
            angular.element(window).on("mousemove", elementMove);
            element.css("background-color", "#feefe9");
            if (isChrome) element.css("cursor", "-webkit-grabbing");
            else element.css("cursor", "grabbing");

            $rootScope.elements.splice(parseInt(element.css("z-index")) - 1, 1);

            for (var i = 0; i < $rootScope.elements.length; i++) {
                if (parseInt($rootScope.elements[i].css("z-index")) != (i + 1)) {
                    $rootScope.elements[i].css("z-index", i + 1);
                    sendingData.updateZindex($rootScope.elements[i]); // update z-index of every other element
                }
            }

            element.css("z-index", $rootScope.elements.length + 1);
            $rootScope.elements.push(element);
            angular.element(document).find("wysiwyg").parent().css("z-index", $rootScope.elements.length + 2);
        });
        angular.element(window).on("mouseup", function () {
            startMoving = false;
            angular.element(window).off("mousemove", elementMove);
            if (element.css("background-color") != "rgb(230, 230, 230)") {
                if (lastX != parseInt(element.css("left")) || lastY != parseInt(element.css("top"))) { // update position + z-index
                    sendingData.updatePosition(element);
                } else if (lastWidth != parseInt(element.css("width")) || lastHeight != parseInt(element.css("height"))) { // update size + z-index
                    sendingData.updateSize(element);
                }
                else if (lastZIndex != parseInt(element.css("z-index"))) { // update only z-index
                    sendingData.updateZindex(element);
                }
            }
            element.css("background-color", "#e6e6e6");
            if (isChrome) element.css("cursor", "-webkit-grab");
            else element.css("cursor", "grab");
        })

        element.removeAttr("data-x");
        element.removeAttr("data-y");
        element.removeAttr("data-width");
        element.removeAttr("data-height");
        element.removeAttr("data-zindex");

        if (element.attr("data-loaded") != "1") sendingData.createMagnet(element);
        else element.removeAttr("data-loaded");
    }
})