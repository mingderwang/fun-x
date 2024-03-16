export (function() {
    sequence = (function() {
        var chained = [];
        var value;
        var error;

        var chain = function(func) {
            chained.push(func);
            return this;
        };

        var execute = function(index) {
            var callback;
            index = typeof index === "number" ? index : 0;

            if ( index >= chained.length ) {
                chained = [];
                return true;
            }

            callback = chained[index];

            callback({
                resolve: function(_value) {
                    value = _value;
                    execute(++index);
                },
                reject: function(_error) {
                    error = _error;
                    execute(++index);
                },
                response: {
                    value: value,
                    error: error
                }
            });
        
