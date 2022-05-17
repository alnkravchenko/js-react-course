import "./employees-add-form.css";

const EmployeesAddForm = () => {
    return (
        <div className="app-add-form">
            <h3>Add new employee</h3>
            <form className="add-form d-flex">
                <input type="text" className="form-control new-post-label" placeholder="Name" />
                <input type="text" className="form-control new-post-label" placeholder="Rate in USD" />
                <button className="btn btn-outline-light">Add</button>
            </form>
        </div>
    );
}

export default EmployeesAddForm;