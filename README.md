## Требования

- Docker
- Docker Compose
- Node.js (для локальной разработки)

## Установка

1. Заполните переменными файл ./bin/setup.sh

2. Запустите приложение:
```bash
./bin/setup.sh
```

## API Endpoints

### Создание пользователя
```bash
curl -X POST "http://localhost/api/v/1/users/create" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{"full_name": "Иванов Иван", "role": "admin", "efficiency": 85}'
```

### Получение списка пользователей
```bash
curl -X GET "http://localhost/api/v/1/users" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

Параметры запроса:
- `full_name` - фильтр по имени (можно передавать через запятую)
- `role` - фильтр по роли (можно передавать через запятую)
- `efficiency` - фильтр по эффективности (можно передавать через запятую)
- `limit` - количество записей на странице (по умолчанию 10)
- `offset` - смещение для пагинации (по умолчанию 0)

Пример с фильтрацией:
```bash
curl -X GET "http://localhost/api/v/1/users?full_name=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%20%D0%98%D0%B2%D0%B0%D0%BD&role=admin&efficiency=85&limit=20&offset=0" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

### Получение пользователя по ID
```bash
curl -X GET "http://localhost/api/v/1/users/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

### Обновление пользователя
```bash
curl -X PATCH "http://localhost/api/v/1/users/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{"full_name": "Иванов Иван Петрович", "role": "manager", "efficiency": 90}'
```

### Удаление пользователя
```bash
curl -X DELETE "http://localhost/api/v/1/users/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

### Удаление всех пользователей
```bash
curl -X DELETE "http://localhost/api/v/1/users" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```