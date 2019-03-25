import { useState, useEffect, useCallback } from 'react';
export var useDrag = function (x, y, onDrag) {
    var _a = useState(false), dragging = _a[0], setDragging = _a[1];
    var _b = useState({
        initX: 0,
        initY: 0,
        mouseDownX: 0,
        mouseDownY: 0,
    }), initialDragState = _b[0], setInitialDragState = _b[1];
    var onMouseDown = useCallback(function (e) {
        e.preventDefault();
        setInitialDragState({
            initX: x,
            initY: y,
            mouseDownX: e.clientX,
            mouseDownY: e.clientY,
        });
        setDragging(true);
    }, [x, y, setDragging, setInitialDragState]);
    useEffect(function () {
        var onMouseMove = function (e) {
            if (dragging) {
                var initX = initialDragState.initX, mouseDownX = initialDragState.mouseDownX, initY = initialDragState.initY, mouseDownY = initialDragState.mouseDownY;
                var dx = e.clientX - mouseDownX;
                var dy = e.clientY - mouseDownY;
                var x_1 = initX + dx;
                var y_1 = initY + dy;
                onDrag({ x: x_1, y: y_1 });
            }
        };
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        return function () { return window.removeEventListener('mousemove', onMouseMove); };
    }, [initialDragState, dragging, onDrag]);
    useEffect(function () {
        var onMouseUp = function () {
            setDragging(false);
        };
        window.addEventListener('mouseup', onMouseUp);
        return function () { return window.removeEventListener('mouseup', onMouseUp); };
    }, [setDragging]);
    return onMouseDown;
};
//# sourceMappingURL=useDrag.js.map