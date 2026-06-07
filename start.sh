#!/usr/bin/env bash

echo "========================================="
echo "🐱 喵星之家 - 流浪猫领养匹配平台"
echo "========================================="
echo ""
echo "正在启动前端开发环境..."
echo ""

# 检查是否安装了 docker-compose
if ! command -v docker-compose &> /dev/null; then
    if ! command -v docker compose &> /dev/null; then
        echo "❌ 未检测到 docker-compose 或 docker compose 命令"
        echo "请先安装 Docker Desktop: https://www.docker.com/products/docker-desktop/"
        exit 1
    fi
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

echo "🐳 使用命令: $DOCKER_COMPOSE"
echo ""

# 停止并移除旧容器
echo "🛑 停止旧容器..."
$DOCKER_COMPOSE down

# 构建并启动容器
echo "🏗️  构建并启动开发环境..."
$DOCKER_COMPOSE up -d --build

echo ""
echo "✅ 服务已启动！"
echo ""
echo "🌐 访问地址: http://localhost:5173"
echo "🔧 热更新已启用，修改代码后会自动刷新"
echo ""
echo "📋 查看日志: $DOCKER_COMPOSE logs -f"
echo "⏹️  停止服务: $DOCKER_COMPOSE down"
echo ""
echo "🐾 祝使用愉快！"
