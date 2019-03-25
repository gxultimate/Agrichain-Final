var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import './ResizeHandle.css';
export var ResizeHandle = function (props) { return (React.createElement("div", __assign({ className: "ant-design-draggable-modal-resize-handle" }, props),
    React.createElement("div", { className: "ant-design-draggable-modal-resize-handle-inner" }))); };
//# sourceMappingURL=ResizeHandle.js.map