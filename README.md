## Требования

- Docker
- Node.js (для локальной разработки)

## Запуск

Запустите приложение:
```bash
/bin/bash ./bin/setup.sh
```

## API Endpoints

### Создание пользователя
```bash
curl -X POST "http://localhost:3000/api/v/1/users/create" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{"full_name": "Иванов Иван", "role": "admin", "efficiency": 85}'
```

### Получение списка пользователей
```bash
curl -X GET "http://localhost:3000/api/v/1/users/get" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

Пример с фильтрацией:
```bash
curl -X GET "http://localhost:3000/api/v/1/users/get?full_name=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%20%D0%98%D0%B2%D0%B0%D0%BD&role=admin&efficiency=85&limit=20&offset=0" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

### Получение пользователя по ID
```bash
curl -X GET "http://localhost:3000/api/v/1/users/get/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

### Обновление пользователя
```bash
curl -X PATCH "http://localhost:3000/api/v/1/users/update/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{"full_name": "Иванов Иван Петрович", "role": "manager", "efficiency": 90}'
```

### Удаление пользователя
```bash
curl -X DELETE "http://localhost:3000/api/v/1/users/delete/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

### Удаление всех пользователей
```bash
curl -X DELETE "http://localhost:3000/api/v/1/users/delete" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```