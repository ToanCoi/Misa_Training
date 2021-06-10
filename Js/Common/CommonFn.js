var CommonFn = CommonFn || {};

/**
 * hàm format số nguyên
 * NVTOAN 07/06/2021
 */
 CommonFn.formatNumber = number => {
    if(number && !isNaN(number)) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
        return number;
    }
 }

 /**
  * Format ngày tháng từ dữ liệu thô
  * NVTOAN 07/06/2021
  * @param {*} dateSrc 
  * @returns 
  */
 CommonFn.formatDate = dateSrc => {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
 }

 /**
  * Hàm lấy dữ liệu từ dang Enum
  * NVTOAN 07/06/2021
  */
 CommonFn.getEnumValue = (data, enumName) => {
    let enumeration = Enumeration[enumName],
        resource = Resource[enumName];

    for(prop in enumeration) {
        if(enumeration[prop] == data) {
            data = resource[prop];
        }
    }
    
    return data;
 }

/**
 * Hàm gọi lên server truy vấn dữ liệu
 * NVTOAN 07/06/2021
 * @param {*} url 
 * @param {*} method 
 * @param {*} data 
 * @param {*} async 
 * @param {*} fnCallback 
 */

CommonFn.Ajax = (url, method, data, async = true, fnCallback) => {
    $.ajax({
        url: url,
        method: method,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        crossDomain: true,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        beforeSend: function() {
            $(".loader").addClass("d-flex");
        },
        success: function(respone) {
            $(".loader").removeClass("d-flex");
            fnCallback(respone);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}