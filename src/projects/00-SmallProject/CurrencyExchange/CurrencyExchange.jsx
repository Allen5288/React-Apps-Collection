import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  CircularProgress,
  Alert,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  YAxis,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import "flag-icons/css/flag-icons.min.css";

const currencies = {
  USD: { name: "US Dollar", code: "us" },
  EUR: { name: "Euro", code: "eu" },
  GBP: { name: "British Pound", code: "gb" },
  JPY: { name: "Japanese Yen", code: "jp" },
  AUD: { name: "Australian Dollar", code: "au" },
  CAD: { name: "Canadian Dollar", code: "ca" },
  CHF: { name: "Swiss Franc", code: "ch" },
  CNY: { name: "Chinese Yuan", code: "cn" },
  HKD: { name: "Hong Kong Dollar", code: "hk" },
  NZD: { name: "New Zealand Dollar", code: "nz" },
  SGD: { name: "Singapore Dollar", code: "sg" },
  THB: { name: "Thai Baht", code: "th" },
  KRW: { name: "South Korean Won", code: "kr" },
  INR: { name: "Indian Rupee", code: "in" },
};

const TimeRanges = {
  "24H": { days: 1, points: 24, interval: "hour", volatilityBase: 0.0005 },
  "7D": { days: 7, points: 7, interval: "day", volatilityBase: 0.002 },
  "1Y": { days: 365, points: 52, interval: "week", volatilityBase: 0.008 },
};

