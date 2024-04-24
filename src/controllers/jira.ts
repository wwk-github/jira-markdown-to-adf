import express from 'express';

import { defaultSchema } from '@atlaskit/adf-schema/schema-default';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { MarkdownTransformer } from '@atlaskit/editor-markdown-transformer';

export const jira = async (req: express.Request, res: express.Response) => {
    try {
        console.log('start jira controller');

        const jsonTransformer = new JSONTransformer();
        const markdownTransformer = new MarkdownTransformer(defaultSchema);

        const { markdown } = req.body;

        if (!markdown) {
            const _error = 'Error. Input json not properly formatted. Simple { "markdown": "payload" } needed.'
            console.log(_error);
            return res.status(400).send(_error);
        }

        const adf = jsonTransformer.encode(markdownTransformer.parse(markdown));
        
        console.log("%j", adf);

        console.log('end jira controller');

        return res.status(200).json(adf).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};