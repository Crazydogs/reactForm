require(['static/jquery_form.js'], function (Form) {
    var data = {
        name: 'form1',
        url: 'test.php',
        callback: function (res) {
        },
        items: [
            {
                submitKey: 'radio1',
                type: 'radio',
                label: '我是单选框',
                value: 1,
                radios: [
                    {
                        value: 1,
                        label: '我是1'
                    },
                    {
                        value: 2,
                        label: '选2才能填文本框2'
                    }
                ],
                dependent: [
                    {
                        input1: 'show me your money'
                    }
                ]
            },
            {
                submitKey: 'input1',
                type: 'input',
                label: '我是文本框1',
                value: 'lalalalala'
            },
            {
                submitKey: 'input2',
                type: 'input',
                label: '我是文本框2',
                value: '我要单选选了第二个才能用',
                dependent: {
                    radio1: 2
                }
            },
            {
                submitKey: 'input3',
                type: 'input',
                label: '我是文本框3',
                value: '我要文本框2值为123才能用',
                dependent: {
                    input2: '123'
                }
            },
            {
                submitKey: 'radio2',
                type: 'radio',
                label: '我是单选框2',
                radios: [
                    {
                        value: 1,
                        label: '我要单选框1选了1才能用'
                    },
                    {
                        value: 2,
                        label: '我要单选框1选了2才能用'
                    }
                ]
            },
            {
                submitKey: 'input4',
                type: 'input',
                label: '我是文本框4',
                value: '我要单选框2选了2且文本框1值为321才能用',
                dependent: {
                    radio2: 2
                }
            }
        ]
    };

    var form1 = new Form(data, $('body'));
    var $form = form1.render();
});
