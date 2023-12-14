FROM node:18-alpine AS base

RUN corepack enable
RUN corepack prepare yarn@stable --activate

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .yarnrc.yml ./
#COPY ./.yarn/plugins ./.yarn/plugins
COPY ./.yarn/releases ./.yarn/releases/

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS dev

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .



# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

FROM runner AS production

WORKDIR /app

#COPY --from=builder /app/.yarn/plugins .yarn/plugins/
COPY --from=builder /app/.yarnrc.yml .
COPY --from=builder /app/.yarn/releases .yarn/releases/

# Delete this folder cause it contains the `next` dependency which was output by Next.js builder.
# If we install dependencies later, yarn will try to rename cache file `***.tmp` to `***.zip`.
# But the name has been claimed already when it comes to `next` to be installed,
# which causes a failure of building image.
RUN rm -rf ./.yarn/cache

RUN yarn workspaces focus --all --production

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "/app/.yarn/releases/yarn-4.0.2.cjs", "--", "node", "/app/server.js"]
