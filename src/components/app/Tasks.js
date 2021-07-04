import { ContextMenuTrigger } from "react-contextmenu";
import CustomContexMenu from "../CustomContexMenu";
const Tasks = () => {
	return (
		<ul className="main__tasks">
			<li>
				<ContextMenuTrigger id="contextmenu" holdToDisplay={-1}>
					<div className="main__task">
						<input className={`main__checkbox priority-`} 
							type="checkbox"
						/>
						<div>
							<p className="main__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis exercitationem ex iusto quas ad sapiente quae recusandae expedita porro consequatur, minima aliquam pariatur nobis est modi sit cumque? Blanditiis, temporibus.</p>
						</div>
					</div>
				</ContextMenuTrigger>
			</li>	
			<CustomContexMenu />
		</ul>
	);
}
 
export default Tasks;