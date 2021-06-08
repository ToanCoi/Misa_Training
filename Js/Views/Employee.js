class EmployeePage extends BaseGrid{
    constructor (gridId) {
        super(gridId);

        var departmentDropdown = new Dropdown("departmentDropdown");
        
        var positionDropdown = new Dropdown("positionDropdown");

    }
}

var employeePage = new EmployeePage("EmployeeGrid");

