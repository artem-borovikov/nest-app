# NestJS TypeORM API

REST API для управления пользователями, построенное на NestJS и TypeORM.

## Требования

- Docker
- Docker Compose
- Node.js (для локальной разработки)

## Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd nest-typeorm
```

2. Запустите приложение:
```bash
./bin/setup.sh
```

## API Endpoints

### Создание пользователя
```bash
curl -X POST "http://localhost:8000/api/v/1/users/create" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{"full_name": "Иванов Иван", "role": "admin", "efficiency": 85}'
```

### Получение списка пользователей
```bash
curl -X GET "http://localhost:8000/api/v/1/users" \
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
curl -X GET "http://localhost:8000/api/v/1/users?full_name=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%20%D0%98%D0%B2%D0%B0%D0%BD&role=admin&efficiency=85&limit=20&offset=0" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

### Получение пользователя по ID
```bash
curl -X GET "http://localhost:8000/api/v/1/users/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

### Обновление пользователя
```bash
curl -X PATCH "http://localhost:8000/api/v/1/users/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{"full_name": "Иванов Иван Петрович", "role": "manager", "efficiency": 90}'
```

### Удаление пользователя
```bash
curl -X DELETE "http://localhost:8000/api/v/1/users/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

### Удаление всех пользователей
```bash
curl -X DELETE "http://localhost:8000/api/v/1/users" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```

## Структура проекта

```
.
├── api/                    # API приложение
│   ├── src/               # Исходный код
│   │   ├── infrastructure/ # Инфраструктурный код
│   │   ├── users/         # Модуль пользователей
│   │   │   ├── controllers/ # Контроллеры
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── entities/   # Сущности
│   │   │   ├── services/   # Сервисы
│   │   │   └── utils/      # Утилиты
│   │   │
│   │   └── main.ts        # Точка входа
│   └── package.json       # Зависимости
├── db/                    # База данных
│   └── init.d/           # Скрипты инициализации
├── bin/                   # Скрипты
│   └── setup.sh          # Скрипт установки
└── docker-compose.*.yaml # Конфигурация Docker
```

## Переменные окружения

```env
APP_HOST=localhost
JWT_SECRET=ruly_develop_test_secret
MYSQL_HOST=81.31.247.100
MYSQL_PORT=3306
MYSQL_USER=zdrUde
MYSQL_PASSWORD=WWquViuEjmmZGXhs
MYSQL_DATABASE=CwaQWGLI
```

## Развертывание на сервер

1. Синхронизация кода:
```bash
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'dist' --exclude 'bin' ./ developer@185.93.110.217:/home/developer/app
```

2. Запуск на сервере:
```bash
cd /home/developer/app
./bin/setup.sh
```

## Ответы API

### Успешный ответ
```json
{
  "success": true,
  "data": {
    // Данные
  }
}
```

### Ошибка
```json
{
  "success": false,
  "message": "Описание ошибки" // Опционально
}
```

## Коды ответов

- 200 OK - успешный запрос
- 201 Created - успешное создание
- 400 Bad Request - некорректный запрос
- 401 Unauthorized - неавторизованный доступ
- 404 Not Found - ресурс не найден
- 409 Conflict - конфликт (например, пользователь уже существует)
- 500 Internal Server Error - внутренняя ошибка сервера