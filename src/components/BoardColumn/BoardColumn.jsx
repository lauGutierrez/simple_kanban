import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

    const tasks = [
        {
            id: 1,
            name: 'Tarea 1'
        },
        {
            id: 2,
            name: 'Tarea 2'
        },
        {
            id: 3,
            name: 'Tarea 3'
        },
        {
            id: 4,
            name: 'Tarea 4'
        }
    ];


    const updateColumn = (id, name) => {
        operations.columnOperations.updateColumn(id, name);
        dispatch(actions.columnActions.updateColumn(id, name));
        setEditionEnabled(false);
    }

    const deleteColumn = (id) => {
        operations.columnOperations.deleteColumn(id);
        dispatch(actions.columnActions.deleteColumn(id));
    }

    const handleKeypress = (event) => {
        if (event.charCode === 13) {
            updateColumn(props.column.id, name);
        }
    }

    const addTask = async (columnId) => {
        let name = t('task-default-name');
        // let id = await operations.columnOperations.addColumnToBoard(board.id, name);
        // dispatch(
        //     actions.columnActions.addColumn(id, name)
        // );
    }

    return (
        <Grid item xs={3}>
            <Card className="board-column">
                <CardHeader
                    title={editionEnabled ?
                        (
                            <TextField id={`column-name-${props.column.id}`}
                                label={t('name-field')}
                                variant="standard"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                onKeyPress={handleKeypress}/>

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
                        ):
                        (
                            <React.Fragment>
                                <IconButton color="primary" onClick={() => setEditionEnabled(true)}>
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
                    {tasks.length !== 0 ?
                        <Box mt={2}>
                            <Grid container
                                spacing={3}
                                direction="column">
                                {tasks.map((task) =>
                                    <BoardTask key={task.id} task={task}></BoardTask>
                                )}
                            </Grid>
                        </Box>
                        :
                        null
                    }
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => addTask(props.column.id)}>{
                        t('add-task')}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default BoardColumn;