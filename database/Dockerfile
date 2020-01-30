FROM mysql

ENV MYSQL_DATABASE gamers_alley
ENV MYSQL_ROOT_PASSWORD strongpassword!123
ENV MYSQL_USER user
ENV MYSQL_PASSWORD password123

COPY . /docker-entrypoint-initdb.d

EXPOSE 3306