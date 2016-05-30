(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Object_1 = require('./Object');
var ClassicBoardLogic_1 = require('./ClassicBoardLogic');
var ClassicBoard = (function (_super) {
    __extends(ClassicBoard, _super);
    function ClassicBoard() {
        _super.apply(this, arguments);
    }
    ClassicBoard.generate = function () {
        var board = new ClassicBoard();
        var streetA = board.addStreet();
        var villageA = board.addVillage(3, streetA);
        var streetB = board.addStreet(streetA);
        var streetC = board.addStreet(streetB);
        var villageB = board.addVillage(4, streetC, villageA);
        var streetD = board.addStreet(streetC);
        var streetE = board.addStreet(streetD);
        var villageC = board.addVillage(5, streetE, villageB);
        var streetF = board.addStreet(streetE);
        var streetG = board.addStreet(streetF);
        var villageD = board.addVillage(7, streetG, villageC);
        var streetH = board.addStreet(streetG);
        var streetI = board.addStreet(streetH);
        var villageE = board.addVillage(9, streetI, villageD);
        var streetJ = board.addStreet(streetI);
        var streetK = board.addStreet(streetJ);
        var villageF = board.addVillage(11, streetK, villageE);
        var streetBA = board.addStreet(streetB);
        var cityA = board.addCity(7, streetBA);
        var streetDA = board.addStreet(streetD);
        var cityB = board.addCity(12, streetDA, cityA);
        var streetGA = board.addStreet(streetG);
        var streetGB = board.addStreet(streetGA);
        var cityC = board.addCity(20, streetGB, cityB);
        var streetGC = board.addStreet(streetGB);
        var streetGD = board.addStreet(streetGC);
        board.addCity(30, streetGD, cityC);
        var knightA = board.addKnightAndRessource(1);
        var knightB = board.addKnightAndRessource(2, knightA);
        var knightC = board.addKnightAndRessource(3, knightB);
        var knightD = board.addKnightAndRessource(4, knightC);
        var knightE = board.addKnightAndRessource(5, knightD);
        board.addKnightAndRessource(6, knightE);
        return board;
    };
    ClassicBoard.resume = function () {
        // TODO
    };
    ClassicBoard.prototype.addStreet = function (linkedStreet) {
        if (linkedStreet === void 0) { linkedStreet = undefined; }
        var street = new Object_1["default"](Object_1.ObjectType.Street);
        street.setObjectPoints(1);
        if (linkedStreet) {
            street.addLinkedObject(linkedStreet);
        }
        else {
            street.markObject();
        }
        this.addObject(street);
        return street;
    };
    ClassicBoard.prototype.addVillage = function (points, linkedStreet, linkedVillage) {
        if (linkedVillage === void 0) { linkedVillage = undefined; }
        var village = new Object_1["default"](Object_1.ObjectType.Village)
            .setObjectPoints(points)
            .addLinkedObject(linkedStreet);
        if (linkedVillage) {
            village.addLinkedObject(linkedVillage);
        }
        this.addObject(village);
        return village;
    };
    ClassicBoard.prototype.addCity = function (points, linkedStreet, linkedCity) {
        if (linkedCity === void 0) { linkedCity = undefined; }
        var city = new Object_1["default"](Object_1.ObjectType.City)
            .setObjectPoints(points)
            .addLinkedObject(linkedStreet);
        if (linkedCity) {
            city.addLinkedObject(linkedCity);
        }
        this.addObject(city);
        return city;
    };
    ClassicBoard.prototype.addKnightAndRessource = function (points, linkedKnight) {
        if (linkedKnight === void 0) { linkedKnight = undefined; }
        var knight = new Object_1["default"](Object_1.ObjectType.Knight)
            .setObjectPoints(points);
        if (linkedKnight) {
            knight.addLinkedObject(linkedKnight);
        }
        this.addObject(knight);
        var ressource = new Object_1["default"](Object_1.ObjectType.Ressource)
            .addLinkedObject(knight);
        this.addObject(ressource);
        return knight;
    };
    return ClassicBoard;
}(ClassicBoardLogic_1["default"]));
exports.__esModule = true;
exports["default"] = ClassicBoard;

},{"./ClassicBoardLogic":2,"./Object":3}],2:[function(require,module,exports){
"use strict";
var ClassicBoardLogic = (function () {
    function ClassicBoardLogic() {
        this.objects = [];
        this.currentRoundPoints = 0;
        this.roundPoints = [];
    }
    ClassicBoardLogic.prototype.addObject = function (object) {
        this.objects.push(object);
        return this;
    };
    ClassicBoardLogic.prototype.getObjects = function () {
        return this.objects;
    };
    ClassicBoardLogic.prototype.isObjectMarkable = function (objectIndex) {
        if (this.isFinished()) {
            return false;
        }
        return this.getObjects()[objectIndex].isObjectMarkable();
    };
    ClassicBoardLogic.prototype.markObject = function (objectIndex) {
        if (this.isFinished()) {
            return this;
        }
        var object = this.getObjects()[objectIndex];
        if (object.markObject()) {
            this.addCurrentRoundPoints(object.getObjectPoints());
        }
        return this;
    };
    ClassicBoardLogic.prototype.addCurrentRoundPoints = function (roundPoints) {
        this.currentRoundPoints += roundPoints;
        return this;
    };
    ClassicBoardLogic.prototype.resetCurrentRoundPoints = function () {
        this.currentRoundPoints = 0;
        return this;
    };
    ClassicBoardLogic.prototype.getCurrentRoundPoints = function () {
        return this.currentRoundPoints;
    };
    ClassicBoardLogic.prototype.nextRound = function () {
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
    ClassicBoardLogic.prototype.getRoundPoints = function () {
        return this.roundPoints;
    };
    ClassicBoardLogic.prototype.getPoints = function () {
        return this.getRoundPoints().reduce(function (roundPointsA, roundPointsB) { return roundPointsA + roundPointsB; }, 0);
    };
    ClassicBoardLogic.prototype.isOpen = function () {
        return this.getRoundPoints().length < 15;
    };
    ClassicBoardLogic.prototype.isFinished = function () {
        return !this.isOpen();
    };
    return ClassicBoardLogic;
}());
exports.__esModule = true;
exports["default"] = ClassicBoardLogic;

},{}],3:[function(require,module,exports){
"use strict";
(function (ObjectType) {
    ObjectType[ObjectType["Street"] = 1] = "Street";
    ObjectType[ObjectType["Village"] = 2] = "Village";
    ObjectType[ObjectType["City"] = 3] = "City";
    ObjectType[ObjectType["Knight"] = 4] = "Knight";
    ObjectType[ObjectType["Ressource"] = 5] = "Ressource";
})(exports.ObjectType || (exports.ObjectType = {}));
var ObjectType = exports.ObjectType;
var Object = (function () {
    function Object(type) {
        this.linkedObjects = [];
        this.marked = false;
        this.points = 0;
        this.type = type;
    }
    Object.prototype.getObjectType = function () {
        return this.type;
    };
    Object.prototype.isObjectStreet = function () {
        return this.getObjectType() === ObjectType.Street;
    };
    Object.prototype.isObjectVillage = function () {
        return this.getObjectType() === ObjectType.Village;
    };
    Object.prototype.isObjectCity = function () {
        return this.getObjectType() === ObjectType.City;
    };
    Object.prototype.isObjectKnight = function () {
        return this.getObjectType() === ObjectType.Knight;
    };
    Object.prototype.isObjectRessource = function () {
        return this.getObjectType() === ObjectType.Ressource;
    };
    Object.prototype.addLinkedObject = function (linkedObject) {
        this.linkedObjects.push(linkedObject);
        return this;
    };
    Object.prototype.getLinkedObjects = function () {
        return this.linkedObjects;
    };
    Object.prototype.isObjectMarkable = function () {
        if (this.isObjectMarked()) {
            return false;
        }
        var streets = this.getLinkedObjects().filter(function (link) { return link.isObjectStreet(); });
        if (streets.length > 0) {
            var streetsMarked = streets.filter(function (link) { return link.isObjectMarked(); });
            if (streetsMarked.length === 0) {
                return false;
            }
        }
        var notStreetsNotMarked = this.getLinkedObjects().filter(function (link) { return !link.isObjectStreet() && !link.isObjectMarked(); });
        if (notStreetsNotMarked.length > 0) {
            return false;
        }
        return true;
    };
    Object.prototype.markObject = function () {
        if (!this.isObjectMarkable()) {
            return false;
        }
        this.marked = true;
        return true;
    };
    Object.prototype.isObjectMarked = function () {
        return this.marked;
    };
    Object.prototype.setObjectPoints = function (points) {
        this.points = points;
        return this;
    };
    Object.prototype.getObjectPoints = function () {
        return this.points;
    };
    return Object;
}());
exports.__esModule = true;
exports["default"] = Object;

},{}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Object_1 = require('./Object');
var PlusBoardLogic_1 = require('./PlusBoardLogic');
var PlusBoard = (function (_super) {
    __extends(PlusBoard, _super);
    function PlusBoard() {
        _super.apply(this, arguments);
    }
    PlusBoard.generate = function () {
        var board = new PlusBoard();
        var streetA = board.addStreet();
        board.addVillage(streetA);
        var streetB = board.addStreet(streetA);
        var streetC = board.addStreet(streetB);
        board.addVillage(streetC);
        var streetD = board.addStreet(streetC);
        var streetE = board.addStreet(streetD);
        board.addVillage(streetE);
        var streetF = board.addStreet(streetE);
        var streetG = board.addStreet(streetF);
        var streetH = board.addStreet(streetG);
        var streetI = board.addStreet(streetH);
        board.addVillage(streetI);
        var streetJ = board.addStreet(streetI);
        var streetK = board.addStreet(streetJ);
        board.addVillage(streetK);
        var streetL = board.addStreet(streetK);
        var streetM = board.addStreet(streetL);
        board.addVillage(streetM);
        var streetN = board.addStreet(streetM);
        var streetO = board.addStreet(streetN);
        board.addVillage(streetO);
        var streetBA = board.addStreet(streetB);
        board.addCity(streetBA);
        var streetDA = board.addStreet(streetD);
        board.addCity(streetDA);
        board.addCity(streetG);
        var streetJA = board.addStreet(streetJ);
        board.addCity(streetJA);
        board.addKnightsAndRessource(1);
        board.addKnightsAndRessource(1);
        board.addKnightsAndRessource(1);
        board.addKnightsAndRessource(1);
        board.addKnightsAndRessource(1);
        board.addKnightsAndRessource(2);
        board.addKnightsAndRessource(2);
        return board;
    };
    PlusBoard.resume = function () {
        // TODO
    };
    PlusBoard.prototype.addStreet = function (linkedStreet) {
        if (linkedStreet === void 0) { linkedStreet = undefined; }
        var street = new Object_1["default"](Object_1.ObjectType.Street);
        if (linkedStreet) {
            street.addLinkedObject(linkedStreet);
        }
        else {
            street.markObject();
        }
        this.addObject(street);
        return street;
    };
    PlusBoard.prototype.addVillage = function (linkedStreet) {
        var village = new Object_1["default"](Object_1.ObjectType.Village)
            .setObjectPoints(1)
            .addLinkedObject(linkedStreet);
        this.addObject(village);
        return this;
    };
    PlusBoard.prototype.addCity = function (linkedStreet) {
        var city = new Object_1["default"](Object_1.ObjectType.City)
            .setObjectPoints(2)
            .addLinkedObject(linkedStreet);
        this.addObject(city);
        return this;
    };
    PlusBoard.prototype.addKnightsAndRessource = function (amountKnights) {
        var ressource = new Object_1["default"](Object_1.ObjectType.Ressource);
        for (var i = 0; i < amountKnights; ++i) {
            var knight = new Object_1["default"](Object_1.ObjectType.Knight);
            ressource.addLinkedObject(knight);
            this.addObject(knight);
        }
        this.addObject(ressource);
        return this;
    };
    return PlusBoard;
}(PlusBoardLogic_1["default"]));
exports.__esModule = true;
exports["default"] = PlusBoard;

},{"./Object":3,"./PlusBoardLogic":5}],5:[function(require,module,exports){
"use strict";
var PlusBoardLogic = (function () {
    function PlusBoardLogic() {
        this.objects = [];
        this.mostKnightsMarked = false;
        this.longestStreetsMarked = false;
    }
    PlusBoardLogic.prototype.addObject = function (object) {
        this.objects.push(object);
        return this;
    };
    PlusBoardLogic.prototype.getObjects = function () {
        return this.objects;
    };
    PlusBoardLogic.prototype.isObjectMarkable = function (objectIndex) {
        if (this.isFinished()) {
            return false;
        }
        return this.getObjects()[objectIndex].isObjectMarkable();
    };
    PlusBoardLogic.prototype.markObject = function (objectIndex) {
        if (this.isFinished()) {
            return this;
        }
        this.getObjects()[objectIndex].markObject();
        return this;
    };
    PlusBoardLogic.prototype.isMostKnightsChangeable = function () {
        var knightsMarked = this.getObjects()
            .filter(function (object) { return object.isObjectKnight() && object.isObjectMarked(); });
        return knightsMarked.length >= 3;
    };
    PlusBoardLogic.prototype.changeMostKnights = function (mostKnightsMarked) {
        if (!this.isMostKnightsChangeable()) {
            return this;
        }
        this.mostKnightsMarked = mostKnightsMarked;
        return this;
    };
    PlusBoardLogic.prototype.isMostKnightsMarked = function () {
        return this.mostKnightsMarked;
    };
    PlusBoardLogic.prototype.isLongestStreetsChangeable = function () {
        var streetsMarked = this.getObjects()
            .filter(function (object) { return object.isObjectStreet() && object.isObjectMarked(); });
        return streetsMarked.length >= 5;
    };
    PlusBoardLogic.prototype.changeLongestStreets = function (longestStreetsMarked) {
        if (!this.isLongestStreetsChangeable()) {
            return this;
        }
        this.longestStreetsMarked = longestStreetsMarked;
        return this;
    };
    PlusBoardLogic.prototype.isLongestStreetsMarked = function () {
        return this.longestStreetsMarked;
    };
    PlusBoardLogic.prototype.getPoints = function () {
        var points = this.getObjects()
            .filter(function (object) { return object.isObjectMarked(); })
            .map(function (object) { return object.getObjectPoints(); })
            .reduce(function (objectPointsA, objectPointsB) { return objectPointsA + objectPointsB; }, 0);
        if (this.isMostKnightsMarked()) {
            points += 2;
        }
        if (this.isLongestStreetsMarked()) {
            points += 2;
        }
        return points;
    };
    PlusBoardLogic.prototype.isOpen = function () {
        return this.getPoints() < 10;
    };
    PlusBoardLogic.prototype.isFinished = function () {
        return !this.isOpen();
    };
    return PlusBoardLogic;
}());
exports.__esModule = true;
exports["default"] = PlusBoardLogic;

},{}],6:[function(require,module,exports){
"use strict";
var ClassicBoard_1 = require('./logics/ClassicBoard');
var PlusBoard_1 = require('./logics/PlusBoard');
var Dcatan = { ClassicBoard: ClassicBoard_1["default"], PlusBoard: PlusBoard_1["default"] };
window.Dcatan = Dcatan;

},{"./logics/ClassicBoard":1,"./logics/PlusBoard":4}]},{},[6]);
