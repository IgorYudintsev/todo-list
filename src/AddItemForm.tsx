import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import styles from './AddItemForm.module.css'

type PropsType = {
    addItem: (title: string) => void;
}

export const AddItemForm = (props: PropsType) => {
    let [itemName, setItemName] = useState<string>('');
    let [error, setError] = useState<string | null>(null);
    const onItemNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setItemName(event.currentTarget.value)
        setError(null)
    }
    const onAddItemkKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            addItem();
        }
    }
    function addItem() {
        let newItemName = itemName.trim();
        if (newItemName !== '') {
            props.addItem(newItemName);
            setItemName('');
        } else {
            setError(' Title is required')
        }
    }
    return (
        <div>
            <TextField id="standard-basic" label="Press type task name"
                       value={itemName}
                       onChange={onItemNameChanged}
                       onKeyPress={onAddItemkKeyPressed}
                       size="medium"
                       error={!!error}//преобразуем в boolean чтобы испльзовать метод из коробки
                       helperText={error}
            />
            <Button className={styles.button} variant="contained" color="primary" size="medium" onClick={() => {
                addItem()
            }}>add</Button>
                </div>
    )
}