## NEXTJS 14 With Docker Compose

This is project skeleton using Next.JS 14 with docker compose production ready.

"packageManager": "yarn@4.0.2"

### Usage

> mkdir next-app-project
> cd next-app-project
> yarn create next-app . --example <https://github.com/riandoza/nextjs-compose>

or
> yarn create next-app next-app-project --example <https://github.com/riandoza/nextjs-compose>
> cd next-app-project

For development locally
> yarn dev
>
For development with docker compose
> make start-dev
>
For Production with docker compose
> make start-prod
>
