require(['static/form_test.js'], function( DemoForm ){
    React.render(
        React.createElement(DemoForm, null),
        document.getElementById('content')
    );
});
