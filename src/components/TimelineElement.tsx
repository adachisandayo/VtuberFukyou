import React from 'react';
import { Box, Typography, Button } from '@mui/material';

// 日付フォーマット変換関数
const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0ベースなので+1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// タイムライン要素の型定義
type Post = {
  id: number;
  message: string;
  fave_id: number;
  date_time: string;
  fave_name: string;
  reactions: {
    like: number;
    watch: number;
    love: number;
    new_listener: number;
  };
};

// TimelineElementコンポーネントのプロパティ型定義
interface TimelineElementProps {
  post: Post;
  error?: string | null;
  onLike: (id: number) => void;
  onWatch: (id: number) => void;
  onLove: (id: number) => void;
  onNewListener: (id: number) => void;
  onDelete?: (id: number) => void; // 削除ボタン用のオプション関数
}

// タイムライン要素コンポーネント
const TimelineElement: React.FC<TimelineElementProps> = ({
  post,
  error,
  onLike,
  onWatch,
  onLove,
  onNewListener,
  onDelete, // 削除ボタン用関数を追加
}) => {
  if (error) {
    return (
      <Typography color="error" variant="h6">
        {error}
      </Typography>
    );
  }

  return (
    <Box mb={3} p={2} border={1} borderRadius={2} boxShadow={2} bgcolor="background.paper">
      {/* タイトルと投稿日を同じ行に配置 */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          {post.fave_name} <span style={{ fontSize: '0.75em' }}>推し</span>
        </Typography>
        <Box textAlign="right">
          {/* 投稿者と投稿日を表示 */}
          <Typography variant="body2">{formatDateTime(post.date_time)}</Typography>
        </Box>
      </Box>
      <Typography>{post.message}</Typography>
      <Box mt={1}>
        {/* リアクションボタン */}
        <Button variant="outlined" size="small" onClick={() => onLike(post.id)}>
          👍 いいね: {post.reactions.like}
        </Button>{' '}
        <Button variant="outlined" size="small" onClick={() => onWatch(post.id)}>
          👀 見たよ: {post.reactions.watch}
        </Button>{' '}
        <Button variant="outlined" size="small" onClick={() => onLove(post.id)}>
          💘 好き: {post.reactions.love}
        </Button>{' '}
        <Button variant="outlined" size="small" onClick={() => onNewListener(post.id)}>
          🆕 リスナーになったよ！: {post.reactions.new_listener}
        </Button>
        {/* 削除ボタン（関数が渡された場合のみ表示） */}
        {onDelete && (
          <Button variant="outlined" size="small" color="error" onClick={() => onDelete(post.id)}>
            🗑️ 削除
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TimelineElement;
