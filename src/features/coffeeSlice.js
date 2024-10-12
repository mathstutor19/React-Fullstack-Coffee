import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the async thunk for fetching user data
export const showCoffees = createAsyncThunk("showCoffees", async () => {
  const response = await fetch("https://nodejs-coffee-project.vercel.app/api/products");
  const jsonData = await response.json();
  return jsonData;
});

export const addCoffees = createAsyncThunk("addCoffees", async (data) => {
  const response = await fetch("https://nodejs-coffee-project.vercel.app/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    return error.message;
  }
});

export const deleteCoffee = createAsyncThunk("deleteCoffee", async (id) => {
  const response = await fetch(`https://nodejs-coffee-project.vercel.app/api/products/${id}`, {
    method: "DELETE",
  });
  try {
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    return error.message;
  }
});

export const updateCoffee = createAsyncThunk("updateCoffee", async (data) => {
  const response = await fetch(
    `https://nodejs-coffee-project.vercel.app/api/products/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    return error.message;
  }
});

// Define the user slice
export const coffeeSlice = createSlice({
  name: "coffeeSlice",

  initialState: {
    coffee: {},
    coffees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCoffees.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCoffees.fulfilled, (state, action) => {
        state.loading = false;
        state.coffees.push(action.payload);
      })
      .addCase(addCoffees.rejected, (state, action) => {
        // add rejected case for addCoffees
        state.loading = false;
        state.error = action.error.message; // use action.error
      })
      .addCase(showCoffees.pending, (state) => {
        state.loading = true;
      })
      .addCase(showCoffees.fulfilled, (state, action) => {
        state.loading = false;
        state.coffees = action.payload;
      })
      .addCase(deleteCoffee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoffee.fulfilled, (state, action) => {
        state.loading = false;
        const { _id } = action.payload;
        console.log(_id);
        if (_id) {
          state.coffees = state.coffees.filter((coffee) => coffee._id !== _id);
        }
      })
      .addCase(deleteCoffee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCoffee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCoffee.fulfilled, (state, action) => {
        state.loading = true;
        state.coffees = state.coffees.map((coffee) =>
          coffee._id === action.payload._id ? action.payload : coffee
        );
      })
      .addCase(updateCoffee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const showCoffees = createAsyncThunk(
//   "showCoffees",
//   async (args, { rejectedWithValue }) => {
//     const responsive = await fetch("http://localhost:5000/api/products");
//     try {
//       const result = await responsive.json();
//       return result;
//     } catch (error) {
//       return rejectedWithValue(error);
//     }
//   }
// );

// export const coffeeSlice = createSlice({
//   name: "coffeeSlice",
//   initialState: {
//     coffee: {},
//     coffees: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: {
//     [showCoffees.pending]: (state) => {
//       state.loading = true;
//     },
//     [showCoffees.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.coffees = action.payload;
//     },
//     [showCoffees.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

export default coffeeSlice.reducer;
