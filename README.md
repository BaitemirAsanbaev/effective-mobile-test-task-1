# Тестовое задание: "Сервис остатков товаров в магазине"

## Stack
- JavaScript
- NodeJS
- ExpressJS
- PostgresQL
- SQL
- Swagger

##  Установка и запуск проекта

###### Склонировать репозиторий
```bash
git clone https://github.com/BaitemirAsanbaev/shop-inventory.git
```

###### Установить библиотеки и зависимости
```bash
npm install
```
###### Создать базу данных в СУБД PostgresQL
```sql
CREATE DATABASE inventory;
```
###### Создать таблицы
SQL команды для создания таблиц есть в файле db.sql

###### Настроить .env файл
Скопировать и переименовать шаблонный файл
```bash
cp .example.env .env
```
Заполнить его корректными значениями

###### Запустить приложение
```bash
npm start
```
## Функционал
- CRUD для товаров, магазинов и остатков
- Возможность получения товаров по plu и name
- Возможность получения остатков по
    - PLU товара
    - ID магазина
    - количеству на полке в определенном диапозоне
    - количеству в заказе в определенном диапозоне
- Возможность регулировать количество товаров на полке и заказе
- возможность совершать заказ и возврат товаров (в определенном магазине)


## Структура проекта

### /db
sql файл для создания таблиц
js файл для подключения к базе данных
### /utils
Обработка ошибок, валидация, сваггер, логгер
### /inventory, /item, /shop
Модули, в каждом модуле есть
- router.js
    - маршрутизация, каждый эндпоинт задокументорван сваггером и к каждому привязаны соответсвующий middleware для валидации
- controller.js
    - Обработка запросов с клинта, валидация, вызов соответсвующего сервиса и ответ клиенту
- service.js
    - Бизнес логика, обработка данных, вызов методов из репозитория
- repository.js
    - Слой доступа к данным, вызов SQL запросов для работы с базой данных.

## Технические и архитектурные решения
### Модульная архитектура
Проект делится на модули, каждый из которых содержит файлы для конкретной сущности.
Так как тема проекта требует маштабируемость и гибкость такая архитектура подходит лучше всего. Так как изолированные модули почти не взаимодействуют между собой, их удобно расширять и добавлять новые модули без влияния на другие.

### Большое количество эндпоинтов

Некоторые эндпоинты, такие как увеличение и уменьшение остатков на полке или в заказе, имеют схожую логику. Их можно было объединить в один универсальный эндпоинт с использованием фильтра (например, через switch-case), который бы вызывал соответствующие методы сервиса. Однако такой подход требует передачи дополнительных параметров от клиента, что снижает читаемость кода и усложняет масштабируемость.

Поэтому было принято решение предоставить клиенту четыре отдельных эндпоинта для управления остатками. Также добавлены два специализированных эндпоинта — order (заказ товара) и refund (возврат товара). В отличие от первых, эти эндпоинты реализуют реальные бизнес-процессы, изменяя остатки на полке и в заказе взаимосвязанным образом.