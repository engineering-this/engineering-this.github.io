
const calculator = (function() {

    // create display for calculator

    const display = document.querySelector(".calculator__display");

    // display helpers

    display.value = 0;
    display.memory = 0;
    display.dot = 0;
    display.operator = null;

    // reset display values

    display.reset = function () {
        display.memory = display.value;
        display.value = 0;
        display.dot = 0;
    };

    // change display.operator to match clicked operator

    display.applyOperator = function () {
        switch (display.operator){
            case 'plus':
                display.value += display.memory;
                display.memory = 0;
                break;
            case 'minus':
                display.value = display.memory - display.value;
                display.memory = 0;
                break;
            case 'times':
                display.value *= display.memory;
                display.memory = 0;
                break;
            case 'division':
                display.value = display.memory / display.value;
                display.memory = 0;
                break;
        }
    };

    // update display inside html document

    display.update = function (){display.innerHTML = display.value};

    display.update();

    // function for buttons

    const buttonClick = function (e){
        const key = e.target.dataset.key;

        // when pressed is number key

        if (!isNaN(key)) {
            if (!display.dot) {
                // when number is pressed without dot
                display.value = 10 * display.value + parseInt(key);
            } else {
                if (display.value >0) {
                    // when number is pressed with dot cases for positive and negative ints
                    display.value += key / Math.pow(10, display.dot);
                } else {
                    display.value -= key / Math.pow(10, display.dot);
                }
                display.dot ++;
            }

            // update display after pressed numbers
            display.update();
            // return
        }

        // cases for each non number keys

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
                display.applyOperator();
                display.reset();
                display.operator = 'plus';
                break;
            case 'minus':
                display.applyOperator();
                display.reset();
                display.operator = 'minus';
                break;
            case 'times':
                display.applyOperator();
                display.reset();
                display.operator = 'times';
                break;
            case 'division':
                display.applyOperator();
                display.reset();
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
        // update display after aplying operator
        display.update();
    };

    //event listeners for all calculator buttons

    const buttons = document.querySelectorAll(".calculator__button");
    for (item of buttons) {
        item.addEventListener('click', buttonClick);
    }
})();