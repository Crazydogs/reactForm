require(['static/form_test.js'], function( DemoForm ){
    var data = {
        name: 'form1',
        url: 'xxxx.php',
        callback: function(res) {
        },
        items: {
            radio1: {
                type: 'radio',
                radios: '{"test1": 1, "test2": 2}',
                validate: 'need',
                value: 1
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
