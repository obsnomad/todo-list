import React, {useRef, useEffect} from 'react';
import './index.scss';

const Item = ({data, index, focus, editItem, switchItem, removeItem}) => {
    const input = useRef(null);

    useEffect(() => {
        if (focus) {
            input.current.focus();
        }
    });

    return (
        <div className={`Item ${data.completed ? 'ItemComplete' : ''}`}>
            <input
                type="text"
                className="Input"
                ref={input}
                value={data.title}
                onChange={e => editItem(index, e.target.value)}
            />
            <button className="Button ButtonSwitch" onClick={() => switchItem(index)}>Switch</button>
            <button className="Button ButtonRemove" onClick={() => removeItem(index)}>Remove</button>
        </div>
    );
};

export default Item;