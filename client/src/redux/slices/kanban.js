import { createSlice } from '@reduxjs/toolkit';
import { reject, map } from 'lodash';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  board: {
    columns: []
  }
};

const slice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET BOARD
    getBoardSuccess(state, action) {
      state.isLoading = false;
      state.board = action.payload;
    },

    // CREATE NEW COLUMN
    createColumnSuccess(state, action) {
      const newColumn = action.payload;
      state.isLoading = false;
      state.board.columns = [...state.board.columns, newColumn];
    },

    // UPDATE COLUMN
    updateColumnSuccess(state, action) {
      const column = action.payload;

      state.isLoading = false;
      state.board.columns = map(state.board.columns, (_column) => {
        if (_column.id === column.id) {
          return column;
        }
        return _column;
      });
    },

    // DELETE COLUMN
    deleteColumnSuccess(state, action) {
      const { columnId } = action.payload;
      state.isLoading = false;
      state.board.columns = reject(state.board.columns, { id: columnId });
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getBoard() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/kanban/board');
      dispatch(slice.actions.getBoardSuccess(response.data.board));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createColumn(newColumn) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/kanban/columns/new', newColumn);
      dispatch(slice.actions.createColumnSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateColumn(columnId, updateColumn) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/kanban/columns/update', {
        columnId,
        updateColumn
      });
      dispatch(slice.actions.updateColumnSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteColumn(columnId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/kanban/columns/delete', { columnId });
      dispatch(slice.actions.deleteColumnSuccess({ columnId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
