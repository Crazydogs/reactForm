/*
 *  校验插件
 *  校验通过返回 true, 否则返回 false
 */

define(function (require, exports, module) {
    return function (rule, data) {
        if (!rule) {
            return true;
        }

        var reg;
        switch (rule) {
            case 'need':
                return !!data;
            break;
        };
        return true;
    };
});
