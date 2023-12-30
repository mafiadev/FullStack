## Diagram

```mermaid
graph TD;
user-->browser;
browser-->server;
server-->browser;
browser-->user;
input-->server;
user-->setText;
setText-->input;
```
