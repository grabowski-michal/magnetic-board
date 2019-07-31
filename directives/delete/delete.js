app.directive("delete", function (deleting) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            deleting.init(element, scope);
        }
    }
})