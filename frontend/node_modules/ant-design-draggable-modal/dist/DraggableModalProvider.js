import * as React from 'react';
import { useEffect, useReducer } from 'react';
import { DraggableModalContext } from './DraggableModalContext';
import { getWindowSize } from './getWindowSize';
import { draggableModalReducer, initialModalsState } from './draggableModalReducer';
export var DraggableModalProvider = function (_a) {
    var children = _a.children;
    var _b = useReducer(draggableModalReducer, initialModalsState), state = _b[0], dispatch = _b[1];
    useEffect(function () {
        if (typeof window !== 'object') {
            return;
        }
        var onResize = function () { return dispatch({ type: 'windowResize', size: getWindowSize() }); };
        window.addEventListener('resize', onResize);
        onResize();
        return function () { return window.removeEventListener('resize', onResize); };
    }, [dispatch]);
    return (React.createElement(DraggableModalContext.Provider, { value: {
            state: state,
            dispatch: dispatch,
        } }, children));
};
//# sourceMappingURL=DraggableModalProvider.js.map