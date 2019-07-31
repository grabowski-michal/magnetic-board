app.directive("edit", function (editing) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            editing.init(element, scope);
        }
    }
})