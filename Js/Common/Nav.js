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

        //Hover vào menu
        me.hoverNavItemEvent();

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
     * Hàm xử lý khi hover vào một menu
     * NVTOAN 06/06/2021
     */
     hoverNavItemEvent() {
         let me = this;

        CommonEvt.hover(me.nav, "nav__list-item", "nav__item-hover", "nav__item-selected");
     }

    /**
     * Hàm xử lý sự kiện click vào một menu item 
     * NVTOAN 06/06/2021
     */
    clickNavItemEvent() {
        let me = this;
        
        CommonEvt.click(me.nav, "nav__list-item","nav__item-hover", "nav__item-selected", 1, null);
    }
}

var navbar = new Nav("nav-bar");