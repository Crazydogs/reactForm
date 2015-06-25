/*
 * 测试用表单
 */

define(function (require, exports, module) {
    var ComponentRadio = require('static/component_radio.js');
    var ComponentInput = require('static/component_input.js');
    
    var form = React.createClass({
        getInitialState: function () {
            return {
                radio1: 1
            };
        },
        handleChange: function (data) {
            this.setState(data);
        },
        render: function () {
            return (
                <form>
                    <ComponentRadio
                        radios='{"test1": 1, "test2": 2}'
                        submitKey='radio1'
                        value={this.state.radio1}
                        onChange={this.handleChange}
                        validate='need'
                    />
                    <ComponentInput
                        submitKey="text1"
                        value={this.state.text1}
                        onChange={this.handleChange}
                    />
                </form>
            );
        }
    });

    return form
});
