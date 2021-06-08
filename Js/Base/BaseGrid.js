class BaseGrid {
    constructor(gridId) {
        let me = this;

        me.grid = $(`#${gridId}`);

        //Lấy dữ liệu server
        me.getDataServer();

        //Xử lý sự kiện trên grid
        me.initEvents();
    }

    initEvents() {
        
    }

    /**
     * Hàm lấy dữ liệu từ server
     * NVTOAN 07/06/2021
     */
    getDataServer() {
        let me = this,
            url = me.grid.attr("Url"),
            urlFull = `${Constant.UrlPrefix}${url}`;
        
        CommonFn.Ajax(urlFull, Resource.Method.Get, {}, true, function(respone) {
            if(respone) {
                me.loadData(respone);
            } else {
                console.log("Lỗi lấy dl")
            }
        });
    }

    /**
     * Hàm load data, tạo grid
     * NVTOAN 07/06/2021
     * @param {*} data 
     */
    loadData(data) {
        let me = this,
            table = $("<table></table>"),
            thead = me.renderHeader(),
            tbody = me.renderBody(data);
        
        table.append(thead);
        table.append(tbody);

        me.grid.find("table").remove();
        me.grid.append(table);
    }

    /**
     * Hàm render header của grid
     * NVTOAN 07/06/2021
     */
    renderHeader() {
        let me = this,
            thead = $("<thead></thead>"),
            tr = $("<tr></tr>");
        
        me.grid.find(".grid__col").each(function () {
            let th = $("<th></th>"),
                text = $(this).text();
            
            th.text(`${text}`);

            tr.append(th);
        });

        thead.append(tr);

        return thead;
    }

    /**
     * Hàm render body của grid
     * NVTOAN 06/07/2021
     */
    renderBody(data) {
        let me = this,
            tbody = $("<tbody></tbody>");
        
        if(data && data.length > 0) {
            data.filter(function (item) {
                let row  = $("<tr></tr>");

                me.grid.find(".grid__col").each(function() {
                    let column = $(this),
                        fieldName = column.attr("FieldName"),
                        originValue = item[fieldName],
                        dataType = column.attr("DataType"),
                        formatClass = me.getClassFormat(dataType),
                        value = me.getDisplayValue(originValue, dataType, column),
                        td = $("<td></td>");

                    td.text(value);
                    td.addClass(formatClass);

                    row.append(td);
                });

                tbody.append(row);
            });

            return tbody;
        }
    }

    /**
     * Hàm lấy class vị trí tương ứng với loại dữ liệu
     * NVTOAN 07/06/2021
     */
    getClassFormat(dataType) {
        let me = this,
            className = "";

        switch(dataType) {
            case Resource.DataTypeColumn.Number:
                className = "text-right"
                break;
            case Resource.DataTypeColumn.Date:
                className = "text-center";
                break;
        }

        return className;
    }

    /**
     * Hàm chuyển dữ liệu thô sang dữ liệu hiển thị
     * NVTOAN 07/06/2021
     */
    getDisplayValue(data, dataType, column) {
        let me = this;

        switch(dataType) {
            case Resource.DataTypeColumn.Number:
                data = CommonFn.formatNumber(data);
                break;
            case Resource.DataTypeColumn.Date:
                data = CommonFn.formatDate(data);
                break;
            case Resource.DataTypeColumn.Enum:
                let enumName = column.attr("EnumName");

                data = CommonFn.getEnumValue(data, enumName);
                break;
        }

        return data;
    }
}