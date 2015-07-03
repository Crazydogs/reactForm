define(function (require, exports, module) {
    var CheckDependent = function (formData, rules) {
        if (!rules) {
            return true;
        }

        for (var i = 0; i < formData.length; i++) {
            var data = formData[i];
            var value = data.value;
            var key = data.submitKey;

            for (rule in rules){
                if (rule == key && value != rules[rule]) {
                    return false;
                }
            }
        }
        return true;
    }

    return CheckDependent;
});
