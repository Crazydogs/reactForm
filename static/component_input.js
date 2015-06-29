/*
 *  普通文本框
 *  接受 props
 *    输入
 *      value: 文本框的内容
 *      submitKey: 字符串，组件对应提交时的key
 *      dependent: json 对象，依赖的其他原件的值
 *      formData: 表单数据，用于校验依赖
 *    输出
 *      onChange: 组件数据变化时输出
 */
define(function (require, exports, module) {
    var Validate = require('static/lib/validate.js');

    var input = React.createClass({displayName: "input",
        getInitialState: function() {
            return {
                componentData: this.props.formData[this.props.submitKey],
                validateState: this.validateData()
            }
        },
        componentWillReceiveProps: function(nextProps) {
            // props 更新的时候重新校验合法性
            this.validateData(nextProps);
        },
        handleChange: function(e) {
            var newData = {};
            newData[this.props.submitKey] = e.target.value;
            this.props.onChange(newData);
        },
        render: function () {
            var props = this.props
            // 默认依赖条件通过
            var dependentState = true;
            if (props.dependent) {
                if (!this.checkDependent(props.dependent, props.formData)) {
                    dependentState = false;
                };
            }
            return (
                React.createElement("div", {className: 'component-radio' + (this.state.validateState?'':' component-warning')}, 
                    React.createElement("label", null, this.state.componentData.label), 
                    React.createElement("input", {ref: "inputDom", 
                        onChange: this.handleChange, 
                        value: this.props.value || '', 
                        // 如果依赖不成立，表现为 disabled
                        disabled: !dependentState}
                    )
                )
            );
        },
        validateData: function(nextProps) {
            // 数据合法性校验
            // 合法返回 true，否则返回 false
            var props = nextProps ? nextProps : this.props;
            // 第一次渲染的时候还没有设置 validate 状态，所以第一次并不会校验失败
            var validateStr = this.state && this.state.componentData.validate;

            if (!validateStr) {
                this.setState({validateState: true});
                return true;
            }
            var validateList = validateStr.split('|');
            for (rule in validateList) {
                if (!Validate(validateList[rule], props.value)) {
                    this.setState({validateState: false});
                    return false;
                }
            }
            this.setState({validateState: true});
            return true;
        },
        checkDependent: function (rules, data) {
            // 校验是否满足对其他数据的依赖
            for (rule in rules) {
                if (rules[rule] != data[rule].value) {
                    return false
                }
            }
            return true;
        }
    });
    return input;
});
