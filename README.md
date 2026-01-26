[![Webhook CI](https://github.com/bydyas/webhook/actions/workflows/webhook.yml/badge.svg?branch=main&event=status)](https://github.com/bydyas/webhook/actions/workflows/webhook.yml)

# Test Task — Backend Engineer (Node.js | NATS)

* [Task Notion](https://opaque-production-68e.notion.site/Test-Task-Backend-Engineer-Node-js-NATS-29dce9899cb7804d9934d22be768a486)

* [Trello Dashboard](https://trello.com/b/iSyTRhiX/test-task-backend-engineer-nodejs-nats)

## How to run
Start the application with dependencies
```
docker-compose up
```

### Swagger
Each service has [swagger doc](http://localhost:300/api) to trigger endpoints ad-hoc.

### Monitor DB

Go to [pgAdmin](http://localhost:8080/browser/)
```
username: root@root.com
pwd: root
```

Query the events table
```
SELECT * FROM events
```

### NATS Stats
Go to [NATS](http://localhost:8222/varz)
