/*
 *  单选框组
 *  接受 props
 *    输入
 *      radios: json 对象，{'选项名': 选项值}
 *      value: 单选组的值
 *      submitKey: 字符串，组件对应提交时的key
 *      renderState: 键值对，每个选项对应三种状态，默认为 normal
 *      validate: 字符串，可选值: 'need'
 *    输出
 *      onChange: 组件数据变化时触发此方法
 */

define(function (require, exports, module) {
    var radio = React.createClass({
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
                <span className="component-radio-group">
                    <input
                        type="radio" name={this.props.submitKey}
                        checked={selected}
                        onClick={this.handleClick.bind(this, data.value)}
                        disabled={!dependent}
                        key={data.key}
                    />
                    {data.key}
                </span>
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

            console.log(this.state);
            return (
                <div className={'component-radio' + (this.state.validateState?'':' component-warning')}>
                    <label className="component-label">{label}</label>
                    {list}
                </div>
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
                if (typeof(props.value) === 'undefined') {
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
