import { useState } from 'react';
var useStateExtended = function (initialValue, initialLoading) {
    if (initialLoading === void 0) { initialLoading = false; }
    var _a = useState(initialValue), data = _a[0], setData = _a[1];
    var _b = useState(initialLoading), loading = _b[0], setLoading = _b[1];
    return {
        data: data,
        setData: setData,
        loading: loading,
        setLoading: setLoading,
    };
};
export default useStateExtended;
//# sourceMappingURL=useStateExtended.js.map