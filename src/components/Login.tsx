import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import faveLogo from '../assets/fave.svg';
import lightModeImage from '../assets/light.jpg';
import darkModeImage from '../assets/dark.png';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Login() {
  const classes = useStyles();
  const theme = useTheme();
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // ローディング状態
  const navigate = useNavigate();

  // ダークモードの確認
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const handleLogin = () => {
    if (username) {
      setLoading(true); // ローディング開始
      fetch(`https://t8vrh2rit7.execute-api.ap-northeast-1.amazonaws.com/test/api/users/${username}`, {
        method: 'POST',
      })
        .then((response) => {
          if (!response.ok && response.status !== 201) {
            throw new Error('ユーザー名が無効です。' + response.statusText);
          }
          if (response.status === 201) {
            alert('ユーザーを新規作成しました。');
          }
          return response.json();
        })
        .then(() => {
          navigate(`/timeline/?name=${username}`);
        })
        .catch((error) => {
          console.error('【Error logging in】:', error);
          setError('ログインに失敗しました。ユーザー名を確認してください。');
        })
        .finally(() => {
          setLoading(false); // ローディング終了
        });
    } else {
      setError('ユーザー名を入力してください。');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      position="relative"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
        maxWidth="600px"
        width="80%"
        bgcolor="rgba(255, 255, 255, 0.7)"
        position="relative"
        sx={{
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.06)',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 2,
        }}
      >
        <img
          src={faveLogo}
          alt="FAVE Logo"
          style={{ width: '200px', height: 'auto', marginBottom: '16px' }}
        />

        <img
          src={prefersDarkMode ? darkModeImage : lightModeImage}
          alt="FAVE"
          width={200}
          height={200}
          style={{ borderRadius: '50%', marginBottom: '16px' }}
        />

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textAlign: 'center',
            marginLeft: '8px',
          }}
        >
          推しを推し合う。
        </Typography>

        <TextField
          label="ユーザー名"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ marginBottom: 2, width: '100%' }}
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleLogin}
          fullWidth
          disabled={loading} // ローディング中はボタンを無効化
          sx={{
            background: loading ? '#CCC' : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white',
            fontWeight: 'bold',
            padding: '12px 24px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            '&:focus': {
              outline: 'none',
              boxShadow: 'none',
            },
            '&:hover': {
              background: loading ? '#CCC' : 'linear-gradient(45deg, #FE6B8B 40%, #FF8E53 100%)',
              boxShadow: '0 4px 8px 2px rgba(255, 105, 135, .4)',
            },
          }}
        >
          {loading ? '読み込み中...' : 'ログイン または サインアップ'}
        </Button>

        {/* クレジットを一貫したスタイルで表示 */}
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 2, display: 'inline' }}
        >
          <a href="https://github.com/docomo-KOSAMAX/FAVE" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            Made by KOSAMAX
          </a>
          <span
            style={{
              display: 'inline',
              whiteSpace: 'nowrap',
              position: 'relative',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                margin: '0 0.5rem',
              }}
            >
              <span
                style={{
                  display: 'none',
                }}
                className="separator"
              >
                |
              </span>
            </span>
            Powered by{' '}
            <a href="https://ja.react.dev/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              React
            </a>{' '}
            and{' '}
            <a href="https://mui.com/material-ui/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              Material-UI
            </a>
          </span>
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 1, display: 'inline' }}
        >
          Background Image:{' '}
          <a href="https://sakuranouta.biz/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            UTAIRO BOX
          </a>
          <span
            style={{
              display: 'inline',
              whiteSpace: 'nowrap',
              position: 'relative',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                margin: '0 0.5rem',
              }}
            >
              <span
                style={{
                  display: 'none',
                }}
                className="separator"
              >
                |
              </span>
            </span>
            Icon Image:{' '}
            <a href="https://www.adobe.com/jp/products/firefly.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              Adobe Firefly
            </a>
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
