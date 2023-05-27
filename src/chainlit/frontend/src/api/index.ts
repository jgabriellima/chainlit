import { IAction } from 'state/action';
import { ILLMSettings } from 'state/chat';
import { Role } from 'state/user';

export const server = 'http://127.0.0.1:5173';
// export const server = '';

export const getProjectSettings = async () => {
  const res = await fetch(`${server}/project/settings`, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'GET'
  });

  return res.json();
};

export const getCompletion = async (
  prompt: string,
  settings: ILLMSettings,
  userEnv = {}
) => {
  const res = await fetch(`${server}/completion`, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ prompt, settings, userEnv })
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const completion = await res.text();
  return completion;
};

export const postMessage = async (
  sessionId: string,
  author: string,
  content: string
) => {
  const res = await fetch(`${server}/message`, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ sessionId, author, content })
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

export const callAction = async (sessionId: string, action: IAction) => {
  const res = await fetch(`${server}/action`, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ sessionId, action })
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

export const getRole = async (
  chainlitServer: string,
  accessToken: string,
  projectId: string
) => {
  const res = await fetch(`${chainlitServer}/api/role`, {
    headers: {
      'content-type': 'application/json',
      Authorization: accessToken
    },
    method: 'POST',
    body: JSON.stringify({ projectId })
  });

  return res.json() as Promise<{ role: Role }>;
};
