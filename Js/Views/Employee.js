class EmployeePage extends BaseGrid{
    constructor (gridId) {
        super(gridId);

        var departmentDropdown = new Dropdown("departmentDropdown");
        
        var positionDropdown = new Dropdown("positionDropdown");

        var inputGenderDropdown = new Dropdown("inputGender");

        var inputPositionDropdown = new Dropdown("inputPosition");

        var inputDepartmentDropdown = new Dropdown("inputDepartment");

        var inputWorkStatusDropdown = new Dropdown("inputWorkStatus");
    }
}

var employeePage = new EmployeePage("EmployeeGrid");

