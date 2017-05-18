
const calculator = (function() {

    const display = document.querySelector(".calculator__display");

    display.value = 0;
    display.memory = 1;
    display.dot = 0;
    display.operator = null;

    display.reset = function () {
        display.memory = display.value;
        display.value = 0;
        display.dot = 0;
    };

    display.applyOperator = function () {
        switch (display.operator){
            case 'plus':
                display.memory += display.value;
                display.value = 0;
                break;
            case 'minus':
                display.memory -= display.value;
                display.value = 0;
                break;
            case 'times':
                display.memory *= display.value;
                display.value = 0;
                break;
            case 'division':
                display.memory /= display.value;
                display.value = 0;
                break;
        }
    };

    display.update = function (){display.innerHTML = display.value};

    display.update();

    const buttonClick = function (e){
        const key = e.target.dataset.key;
        if (!isNaN(key)) {
            if (!display.dot) {
                display.value = 10 * display.value + parseInt(key);
            } else {
                display.value += key / Math.pow(10, display.dot);
                display.dot ++;
            }
            display.update();
            return
        }

        switch(key) {
            case 'dot':
                if (!display.dot){
                    display.dot = 1;
                }
                break;
            case 'clear':
                    display.value = 0;
                    display.dot = 0;
                    display.operator = null;
                break;
            case 'allclear':
                display.memory = 0;
                display.value = 0;
                display.dot = 0;
                display.operator = null;
                break;
            case 'plus':
                display.reset();
                display.applyOperator();
                display.operator = 'plus';
                break;
            case 'minus':
                display.reset();
                display.applyOperator();
                display.operator = 'minus';
                break;
            case 'times':
                display.reset();
                display.applyOperator();
                display.operator = 'times';
                break;
            case 'division':
                display.reset();
                display.applyOperator();
                display.operator = 'division';
                break;
            case 'equals':
                display.applyOperator();
                if (display.memory){
                    display.value = display.memory;
                    display.memory = 0;
                }
                display.operator = null;
                display.dot = 0;
        }
        display.update();
    };

    const buttons = document.querySelectorAll(".calculator__button");
    for (item of buttons) {
        item.addEventListener('click', buttonClick);
    }
})();