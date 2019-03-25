import * as React from 'react';
import { ModalProps } from 'antd/lib/modal';
import './DraggableModal.css';
export declare type DraggableModalProps = ModalProps;
export declare const DraggableModal: (props: ModalProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
