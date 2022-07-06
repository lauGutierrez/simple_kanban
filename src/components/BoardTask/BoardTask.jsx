import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './BoardTask.scss';

import actions from '../../services/redux/actions/actions';
import operations from '../../services/firebase/firestore/operations';

import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const BoardTask = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [editionEnabled, setEditionEnabled] = useState(false);
    const [name, setName] = useState(props.task.name);


    const updateTask = (id, name) => {
        // operations.columnOperations.updateColumn(id, name);
        // dispatch(actions.columnActions.updateColumn(id, name));
        // setEditionEnabled(false);
    }

    const deleteTask = (id) => {
        // operations.columnOperations.deleteColumn(id);
        // dispatch(actions.columnActions.deleteColumn(id));
    }

    const handleKeypress = (event) => {
        if (event.charCode === 13) {
            updateTask(props.task.id, name);
        }
    }

    return (
        <Grid item>
            <Card className="board-column-task">
                <CardContent>
                    {editionEnabled ?
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
                </CardContent>
            </Card>
        </Grid>
    );
}

export default BoardTask;