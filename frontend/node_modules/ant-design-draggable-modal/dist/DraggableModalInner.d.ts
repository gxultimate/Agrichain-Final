import * as React from 'react';
import { ModalProps } from 'antd/lib/modal';
import { DraggableModalContextMethods } from './DraggableModalContext';
import { ModalID, ModalState } from './draggableModalReducer';
interface ContextProps extends DraggableModalContextMethods {
    id: ModalID;
    modalState: ModalState;
}
export declare type DraggableModalInnerProps = ModalProps & {
    children?: React.ReactNode;
} & ContextProps;
export declare const DraggableModalInner: React.MemoExoticComponent<({ id, modalState, dispatch, visible, children, title, ...otherProps }: DraggableModalInnerProps) => JSX.Element>;
export {};
