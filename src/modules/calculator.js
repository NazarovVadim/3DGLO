const calculator = (price = 100) => {
    const calcInputs = document.querySelectorAll('input.calc-item');
    calcInputs.forEach(item => {
        item.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[\D]/g, '');
        });
    });

    const countSum = () => {
        let total = 0,
            typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value,
            countValue = 1,
            dayValue = 1;
        if(calcCount.value > 1) countValue += (calcCount.value - 1) / 10;
        if(calcDay.value && calcDay.value < 5)
           dayValue *= 2;
        else if (calcDay.value && calcDay.value < 10)
           dayValue *= 1.5;
        
        if(typeValue && squareValue){
            total = price * typeValue * squareValue * countValue * dayValue;
        };

        let count = +totalValue.textContent;
        let delta = total - count;

        const totalAnimation = () => {
            if(delta === 0 || count === total) {
                cancelAnimationFrame(requestId);
                return;
            }
            const deltaStr = Math.abs(delta) + '',
                length = deltaStr.length;
            let step = 10 ** (length-2);
            if(Math.abs(+totalValue.textContent - total) <= step) {
                totalValue.textContent = total;
                cancelAnimationFrame(requestId);
                return;
            }
            if (delta < 0) {
                count -= step;
                totalValue.textContent = count;
                requestAnimationFrame(totalAnimation);
            } else if (delta > 0) {
                count += step;
                totalValue.textContent = count;
                requestAnimationFrame(totalAnimation);
            } 
        }
        let requestId = requestAnimationFrame(totalAnimation);
}

    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

    calcBlock.addEventListener('change', event => {
        const target = event.target;

        if(target === calcType || target === calcSquare || target === calcDay  || target === calcCount){
            countSum();
        }
    });

};

export default calculator;
