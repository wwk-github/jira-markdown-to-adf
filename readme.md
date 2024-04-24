# build

Build. Usage of local .npmrc is optional.

    git pull APP
    cd APP
    docker build . -t jira-markdown-to-adf --secret id=npmrc,src=.npmrc

# run

Run. Can change the default port.

    docker run -p 9024:8084 jira-markdown-to-adf

# use

Use rest api.

## request

    curl --location 'http://localhost:9024/jira' \
    --header 'Content-Type: application/json' \
    --data '{
        "markdown": "# In vita mentis ego cum sub hos## Vicisse inpleritLorem markdownum sorores viris ingeniis nisi. Ora *super* tenet deae, quo tuncest **insistere unda** fuerant sagitta rogabam aerias infra custodemque.## Lea hoc attrahit moenibus saucia Delos laceros"
    }'

## response

### raw

    {"version":1,"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"In vita mentis ego cum sub hos## Vicisse inpleritLorem markdownum sorores viris ingeniis nisi. Ora "},{"type":"text","text":"super","marks":[{"type":"em"}]},{"type":"text","text":" tenet deae, quo tuncest "},{"type":"text","text":"insistere unda","marks":[{"type":"strong"}]},{"type":"text","text":" fuerant sagitta rogabam aerias infra custodemque.## Lea hoc attrahit moenibus saucia Delos laceros"}]}]}

### pretty

    {
        "version": 1,
        "type": "doc",
        "content": [
            {
                "type": "heading",
                "attrs": {
                    "level": 1
                },
                "content": [
                    {
                        "type": "text",
                        "text": "In vita mentis ego cum sub hos## Vicisse inpleritLorem markdownum sorores viris ingeniis nisi. Ora "
                    },
                    {
                        "type": "text",
                        "text": "super",
                        "marks": [
                            {
                                "type": "em"
                            }
                        ]
                    },
                    {
                        "type": "text",
                        "text": " tenet deae, quo tuncest "
                    },
                    {
                        "type": "text",
                        "text": "insistere unda",
                        "marks": [
                            {
                                "type": "strong"
                            }
                        ]
                    },
                    {
                        "type": "text",
                        "text": " fuerant sagitta rogabam aerias infra custodemque.## Lea hoc attrahit moenibus saucia Delos laceros"
                    }
                ]
            }
        ]
    }