app.directive("wysiwyg", function (tinymce) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            tinymce.init(element, scope);
        }
    }
})