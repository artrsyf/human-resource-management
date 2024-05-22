FROM golang:alpine AS builder

LABEL stage=gobuilder

ENV CGO_ENABLED 0

ENV GOOS linux

RUN apk update --no-cache && apk add --no-cache tzdata

WORKDIR /build

COPY ./go.mod .

COPY ./go.sum .

RUN go mod download

COPY . .

RUN go build -ldflags="-s -w" -o /app/back ./cmd/back/

FROM alpine

RUN apk update --no-cache

WORKDIR /app/users_api/bin/users_api/

COPY --from=builder /build/cmd/back/.env /app/users_api/bin/users_api/.env
COPY --from=builder /build/cmd/back/config.yaml /app/users_api/bin/users_api/config.yaml
COPY --from=builder /app/back /app/users_api/bin/users_api/back

EXPOSE 8080

RUN chmod +x back

CMD ["./back"]