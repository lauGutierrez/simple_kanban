import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './BoardColumn.scss';

import actions from '../../services/redux/actions/actions';
import operations from '../../services/firebase/firestore/operations';

import BoardTask from '../BoardTask/BoardTask';

import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const BoardColumn = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [editionEnabled, setEditionEnabled] = useState(false);
    const [name, setName] = useState(props.column.name);

    const board = useSelector(state => state.selectedBoard);
    const draggable = useSelector(state => state.draggable);

    const updateColumn = async (id, name) => {
        await operations.columnOperations.updateColumn(id, name);
        dispatch(actions.columnActions.updateColumn(id, name));
        disableEdition();
    }

    const deleteColumn = async (columnId) => {
        operations.columnOperations.deleteColumnFromBoard(board.id, columnId);
        operations.columnOperations.deleteColumn(columnId);
        dispatch(actions.columnActions.deleteColumn(columnId));
        dispatch(actions.selectedBoardActions.deleteColumnFromBoard(columnId));
    }

    const handleKeypress = (event) => {
        if (event.charCode === 13) {
            updateColumn(props.column.id, name);
        }
    }

    const createTask = async (columnId) => {
        let name = t('task-default-name');
        let taskId = await operations.columnOperations.createTask(columnId, name);

        dispatch(actions.columnActions.addTaskToColumn(columnId, taskId, name));
    }

    const onDragStart = (event, columnId) => {
        event.dataTransfer.setData("columnId", columnId);
    }

    const allowDrop = (event) => {
        let taskId = event.dataTransfer.getData("taskId");
        if (!taskId) {
            event.preventDefault();
            event.target.classList.add("dragover");
        }
    }

    const resetDrop = (event) => {
        event.target.classList.remove("dragover");
    }

    const dropColumn = (event) => {
        event.preventDefault();
        let columnId = event.dataTransfer.getData("columnId");
        let column = document.getElementById(columnId);
        let betweenColumns = document.getElementById(`after-${columnId}`);
        let afterColumnId = event.target.id.split('-')[1];

        event.target.classList.remove("dragover");

        if (event.target.nextSibling) {
            event.target.parentNode.insertBefore(betweenColumns, event.target.nextSibling);
            event.target.parentNode.insertBefore(column, event.target.nextSibling);
        } else {
            event.target.parentNode.appendChild(column);
            event.target.parentNode.appendChild(betweenColumns);
        }
        operations.boardOperations.reorderColumn(afterColumnId, columnId);
        dispatch(actions.selectedBoardActions.reorderColumn(board.id, afterColumnId, columnId));
    }

    const enableEdition = () => {
        setEditionEnabled(true);
        dispatch(actions.dragDropActions.disableDragDrop());
    }

    const disableEdition = () => {
        setEditionEnabled(false);
        dispatch(actions.dragDropActions.enableDragDrop());
    }

    return (
        <React.Fragment>
            <Card id={props.column.id}
                className="board-column"
                draggable={draggable}
                onDragStart={(event) => onDragStart(event, props.column.id)}>
                <CardHeader
                    className="board-column-header"
                    title={editionEnabled ?
                        (
                            <TextField id={`column-name-${props.column.id}`}
                                label={t('name-field')}
                                variant="standard"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                onKeyPress={handleKeypress} />

                        ) :
                        (
                            props.column.name
                        )
                    }
                    action={editionEnabled ?
                        (
                            <React.Fragment>
                                <IconButton color="primary"
                                    onClick={() => updateColumn(props.column.id, name)}>
                                    <SaveIcon />
                                </IconButton>
                            </React.Fragment>
                        ) :
                        (
                            <React.Fragment>
                                <IconButton color="primary" onClick={enableEdition}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => deleteColumn(props.column.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </React.Fragment>
                        )
                    }
                />
                <CardContent className="board-column-content">
                    <Grid container
                        spacing={0}
                        direction="column">
                            <Grid item>
                                <BoardTask task={null} column={props.column}></BoardTask>
                            </Grid>
                            {props.column.tasks && props.column.tasks.length !== 0 ?
                                <React.Fragment>
                                    {props.column.tasks.map((task) =>
                                        <Grid key={task.id} item>
                                            <BoardTask task={task} column={props.column}></BoardTask>
                                        </Grid>
                                    )}
                                </React.Fragment>
                            :
                                null
                            }
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => createTask(props.column.id)}>{
                        t('add-task')}
                    </Button>
                </CardActions>
            </Card>
            <div id={`after-${props.column.id}`} 
                className="between-columns"
                onDragOver={allowDrop}
                onDragLeave={resetDrop}
                onDrop={dropColumn}></div>
        </React.Fragment>
    );
}

export default BoardColumn;