import './index.css';
(() => {
    const INPUT_VALUE = document.querySelector('input');
    const CLEAR = document.querySelector('.clear');
    const RESULT = document.querySelector('.result');
    const DELETE = document.querySelector('.delete');
    const EXPRESSION = document.querySelector('.expression');
    const ALERTBAR = document.querySelector('.alert_bar');
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
        INPUT_VALUE.value = '0';
    });

    INPUT_VALUE.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            calculate();
        }
    });

    RESULT.addEventListener('click', () => {
        calculate();
    });

    DELETE.addEventListener('click', () => {
        if (INPUT_VALUE.value.length === 1) {
            INPUT_VALUE.value = '0';
            return;
        }
        INPUT_VALUE.value = INPUT_VALUE.value.substr(0, INPUT_VALUE.value.length - 1);
    });

    function checkValid(value) {
        const koreanRex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const englishRex = /[a-z|A-Z]/;
        // 숫자만 입력된 경우
        const onlyNumberRex = /^[0-9]*$/g;
        // 연산자가 연달아 입력된 경우
        const seriesOperator = /[*\/+-]{2,}/;
        // 수식 앞뒤로 연산자가 있는 경우
        if (value.match(seriesOperator) || value.match(onlyNumberRex) || /^[+-/*]/.test(value) || /[+-/*]$/.test(value)) {
            ALERTBAR.style.display = 'flex';
            ALERTBAR.innerText = '수식이 올바르지 않습니다.';
            return true;
        }

        // 숫자와 연산자로 이루어지지 않은 경우
        const notNumberRex = /[^0-9]/g; //숫자가 아닌 문자 정규식
        const notOperatorRex = /[^\*\/()+-\.]/g; // 연산자가 아닌 문자 정규식
        const opArr = value.match(notNumberRex);
        // if (koreanRex.test(value) || englishRex.test(value)) {
        if (notOperatorRex.test(opArr.join(''))) {
            //숫자를 뺀 문자들 중에서 연산자가 아닌 문자가 있는 지를 체크.
            ALERTBAR.style.display = 'flex';
            ALERTBAR.innerText = '숫자와 연산자가 아닌 글자는 입력할 수 없습니다.';
            return true;
        }
        return false;
    }

    function deleteAlarm() {
        setTimeout(() => {
            ALERTBAR.style.display = 'none';
        }, 1000);
    }

    function calculate() {
        if (INPUT_VALUE.value === '' || INPUT_VALUE.value === '0') {
            return;
        }
        if (checkValid(INPUT_VALUE.value)) {
            INPUT_VALUE.value = '0';
            EXPRESSION.innerText = '';
            deleteAlarm();
            return;
        }
        EXPRESSION.innerText = INPUT_VALUE.value;
        INPUT_VALUE.value = eval(INPUT_VALUE.value);
    }
})();
