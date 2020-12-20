import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
var useTabs = function (initialTab) {
    if (initialTab === void 0) { initialTab = ''; }
    var _a = useState(initialTab), tab = _a[0], setTab = _a[1];
    var location = useLocation();
    useEffect(function () {
        //If there is a query param named tab then set that tab
        var params = new URLSearchParams(location.search);
        var tabQuery = params.get('tab');
        if (tabQuery) {
            setTab(tabQuery);
        }
    }, [location.search]);
    var handleTabChange = useCallback(function (_e, newValue) {
        setTab(newValue);
    }, []);
    return { tab: tab, handleTabChange: handleTabChange, setTab: setTab };
};
export default useTabs;
//# sourceMappingURL=useTabs.js.map