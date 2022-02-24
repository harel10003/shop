import { useState } from 'react';

function Write() {
	const [show, setShow] = useState(true);
	return (
		<div>
			<button
				onClick={() => setShow(!show)}
				style={show === true ? { color: 'red' } : { color: 'blue' }}
			>
				{show === true ? 'Hide' : 'Show'} me
			</button>
			{show && <h1>im here</h1>}
		</div>
	);
}

export default Write;
