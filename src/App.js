import React, {useState} from 'react';
import './App.scss';

import Form from './components/Form';
import Item from './components/Item';

export const App = () => {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')));

    // Everything related to focus here and in the child components is needed to keep input focused after sorting
    const [focus, setFocus] = useState(null);

    // Sort and store items in localStorage
    const storeItems = (newItems, index = null) => {
        if (newItems === null) {
            newItems = [];
        }
        // Save old items indexes to get them later
        let transformedItems = newItems.map((item, oldIndex) => {
            return {...item, oldIndex};
        });
        transformedItems.sort((a, b) => {
            let compared = 0;
            if (a.title < b.title) {
                compared = 1;
            } else if (a.title > b.title) {
                compared = -1;
            }
            return compared;
        });
        // New index of necessary item
        const newIndex = transformedItems.findIndex(item => item.oldIndex === index);
        // Remove indexes from array
        newItems = transformedItems.map(item => {
            delete item.oldIndex;
            return item;
        });
        localStorage.setItem('items', JSON.stringify(newItems));
        setItems(newItems);
        return newIndex;
    };

    const addItem = title => {
        storeItems([...items, {
            title,
            completed: false,
        }]);
    };

    const editItem = (index, title) => {
        const newItems = [...items];
        newItems[index].title = title;
        setFocus(storeItems(newItems, index));
    };

    const switchItem = index => {
        const newItems = [...items];
        newItems[index].completed = !newItems[index].completed;
        storeItems(newItems);
    };

    const removeItem = index => {
        const newItems = [...items];
        newItems.splice(index, 1);
        storeItems(newItems);
    };

    return (
        <div className="App">
            <h1>To Do List</h1>
            {items && <div className="List">
                {items.map((item, index) => (
                    <Item
                        key={index}
                        index={index}
                        data={item}
                        focus={focus === index}
                        editItem={editItem}
                        switchItem={switchItem}
                        removeItem={removeItem}
                    />
                ))}
            </div>}
            <Form addItem={addItem}/>
        </div>
    );
};

export default App;
