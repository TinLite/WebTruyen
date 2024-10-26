import React, { useState } from 'react';
import {Box,Button,Container,CssBaseline,TextField,Typography,Paper,Grid,Link,} from '@mui/material';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Phone:', phone);
      console.log('Password:', password);
    };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
        backgroundImage: 'url(https://store.gkids.com/cdn/shop/products/096_1245x700.jpg?v=1675792844)',
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
      <Container component="main" maxWidth="xs" sx={{ zIndex: 2, position: 'relative' }}>
      <Paper
            elevation={3}
            sx={{
              padding: 4,
              borderRadius: 3,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              mt: 5,
            }}
          >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography component="h1" variant="h5">
              Đăng ký tài khoản
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Tên của bạn"
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
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                id="phone"
                label="SDT"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                label="Nhập lại mật khẩu "
                type="password"
                id="password"
                autoComplete="current-password"
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
                Đăng ký
              </Button>
              <Box display="flex" justifyContent="center" mt={2}>
                <Typography variant="body2">
                  Bạn đã có tài khoản? Hãy {' '}
                  <Link href="/login" variant="body2" color="primary">
                    Đăng nhập.
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

export default Register;
