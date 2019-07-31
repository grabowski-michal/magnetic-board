app.service("tinymce", function ($rootScope, $compile, sendingData) {
    this.init = function (element, scope) {
        element.parent().addClass("wysiwyg");

        var accept = $compile("<img src='gfx/Ryan_Taylor_Green_Tick.png' alt='tick'></img>")(scope);
        accept.css({
            position: "absolute",
            right: "20px",
            bottom: "0",
            width: "30px",
            height: "30px",
            cursor: "pointer"
        })
        element.parent().append(accept);

        accept.on("click", function () {
            angular.element(document).find("div[data-edited=true] .content").html(tinymce.activeEditor.getContent());
            sendingData.updateContent(angular.element(document).find("div[data-edited=true]")); // update content
            element.parent().hide();
        })

        var cancel = $compile("<img src='gfx/896px-X_mark.png' alt='cross'></img>")(scope);
        cancel.css({
            position: "absolute",
            right: "55px",
            bottom: "0",
            width: "30px",
            height: "30px",
            cursor: "pointer"
        })
        element.parent().append(cancel);

        cancel.on("click", function () {
            element.parent().hide();
        })

        tinymce.init({
            selector: 'wysiwyg',
            init_instance_callback: function (editor) {
                angular.element(document).find(".mce-notification").on("click", function () {
                    angular.element(document).find(".mce-notification").remove();
                })
                angular.element(document).find(".mce-notification").remove();
                angular.element(document).find(".mce-path.mce-flow-layout-item.mce-first").remove();
                angular.element(document).find(".mce-branding").css("margin-left", "10px");
            }
        });

        element.parent().hide();
    }
})