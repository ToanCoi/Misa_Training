class EmployeePage extends BaseGrid{
    constructor (gridId) {
        super(gridId);

        let me = this;

        me.departmentDropdown = new Dropdown("departmentDropdown");
        
        me.positionDropdown = new Dropdown("positionDropdown");

        var inputGenderDropdown = new Dropdown("inputGender");

        var inputPositionDropdown = new Dropdown("inputPosition");

        var inputDepartmentDropdown = new Dropdown("inputDepartment");

        var inputWorkStatusDropdown = new Dropdown("inputWorkStatus");
    }

    initForm(formId) {debugger
        let me = this;

        me.form = new EmployeeFormDetail(formId);
    }
}

var employeePage = new EmployeePage("EmployeeGrid");

employeePage.initForm("EmployeeForm");

