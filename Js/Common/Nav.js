class Nav {

    constructor(navId) {
        let me = this;

        me.nav = $(`#${navId}`);
        me.toggleId = me.nav.find('[Toggle]').attr("Toggle");
        me.navType = me.nav.attr("nav-type");
        
        //Hàm xử lý sự kiện trên navbar
        me.initEvents();
    }

    /**
     * Hàm xử lý các sự kiện navbar
     */
    initEvents() {
        let me = this;

        //Click toggle btton
        me.clickToggleEvent();

        // Click Vào một menu
        me.clickNavItemEvent();
    }

    /**
     * Hàm xử lý sự kiện click toggle button
     * NVTOAN 06/06/2021
     */
    clickToggleEvent() {
        let me = this;

        $(`#${me.toggleId}`).on("click", function() {
            $("#wrapper").toggleClass("nav-small");
        });
    }

    /**
     * Hàm xử lý sự kiện click vào một menu item 
     * NVTOAN 06/06/2021
     */
    clickNavItemEvent() {
        let me = this;
        
        me.nav.find(".nav__list-item").on("click", function() {
            me.nav.find(".nav__list-item").removeClass("nav__list-item-active");

            $(this).addClass("nav__list-item-active");
        });
    }
}

var navbar = new Nav("nav-bar");