import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './BoardColumn.scss';

import actions from '../../services/redux/actions/actions';
import operations from '../../services/firebase/firestore/operations';

import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const BoardColumn = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [editionEnabled, setEditionEnabled] = useState(false);
    const [name, setName] = useState(props.column.name);


    const updateColumn = (id, name) => {
        operations.columnOperations.updateColumn(id, name);
        dispatch(actions.columnCrudActions.updateColumn(id, name));
        setEditionEnabled(false);
    }

    const deleteColumn = (id) => {
        operations.columnOperations.deleteColumn(id);
        dispatch(actions.columnCrudActions.deleteColumn(id));
    }

    const handleKeypress = (event) => {
        if (event.charCode === 13) {
            updateColumn(props.column.id, name);
        }
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
                    <Typography variant="h5">LISTA DE TAREAS</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default BoardColumn;