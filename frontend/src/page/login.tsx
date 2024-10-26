import React, { useState } from 'react';
import {Box,Button,Container,CssBaseline,TextField,Typography,Paper,Grid,Link,} from '@mui/material';

const Login = () => {
  const [name , setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Password:', password);
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
        backgroundImage: 'url(https://wallpapercave.com/wp/wp9523242.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <CssBaseline />
      {
        
      }
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      />
     <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',  
          zIndex: 2,
          position: 'relative',
          paddingRight: 8,
        }}
      ></Grid>
      <Container component="main" maxWidth="xs" sx={{ zIndex: 2, position: 'relative' }}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            mt: 20,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Tên người dùng"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  style: { color: 'white' },
                }}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: { color: 'white' },
                }}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, borderRadius: 2 }}
              >
                Đăng nhập
              </Button>
              <Box display="flex" justifyContent="center" mt={2}>
                <Typography variant="body2">
                  Bạn chưa có tài khoản?{' '}
                  <Link href="/register" variant="body2" color="primary">
                    Tạo tài khoản
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Grid>
  );
};

export default Login;
