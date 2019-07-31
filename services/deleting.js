app.service("deleting", function ($rootScope, sendingData) {
    this.init = function (element, scope) {
        element.addClass("delete");

        var isDeletingDone = false;

        element.on("mousedown", function () {
            $rootScope.button = true;
        })

        element.on("mouseup", function () {
            isDeletingDone = true;
        })

        angular.element(window).on("mouseup", function () {
            if (isDeletingDone == true) {
                isDeletingDone = false;

                if (element.parent().attr("data-edited") == "true")
                    angular.element(document).find("wysiwyg").parent().hide();

                sendingData.removeMagnet(element.parent()); // delete magnet
                $rootScope.elements.splice(parseInt(element.parent().css("z-index")) - 1, 1);

                for (var i = 0; i < $rootScope.elements.length; i++) {
                    $rootScope.elements[i].css("z-index", i + 1);
                }
                angular.element(document).find("wysiwyg").parent().css("z-index", $rootScope.elements.length + 2);

                element.parent().remove();
                $rootScope.onBoard--;
                scope.$apply();
            }
            $rootScope.button = false;
        })
    }
})