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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState, useEffect, useCallback } from 'react';
import validate from 'validate.js';
import * as _ from 'lodash';
var get = function (key, storage) {
    if (storage === void 0) { storage = window.localStorage; }
    var item = storage.getItem(key);
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : undefined;
};
var set = function (key, value, storage) {
    if (storage === void 0) { storage = window.localStorage; }
    // Allow value to be a function so we have same API as useState
    var valueToStore = value instanceof Function ? value(value) : value;
    // Save to local storage
    storage.setItem(key, JSON.stringify(valueToStore));
};
function useForm(stateSchema, validationSchema, callback, options) {
    var _this = this;
    if (validationSchema === void 0) { validationSchema = {}; }
    if (options === void 0) { options = {}; }
    var formatStateSchema = function (schema) {
        var newSchema = {};
        var keys = Object.keys(schema);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            newSchema[key] = {
                value: schema[key],
                error: '',
                touched: false,
            };
        }
        return newSchema;
    };
    var formatStateDate = function (data) {
        var newSchema = {};
        var keys = Object.keys(data);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            newSchema[key] = data[key].value;
        }
        return newSchema;
    };
    var _a = useState(formatStateSchema(stateSchema)), state = _a[0], setState = _a[1];
    // Used to disable submit button if there's an error in state
    // or the required field in state has no value.
    // Wrapped in useCallback to cached the function to avoid intensive memory leaked
    // in every re-render in component
    var validateState = useCallback(function () {
        if (_.isEmpty(validationSchema)) {
            return true;
        }
        var stateKeys = Object.keys(state);
        var validationState = {};
        for (var _i = 0, stateKeys_1 = stateKeys; _i < stateKeys_1.length; _i++) {
            var key = stateKeys_1[_i];
            validationState[key] = state[key].value;
        }
        var errors = validate(validationState, validationSchema);
        if (!errors)
            return true;
        return false;
    }, [state, validationSchema]);
    useEffect(function () {
        if (options.localStorage) {
            var lsdata = get(options.localStorage);
            if (lsdata)
                setState(formatStateSchema(lsdata));
        }
    }, []);
    var _b = useState(false), hasError = _b[0], setHasError = _b[1];
    var _c = useState(false), isDirty = _c[0], setIsDirty = _c[1];
    var _d = useState(false), submitting = _d[0], setSubmitting = _d[1];
    // Disable button in initial render.
    /*
  useEffect(() => {
    setHasError(true);
  }, []);
  */
    // For every changed in our state this will be fired
    // To be able to disable the button
    useEffect(function () {
        if (isDirty) {
            setHasError(!validateState());
        }
    }, [state, isDirty]);
    // Used to handle every changes in every input
    var handleOnChange = useCallback(function (event) {
        var _a, _b;
        if (isDirty === false)
            setIsDirty(true);
        var name = event.target.name;
        var value = event.target.value;
        if (event.target.type === 'number') {
            value = parseInt(event.target.value);
        }
        else if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }
        var error = '';
        var validateErrors = validate((_a = {}, _a[name] = value, _a), validationSchema);
        if (validateErrors) {
            error = validateErrors[name];
        }
        if (options.localStorage)
            set(options.localStorage, formatStateDate(__assign(__assign({}, state), (_b = {}, _b[name] = { value: value }, _b))));
        setState(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[name] = { value: value, error: error, touched: true }, _a)));
        });
    }, [validationSchema]);
    var handleOnValueChange = useCallback(function (name) { return function (value) {
        var _a, _b;
        if (isDirty === false)
            setIsDirty(true);
        var error = '';
        var validateErrors = validate((_a = {}, _a[name] = value, _a), validationSchema);
        if (validateErrors) {
            error = validateErrors[name];
        }
        console.log(999, error, name, value);
        if (options.localStorage)
            set(options.localStorage, formatStateDate(__assign(__assign({}, state), (_b = {}, _b[name] = { value: value }, _b))));
        setState(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[name] = { value: value, error: error, touched: true }, _a)));
        });
    }; }, [validationSchema]);
    var setFormValue = useCallback(function (object) {
        if (isDirty === false)
            setIsDirty(true);
        var savedNewState = __assign({}, state);
        var error = '';
        var _loop_1 = function (name_1) {
            var _a, _b;
            var value = object[name_1];
            var validateErrors = validate((_a = {}, _a[name_1] = value, _a), validationSchema);
            if (validateErrors) {
                error = validateErrors[name_1];
            }
            console.log(999, error, name_1, value);
            savedNewState = __assign(__assign({}, savedNewState), (_b = {}, _b[name_1] = { value: value }, _b));
            if (options.localStorage)
                set(options.localStorage, formatStateDate(savedNewState));
            setState(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[name_1] = { value: value, error: error, touched: true }, _a)));
            });
        };
        for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            _loop_1(name_1);
        }
    }, [validationSchema]);
    //Used to handle submit (with state showing submitting (true||false))
    var handleOnSubmit = useCallback(function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (event)
                        event.preventDefault();
                    if (!validateState()) return [3 /*break*/, 2];
                    setSubmitting(true);
                    return [4 /*yield*/, callback(state)];
                case 1:
                    _a.sent();
                    setSubmitting(false);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, [state]);
    //Function to set initial state after submitting
    var setInitial = useCallback(function () {
        setState(stateSchema);
    }, []);
    return {
        hasError: hasError,
        isDirty: isDirty,
        state: state,
        handleOnChange: handleOnChange,
        handleOnValueChange: handleOnValueChange,
        setFormValue: setFormValue,
        handleOnSubmit: handleOnSubmit,
        submitting: submitting,
        setInitial: setInitial,
    };
}
export default useForm;
//# sourceMappingURL=useForm.js.map