const CurrencyExchange = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState(null);
  const [historicalRates, setHistoricalRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRates, setShowRates] = useState(false);
  const [timeRange, setTimeRange] = useState("24H");
  const [autoRefresh, setAutoRefresh] = useState(false);

  const generateHistoricalData = (baseRate, timeRange) => {
    const { points, interval, volatilityBase } = TimeRanges[timeRange];
    const data = [];
    const now = new Date();

    // Initialize with base trend
    let trend = Math.random() < 0.5 ? 1 : -1;
    let currentRate = baseRate;

    for (let i = points - 1; i >= 0; i--) {
      const date = new Date(now);

      // Adjust date based on interval
      switch (interval) {
        case "hour":
          date.setHours(date.getHours() - i);
          break;
        case "day":
          date.setDate(date.getDate() - i);
          break;
        case "week":
          date.setDate(date.getDate() - i * 7);
          break;
      }

      // Randomly change trend direction (market reversal simulation)
      if (Math.random() < 0.15) {
        trend *= -1;
      }

      // Calculate rate changes with mean reversion
      const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
      const trendComponent =
        trend * volatilityBase * (1 + Math.abs(randomFactor));
      const meanReversionStrength = 0.3;
      const meanReversion =
        ((baseRate - currentRate) / baseRate) * meanReversionStrength;

      // Update current rate
      currentRate = currentRate * (1 + trendComponent + meanReversion);

      data.push({
        date: date.getTime(), // Store as timestamp instead of ISO string
        rate: currentRate,
      });
    }

    return data;
  };

  const fetchRates = async () => {
    setLoading(true);
    setShowRates(true);
    try {
      // Cache prevention for real-time updates
      const timestamp = new Date().getTime();
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/4d083209f0ec8510067da034/latest/${baseCurrency}?_=${timestamp}`
      );
      const data = await response.json();

      if (data.result === "success") {
        setRates(data.conversion_rates);
        setError(null);

        const historical = {};
        for (const currency of Object.keys(currencies)) {
          if (currency !== baseCurrency && data.conversion_rates[currency]) {
            historical[currency] = generateHistoricalData(
              data.conversion_rates[currency],
              timeRange
            );
          }
        }
        setHistoricalRates(historical);
      } else {
        throw new Error("Failed to fetch exchange rates");
      }
    } catch (err) {
      setError("Failed to fetch exchange rates. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
    if (showRates) {
      fetchRates();
    }
  };

  const handleTimeRangeChange = (_, newRange) => {
    if (newRange !== null) {
      setTimeRange(newRange);
      fetchRates();
    }
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    if (value === "" || !isNaN(value)) {
      setAmount(value);
    }
  };

  const handleGetRates = () => {
    fetchRates();
  };

  const calculateRateChange = (historicalData) => {
    if (!historicalData || historicalData.length < 2) return 0;

    // Calculate the percentage change between first and last rate
    const oldRate = historicalData[0].rate;
    const newRate = historicalData[historicalData.length - 1].rate;
    const changePercent = ((newRate - oldRate) / oldRate) * 100;

    // Round to 2 decimal places
    return Math.round(changePercent * 100) / 100;
  };

  // Add auto-refresh functionality
  useEffect(() => {
    let intervalId;
    if (autoRefresh && showRates) {
      intervalId = setInterval(fetchRates, 30000); // Refresh every 30 seconds
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefresh, showRates]);

  // Update useEffect dependencies to properly handle currency changes
  useEffect(() => {
    if (showRates) {
      fetchRates();
    }
  }, [timeRange, baseCurrency]);

  // Add auto-refresh toggle handler
  const handleAutoRefreshToggle = () => {
    setAutoRefresh((prev) => !prev);
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Real-Time Currency Exchange Rates
      </Typography>

      <Box
        sx={{
          mb: 4,
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Base Currency</InputLabel>
          <Select
            value={baseCurrency}
            onChange={handleCurrencyChange}
            label="Base Currency"
          >
            {Object.entries(currencies).map(
              ([code, { name, code: countryCode }]) => (
                <MenuItem
                  key={code}
                  value={code}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <span
                    className={`fi fi-${countryCode}`}
                    style={{ fontSize: "1em", marginRight: "4px" }}
                  />
                  {code} - {name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          sx={{ minWidth: 150 }}
        />
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={handleTimeRangeChange}
          aria-label="time range"
        >
          {Object.keys(TimeRanges).map((range) => (
            <ToggleButton key={range} value={range}>
              {range}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetRates}
          sx={{ height: "56px", minWidth: 150 }}
        >
          Get Exchange Rates
        </Button>
        <Button
          variant="outlined"
          color={autoRefresh ? "success" : "primary"}
          onClick={handleAutoRefreshToggle}
          sx={{ height: "56px" }}
        >
          {autoRefresh ? "Auto-refresh On" : "Auto-refresh Off"}
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            open("https://www.xe.com/");
          }}
          sx={{ height: "56px" }}
        >
          Go for Detail Trend
        </Button>
      </Box>

      {showRates &&
        (loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {Object.entries(currencies)
              .filter(([code]) => code !== baseCurrency)
              .map(([code, { name, code: countryCode }]) => {
                const rateChange = calculateRateChange(historicalRates[code]);
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={code}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.03)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <span
                          className={`fi fi-${countryCode}`}
                          style={{ fontSize: "1.2em" }}
                        />
                        <Typography variant="h6" component="span">
                          {code}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        {name}
                      </Typography>
                      <Typography variant="h5" sx={{ mt: 1 }}>
                        {rates && (amount * rates[code]).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: rateChange > 0 ? "success.main" : "error.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 0.5,
                        }}
                      >
                        {rateChange > 0 ? (
                          <TrendingUpIcon />
                        ) : (
                          <TrendingDownIcon />
                        )}
                        {rateChange.toFixed(2)}%
                      </Typography>
                      <Box sx={{ width: "100%", height: 100, mt: 2 }}>
                        <ResponsiveContainer>
                          <LineChart
                            data={historicalRates[code] || []}
                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              opacity={0.2}
                            />
                            <YAxis
                              hide
                              domain={["dataMin - 0.001", "dataMax + 0.001"]}
                              padding={{ top: 10, bottom: 10 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="rate"
                              stroke={rateChange > 0 ? "#4caf50" : "#f44336"}
                              dot={false}
                              strokeWidth={2}
                              animationDuration={500}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                border: "none",
                                borderRadius: "4px",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                padding: "8px",
                              }}
                              formatter={(value) => [
                                `${(+value).toFixed(4)}`,
                                "Rate",
                              ]}
                              labelFormatter={(timestamp) => {
                                if (!timestamp) return "";
                                const date = new Date(timestamp);
                                switch (timeRange) {
                                  case "24H":
                                    return date.toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    });
                                  case "7D":
                                    return date.toLocaleDateString([], {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                    });
                                  default:
                                    return date.toLocaleDateString([], {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    });
                                }
                              }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        1 {baseCurrency} = {rates && rates[code].toFixed(4)}{" "}
                        {code}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
          </Grid>
        ))}
    </Box>
  );
};

export default CurrencyExchange;
