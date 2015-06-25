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
    var radio = React.createClass({displayName: "radio",
        getInitialState: function() {
            return {
                // renderState 共有三种状态
                // normal, hide, disable
                renderState: this.props.renderState || '{}',
                validateState: this.validateData()
            }
        },
        componentWillReceiveProps: function (nextProps) {
            this.validateData(nextProps);
        },
        handleClick: function (data) {
            var newData = {};
            newData[this.props.submitKey] = data;
            this.props.onChange(newData);
        },
        createRadio: function (selected, renderState, text, value) {
            var spanStyle = {};
            switch (renderState) {
                case 'hide':
                    spanStyle['display'] = 'none';
                break;
                case 'disable':
                    var disable = true;
                break;
            }
            var radio = (
                React.createElement("span", {className: "component-radio-group", style: spanStyle}, 
                    React.createElement("input", {
                        type: "radio", name: this.props.submitKey, 
                        checked: selected, 
                        onClick: this.handleClick.bind(this, value), 
                        disabled: disable, 
                        key: text}
                    ), 
                    text
                )
            );

            return radio;
        },
        validateData: function (nextProps) {
            var props = nextProps || this.props;
            if (props.validate && props.validate === 'need') {
                if (typeof(props.value) === 'undefined') {
                    this.setState({validateState: false});
                    return false;
                } else {
                    this.setState({validateState: true});
                    return true;
                }
            }
        },
        render: function () {
            var radios = JSON.parse(this.props.radios);
            var states = JSON.parse(this.state.renderState);
            var list = [];
            for (label in radios) {
                var state = states[label] ? states[label] : 'normal';
                if (this.props.value == radios[label]) {
                    list.push(this.createRadio(true, state, label, radios[label]));
                } else {
                    list.push(this.createRadio(false, state, label, radios[label]));
                }
            }

            return (
                React.createElement("div", {className: 'component-radio' + (this.state.validateState?'':' component-warning')}, 
                    list
                )
            );
        }
    });

    return radio;
});
