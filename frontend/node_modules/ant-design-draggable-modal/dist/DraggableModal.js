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
import { useContext } from 'react';
import { useUID } from 'react-uid';
import { DraggableModalContext } from './DraggableModalContext';
import { DraggableModalInner } from './DraggableModalInner';
import { getModalState } from './draggableModalReducer';
import './DraggableModal.css';
export var DraggableModal = function (props) {
    // Get the unique ID of this modal.
    var id = useUID();
    // Get modal provider.
    var modalProvider = useContext(DraggableModalContext);
    if (!modalProvider) {
        throw new Error('No Provider');
    }
    var dispatch = modalProvider.dispatch, state = modalProvider.state;
    var modalState = getModalState(state, id);
    // We do this so that we don't re-render all modals for every state change.
    // DraggableModalInner uses React.memo, so it only re-renders if
    // if props change (e.g. modalState).
    return React.createElement(DraggableModalInner, __assign({ id: id, dispatch: dispatch, modalState: modalState }, props));
};
//# sourceMappingURL=DraggableModal.js.map