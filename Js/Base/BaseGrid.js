class BaseGrid {
    constructor(gridId) {
        let me = this;

        me.grid = $(`#${gridId}`);

        //paging của grid
        me.paging = null;

        //Form của grid
        me.form = null;

        me.cacheData = null;

        //Lấy dữ liệu server
        me.getDataServer();

        //Xử lý sự kiện trên grid
        me.initEvents();
    }

    initEvents() {
        let me = this;

        me.rowHoverEvent();

        me.rowClickEvent();

        //Khởi tạo paging cho grid
        me.initPaging();

        //Xứ lý sự kiện tool bar của grid
        me.initToolbar();
    }

    /**
     * Khởi tạo form tương ứng cho grid
     * NVTOAN 10/06/20201
     */
    initToolbar() {
        let me = this,
            toolbarAttr = me.grid.attr("Toolbar"),
            listToolbar = $(`[${toolbarAttr}]`);

        if(listToolbar.length > 0) {
            listToolbar.on("click", function() {
                let fireEvent = null;

                switch($(this).attr("FormType")) {
                    case Resource.FormType.Add:
                        fireEvent = me.add;
                        break;
                    case Resource.FormType.Edit:
                        fireEvent = me.edit;
                        break;
                    case Resource.FormType.Delete:
                        fireEvent = me.delete;
                        break;
                    case Resource.FormType.Refresh:
                        fireEvent = me.refresh;
                }

                if(typeof(fireEvent) == 'function') {
                    fireEvent = fireEvent.bind(me);

                    fireEvent();
                }
            });
        }
    }

    /**
     * Hàm mở form thêm mới bản ghi vào grid
     * NVTOAN 10/06/2021
     */
    add() {
        let me = this,
            param = {
                Parent: me,
                FormMode: Enumeration.FormMode.Add,
                Record: {},
                AllRecord: me.cacheData
            }
            
        if(me.form) {
            me.form.open(param);
        }
    }

    /**
     * Hàm mở form sửa bản ghi vào grid
     * NVTOAN 10/06/2021
     */
    edit() {
        let me = this,
            param = {
                Parent: me,
                FormMode: Enumeration.FormMode.Add,
                Record: {},
                AllRecord: me.cacheData
            }
            
        if(me.form) {
            me.form.open(param);
        }
    }

    /**
     * Hàm mở form xóa bản ghi vào grid
     * NVTOAN 10/06/2021
     */
    delete() {
        let me = this,
            param = {
                Parent: me,
                FormMode: Enumeration.FormMode.Add,
                Record: {},
                AllRecord: me.cacheData
            }
            
        
    }

    /**
     * Hàm mở form xóa bản ghi vào grid
     * NVTOAN 10/06/2021
     */
    refresh() {
        let me = this;

        me.getDataServer();
    }


    /**
     * Khởi tạo paging cho grid
     * NVTOAN 10/06/2021
     */
    initPaging() {
        let me = this,
            pagingId = me.grid.attr("Paging");
        
        me.paging = new BasePaging(`${pagingId}`);
    }

    rowHoverEvent() {
        let me = this;

        CommonEvt.hover(me.grid, "tbody tr", "tr-hover", "tr-selected");
        
    }

    rowClickEvent() {
        let me = this;

        CommonEvt.click(me.grid, "tbody tr", "tr-hover", "tr-selected", 1, function() {
            console.log("select row");
        });
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
                me.cacheData = respone;
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