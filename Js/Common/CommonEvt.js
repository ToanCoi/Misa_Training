//Xử lý những sự kiện thường gặp
var CommonEvt = CommonEvt || {};

/**
 * Hàm xử lý sự kiện một phần tử được hover chuột
 * NVTOAN 06/06/2021
 * @param {*} element 
 * @param {*} hoverClassName 
 * @param {*} selectClassName 
 */
CommonEvt.hover = (parent, elementClass, hoverClassName, selectClassName) => {
    parent.find(`.${elementClass}`).hover(function () {
        if(!$(this).hasClass(`${selectClassName}`)) {
            $(this).addClass(`${hoverClassName}`);
        }
    }, function() {
        $(this).removeClass(`${hoverClassName}`);
    });
}

/**
 * Hàm xử lý sự kiện click vào một phần tử
 * NVTOAN 06/06/2021
 */
CommonEvt.click = (parent, elementClass, hoverClassName, selectClassName, multiple, callbackFn) => {
    
    parent.find(`.${elementClass}`).on("click", function () {
        if(multiple == 1) {
            parent.find(`.${elementClass}`).removeClass(`${selectClassName} ${hoverClassName}`);

            $(this).addClass(`${selectClassName}`);
            result = $(this);
        }

        if(typeof callbackFn == 'function') {
            callbackFn(result);
        }
    });
}