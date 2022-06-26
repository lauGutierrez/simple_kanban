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
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BoardSelector = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const boards = useSelector(state => state.boards);

    useEffect(() => {
        addBoard();
        addBoard();
        addBoard();
        addBoard();
        addBoard();
    }, []);

    const addBoard = () => {
        let id = Math.floor(Math.random() * 100);
        let name = t('board-default-name');
        dispatch(actions.boardsActions.addBoard(id, name));
    }

    const updateBoard = (id, name) => {
        dispatch(actions.boardsActions.updateBoard(id, name));
    }

    const deleteBoard = (id) => {
        dispatch(actions.boardsActions.deleteBoard(id));
    }

    return (
        <Box p={5}>
            <Grid container
                direction="row"
                spacing={2}>
                <Grid item xs={12}>
                    <Grid container
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end">
                        <Grid className="action-buttons-container" item xs={12}>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<AddIcon />}
                                onClick={addBoard}>
                                {t('new')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {boards.length !== 0 ?
                    <Grid item xs={12}>
                        <Box mt={2}>
                            <Grid container
                                spacing={3}
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center">
                                {boards.map((board) =>
                                    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                                        <Card key={board.id}>
                                            <CardHeader
                                                avatar={<Avatar className="board-avatar">{board.name.charAt(0)}</Avatar>}
                                                title={board.name}
                                                subheader={`${t('created-at')} DD/MM/YYYY`}
                                                action={
                                                    <React.Fragment>
                                                        <IconButton color="primary">
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton color="secondary" onClick={() => deleteBoard(board.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </React.Fragment>
                                                }
                                            />
                                            <CardContent>
                                                <Typography variant="h5">{board.name}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                :
                null
            }
            </Grid>
        </Box>
    );
}

export default BoardSelector;