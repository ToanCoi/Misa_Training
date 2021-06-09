class Dropdown {
    constructor(dropdownId) {
        let me = this;

        me.dropdown = $(`#${dropdownId}`);

        me.dropdownButton = me.dropdown.find(".dropdown__btn");

        me.dropdownSelectName = me.dropdownButton.find(".dropdown__text");

        me.defaultText = me.dropdownSelectName.text();

        me.dropdownListItem = me.dropdown.find(".dropdown__list");

        me.initEvents();
    }

    /**
     * Hàm xử lý sự kiện trên dropdown
     */
    initEvents() {
        let me = this;

        //Click dropdown button
        me.clickDropdownButtonEvt();

        //Hover item
        me.dropdownItemHover();

        //Click item
        me.dropdownItemClick();

        //Xóa item đã chọn
        me.deleteItem();
    }

    /**
     * Hàm xử lý sự kiện click dropdown Button
     * NVTOAN 06/06/2021
     */
    clickDropdownButtonEvt() {
        let me = this;

        me.dropdownButton.on("click", function() {

            //Hiển thị list item
            me.dropdownListItem.toggleClass("d-block");

            //Xoay mũi tên
            $(this).find(".dropdown__icon-arrow").toggleClass("rotate-180");

            $(this).toggleClass("dropdown__btn-focus");
        });
    }
    /**
     * Hàm xử lý sự kiện hover vào một item trong dropdown
     * 06/06/2021
     */
    dropdownItemHover() {
        let me = this;

        CommonEvt.hover(me.dropdownListItem, ".dropdown__list-item", "dropdown__item-hover", "dropdown__item-selected");

    }

    /**
     * Hàm xử lý sự kiện click vào một item trong dropdown
     * NVTOAN 06/06/2021
     */
    dropdownItemClick() {
        let me = this,
            itemClicked = null;
        
        CommonEvt.click(me.dropdownListItem, ".dropdown__list-item", "dropdown__item-hover", "dropdown__item-selected", 1, function(element) {
            me.dropdownListItem.find(".dropdown__item-icon").removeClass("opacity-1");

            element.find(".dropdown__item-icon").addClass("opacity-1");

            me.itemClickedEvt(element);

            //Xoay lại mũi tên
            me.dropdown.find(".dropdown__icon-arrow").toggleClass("rotate-180");

            //Hiển thị X icon
            me.dropdown.find(".dropdown__icon-unselect").addClass("d-flex");
        });
    }

    /**
     * Hàm thay xử lý sau khi chọn một item trong dropdown
     * NVTOAN 06/06/2021
     */
    itemClickedEvt(itemClicked) {
        let me = this,
            text = itemClicked.find(".dropdown__item-name").text();
        
        //SetText
        me.dropdownButton.find(".dropdown__text").text(`${text}`);

        //Đóng dropdown list
        me.dropdownListItem.removeClass("d-block");

        //Bỏ border
        me.dropdownButton.removeClass("dropdown__btn-focus");
    }

    /**
     * Hàm xóa item đã chọn
     * NVTOAN 07/06/2021
     */
    deleteItem() {
        let me = this;

        me.dropdown.find(".dropdown__icon-unselect").on("click", function(event) {
            me.dropdownButton.find(".dropdown__text").text(me.defaultText);
            
            //Không mở button ra
            event.stopPropagation();

            $(this).removeClass("d-flex");
        });
    }
}