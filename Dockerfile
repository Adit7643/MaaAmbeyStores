# Use the official PHP 8.1 FPM image with Composer
FROM php:8.1-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev curl nodejs npm \
 && docker-php-ext-install pdo_mysql zip

# Bring in Composer from its official image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Run migrations & seed (if desired)
RUN php artisan migrate --force --seed

# Install & build frontend assets
RUN npm install \
 && npm run build

# Expose port and define the default command
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
