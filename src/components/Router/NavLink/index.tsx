import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = React.forwardRef((props: any, ref:any) => (
	<RouterNavLink {...props} innerRef={ref} />
));

export default NavLink;
