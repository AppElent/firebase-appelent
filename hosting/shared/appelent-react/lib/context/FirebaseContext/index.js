// @flow
import React, { useContext } from 'react';
export var FirebaseContext = React.createContext({});
export var useSession = function () { return useContext(FirebaseContext); }; // eslint-disable-line
export default FirebaseContext;
//# sourceMappingURL=index.js.map