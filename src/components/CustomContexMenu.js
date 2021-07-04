import { ContextMenu, MenuItem } from "react-contextmenu";
const CustomContexMenu = ({url,id}) => {
	return (
		<ContextMenu className="context-menu" id="contextmenu">
				<MenuItem >
					<span className="far fa-edit context-menu__edit">Edit task</span>
				</MenuItem>
				<MenuItem >
					<div className="context-menu__schedul">
						<h3 className="context-menu-schedul__title context-menu__title">Schedule</h3>
						<div className="context-menu-schedul__list context-menu__list">
							<span className={`fas  context-menu-list__item`}>
							</span>
						</div>
					</div>
				</MenuItem>
				<MenuItem>
					<div className="context-menu__priority">
						<h3 className="context-menu-priority__title context-menu__title">Priority</h3>
						<div className="context-menu-priority__list context-menu__list">
								<span className={`fas fa-flag  context-menu-list__item`}></span>
						</div>
					</div>
				</MenuItem>
				<MenuItem>
					<span className="fas fa-trash-alt context-menu__delte">Delete</span>
				</MenuItem>
      	</ContextMenu>
	);
}
 
export default CustomContexMenu;