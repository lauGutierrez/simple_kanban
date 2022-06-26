import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './BoardSelector.scss';

import actions from '../../services/redux/actions/actions';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const BoardSelector = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const boards = useSelector(state => state.boards);

    useEffect(() => {
        addBoard(1, 'Mi primer tablero');
        addBoard(2, 'Mi segundo tablero');
        addBoard(3, 'Mi tercer tablero');
        addBoard(4, 'Mi cuarto tablero');
        addBoard(5, 'Mi quinto tablero');
    }, []);

    const addBoard = (id, name) => {
        dispatch(actions.boardsActions.addBoard(id, name));
    }

    const updateBoard = (id, name) => {
        dispatch(actions.boardsActions.updateBoard(id, name));
    }

    const deleteBoard = (id) => {
        dispatch(actions.boardsActions.deleteBoard(id));
    }

    return (
        <React.Fragment>
            <Grid container
                direction="row"
                spacing={2}>
                <Grid item xs={12}>
                    <Button>{t('new')}</Button>
                </Grid>
                {boards.length !== 0 ?
                    <Grid item xs={12}>
                        <Grid container
                            spacing={2}
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center">
                            {boards.map((board) =>
                                <Grid item xs={4}>
                                    <Card key={board.id}>
                                        <CardHeader
                                            avatar={<Avatar>{board.name.charAt(0)}</Avatar>}
                                            title={board.name}
                                            subheader={board.name}
                                            action={
                                                <IconButton>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                        />
                                        <CardContent>
                                            <Typography variant="h3">{board.name}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button>{t('open')}</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                :
                null
            }
            </Grid>
            
        </React.Fragment>
    );
}

export default BoardSelector;