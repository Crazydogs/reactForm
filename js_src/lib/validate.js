/*
 *  校验插件
 */

define(function (require, exports, module) {
    return function (rule, data) {
        switch (rule) {
            case 'need':
                return typeof(data) === 'undefined' ? false : true;
            break;
        };
    };
});
