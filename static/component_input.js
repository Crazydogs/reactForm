/*
 *  普通文本框
 *  接受 props
 *    输入
 *      value: 文本框的内容
 *      submitKey: 字符串，组件对应提交时的key
 *      renderState: 字符串，可以是 normal, hide, disable 三个之一
 *      validate: 字符串，可以是多个条件用 '|' 分隔
 *    输出
 *      onChange: 组件数据变化时输出
 */
define(function (require, exports, module) {
    var input = React.createClass({displayName: "input",
        handleChange: function(e) {
            var newData = {};
            newData[this.props.submitKey] = e.target.value;
            this.props.onChange(newData);
        },
        validateData: function() {
            var validateStr = this.props.validate;
            if (!validateStr) {
                return true;
            }
        },
        render: function () {
            return (
                React.createElement("div", {className: 'component-radio'}, 
                    React.createElement("input", {ref: "inputDom", 
                        onChange: this.handleChange, 
                        value: this.props.value || ''}
                    )
                )
            );
        }
    });
    return input;
});
