import { useState } from 'react';
var useMaterialUIMenu = function () {
    var _a = useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var handleClose = function () {
        setAnchorEl(null);
    };
    var handleOpen = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var open = Boolean(anchorEl);
    return Object.assign([anchorEl, open, handleOpen, handleClose], { anchorEl: anchorEl, open: open, handleOpen: handleOpen, handleClose: handleClose });
};
export default useMaterialUIMenu;
//# sourceMappingURL=useMaterialUIMenu.js.map