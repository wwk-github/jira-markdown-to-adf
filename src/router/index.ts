import express from 'express';

import jira from './jira';

const router = express.Router();

export default (): express.Router => {
    jira(router);

    return router;
};