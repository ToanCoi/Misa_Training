//Xử lý những sự kiện thường gặp
var CommonEvt = CommonEvt || {};

/**
 * Hàm xử lý sự kiện một phần tử được hover chuột
 * NVTOAN 06/06/2021
 * @param {*} element 
 * @param {*} hoverClassName 
 * @param {*} selectClassName 
 */
CommonEvt.hover = (parent, selector, hoverClassName, selectClassName) => {
    parent.on("mouseenter", `${selector}`, function () {
        if(!$(this).hasClass(`${selectClassName}`)) {
            $(this).addClass(`${hoverClassName}`);
        }
    });

    parent.on("mouseleave",`${selector}`, function() {
        $(this).removeClass(`${hoverClassName}`);
    });
}

/**
 * Hàm xử lý sự kiện click vào một phần tử
 * NVTOAN 06/06/2021
 */
CommonEvt.click = (parent, selector, hoverClassName, selectClassName, multiple, callbackFn) => {
    
    parent.on("click", `${selector}`, function () {
        if(multiple == 1) {
            parent.find(`${selector}`).removeClass(`${selectClassName} ${hoverClassName}`);

            $(this).addClass(`${selectClassName}`);
            result = $(this);
        }

        if(typeof callbackFn == 'function') {
            callbackFn(result);
        }
    });
}