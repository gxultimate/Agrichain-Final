import { useState, useEffect, useCallback } from 'react';
export var useResize = function (x, y, width, height, onResize) {
    var _a = useState(false), dragging = _a[0], setDragging = _a[1];
    var _b = useState({
        initX: 0,
        initY: 0,
        initWidth: 0,
        initHeight: 0,
        mouseDownX: 0,
        mouseDownY: 0,
    }), initialDragState = _b[0], setInitialDragState = _b[1];
    var onMouseDown = useCallback(function (e) {
        e.preventDefault();
        setInitialDragState({
            initX: x,
            initY: y,
            initWidth: width,
            initHeight: height,
            mouseDownX: e.clientX,
            mouseDownY: e.clientY,
        });
        setDragging(true);
    }, [width, height, setDragging, setInitialDragState, x, y]);
    useEffect(function () {
        var onMouseMove = function (e) {
            if (dragging) {
                var initX = initialDragState.initX, initY = initialDragState.initY, initWidth = initialDragState.initWidth, mouseDownX = initialDragState.mouseDownX, initHeight = initialDragState.initHeight, mouseDownY = initialDragState.mouseDownY;
                var dx = e.clientX - mouseDownX;
                var dy = e.clientY - mouseDownY;
                var width_1 = initWidth + dx;
                var height_1 = initHeight + dy;
                return onResize({ x: initX, y: initY, width: width_1, height: height_1 });
            }
        };
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        return function () { return window.removeEventListener('mousemove', onMouseMove); };
    }, [initialDragState, dragging, onResize]);
    useEffect(function () {
        var onMouseUp = function () {
            setDragging(false);
        };
        window.addEventListener('mouseup', onMouseUp);
        return function () { return window.removeEventListener('mouseup', onMouseUp); };
    }, [setDragging]);
    return onMouseDown;
};
//# sourceMappingURL=useResize.js.map