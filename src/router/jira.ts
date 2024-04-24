import express from 'express';

import { jira } from '../controllers/jira';

export default (router: express.Router) => {
    router.post('/jira', jira);
};