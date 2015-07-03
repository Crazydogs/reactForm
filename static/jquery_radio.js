define(function (require, exports, module) {
    var CheckDpendent = require('static/jquery_checkDependent.js');

    var Radio = function (formData, index, onChange) {
        var self = this;

        var componentData = formData[index];

        // 渲染状态
        self.validateSate = true;
        self.dependentState = true;

        self.create = function () {
            var radios = componentData.radios;
            var $group = $('<div class="component-radio component-form-item">'
                + '<label class="component-form-label">' + componentData.label + '</label>'
                + '</div>');
            for (var i = 0; i < radios.length; i++) {
                var radio = radios[i];
                var $radio = $('<span><input type="radio"'
                    + 'name="' + componentData.submitKey + '"'
                    + 'value="' + radio.value + '"'
                    + ' />' + radio.label + '</span>');
                if (componentData.value == radio.value) {
                    $radio.find('input').attr('checked', 'checked');
                }
                $group.append($radio)
            }
            $group.delegate('input', 'click', self.handleChange);
            return $group;
        };

        self.handleChange = function (e) {
            e.preventDefault();
            var data = {};
            data.index = index;
            data.value = $(e.target).attr('value');
            data.error = null;

            onChange(data);
        };

        self.checkDependent = function () {
        };
    }

    return Radio;
});
