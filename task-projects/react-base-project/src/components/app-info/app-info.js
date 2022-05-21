import "./app-info.css";

const AppInfo = (props) => {
    const { total, withBonuses } = props;

    return (
        <div className="app-info">
            <h1>Employees accounting in "CompanyName" company</h1>
            <h2>Total amount of employees: {total}</h2>
            <h2>With bonuses: {withBonuses}</h2>
        </div>
    );
};

export default AppInfo;