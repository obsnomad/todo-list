import React, { useState } from 'react';
import './index.scss';

const Form = ({addItem}) => {
    const [value, setValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) {
            return;
        }
        addItem(value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="Form">
            <input
                type="text"
                className="Input"
                placeholder="Add ToDo item..."
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
};

export default Form;