import { Button } from "react-bootstrap";
import "../Scss/autobtn.scss";

 const AutoButton = (btn_text, btn_function) => {
	return (
		<>
			<Button className="use-btn" onClick={btn_function} >
				{btn_text}
			</Button>
		</>
	);
};


export default AutoButton