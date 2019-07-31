app.service("restoreBoard", function ($timeout, $rootScope) {
    this.init = function (data, scope) {
        var mileage = 0;
        var onBoard = 0;

        for (var i = 0; i < data.length; i++) {
            // console.log(data[i]);
            scope.add(parseInt(data[i].x), parseInt(data[i].y), parseInt(data[i].width), parseInt(data[i].height), parseInt(data[i].zindex), data[i].content, parseInt(data[i].mileage), true);
            onBoard++;
            if (parseInt(data[i].mileage) > mileage) mileage = parseInt(data[i].mileage);
        }

        scope.mileage = mileage;
        scope.onBoard = onBoard;

        $timeout(function () {
            $rootScope.$apply()
        }, 50)

        // scope.$apply();
        // console.log(scope);
    }
})