/*
 *  测试用表单
 *  渲染依赖于传入数据
 *  接受 props
 *      data: json 对象，表单包含的元素，以及他们的渲染状态和依赖
 */

define(function (require, exports, module) {
    var ComponentRadio = require('static/component_radio.js');
    var ComponentInput = require('static/component_input.js');
    
    var form = React.createClass({displayName: "form",
        getInitialState: function () {
            return {
                items: this.props.formData.items
            };
        },
        handleChange: function (data) {
            // 复制 state, 但仅能复制简单数据
            var nextState = JSON.parse(JSON.stringify(this.state));
            for (key in data) {
                nextState.items[key].value = data[key];
            }
            this.setState(nextState);
        },
        render: function () {
            var list = this.renderList(this.state.items);
            return (
                React.createElement("form", {className: "component-form"}, 
                    list
                )
            );
        },
        renderList: function (data) {
            var list = [];
            for (item in data) {
                switch (data[item].type) {
                    case 'input':
                        list.push(
                            React.createElement(ComponentInput, {
                                submitKey: item, 
                                onChange: this.handleChange, 
                                formData: this.state.items}
                            )
                        );
                    break;
                    case 'radio':
                        list.push(
                            React.createElement(ComponentRadio, {
                                submitKey: item, 
                                onChange: this.handleChange, 
                                formData: this.state.items}
                            )
                        )
                    break;
                }
            }
            return list;
        }
    });

    return form
});
