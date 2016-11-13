/// <reference path="../typings/underscore/underscore.d.ts" />
"use strict";
const _ = require('underscore');
class Helpers {
    static format(formatter, value) {
        return _.isFunction(formatter)
            ? formatter(value)
            : _.isObject(formatter)
                ? formatter.format(value)
                : value;
    }
}
exports.Helpers = Helpers;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEOztBQUU5RCxNQUFZLENBQUMsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUVoQztJQUNFLE9BQU8sTUFBTSxDQUFDLFNBQVMsRUFBRSxLQUFLO1FBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztjQUMxQixTQUFTLENBQUMsS0FBSyxDQUFDO2NBQ2hCLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO2tCQUNyQixTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztrQkFDdkIsS0FBSyxDQUFDO0lBQ1osQ0FBQztBQUNILENBQUM7QUFSWSxlQUFPLFVBUW5CLENBQUEiLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3VuZGVyc2NvcmUvdW5kZXJzY29yZS5kLnRzXCIgLz5cblxuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcblxuZXhwb3J0IGNsYXNzIEhlbHBlcnMge1xuICBzdGF0aWMgZm9ybWF0KGZvcm1hdHRlciwgdmFsdWUpIHtcbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKGZvcm1hdHRlcilcbiAgICAgID8gZm9ybWF0dGVyKHZhbHVlKVxuICAgICAgOiBfLmlzT2JqZWN0KGZvcm1hdHRlcilcbiAgICAgID8gZm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSlcbiAgICAgIDogdmFsdWU7XG4gIH1cbn1cbiJdfQ==
