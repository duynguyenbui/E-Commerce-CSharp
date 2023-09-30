import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';

export const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider {...settings}>
        <div
          style={{
            borderRadius: '0.5rem',
            margin: '0 10px',
            boxShadow:
              '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
        >
          <img
            src="/images/hero1.jpg"
            alt="hero"
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              borderRadius: '0.5rem',
            }}
          />
        </div>
        <div
          style={{
            borderRadius: '0.5rem',
            margin: '0 10px',
            boxShadow:
              '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
        >
          <img
            src="/images/hero2.jpg"
            alt="hero"
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              borderRadius: '0.5rem',
            }}
          />
        </div>
        <div
          style={{
            margin: '0 10px',
            boxShadow:
              '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            borderRadius: '0.5rem',
          }}
        >
          <img
            src="/images/hero3.jpg"
            alt="hero"
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              borderRadius: '0.5rem',
            }}
          />
        </div>
      </Slider>
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <Typography variant="h1">Welcome to the store!</Typography>
      </Box>
    </>
  );
};
