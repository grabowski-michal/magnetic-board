app.service("editing", function ($rootScope) {
    this.init = function (element, scope) {
        element.addClass("edit");

        element.on("mousedown", function () {
            $rootScope.button = true;
        })

        element.on("click", function () {
            for (var i = 0; i < $rootScope.elements.length; i++) {
                $rootScope.elements[i].attr("data-edited", "false");
            }
            element.parent().attr("data-edited", "true");
            tinymce.activeEditor.setContent(element.parent().find('.content').html());
            angular.element(document).find("wysiwyg").parent().show();
        })

        angular.element(window).on("mouseup", function () {
            $rootScope.button = false;
        })
    }
})