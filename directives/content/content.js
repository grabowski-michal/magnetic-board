app.directive("content", function (addingContent) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            addingContent.init(element);
        }
    }
})