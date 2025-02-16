import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const taxRules = {
  Australia: {
    currency: "AUD",
    rules: [
      { min: 0, max: 18200, rate: 0 },
      { min: 18201, max: 45000, rate: 0.19 },
      { min: 45001, max: 120000, rate: 0.325 },
      { min: 120001, max: 180000, rate: 0.37 },
      { min: 180001, max: Infinity, rate: 0.45 },
    ],
  },
  China: {
    currency: "CNY",
    rules: [
      { min: 0, max: 36000, rate: 0.03 },
      { min: 36001, max: 144000, rate: 0.1 },
      { min: 144001, max: 300000, rate: 0.2 },
      { min: 300001, max: 420000, rate: 0.25 },
      { min: 420001, max: 660000, rate: 0.3 },
      { min: 660001, max: 960000, rate: 0.35 },
      { min: 960001, max: Infinity, rate: 0.45 },
    ],
  },
  Canada: {
    currency: "CAD",
    rules: [
      { min: 0, max: 53359, rate: 0.15 },
      { min: 53360, max: 106717, rate: 0.205 },
      { min: 106718, max: 165430, rate: 0.26 },
      { min: 165431, max: 235675, rate: 0.29 },
      { min: 235676, max: Infinity, rate: 0.33 },
    ],
  },
  USA: {
    currency: "USD",
    rules: [
      { min: 0, max: 11600, rate: 0.1 },
      { min: 11601, max: 47150, rate: 0.12 },
      { min: 47151, max: 100525, rate: 0.22 },
      { min: 100526, max: 191950, rate: 0.24 },
      { min: 191951, max: 243725, rate: 0.32 },
      { min: 243726, max: 609350, rate: 0.35 },
      { min: 609351, max: Infinity, rate: 0.37 },
    ],
  },
  Japan: {
    currency: "JPY",
    rules: [
      { min: 0, max: 1950000, rate: 0.05 },
      { min: 1950001, max: 3300000, rate: 0.1 },
      { min: 3300001, max: 6950000, rate: 0.2 },
      { min: 6950001, max: 9000000, rate: 0.23 },
      { min: 9000001, max: 18000000, rate: 0.33 },
      { min: 18000001, max: 40000000, rate: 0.4 },
      { min: 40000001, max: Infinity, rate: 0.45 },
    ],
  },
  UK: {
    currency: "GBP",
    rules: [
      { min: 0, max: 12570, rate: 0 },
      { min: 12571, max: 50270, rate: 0.2 },
      { min: 50271, max: 125140, rate: 0.4 },
      { min: 125141, max: Infinity, rate: 0.45 },
    ],
  },
  France: {
    currency: "EUR",
    rules: [
      { min: 0, max: 10777, rate: 0 },
      { min: 10778, max: 27478, rate: 0.11 },
      { min: 27479, max: 78570, rate: 0.3 },
      { min: 78571, max: 168994, rate: 0.41 },
      { min: 168995, max: Infinity, rate: 0.45 },
    ],
  },
};

const calculateTax = (salary, rules) => {
  let tax = 0;
  for (const rule of rules) {
    if (salary > rule.min) {
      const taxableAmount = Math.min(salary, rule.max) - rule.min;
      tax += taxableAmount * rule.rate;
    }
  }
  return tax;
};

const SalaryCalculator = () => {
  const [selectedCountry, setSelectedCountry] = useState("Australia");
  const [grossSalary, setGrossSalary] = useState("");
  const [netSalary, setNetSalary] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleCalculate = () => {
    const salary = parseFloat(grossSalary);
    if (isNaN(salary) || salary < 0) {
      alert("Please enter a valid number");
      return;
    }
    const rules = taxRules[selectedCountry].rules;
    const tax = calculateTax(salary, rules);
    const net = salary - tax;
    setNetSalary(net.toFixed(2));
  };

  const generateTableData = () => {
    const data = [];
    const rules = taxRules[selectedCountry].rules;
    const currency = taxRules[selectedCountry].currency;
    for (let i = 10000; i <= 200000; i += 5000) {
      const tax = calculateTax(i, rules);
      const net = i - tax;
      const taxRate = (tax / i) * 100;
      data.push({
        salary: i,
        tax: tax.toFixed(2),
        net: net.toFixed(2),
        taxRate: taxRate.toFixed(2),
      });
    }
    return data;
  };

  const tableData = generateTableData();

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        International Salary After-Tax Calculator
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="country-select-label">Select Country</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedCountry}
          label="Select Country"
          onChange={handleCountryChange}
        >
          {Object.keys(taxRules).map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          label={`Gross Salary (${taxRules[selectedCountry].currency})`}
          variant="outlined"
          value={grossSalary}
          onChange={(e) => setGrossSalary(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleCalculate}>
          Calculate
        </Button>
      </Box>
      <Typography variant="h6" align="center" mt={2} color="blue">
        After-Tax Salary: {netSalary} {taxRules[selectedCountry].currency}
      </Typography>
      <Typography variant="h6" align="center" mt={4} mb={2}>
        Salary Gradient from 10,000 to 200,000{" "}
        {taxRules[selectedCountry].currency}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Gross Salary</TableCell>
            <TableCell>Tax</TableCell>
            <TableCell>After-Tax Salary</TableCell>
            <TableCell>Tax Rate (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                {row.salary} {taxRules[selectedCountry].currency}
              </TableCell>
              <TableCell>
                {row.tax} {taxRules[selectedCountry].currency}
              </TableCell>
              <TableCell>
                {row.net} {taxRules[selectedCountry].currency}
              </TableCell>
              <TableCell>{row.taxRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SalaryCalculator;
