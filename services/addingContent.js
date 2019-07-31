app.service("addingContent", function () {
    this.init = function (element, scope) {
        element.addClass("content");

        if (element.parent().attr("data-content") != undefined) {
            element.html(element.parent().attr("data-content"));
        }
        element.parent().removeAttr("data-content");
    }
})