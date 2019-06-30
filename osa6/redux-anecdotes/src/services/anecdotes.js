import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const vote = async (id, voteAdded) => {
  const url = `${baseUrl}/${id}`;
  const response = await axios.put(url, voteAdded);
  return response.data;
};

const newAnecdote = async content => {
  console.log('CONTENT IN SERVICES: ', content);
  const resp = await axios.post(baseUrl, { content, votes: 0 });
  return resp.data;
};

export default { getAll, newAnecdote, vote };
