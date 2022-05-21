import "./app-filter.css";

const AppFilter = (props) => {
    const buttonsData = [
        { name: "all", label: "All" },
        { name: "promotion", label: "Promoting" },
        { name: "salary", label: "Rate more than 1000$<" },
    ];

    const buttons = buttonsData.map(({ name, label }) => {
        const classes = props.filter === name ? "btn btn-light" : "btn btn-outline-light"
        return (<button className={classes}
            type="button"
            key={name}
            onClick={() => props.onUpdateFilter(name)}>{label}</button>);
    });

    return (
        <div className="btn-group" >
            {buttons}
        </div>
    );
}

export default AppFilter;