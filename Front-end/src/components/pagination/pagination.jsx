import React from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

export default function PaginationRanges({ page, count, onChange }) {
  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={count}
          page={page}
          onChange={onChange}
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#3d3d3d',
              backgroundColor: '#fff',
              border: '1px solid #888',
              fontWeight: 500,
              transition: 'filter 300ms',
              '&:hover': {
                filter: 'drop-shadow(0 0 2em #646cffaa)', // subtle bluish shadow like your logo hover
              },
            },
            '& .Mui-selected': {
              backgroundColor: '#646cffaa', // translucent blue glow
              color: '#fff',
              borderColor: '#646cffaa',
              filter: 'drop-shadow(0 0 2em #646cffaa)',
            },
          }}
        />
      </Stack>
    </div>
  );
}
