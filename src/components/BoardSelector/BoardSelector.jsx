import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './BoardSelector.scss';

import actions from '../../services/redux/actions/actions';
import operations from '../../services/firebase/firestore/operations';

import BoardCard from '../BoardCard/BoardCard';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import AddIcon from '@mui/icons-material/Add';

const BoardSelector = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const boards = useSelector(state => state.boards);
    const user = useSelector(state => state.user);

    useEffect(() => {
        showAllBoards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            dispatch(
                actions.boardActions.resetBoards()
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showAllBoards = () => {
        if (!boards.length) {
            operations.boardOperations.getAllBoards(
                user.id,
                (id, data) => {
                    dispatch(actions.boardActions.addBoard(id, data.name, data.description, data.created));
                }
            );
        }
    }

    const createBoard = async () => {
        let name = t('board-default-name');
        let description = t('board-default-description');
        let id = await operations.boardOperations.createBoard(user.id, name, description);
        await operations.boardOperations.getBoardById(id, (id, data) => {
            dispatch(actions.boardActions.addBoard(id, data.name, data.description, data.created));
        });
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
                                onClick={createBoard}>
                                {t('new')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {boards.length !== 0 ?
                    <Grid item xs={12} >
                        <Box mt={2}>
                            <Grid container
                                spacing={3}
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center">
                                {boards.map((board) =>
                                    <BoardCard key={board.id} board={board}></BoardCard>
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