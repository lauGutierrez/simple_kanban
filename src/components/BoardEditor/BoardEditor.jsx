import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';


import './BoardEditor.scss';

import actions from '../../services/redux/actions/actions';
import operations from '../../services/firebase/firestore/operations';

import BoardColumn from '../BoardColumn/BoardColumn';
import InternalView from '../InternalView/InternalView';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

const BoardEditor = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const params = useParams();

    const board = useSelector(state => state.selectedBoard);
    //const columns = useSelector(state => state.selectedBoard);

    const columns = [
        {
            id: 1,
            name: 'Columna 1',
        },
        {
            id: 2,
            name: 'Columna 2',
        },
        {
            id: 3,
            name: 'Columna 3',
        }
    ]

    useEffect(() => {
        showBoard();
    }, []);

    useEffect(() => {
        return () => {
            dispatch(
                actions.selectedBoardActions.resetSelectedBoard()
            );
        };
    }, []);

    const showBoard = () => {
        operations.boardOperations.getBoardById(params.boardId, (id, data) => {
            dispatch(
                actions.selectedBoardActions.setSelectedBoard(
                    id, data.name, data.description, data.created
                )
            );
        });
    }

    const addColumn = () => {
        console.log('add column requested');
    }

    return (
        <InternalView>
            <Box p={5}>
                <Grid container
                    direction="row"
                    spacing={2}>
                    <Grid item xs={12}>
                        <Grid container
                            direction="row"
                            spacing={2}
                            justifyContent="space-between">
                            <Grid item xs={8}>
                                <Typography variant="h4">{board.name}</Typography>
                                <Typography variant="subtitle1">{board.description}</Typography>
                            </Grid>
                            <Grid className="action-buttons-container" item xs={4}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<AddIcon />}
                                    onClick={addColumn}>
                                    {t('new-column')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {columns.length !== 0 ?
                        <Grid item xs={12} >
                            <Box mt={2}>
                                <Grid container
                                    spacing={3}
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center">
                                    {columns.map((column) =>
                                        <BoardColumn key={column.id} column={column}></BoardColumn>
                                    )}
                                </Grid>
                            </Box>
                        </Grid>
                    :
                    null
                }
                </Grid>
            </Box>
        </InternalView>
    );
}

export default BoardEditor;