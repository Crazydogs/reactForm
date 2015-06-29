/*
 *  单选框组
 *  接受 props
 *    输入
 *      submitKey: 字符串，组件对应提交时的key
 *      formData: json 对象，表单数据
 *          label: 字符串，组件 label
 *          radios: 数组，单选框组
 *              key: 选项名
 *              value: 选项值
 *          validate: 数据合法规则
 *          value: 当前值
 *          dependent: json 对象，各个选项可用的条件
 *    输出
 *      onChange: 组件数据变化时触发此方法
 */

define(function (require, exports, module) {
    var radio = React.createClass({displayName: "radio",
        getInitialState: function () {
            return {
                validateState: this.validateData(),
                dependentState: this.checkDependent()
            }
        },
        componentWillReceiveProps: function (nextProps) {
            this.validateData(nextProps);
            this.checkDependent(nextProps);
        },
        handleClick: function (data) {
            var newData = {};
            newData[this.props.submitKey] = data;
            this.props.onChange(newData);
        },
        createRadio: function (data) {
            var componentData = this.props.formData[this.props.submitKey];
            var selected = data.value === componentData.value ? true : false;
            var dependent = this.state.dependentState[data.key];
            var radio = (
                React.createElement("span", {className: "component-radio-group"}, 
                    React.createElement("input", {
                        type: "radio", name: this.props.submitKey, 
                        checked: selected, 
                        onClick: this.handleClick.bind(this, data.value), 
                        disabled: !dependent, 
                        key: data.key}
                    ), 
                    data.key
                )
            );

            return radio;
        },
        render: function () {
            var componentData = this.props.formData[this.props.submitKey];
            var radios = componentData.radios;
            var label = componentData.label;
            var list = [];
            for (var i = 0; i < radios.length; i++) {
                list.push(this.createRadio(radios[i]))
            }

            return (
                React.createElement("div", {className: 'component-radio' + (this.state.validateState?'':' component-warning')}, 
                    React.createElement("label", {className: "component-label"}, label), 
                    list
                )
            );
        },
        checkDependent: function (nextProps) {
            var props = nextProps || this.props;
            var dependent = props.formData[props.submitKey].dependent;
            var dependentState =
                (this.state && this.state.dependentState)
                ? JSON.parse(JSON.stringify(this.state.dependentState)) // 拷贝
                : {};
            var radios = props.formData[props.submitKey].radios;

            // 校验依赖是否成立
            for (var i = 0; i < radios.length; i++) {
                var key = radios[i].key;
                if(dependent && dependent[key]){
                    // 对每个选项进行校验
                    var rules = dependent[key];
                    var flag = true;
                    for (rule in rules) {
                        // 对选项的每一个依赖进行校验
                        if (rules[rule] != props.formData[rule].value){
                            dependentState[key] = false;
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        dependentState[key] = true;
                    }
                } else {
                    dependentState[key] = true;
                }

                if (!dependentState[key]) {
                    var value = props.formData[props.submitKey].value;
                    if (value === radios[i].value) {
                        // 如果依赖不能满足，且此选项被选中，把组件的值设为空
                        this.handleClick(undefined);
                    }
                }
            }

            this.setState({dependentState: dependentState});
            return dependentState;
        },

        validateData: function (nextProps) {
            var props = nextProps || this.props;
            var componentData = props.formData[props.submitKey];
            var validate = componentData.validate;
            if (validate && validate === 'need') {
                if (typeof(componentData.value) === 'undefined') {
                    this.setState({validateState: false});
                    return false;
                }
            }
            this.setState({validateState: true});
            return true;
        },
    });

    return radio;
});
