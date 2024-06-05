import React from 'react';
import { List, ListItem, Card, CardContent, Typography } from '@mui/material';

const PostList = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post.id} sx={{ padding: 0, marginBottom: 2 }}>
          <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;
