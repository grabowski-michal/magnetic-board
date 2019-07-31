app.directive("resize", function (resizing) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            resizing.init(element);
        }
    }
})