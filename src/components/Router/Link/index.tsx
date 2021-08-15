import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Link = React.forwardRef((props: any, ref:any) => (
	<RouterLink {...props} innerRef={ref} />
));

export default Link;
