FROM postgres:17.2-alpine AS build

EXPOSE 5432

COPY ./init.d /docker-entrypoint-initdb.d

CMD ["postgres"]
