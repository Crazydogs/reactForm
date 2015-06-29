require(['static/form_test.js'], function( DemoForm ){
    var data = {
        name: 'form1',
        url: 'xxxx.php',
        callback: function(res) {
        },
        items: {
            radio1: {
                type: 'radio',
                label: '越来越短→_→',
                radios: [
                    {key: "我是单选框1（— —）", value: 1},
                    {key: "我是2←_←", value: 2},
                    {key: "3", value: 3}
                ],
                validate: 'need',
                value: 1,
                dependent: {
                    "3": {
                        input1: 'lalala'
                    }
                }
            },
            input1: {
                type: 'input',
                validate: 'need',
                label: 'test1'
            },
            input2: {
                type: 'input',
                label: '文本框2',
                dependent: {
                    radio1: 2
                }
            }
        }
    };
    React.render(
        <DemoForm formData={data} />,
        document.getElementById('content')
    );
});
