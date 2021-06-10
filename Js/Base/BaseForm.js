class BaseForm {
    constructor(formId) {
        let me = this;

        me.form = $(`#${formId}`);

        //Khởi tạo sự kiện trên form
        me.initEvents();
    }

    /**
     * Hàm xử lý sự kiện trên form
     * NVTOAN 10/06/2021
     */
    initEvents() {
        let me = this;

        //Kéo form
        me.draggable();

        //Xử lý sự kiện bấm các nút
        me.formButtonFormClick();
    }

    formButtonFormClick() {
        let me = this;

        me.form.find(".btn").on("click", function () {
            switch($(this).attr("FormBtn")) {
                case Resource.FormBtn.Cancel:
                    me.cancel();
                    break;
                case Resource.FormBtn.Save:
                    break;
            }
        });
    }

    /**
     * Hàm mở form
     * NVTOAn 10/06/2021
     * @param {*} param 
     */
    open(param) {
        let me = this;

        Object.assign(me, param);

        me.form.removeClass("d-none");
        $(".overlay").removeClass("d-none");

        if(me.FormMode == Enumeration.FormMode.Edit) {

        }
    }

    /**
     * Hàm đóng form
     * NVTOAN 10/06/2021
     */
    cancel() {
        let me = this;

        me.form.addClass("d-none");
        $(".overlay").addClass("d-none");
    }

    draggable() {
        let me = this;

        me.form.draggable({ handle: ".form__title"}); 
    }
}