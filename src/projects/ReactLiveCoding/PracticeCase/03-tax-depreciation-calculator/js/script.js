// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const depreciationForm = document.getElementById('depreciation-form');
    const resultsTable = document.getElementById('results-table');
    const resultsBody = document.getElementById('results-body');
    const errorMessage = document.getElementById('error-message');
    const calculationSummary = document.getElementById('calculation-summary');
    
    // Add form submission event listener
    depreciationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateDepreciation();
    });
    
    // Function to format currency values
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }
    
    // Function to calculate depreciation and display results
    function calculateDepreciation() {
        // Clear previous results and errors
        resultsBody.innerHTML = '';
        errorMessage.innerHTML = '';
        calculationSummary.innerHTML = '';
        
        // Get input values
        const assetCost = parseFloat(document.getElementById('asset-cost').value);
        const salvageValue = parseFloat(document.getElementById('salvage-value').value);
        const usefulLife = parseInt(document.getElementById('useful-life').value);
        const depreciationMethod = document.getElementById('depreciation-method').value;
        
        // Validate inputs
        if (isNaN(assetCost) || assetCost <= 0) {
            displayError('Asset Cost must be a positive number.');
            return;
        }
        
        if (isNaN(salvageValue) || salvageValue < 0) {
            displayError('Salvage Value must be a non-negative number.');
            return;
        }
        
        if (salvageValue >= assetCost) {
            displayError('Salvage Value must be less than Asset Cost.');
            return;
        }
        
        if (isNaN(usefulLife) || usefulLife <= 0 || !Number.isInteger(usefulLife)) {
            displayError('Useful Life must be a positive integer.');
            return;
        }
        
        // Generate and display depreciation schedule based on selected method
        let results;
        if (depreciationMethod === 'straight-line') {
            results = calculateStraightLineDepreciation(assetCost, salvageValue, usefulLife);
        } else if (depreciationMethod === 'diminishing-value') {
            results = calculateDiminishingValueDepreciation(assetCost, salvageValue, usefulLife);
        }
        
        // Display results
        displayResults(results, depreciationMethod);
    }
    
    // Function to calculate straight-line depreciation
    function calculateStraightLineDepreciation(assetCost, salvageValue, usefulLife) {
        const depreciableAmount = assetCost - salvageValue;
        const annualDepreciation = depreciableAmount / usefulLife;
        
        const results = [];
        let accumulatedDepreciation = 0;
        let bookValue = assetCost;
        
        for (let year = 1; year <= usefulLife; year++) {
            const beginningBookValue = bookValue;
            accumulatedDepreciation += annualDepreciation;
            bookValue = assetCost - accumulatedDepreciation;
            
            // Ensure book value doesn't go below salvage value due to rounding errors
            if (bookValue < salvageValue) {
                bookValue = salvageValue;
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
    }
    
    // Function to calculate diminishing value (declining balance) depreciation
    function calculateDiminishingValueDepreciation(assetCost, salvageValue, usefulLife) {
        // Double the straight-line rate (200% declining balance)
        const straightLineRate = 1 / usefulLife;
        const decliningBalanceRate = 2 * straightLineRate;
        
        const results = [];
        let accumulatedDepreciation = 0;
        let bookValue = assetCost;
        
        for (let year = 1; year <= usefulLife; year++) {
            const beginningBookValue = bookValue;
            
            // Calculate annual depreciation
            let annualDepreciation = beginningBookValue * decliningBalanceRate;
            
            // Ensure we don't depreciate below salvage value
            if (beginningBookValue - annualDepreciation < salvageValue) {
                annualDepreciation = beginningBookValue - salvageValue;
            }
            
            accumulatedDepreciation += annualDepreciation;
            bookValue = assetCost - accumulatedDepreciation;
            
            // Ensure book value doesn't go below salvage value due to rounding errors
            if (bookValue < salvageValue) {
                bookValue = salvageValue;
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
    }
    
    // Function to display error message
    function displayError(message) {
        errorMessage.textContent = message;
        resultsTable.style.display = 'none';
    }
    
    // Function to display depreciation results
    function displayResults(results, method) {
        // Show the table
        resultsTable.style.display = 'table';
        
        // Create and display calculation summary
        const methodName = method === 'straight-line' ? 'Straight-Line' : 'Diminishing Value (200%)';
        const assetCost = parseFloat(document.getElementById('asset-cost').value);
        const salvageValue = parseFloat(document.getElementById('salvage-value').value);
        const usefulLife = parseInt(document.getElementById('useful-life').value);
        
        calculationSummary.innerHTML = `
            <p><strong>Method:</strong> ${methodName}</p>
            <p><strong>Asset Cost:</strong> ${formatCurrency(assetCost)}</p>
            <p><strong>Salvage Value:</strong> ${formatCurrency(salvageValue)}</p>
            <p><strong>Useful Life:</strong> ${usefulLife} years</p>
        `;
        
        // Create table rows for each year's data
        results.forEach(result => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${result.year}</td>
                <td>${formatCurrency(result.beginningBookValue)}</td>
                <td>${formatCurrency(result.annualDepreciation)}</td>
                <td>${formatCurrency(result.accumulatedDepreciation)}</td>
                <td>${formatCurrency(result.endingBookValue)}</td>
            `;
            
            resultsBody.appendChild(row);
        });
    }
    
    // Reset form event listener
    document.getElementById('reset-btn').addEventListener('click', function() {
        resultsBody.innerHTML = '';
        errorMessage.innerHTML = '';
        calculationSummary.innerHTML = '';
        resultsTable.style.display = 'none';
    });
});
