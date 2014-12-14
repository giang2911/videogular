"use strict";
angular.module("com.2fdevs.videogular")
  .directive("vgNativeControls",
  [function () {
    return {
      restrict: "A",
      require: "^videogular",
      link: {
        pre: function (scope, elem, attr, API) {
          var controls;

          function setControls(value) {
            if (value) {
              API.mediaElement.attr("controls", value);
            }
            else {
              API.mediaElement.removeAttr("controls");
            }
          }

          if (API.isConfig) {
            scope.$watch(
              function() {
                return API.config;
              },
              function() {
                if (API.config) {
                  setControls(API.config.controls);
                }
              }
            );
          }
          else {
            scope.$watch(attr.vgNativeControls, function (newValue, oldValue) {
              if ((!controls || newValue != oldValue) && newValue) {
                controls = newValue;
                setControls(controls);
              }
              else {
                setControls();
              }
            });
          }
        }
      }
    }
  }
  ]);
