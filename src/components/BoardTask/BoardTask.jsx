import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './BoardTask.scss';

import actions from '../../services/redux/actions/actions';
import operations from '../../services/firebase/firestore/operations';

import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const BoardTask = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [editionEnabled, setEditionEnabled] = useState(false);
    const [name, setName] = useState(props.task ? props.task.name : '');

    const draggable = useSelector(state => state.draggable);

    const updateTask = async (taskId, name) => {
        await operations.columnOperations.updateTask(taskId, name);
        dispatch(actions.columnActions.updateTask(props.column.id, taskId, name));
        disableEdition();
    }

    const deleteTask = async (taskId) => {
        await operations.columnOperations.deleteTaskFromColumn(props.column.id, taskId);
        await operations.columnOperations.deleteTask(taskId);
        dispatch(actions.columnActions.deleteTask(props.column.id, taskId));
    }

    const handleKeypress = (event) => {
        if (event.charCode === 13) {
            updateTask(props.task.id, name);
        }
    }

    const onDragStart = (event, taskId) => {
        event.dataTransfer.setData("taskId", taskId);
        event.dataTransfer.setData("columnId", null);
    }

    const allowDrop = (event) => {
        let taskId = event.dataTransfer.getData("taskId");
        if (taskId) {
            event.preventDefault();
            event.target.classList.add("dragover");
        }
    }

    const resetDrop = (event) => {
        event.target.classList.remove("dragover");
    }

    const dropTask = (event) => {
        event.preventDefault();

        let taskId = event.dataTransfer.getData("taskId");
        let task = document.getElementById(taskId);
        let dragColumnId = task.closest('.board-column').id;

        let afterTaskId = event.target.id.split('-')[1];
        let dropColumnId = event.target.closest('.board-column').id;

        event.target.classList.remove("dragover");

        operations.columnOperations.deleteTaskFromColumn(dragColumnId, taskId);
        operations.columnOperations.addTaskToColumn(dropColumnId, taskId, afterTaskId);

        dispatch(
            actions.columnActions.reorderTask(
                dragColumnId,
                dropColumnId,
                taskId,
                afterTaskId 
            )
        );
    }

    const enableEdition = () => {
        setEditionEnabled(true);
        dispatch(actions.dragDropActions.disableDragDrop());
    }

    const disableEdition = () => {
        setEditionEnabled(false);
        dispatch(actions.dragDropActions.enableDragDrop());
    }

    if (props.task) {
        return (
            <React.Fragment>
                <Card id={props.task.id}
                    className="board-column-task"
                    draggable={draggable}
                    onDragStart={(event) => onDragStart(event, props.task.id)}>
                    <CardHeader
                        className="board-column-task-header"
                        title={editionEnabled ?
                            (
                                <TextField id={`task-name-${props.task.id}`}
                                    label={t('task-name-field')}
                                    variant="standard"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    onKeyPress={handleKeypress} />

                            ) :
                            (
                                props.task.name
                            )
                        }
                        action={editionEnabled ?
                            (
                                <React.Fragment>
                                    <IconButton color="primary"
                                        onClick={() => updateTask(props.task.id, name)}>
                                        <SaveIcon />
                                    </IconButton>
                                </React.Fragment>
                            ) :
                            (
                                <React.Fragment>
                                    <IconButton color="primary" onClick={enableEdition}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => deleteTask(props.task.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </React.Fragment>
                            )
                        }
                    />
                </Card>
                <div id={`after-${props.task.id}`}
                    className="between-tasks"
                    onDragOver={allowDrop}
                    onDragLeave={resetDrop}
                    onDrop={dropTask}></div>
            </React.Fragment>
        );
    } else {
        return (
            <div className="between-tasks"
                onDragOver={allowDrop}
                onDragLeave={resetDrop}
                onDrop={dropTask}></div>
        );
    }
}

export default BoardTask;