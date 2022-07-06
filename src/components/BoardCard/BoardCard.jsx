import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './BoardCard.scss';

import actions from '../../services/redux/actions/actions';
import operations from '../../services/firebase/firestore/operations';
import paths from '../../router/paths';

import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const BoardCard = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [editionEnabled, setEditionEnabled] = useState(false);
    const [name, setName] = useState(props.board.name);
    const [description, setDescription] = useState(props.board.description);


    const updateBoard = (id, name, description) => {
        operations.boardOperations.updateBoard(id, name, description);
        dispatch(actions.boardActions.updateBoard(id, name, description));
        setEditionEnabled(false);
    }

    const deleteBoard = (id) => {
        operations.boardOperations.deleteBoard(id);
        dispatch(actions.boardActions.deleteBoard(id));
    }

    const handleKeypress = (event) => {
        if (event.charCode === 13) {
            updateBoard(
                props.board.id, name, description
            )
        }
    }

    const openBoard = (id) => {
        navigate(paths.board.replace(":boardId", id));
    }

    return (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Card className="board-card">
                <CardHeader
                    avatar={<Avatar className="board-card-avatar">{props.board.name.charAt(0)}</Avatar>}
                    title={editionEnabled ?
                        (
                            <TextField id={`name-${props.board.id}`}
                                label={t('name-field')}
                                variant="standard"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                onKeyPress={handleKeypress}/>

                        ) :
                        (
                            props.board.name
                        )
                    }
                    subheader={`${t('created-at')} ${props.board.created}`}
                    action={editionEnabled ?
                        (
                            <React.Fragment>
                                <IconButton color="primary"
                                    onClick={
                                        () => updateBoard(
                                            props.board.id, name, description
                                        )
                                    }>
                                    <SaveIcon />
                                </IconButton>
                            </React.Fragment>
                        ):
                        (
                            <React.Fragment>
                                <IconButton color="primary" onClick={() => setEditionEnabled(true)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => deleteBoard(props.board.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </React.Fragment>
                        )
                    }
                />
                <CardContent className="board-card-content">
                    {editionEnabled ?
                        (
                            <TextField id={`description-${props.board.id}`}
                                label={t('description-field')}
                                variant="standard"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                onKeyPress={handleKeypress}/>

                        ):
                        (
                            <Typography variant="h5"
                                className="board-card-description"
                                onClick={() => { openBoard(props.board.id) }}>
                                {props.board.description}
                            </Typography>
                        )
                    }
                </CardContent>
            </Card>
        </Grid>
    );
}

export default BoardCard;