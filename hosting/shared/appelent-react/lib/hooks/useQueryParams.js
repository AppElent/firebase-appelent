import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
var useQueryParams = function () {
    var _a = useState({}), params = _a[0], setParams = _a[1];
    var location = useLocation();
    useEffect(function () {
        //If there is a query param named tab then set that tab
        var Qparams = new URLSearchParams(location.search);
        var newParams = {};
        Qparams.forEach(function (value, key) {
            newParams[key] = value;
        });
        setParams(newParams);
    }, [location.search]);
    return params;
};
export default useQueryParams;
//# sourceMappingURL=useQueryParams.js.map