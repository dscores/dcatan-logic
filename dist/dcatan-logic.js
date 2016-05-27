(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Board = (function () {
    function Board() {
        this.objects = [];
        this.currentRoundPoints = 0;
        this.roundPoints = [];
    }
    Board.prototype.setObjects = function (objects) {
        this.objects = objects;
        return this;
    };
    Board.prototype.getObjects = function () {
        return this.objects;
    };
    Board.prototype.markObject = function (objectIndex) {
        if (this.isFinished()) {
            return this;
        }
        var object = this.getObjects()[objectIndex];
        if (object.markObject()) {
            this.addCurrentRoundPoints(object.getPoints());
        }
        return this;
    };
    Board.prototype.addCurrentRoundPoints = function (roundPoints) {
        this.currentRoundPoints += roundPoints;
        return this;
    };
    Board.prototype.resetCurrentRoundPoints = function () {
        this.currentRoundPoints = 0;
        return this;
    };
    Board.prototype.getCurrentRoundPoints = function () {
        return this.currentRoundPoints;
    };
    Board.prototype.nextRound = function () {
        if (this.isFinished()) {
            return;
        }
        var currentRoundPoints = this.getCurrentRoundPoints();
        if (currentRoundPoints === 0) {
            this.roundPoints.push(-2);
        }
        else {
            this.roundPoints.push(currentRoundPoints);
            this.resetCurrentRoundPoints();
        }
    };
    Board.prototype.getRoundPoints = function () {
        return this.roundPoints;
    };
    Board.prototype.getPoints = function () {
        return this.getRoundPoints().reduce(function (roundPointsA, roundPointsB) { return roundPointsA + roundPointsB; }, 0);
    };
    Board.prototype.isOpen = function () {
        return this.getRoundPoints().length < 15;
    };
    Board.prototype.isFinished = function () {
        return !this.isOpen();
    };
    return Board;
}());
exports.__esModule = true;
exports["default"] = Board;

},{}],2:[function(require,module,exports){
"use strict";
var Object = (function () {
    function Object(type, links, points) {
        this.marked = false;
        this.type = type;
        this.links = links;
        this.points = points;
    }
    Object.prototype.getType = function () {
        return this.type;
    };
    Object.prototype.getLinks = function () {
        return this.links;
    };
    Object.prototype.isMarkable = function () {
        if (this.isMarked()) {
            return false;
        }
        var streets = this.getLinks().filter(function (link) { return link.isStreet(); });
        if (streets.length > 0) {
            var markedStreets = streets.filter(function (link) { return link.isMarked(); });
            if (markedStreets.length === 0) {
                return false;
            }
        }
        var notStreetsNotMarked = this.getLinks().filter(function (link) { return !link.isStreet() && !link.isMarked(); });
        if (notStreetsNotMarked.length > 0) {
            return false;
        }
        return true;
    };
    Object.prototype.markObject = function () {
        if (!this.isMarkable()) {
            return false;
        }
        this.marked = true;
        return true;
    };
    Object.prototype.isMarked = function () {
        return this.marked;
    };
    Object.prototype.getPoints = function () {
        return this.points;
    };
    Object.prototype.isStreet = function () {
        return this.getType() === 'street';
    };
    return Object;
}());
exports.__esModule = true;
exports["default"] = Object;

},{}],3:[function(require,module,exports){
"use strict";
var Object_1 = require('../logics/Object');
function classic(board) {
    var objects = [];
    var streetA = new Object_1["default"]('street', [], 1);
    streetA.markObject();
    objects.push(streetA);
    var villageA = new Object_1["default"]('village', [streetA], 3);
    objects.push(villageA);
    var streetB = new Object_1["default"]('street', [streetA], 1);
    objects.push(streetB);
    var streetBA = new Object_1["default"]('street', [streetB], 1);
    objects.push(streetBA);
    var cityA = new Object_1["default"]('city', [streetBA], 7);
    objects.push(cityA);
    var streetC = new Object_1["default"]('street', [streetB], 1);
    objects.push(streetC);
    var villageB = new Object_1["default"]('village', [streetC, villageA], 4);
    objects.push(villageB);
    var anotherStreetCA = new Object_1["default"]('street', [streetC], 1);
    objects.push(anotherStreetCA);
    var cityB = new Object_1["default"]('city', [anotherStreetCA, cityA], 12);
    objects.push(cityB);
    var streetD = new Object_1["default"]('street', [streetC], 1);
    objects.push(streetD);
    var villageC = new Object_1["default"]('village', [streetD, villageB], 5);
    objects.push(villageC);
    var streetE = new Object_1["default"]('street', [streetD], 1);
    objects.push(streetE);
    var streetF = new Object_1["default"]('street', [streetE], 1);
    objects.push(streetF);
    var villageD = new Object_1["default"]('village', [streetF, villageC], 7);
    objects.push(villageD);
    var streetFA = new Object_1["default"]('street', [streetF], 1);
    objects.push(streetFA);
    var streetFB = new Object_1["default"]('street', [streetFA], 1);
    objects.push(streetFB);
    var cityC = new Object_1["default"]('city', [streetFB, cityB], 20);
    objects.push(cityC);
    var streetFC = new Object_1["default"]('street', [streetFB], 1);
    objects.push(streetFC);
    var streetFD = new Object_1["default"]('street', [streetFC], 1);
    objects.push(streetFD);
    var cityD = new Object_1["default"]('city', [streetFD, cityC], 30);
    objects.push(cityD);
    var streetG = new Object_1["default"]('street', [streetF], 1);
    objects.push(streetG);
    var streetH = new Object_1["default"]('street', [streetG], 1);
    objects.push(streetH);
    var villageE = new Object_1["default"]('village', [streetH, villageD], 9);
    objects.push(villageE);
    var streetI = new Object_1["default"]('street', [streetH], 1);
    objects.push(streetI);
    var streetJ = new Object_1["default"]('street', [streetI], 1);
    objects.push(streetJ);
    var villageF = new Object_1["default"]('village', [streetJ, villageE], 11);
    objects.push(villageF);
    var knightA = new Object_1["default"]('knight', [], 1);
    objects.push(knightA);
    var ressourceA = new Object_1["default"]('ressource', [knightA], 0);
    objects.push(ressourceA);
    var knightB = new Object_1["default"]('knight', [knightA], 2);
    objects.push(knightB);
    var ressourceB = new Object_1["default"]('ressource', [knightB], 0);
    objects.push(ressourceB);
    var knightC = new Object_1["default"]('knight', [knightB], 3);
    objects.push(knightC);
    var ressourceC = new Object_1["default"]('ressource', [knightC], 0);
    objects.push(ressourceC);
    var knightD = new Object_1["default"]('knight', [knightC], 4);
    objects.push(knightD);
    var ressourceD = new Object_1["default"]('ressource', [knightD], 0);
    objects.push(ressourceD);
    var knightE = new Object_1["default"]('knight', [knightD], 5);
    objects.push(knightE);
    var ressourceE = new Object_1["default"]('ressource', [knightE], 0);
    objects.push(ressourceE);
    var knightF = new Object_1["default"]('knight', [knightE], 6);
    objects.push(knightF);
    var ressourceF = new Object_1["default"]('ressource', [knightF], 0);
    objects.push(ressourceF);
    return board.setObjects(objects);
}
exports.__esModule = true;
exports["default"] = classic;

},{"../logics/Object":2}],4:[function(require,module,exports){
"use strict";
var Board_1 = require('./logics/Board');
var classic_1 = require('./themes/classic');
var Dcatan = { Board: Board_1["default"], themes: { classic: classic_1["default"] } };
window.Dcatan = Dcatan;

},{"./logics/Board":1,"./themes/classic":3}]},{},[4]);
