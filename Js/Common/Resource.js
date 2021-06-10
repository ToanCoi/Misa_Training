var Resource = Resource || {};

//Kiểu dữ liệu của cột trong grid
Resource.DataTypeColumn = {
    Number: "Number",
    Date: "Date",
    Enum: "Enum"
}

//Phương thức gọi ajax
Resource.Method = {
    Get: "Get",
    Put: "Put",
    Post: "Post",
    Delete: "Delete"
}

//Giới tính
Resource.Gender = {
    Male: "Nam",
    Female: "Nữ",
    Other: "Khác"
}

//Trạng thái làm việc
Resource.WorkStatus = {
    Active: "Đang làm việc",
    Intern: "Đang thử việc",
    Retired: "Đã nghỉ việc"
}

//Các chế độ của form
Resource.FormType = {
    Add: "Add",
    Edit: "Edit",
    Delete: "Delete",
    Refresh: "Refresh"
}

//Sự button của form
Resource.FormBtn = {
    Save: "Save",
    Cancel: "Cancel"
}
