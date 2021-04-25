(() => {
    const INPUT_VALUE = document.querySelector('input');
    const CLEAR = document.querySelector('.clear');
    const RESULT = document.querySelector('.result');
    const DELETE = document.querySelector('.delete');
    const EXPRESSION = document.querySelector('.expression');

    const NUMBER_ARRAY = document.querySelectorAll('.number');
    const COMMAND_ARRAY = document.querySelectorAll('.operator');
    INPUT_VALUE.value = 0;

    NUMBER_ARRAY.forEach((aItem) => {
        aItem.addEventListener('click', () => {
            if (INPUT_VALUE.value === '0') {
                INPUT_VALUE.value = '';
            }
            INPUT_VALUE.value += aItem.id;
        });
    });

    COMMAND_ARRAY.forEach((aItem) => {
        aItem.addEventListener('click', () => {
            INPUT_VALUE.value += aItem.id;
        });
    });

    CLEAR.addEventListener('click', () => {
        EXPRESSION.innerText = '';
        INPUT_VALUE.value = 0;
    });

    RESULT.addEventListener('click', () => {
        EXPRESSION.innerText = INPUT_VALUE.value;
        INPUT_VALUE.value = eval(INPUT_VALUE.value);
    });

    DELETE.addEventListener('click', () => {
        if (INPUT_VALUE.value.length === 1) {
            INPUT_VALUE.value = 0;
            return;
        }
        INPUT_VALUE.value = INPUT_VALUE.value.substr(0, INPUT_VALUE.value.length - 1);
    });
})();
