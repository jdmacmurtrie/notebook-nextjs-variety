import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Page } from '../app/types'
import fetchAPI from '../app/utils/fetchAPI';

export interface PageState {
  pages: Page[];
  currentPage: Page | null;
}

const initialState: PageState = {
  pages: [],
  currentPage: null,
}

export const fetchPages = createAsyncThunk('fetchPages', async () => {
  const response = await fetchAPI({ url: '/get_pages' })
  const jsonData = await response.json();

  return jsonData;
})

export const addNewPage = createAsyncThunk('addNewPage',
  async (body: { title: string, body: string }) => {
    const response = await fetchAPI({ url: '/add_page', method: 'POST', body })
    const jsonData = await response.json();

    return jsonData;
  })

export const updatePage = createAsyncThunk('updatePage',
  async (body: { title: string, body: string, id: number }) => {
    const response = await fetchAPI({ url: '/update_page', method: 'PUT', body })
    const jsonData = await response.json();

    return jsonData;
  })

export const deletePage = createAsyncThunk('deletePage',
  async (body: { id: number }) => {
    const response = await fetchAPI({ url: '/delete_page', method: 'DELETE', body })
    const jsonData = await response.json();

    return jsonData;
  })

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<Page['id']>) => {
      state.currentPage = state.pages.find(({ id }) => id === action.payload) || null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.pages = action.payload;
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        const { id, title, body } = action.payload.updated_page;

        const oldPageIndex = state.pages.findIndex((page) => page.id === id)
        const newState = { ...state.pages }
        newState.splice(oldPageIndex, 1, { id, title, body })

        state.pages = newState
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.pages = state.pages.filter(page => page.id !== action.payload.id)
      })
  },
})

export const { setCurrentPage } = pageSlice.actions

export default pageSlice.reducer