# 支付宝账单分析工具

一个基于 Flask 的支付宝账单分析工具，提供可视化的消费分析和智能洞察。

## 功能特点

### 数据分析
- 年度总览：年度消费趋势、收支比例
- 月度分析：月度消费趋势、环比变化
- 分类分析：消费分类占比、分类趋势
- 时间分析：时段分布、工作日/周末对比
- 消费洞察：智能画像、消费习惯
- 交易记录：明细查询、多维筛选

### 智能洞察
- 消费画像：个性化标签、行为特征
- 最常光顾商家：消费金额、频次分析
- 消费场景：渠道分布、时段偏好
- 消费习惯：固定支出、周末消费等指标

### 数据可视化
- 交互式图表
- 动态数据更新
- 多年份切换
- 响应式设计

## 安装说明

1. 克隆仓库：
~~~bash
git clone https://github.com/hessel/alipay-analysis.git
cd alipay-analysis
~~~

2. 安装依赖：
~~~bash
pip install -r requirements.txt
~~~

3. 运行应用：
~~~bash
python app.py
~~~

4. 访问应用：
打开浏览器访问 `http://localhost:8080`

## 项目结构
~~~
alipay-analysis/
├── app.py                 # Flask 应用主文件
├── analyze_merchants.py   # 商家分析模块
├── requirements.txt       # 项目依赖
├── templates/            # 模板文件目录
│   ├── base.html        # 基础模板
│   ├── index.html       # 首页
│   ├── yearly.html      # 年度分析
│   ├── monthly.html     # 月度分析
│   ├── category.html    # 分类分析
│   ├── time.html        # 时间分析
│   ├── insights.html    # 消费洞察
│   ├── transactions.html # 交易记录
│   └── settings.html    # 设置页面
└── README.md            # 项目说明文档
~~~

## 数据要求

支持支付宝账单 CSV 文件，必需字段：
- 交易时间
- 交易对方
- 商品说明
- 收/支
- 金额
- 交易分类
- 收/付款方式

## 技术栈

- 后端：Python + Flask
- 前端：HTML + CSS + JavaScript
- 数据处理：Pandas
- 可视化：ECharts
- UI设计：Apple Design 风格

## 主要功能

### 消费洞察
- 智能消费画像生成
- 消费习惯分析
- 商家消费分析
- 场景分布分析

### 数据分析
- 多维度数据统计
- 趋势分析
- 同比环比分析
- 分类占比分析

### 交易记录
- 明细查询
- 多维度筛选
- 状态标记
- 分页显示

## 注意事项

- 所有数据仅在本地处理，保护隐私安全
- 支持 GBK 编码的支付宝账单文件
- 自动处理退款和交易关闭状态
- 支持多年份数据分析
- 支持响应式布局，适配不同设备

## 开发计划

- [ ] 添加更多智能分析维度
- [ ] 支持数据导出功能
- [ ] 优化移动端显示
- [ ] 支持自定义分类
- [ ] 添加预算管理功能

## 贡献指南

欢迎提交 Issue 和 Pull Request。在提交代码前，请确保：
1. 代码风格符合项目规范
2. 添加必要的注释和文档
3. 测试所有功能正常

## 许可证

MIT License
