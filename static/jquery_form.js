define(function (require, exports, module) {
    var ComponentInput = require('static/jquery_input.js');
    var ComponentRadio = require('static/jquery_radio.js');

    var Form = function (formData, container) {
        var self = this;

        // 表单配置数据
        self.formData = formData;
        self.itemsData = formData.items;

        // 渲染结果容器
        self.container = container;

        // 数据变化事件
        self.handleChange = function (data) {
            if (!data.error) {
                self.itemsData[data.index].value = data.value;
                console.log(self.itemsData);
                self.render();
            }
        };

        // 初始化表单元素构造器
        self.factorys = [];
        for (var i = 0; i < self.itemsData.length; i++) {
            switch (self.itemsData[i].type) {
                case 'input':
                    self.factorys.push(new ComponentInput(self.itemsData, i, self.handleChange));
                break;
                case 'radio':
                    self.factorys.push(new ComponentRadio(self.itemsData, i, self.handleChange));
                break;
            }
        }

        self.render = function () {
            var items = self.itemsData;
            var factorys = self.factorys;
            var $form = $('<form>');

            for (var i = 0; i < factorys.length; i++) {
                var $item = factorys[i].create();
                $form.append($item);
            }

            container.html($form);
        };

    }
    return Form;
});
