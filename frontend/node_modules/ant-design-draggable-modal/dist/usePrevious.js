import { useRef, useEffect } from 'react';
export var usePrevious = function (value) {
    var ref = useRef(null);
    useEffect(function () {
        // @ts-ignore
        ref.current = value;
    });
    return ref.current;
};
//# sourceMappingURL=usePrevious.js.map