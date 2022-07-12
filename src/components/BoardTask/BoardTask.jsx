import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
    const [name, setName] = useState(props.task.name);


    const updateTask = (id, name) => {
        operations.columnOperations.updateTask(id, name);
        dispatch(actions.columnActions.updateTask(id, name));
        setEditionEnabled(false);
    }

    const deleteTask = (id) => {
        operations.columnOperations.deleteTask(id);
        dispatch(actions.columnActions.deleteTask(id));
    }

    const handleKeypress = (event) => {
        if (event.charCode === 13) {
            updateTask(props.task.id, name);
        }
    }

    const onDragStart = (event, taskId) => {
        event.dataTransfer.setData("taskId", taskId);
    }

    const allowDrop = (event) => {
        event.preventDefault();
    }

    const dropColumn = (event) => {
        event.preventDefault();
        let taskId = event.dataTransfer.getData("taskId");
        let task = document.getElementById(taskId);
        let betweenTasks = document.getElementById(`after-${taskId}`);
        let afterTaskId = event.target.id.split('-')[1];

        if (event.target.nextSibling) {
            event.target.parentNode.insertBefore(betweenTasks, event.target.nextSibling);
            event.target.parentNode.insertBefore(task, event.target.nextSibling);
        } else {
            event.target.parentNode.appendChild(task);
            event.target.parentNode.appendChild(betweenTasks);
        }
        dispatch(actions.columnActions.reorderTask(
            taskId, props.column.id, afterTaskId
        ));
    }

    return (
        <React.Fragment>
            <Card id={props.task.id}
                className="board-column-task"
                draggable={!editionEnabled}
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
                                <IconButton color="primary" onClick={() => setEditionEnabled(true)}>
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
                onDrop={dropColumn}></div>
        </React.Fragment>
    );
}

export default BoardTask;