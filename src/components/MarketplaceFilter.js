import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

        <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth sx={{ my: 2 }}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Choose a date" />
          </DemoContainer>
        </LocalizationProvider>

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="restaurant-select-label">Price</InputLabel>
          <Select
            labelId="price-select-label"
            id="price-select"
            value={restaurantFilter}
            label="Price"
            onChange={handleRestaurantChange}
          >
            
            <MenuItem value="low">$0-$5</MenuItem>
            <MenuItem value="mid">$5-$10</MenuItem>
            <MenuItem value="high">{'>'}$10</MenuItem> 
          </Select>
        </FormControl>
      
      <Typography> {/*Temporary display for availability*/}
        There are options available!
        No options available
      </Typography>
      </CardContent>
    </Card>
  );
};

export default MarketplaceFilter;
