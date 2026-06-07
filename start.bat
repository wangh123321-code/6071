@echo off
chcp 65001 >nul
echo =========================================
echo 🐱 喵星之家 - 流浪猫领养匹配平台
echo =========================================
echo.
echo 正在启动前端开发环境...
echo.

where docker-compose >nul 2>nul
if %errorlevel%==0 (
    set DOCKER_COMPOSE=docker-compose
) else (
    where docker >nul 2>nul
    if %errorlevel%==0 (
        docker compose version >nul 2>nul
        if %errorlevel%==0 (
            set DOCKER_COMPOSE=docker compose
        ) else (
            echo ❌ 未检测到 docker-compose 或 docker compose 命令
            echo 请先安装 Docker Desktop: https://www.docker.com/products/docker-desktop/
            pause
            exit /b 1
        )
    ) else (
        echo ❌ 未检测到 Docker
        echo 请先安装 Docker Desktop: https://www.docker.com/products/docker-desktop/
        pause
        exit /b 1
    )
)

echo 🐳 使用命令: %DOCKER_COMPOSE%
echo.

echo 🛑 停止旧容器...
%DOCKER_COMPOSE% down

echo 🏗️  构建并启动开发环境...
%DOCKER_COMPOSE% up -d --build

echo.
echo ✅ 服务已启动！
echo.
echo 🌐 访问地址: http://localhost:5173
echo 🔧 热更新已启用，修改代码后会自动刷新
echo.
echo 📋 查看日志: %DOCKER_COMPOSE% logs -f
echo ⏹️  停止服务: %DOCKER_COMPOSE% down
echo.
echo 🐾 祝使用愉快！
pause
