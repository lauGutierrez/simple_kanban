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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showBoard = () => {
        if (Object.keys(board).length === 0) {
            operations.boardOperations.getBoardById(
                params.boardId,
                (boardId, boardData) => {
                    dispatch(
                        actions.selectedBoardActions.setSelectedBoard(
                            boardId,
                            boardData.name,
                            boardData.description,
                            boardData.created,
                            boardData.columns
                        )
                    );
                    operations.columnOperations.getAllColumnsInBoard(
                        boardData.columns,
                        (columnId, columnData) => {
                            dispatch(
                                actions.columnActions.addColumn(
                                    columnId, columnData.name, []
                                )
                            );
                            operations.columnOperations.getAllTasksInColumn(
                                columnData.tasks,
                                (taskId, taskData) => {
                                    dispatch(
                                        actions.columnActions.addTaskToColumn(
                                            columnId, taskId, taskData.name
                                        )
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    }

    const createColumn = async () => {
        let name = t('column-default-name');
        let id = await operations.columnOperations.createColumn(board.id, name);
        
        dispatch(actions.columnActions.addColumn(id, name, []));
        dispatch(actions.selectedBoardActions.addColumnToBoard(id));
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
                                    onClick={createColumn}>
                                    {t('new-column')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {columns && columns.length !== 0 ?
                        <div className="board-columns-container">
                            {columns.map((column) =>
                                <BoardColumn key={column.id} column={column}></BoardColumn>
                            )}
                        </div>
                    :
                        null
                    }
                </Grid>
            </Box>
        </InternalView>
    );
}

export default BoardEditor;