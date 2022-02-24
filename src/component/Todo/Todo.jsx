import { FaBeer } from 'react-icons/fa';
function Todo({ title, id, completed, onRemove, onComplete }) {
	return (
		<div>
			<span
				onClick={() => onComplete(id)}
				style={
					completed
						? {
								textDecoration: 'line-through',

								padding: '2px',
								borderRadius: '5px',
								fontSize: '13px',
						  }
						: {
								padding: '2px',
								borderRadius: '5px',
								fontSize: '13px',
						  }
				}
			>
				Todo {id} :{title} -
				{completed === true ? 'completed :)' : 'not completed :('}
			</span>
			<span>
				<FaBeer
					onClick={() => onRemove(id)}
					style={{ cursor: 'pointer', color: 'red' }}
				/>
			</span>
		</div>
	);
}
export default Todo;
