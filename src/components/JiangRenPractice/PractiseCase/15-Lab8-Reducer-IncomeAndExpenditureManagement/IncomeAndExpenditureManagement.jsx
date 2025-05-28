import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import "./IncomeAndExpenditureManagement.scss"; // Import your CSS file here
import Header from "./components/Header"; // Import the Header component
import IncomeExpense from "./components/IncomeExpense";
import TransactionList from "./components/TransactionList";
import Balance from "./components/Balance"; // Import the Balance component
import AddTransaction from "./components/AddTransaction"; // Import the AddTransaction component
import { GlobalProvider } from "./context/GlobalState";

function IncomeAndExpenditureManagement() {
  return (
    <Container
      id="income-and-expenditure-management"
      maxWidth="lg"
      sx={{ mt: 4 }}
    >
      <GlobalProvider>
        <Header />
        <div className="container">
          <Balance />
          <IncomeExpense />
          <TransactionList />
          <AddTransaction />
        </div>
      </GlobalProvider>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          component={Link}
          to="/jiangRenPractice"
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Back to Practice Home
        </Button>
      </Box>
    </Container>
  );
}

export default IncomeAndExpenditureManagement;
