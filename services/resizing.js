app.service("resizing", function ($rootScope) {
    this.init = function (element) {
        var startResizing = false;
        var addibleWidth, addibleHeight;
        var staticWidth, staticHeight;

        element.addClass("resize");

        element.css({
            width: "20px",
            height: "20px",
            cursor: "pointer",
            position: "absolute",
            right: "1px",
            bottom: "1px"
        });

        var resizingElement = function (event) {
            if (startResizing == true) {
                startResizing = false;
                addibleWidth = event.pageX;
                addibleHeight = event.pageY;
            }
            if (((staticWidth + (event.pageX - addibleWidth) > parameters.minSize) && (staticWidth + (event.pageX - addibleWidth) < parameters.maxSize))) {
                element.parent().css("width", staticWidth + (event.pageX - addibleWidth));
            } else if ((staticWidth + (event.pageX - addibleWidth) >= parameters.maxSize)) {
                element.parent().css("width", parameters.maxSize);
            } else {
                element.parent().css("width", parameters.minSize);
            }
            if (((staticHeight + (event.pageY - addibleHeight) > parameters.minSize) && (staticHeight + (event.pageY - addibleHeight) < parameters.maxSize))) {
                element.parent().css("height", staticHeight + (event.pageY - addibleHeight));
            } else if ((staticHeight + (event.pageY - addibleHeight) >= parameters.maxSize)) {
                element.parent().css("height", parameters.maxSize);
            } else {
                element.parent().css("height", parameters.minSize);
            }
        }

        element.on("mousedown", function () {
            $rootScope.button = true;
            startResizing = true;
            staticWidth = element.parent().width();
            staticHeight = element.parent().height();
            angular.element(window).on("mousemove", resizingElement);
            element.css("cursor", "move");
        })

        angular.element(window).on("mouseup", function () {
            $rootScope.button = false;
            angular.element(window).off("mousemove", resizingElement);
            element.css("cursor", "pointer");
        })
    }
})