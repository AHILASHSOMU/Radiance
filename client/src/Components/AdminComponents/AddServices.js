import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import apiCalls from "../../EndPoints/AdminApiCalls";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

export default function MyComponent(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [blockSuccess, setBlockSuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiCalls.allCategory();
      setCategories(response.Categories);
    };
    fetchData();
  }, [addSuccess,blockSuccess]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const name = inputValue;
    console.log(name);
    const response = await apiCalls.addCategory(name);
    if(response.status === "Category already exist"){
      setErrorMessage("Category already exists in database");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    } else if (response.status === "Category added") {
      setAddSuccess(!addSuccess);
      setInputValue("");
    } else {
      setErrorMessage("Error occurred while adding Category");
    }   
    
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const categoryStatusClick = async (id) => {
    console.log(id);
    const categoryId = {
      id : id,
    };
    console.log(categoryId);
    const result = await apiCalls.CategoryStatusControl(categoryId)
    setBlockSuccess(!blockSuccess)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Add Category
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Add Category"
            variant="outlined"
            name="name"
            value={inputValue}
            onChange={handleInputChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add
          </Button>
        </form>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </Grid>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No.</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
          {category.is_blocked ? (
            <Button
              variant="contained"
              color="primary"
              style={{
                width: '100px',
                
              }}
              onClick={() => categoryStatusClick(category._id)}
            >
              Unblock
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: '100px',
                
              }}
              onClick={() => categoryStatusClick(category._id)}
              
            >
              Block
            </Button>
          )}
        </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}
