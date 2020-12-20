//import { useMediaQuery } from 'react';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
var useCustomMediaQuery = function () {
    var theme = useTheme();
    var isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true,
    });
    return isDesktop;
};
export default useCustomMediaQuery;
//# sourceMappingURL=useCustomMediaQuery.js.map