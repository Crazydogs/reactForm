/*
 *  demo 1 表单
 *  级联表单的处理
 */

 define(function (require, exports, module) {
    var ComponentInput = require('static/component_input.js');
    var ComponentRadio = require('static/component_radio.js');
    
    var form = React.createClass({
        getInitialState: function() {
            return {
                inputtype: null,
                text1: null,
                text2: null
            }
        },
        dataChange: function(data) {
            this.setState(data);
            console.log(this.state);
        },
        render: function () {
            return (
                <form>
                    <ComponentRadio
                        onChange={this.dataChange}
                        formkey='inputtype'
                        radios='{"male": 1, "female": 2}'
                        selected={this.state.inputtype}
                    />
                    <ComponentInput onChange={this.dataChange} formkey="text1" />
                    <ComponentInput onChange={this.dataChange} formkey="text2" />
                </form>
            );
        }
    })

    return form;
 });
