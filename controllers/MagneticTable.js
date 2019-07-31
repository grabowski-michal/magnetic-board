app.controller("MagneticTable", function ($scope, $compile, $rootScope, $location, $window, $timeout, sendingData) {
    $rootScope.elements = [];
    $scope.mileage = 0;
    $scope.onBoard = 0;
    $rootScope.onBoard = 0;
    $scope.path = "";

    $rootScope.$watch('mileage', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.mileage = newValue;
        }
    });

    $rootScope.$watch('onBoard', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.onBoard = newValue;
        }
    });

    $scope.add = function (X, Y, Width, Height, Zindex, Content, Mileage, Loaded) {
        $rootScope.onBoard++;
        var el = $compile("<div page></div>")($scope);
        if (X != undefined) el.attr("data-x", X);
        if (Y != undefined) el.attr("data-y", Y);
        if (Width != undefined) el.attr("data-width", Width);
        if (Height != undefined) el.attr("data-height", Height);
        if (Zindex != undefined) el.attr("data-zindex", Zindex);
        if (Content != undefined) el.attr("data-content", Content);
        if (Mileage != undefined) el.attr("data-mileage", Mileage);
        if (Loaded == true) el.attr("data-loaded", "1");

        angular.element(document).find("body").append(el);
        angular.element(document).find("wysiwyg").parent().css("z-index", $rootScope.elements.length + 2);
    }

    $scope.goFurther = function () {
        if (angular.element(document).find("#boardName").val() != "" && angular.element(document).find("#boardName").val().length <= 30) {
            $location.path('/' + angular.element(document).find("#boardName").val());
            $window.location.reload();
        }
        else angular.element(document).find(".tooManyChars").css("display", "none");

        if (angular.element(document).find("#boardName").val().length > 30)
            angular.element(document).find(".tooManyChars").css("display", "block");
    }

    $scope.goBack = function () {
        $location.path('/');
    }

    function successRouteChange() {
        if ($location.path() != "/") {
            sendingData.getData($scope);
            sendingData.getMileage($scope);
        }
        deregisterListenerSuccess();
    }

    var deregisterListenerSuccess = $rootScope.$on('$routeChangeSuccess', successRouteChange);
});