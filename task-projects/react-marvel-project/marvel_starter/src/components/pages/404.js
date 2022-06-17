import ErrorMessage from "../error-message/ErrorMessage";
import { Link } from "react-router-dom";

import "../../style/button.scss";

const Page404 = () => {

    return (
        <div>
            <ErrorMessage />
            <p style={{ "textAlign": "center", "fontWeight": "bold", "fontSize": "24px" }}>Page does not exist</p>
            <Link style={
                { "display": "block", "textAlign": "center", "textTransform": "uppercase", "fontWeight": "bold", "fontSize": "24px", "width": "250px", "marginTop": "20px", "marginLeft": "430px", "cursor": "pointer" }
            }
                to="/">Back to the main page</Link>
        </div>
    );
}

export default Page404;