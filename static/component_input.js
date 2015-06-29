/*
 *  普通文本框
 *  接受 props
 *    输入
 *      submitKey: 字符串，组件对应提交时的key
 *      formData: json 对象，表单数据
 *          label: 字符串，组件 label
 *          validate: 数据合法规则
 *          value: 当前值
 *          dependent: 字符串，数据合法性校验条件
 *    输出
 *      onChange: 组件数据变化时输出
 */
define(function (require, exports, module) {
    var Validate = require('static/lib/validate.js');

    var input = React.createClass({displayName: "input",
        getInitialState: function() {
            return {
                validateState: this.validateData(),
                dependentState: this.checkDependent()
            };
        },
        componentWillReceiveProps: function(nextProps) {
            // props 更新的时候重新校验合法性
            this.validateData(nextProps);
            this.checkDependent(nextProps);
        },
        handleChange: function(e) {
            var newData = {};
            newData[this.props.submitKey] = e.target.value;
            this.props.onChange(newData);
        },
        render: function () {
            var componentData = this.props.formData[this.props.submitKey];
            return (
                React.createElement("div", {className: 'component-input' + (this.state.validateState?'':' component-warning')}, 
                    React.createElement("label", {className: "component-label"}, componentData.label), 
                    React.createElement("input", {ref: "inputDom", 
                        onChange: this.handleChange, 
                        value: componentData.value || '', 
                        // 如果依赖不成立，表现为 disabled
                        disabled: !this.state.dependentState}
                    )
                )
            );
        },
        validateData: function(nextProps) {
            var props = nextProps || this.props;
            // 第一次渲染的时候还没有设置 validate 状态，所以第一次并不会校验失败
            var componentData = props.formData[props.submitKey];
            var validateStr = componentData.validate;

            // 没有要求直接通过
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
        checkDependent: function (nextProps) {
            var props = nextProps || this.props;
            var componentData = props.formData[props.submitKey];
            var dependent = componentData.dependent;

            // 默认通过
            if (!dependent) {
                this.setState({dependentState: true});
                return true;
            }
            // 校验是否满足对其他数据的依赖
            var data = props.formData;
            for (rule in dependent) {
                if (data[rule].value != dependent[rule]){
                    this.setState({dependentState: false});
                    return false;
                }
            }
            this.setState({dependentState: true});
            return true;
        }
    });
    return input;
});
