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
    const columns = useSelector(state => state.columns);

    useEffect(() => {
        showBoard();
    }, []);

    useEffect(() => {
        return () => {
            dispatch(
                actions.selectedBoardActions.resetSelectedBoard()
            );
            dispatch(
                actions.columnActions.resetColumns()
            );
        };
    }, []);

    const showBoard = () => {
        if (Object.keys(board).length === 0) {
            operations.boardOperations.getBoardById(
                params.boardId,
                (id, data) => {
                    dispatch(
                        actions.selectedBoardActions.setSelectedBoard(
                            id, data.name, data.description, data.created
                        )
                    );
                }
            );
            operations.columnOperations.getAllColumnsInBoard(
                params.boardId,
                (id, data) => {
                    dispatch(
                        actions.columnActions.addColumn(
                            id, data.name
                        )
                    );
                }
            );
        }
    }

    const addColumn = async () => {
        let name = t('column-default-name');
        let id = await operations.columnOperations.addColumnToBoard(board.id, name);
        dispatch(
            actions.columnActions.addColumn(id, name)
        );
    }

    return (
        <InternalView>
            <Box className="board-editor-container" p={5}>
                <Grid container
                    direction="row"
                    spacing={2}>
                    <Grid item xs={12} className="board-columns-header">
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
                        <Grid item xs={12} className="board-columns-container">
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