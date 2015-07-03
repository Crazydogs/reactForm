define(function (require, exports, module) {
    var CheckDpendent = require('static/jquery_checkDependent.js');

    var Input = function (formData, index, onChange) {
        var self = this;

        var componentData = formData[index];

        // 渲染状态
        self.validateSate = true;
        self.dependentState = true;

        self.create = function () {
            self.checkDependent();

            var $input = $('<input id="' + componentData.submitkey + '" />');
            var $group = $('<div class="component-input component-form-item">'
                + '<label class="component-form-label">' + componentData.label + '</label>'
                + '</div>');
            if (!self.dependentState) {
                $input.attr('disabled', 'disabled');
            }
            $input.change(self.handleChange);
            $input.val(componentData.value);
            $group.append($input);
            return $group;
        };

        self.handleChange = function (e) {
            var data = {};
            data.index = index;
            data.value = $(e.target).val();
            data.error = null;

            onChange(data);
        };

        self.checkDependent = function () {
            if (CheckDpendent(formData, componentData.dependent)) {
                self.dependentState = true;
            } else {
                self.dependentState = false;
            }
        };
    }

    return Input;
});
