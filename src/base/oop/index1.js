var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// clone VS new
function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    console.log(this.name);
    return this.name;
};
var p1 = new Person('waj');
console.log(p1);
function ObjectFactory() {
    var obj = new Object();
    var Cstr = Array.prototype.shift.call(arguments);
    obj.__proto__ = Cstr.prototype;
    var result = Cstr.apply(obj, arguments);
    return typeof result === 'object' ? result : obj;
}
var p2 = ObjectFactory(Person, 'waj');
console.log(p2);
console.log({});
console.log(ObjectFactory(Object));
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.getName = function () {
        console.log(this.name);
        return this.name;
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    return Dog;
}(Animal));
var d = new Dog('dog');
