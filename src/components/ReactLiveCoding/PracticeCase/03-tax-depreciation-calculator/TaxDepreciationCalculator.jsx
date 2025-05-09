import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Select, 
  MenuItem,
  FormControl, 
  InputLabel, 
  Button, 
  Grid, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Alert,
  FormHelperText
} from '@mui/material';
import './TaxDepreciationCalculator.css';

const TaxDepreciationCalculator = () => {
  // State for form inputs
  const [assetCost, setAssetCost] = useState('');
  const [salvageValue, setSalvageValue] = useState('');
  const [usefulLife, setUsefulLife] = useState('');
  const [depreciationMethod, setDepreciationMethod] = useState('straight-line');
  
  // State for results and validation
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Calculate straight-line depreciation
  const calculateStraightLineDepreciation = (cost, salvage, life) => {
    const depreciableAmount = cost - salvage;
    const annualDepreciation = depreciableAmount / life;
    
    const results = [];
    let accumulatedDepreciation = 0;
    let bookValue = cost;
    
    for (let year = 1; year <= life; year++) {
      const beginningBookValue = bookValue;
      accumulatedDepreciation += annualDepreciation;
      bookValue = cost - accumulatedDepreciation;
      
      // Ensure book value doesn't go below salvage value due to rounding errors
      if (bookValue < salvage) {
        bookValue = salvage;
      }
      
      results.push({
        year,
        beginningBookValue,
        annualDepreciation,
        accumulatedDepreciation,
        endingBookValue: bookValue
      });
    }
    
    return results;
  };
  
  // Calculate diminishing value (declining balance) depreciation
  const calculateDiminishingValueDepreciation = (cost, salvage, life) => {
    // Double the straight-line rate (200% declining balance)
    const straightLineRate = 1 / life;
    const decliningBalanceRate = 2 * straightLineRate;
    
    const results = [];
    let accumulatedDepreciation = 0;
    let bookValue = cost;
    
    for (let year = 1; year <= life; year++) {
      const beginningBookValue = bookValue;
      
      // Calculate annual depreciation
      let annualDepreciation = beginningBookValue * decliningBalanceRate;
      
      // Ensure we don't depreciate below salvage value
      if (beginningBookValue - annualDepreciation < salvage) {
        annualDepreciation = beginningBookValue - salvage;
      }
      
      accumulatedDepreciation += annualDepreciation;
      bookValue = cost - accumulatedDepreciation;
      
      // Ensure book value doesn't go below salvage value due to rounding errors
      if (bookValue < salvage) {
        bookValue = salvage;
      }
      
      results.push({
        year,
        beginningBookValue,
        annualDepreciation,
        accumulatedDepreciation,
        endingBookValue: bookValue
      });
    }
    
    return results;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset previous results and errors
    setError('');
    setResults([]);
    setShowResults(false);
    
    // Parse input values
    const cost = parseFloat(assetCost);
    const salvage = parseFloat(salvageValue);
    const life = parseInt(usefulLife);
    
    // Validate inputs
    if (isNaN(cost) || cost <= 0) {
      setError('Asset Cost must be a positive number.');
      return;
    }
    
    if (isNaN(salvage) || salvage < 0) {
      setError('Salvage Value must be a non-negative number.');
      return;
    }
    
    if (salvage >= cost) {
      setError('Salvage Value must be less than Asset Cost.');
      return;
    }
    
    if (isNaN(life) || life <= 0 || !Number.isInteger(life)) {
      setError('Useful Life must be a positive integer.');
      return;
    }
    
    // Calculate depreciation based on selected method
    let calculatedResults;
    
    if (depreciationMethod === 'straight-line') {
      calculatedResults = calculateStraightLineDepreciation(cost, salvage, life);
    } else {
      calculatedResults = calculateDiminishingValueDepreciation(cost, salvage, life);
    }
    
    // Update state with calculation results
    setResults(calculatedResults);
    setShowResults(true);
  };
  
  // Handle form reset
  const handleReset = () => {
    setAssetCost('');
    setSalvageValue('');
    setUsefulLife('');
    setDepreciationMethod('straight-line');
    setResults([]);
    setError('');
    setShowResults(false);
  };
  
  return (
    <Container className="tax-calculator-container">
      <Box className="tax-calculator-header" mb={4}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Tax Depreciation Calculator
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Calculate asset depreciation for tax purposes using common depreciation methods.
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} className="calculator-form">
            <Typography variant="h5" component="h2" gutterBottom>
              Asset Information
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Asset Cost ($)"
                variant="outlined"
                margin="normal"
                type="number"
                inputProps={{ min: "0.01", step: "0.01" }}
                value={assetCost}
                onChange={(e) => setAssetCost(e.target.value)}
                required
              />
              
              <TextField
                fullWidth
                label="Salvage Value ($)"
                variant="outlined"
                margin="normal"
                type="number"
                inputProps={{ min: "0", step: "0.01" }}
                value={salvageValue}
                onChange={(e) => setSalvageValue(e.target.value)}
                required
              />
              
              <TextField
                fullWidth
                label="Useful Life (years)"
                variant="outlined"
                margin="normal"
                type="number"
                inputProps={{ min: "1", step: "1" }}
                value={usefulLife}
                onChange={(e) => setUsefulLife(e.target.value)}
                required
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel id="depreciation-method-label">Depreciation Method</InputLabel>
                <Select
                  labelId="depreciation-method-label"
                  value={depreciationMethod}
                  label="Depreciation Method"
                  onChange={(e) => setDepreciationMethod(e.target.value)}
                >
                  <MenuItem value="straight-line">Straight-Line</MenuItem>
                  <MenuItem value="diminishing-value">Diminishing Value (200%)</MenuItem>
                </Select>
                <FormHelperText>
                  {depreciationMethod === 'straight-line' 
                    ? 'Equal annual depreciation amount over the asset\'s useful life.'
                    : 'Accelerated depreciation with higher amounts in earlier years.'}
                </FormHelperText>
              </FormControl>
              
              <Box mt={3} display="flex" justifyContent="space-between">
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large"
                >
                  Calculate Depreciation
                </Button>
                <Button 
                  type="button"
                  variant="outlined" 
                  color="secondary" 
                  size="large"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper elevation={3} className="results-section">
            <Typography variant="h5" component="h2" gutterBottom>
              Depreciation Schedule
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {showResults && (
              <>
                <Box className="calculation-summary" mb={2}>
                  <Typography variant="body1">
                    <strong>Method:</strong> {depreciationMethod === 'straight-line' ? 'Straight-Line' : 'Diminishing Value (200%)'}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Asset Cost:</strong> {formatCurrency(parseFloat(assetCost))}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Salvage Value:</strong> {formatCurrency(parseFloat(salvageValue))}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Useful Life:</strong> {usefulLife} years
                  </Typography>
                </Box>
                
                <TableContainer>
                  <Table aria-label="depreciation schedule">
                    <TableHead>
                      <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell>Beginning Book Value</TableCell>
                        <TableCell>Annual Depreciation</TableCell>
                        <TableCell>Accumulated Depreciation</TableCell>
                        <TableCell>Ending Book Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results.map((row) => (
                        <TableRow key={row.year}>
                          <TableCell>{row.year}</TableCell>
                          <TableCell>{formatCurrency(row.beginningBookValue)}</TableCell>
                          <TableCell>{formatCurrency(row.annualDepreciation)}</TableCell>
                          <TableCell>{formatCurrency(row.accumulatedDepreciation)}</TableCell>
                          <TableCell>{formatCurrency(row.endingBookValue)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
            
            {!showResults && !error && (
              <Typography variant="body1" align="center" color="textSecondary" sx={{ py: 4 }}>
                Enter asset information and click "Calculate Depreciation" to see results.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      <Box mt={4} textAlign="center">
        <Typography variant="caption" color="textSecondary">
          &copy; 2025 Tax Depreciation Calculator | For educational purposes only
        </Typography>
      </Box>
    </Container>
  );
};

export default TaxDepreciationCalculator;
