import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const MarketplaceFilter = ({ onFiltersChange }) => {
  const [timeFilter, setTimeFilter] = useState('');
  const [restaurantFilter, setRestaurantFilter] = useState('');

  const handleTimeChange = (event) => {
    setTimeFilter(event.target.value);
    
  };

  const handleRestaurantChange = (event) => {
    setRestaurantFilter(event.target.value);
    
  };

  return (
    <Card sx={{ minWidth: 275, m: "2em" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Filter
        </Typography>

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="time-select-label">Time</InputLabel>
          <Select
            labelId="time-select-label"
            id="time-select"
            value={timeFilter}
            label="Time"
            onChange={handleTimeChange}
          >
            <MenuItem value="hour">Last Hour</MenuItem>
            <MenuItem value="day">Today</MenuItem>
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="all">All Time</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="restaurant-select-label">Restaurant</InputLabel>
          <Select
            labelId="restaurant-select-label"
            id="restaurant-select"
            value={restaurantFilter}
            label="Restaurant"
            onChange={handleRestaurantChange}
          >
            
            <MenuItem value="restaurant1">BPlate</MenuItem>
            <MenuItem value="restaurant2">De Neve</MenuItem>
            <MenuItem value="restaurant3">Epicuria</MenuItem>
            
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default MarketplaceFilter;
