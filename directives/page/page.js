app.directive("page", function (movement) {
    return {
        restrict: 'A',
        templateUrl: 'directives/page/page.html',
        link: function (scope, element, attr) {
            movement.init(element, scope);
        }
    }
})