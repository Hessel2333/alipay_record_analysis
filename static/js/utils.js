// 全局配置
window.CATEGORY_COLORS = {
    // 主要消费类别
    '餐饮美食': '#FF3B30',      // Apple 红色
    '酒店旅游': '#5856D6',      // Apple 紫色
    '交通出行': '#007AFF',      // Apple 蓝色
    '服饰装扮': '#FF9500',      // Apple 橙色
    '日用百货': '#34C759',      // Apple 绿色
    '数码电器': '#32ADE6',      // Apple 浅蓝色

    // 生活服务类
    '生活服务': '#FF2D55',      // Apple 粉红色
    '爱车养车': '#AF52DE',      // Apple 深紫色
    '运动户外': '#FFD60A',      // Apple 金色

    // 文教娱乐类
    '文化休闲': '#FF6B22',      // Apple 深橙色
    '教育培训': '#64D2FF',      // Apple 天蓝色

    // 居家类
    '家居家装': '#BF5AF2',      // Apple 亮紫色
    '住房物业': '#AC8E68',      // Apple 棕色

    // 其他服务类
    '医疗健康': '#30B0C7',      // Apple 青色
    '充值缴费': '#66D4CF',      // Apple 薄荷绿
    '公共服务': '#A7C538',      // Apple 草绿色
    '商业服务': '#5E5CE6',      // Apple 靛蓝色
    '信用借还': '#FF6482',      // Apple 玫瑰红
    '母婴亲子': '#40C8E0',      // Apple 湖蓝色

    // 添加收入分类颜色
    '收入': '#34C759',      // Apple 绿色
    '转账红包': '#FF9500',      // Apple 橙色
    '保险': '#007AFF',      // Apple 蓝色
    '其他': '#FF3B30',      // Apple 红色

    // 默认类别
    '其他': '#8E8E93'           // Apple 中性灰
};

window.getCategoryColor = function (category) {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS['其他'];
};

// 金额格式化函数
// 金额格式化函数
function formatMoney(value) {
    // 始终显示两位小数
    return new Intl.NumberFormat('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// 更新环比变化的函数
function updateComparison(element, change, changeRate, label, isCount = false) {
    if (!element) return;

    const icon = element.querySelector('.trend-icon');
    const value = element.querySelector('.change-value');

    // 设置显示阈值，小于这个值就显示"基本持平"
    const threshold = isCount ? 5 : 100; // 金额阈值100元，笔数阈值5笔

    if (change === null || change === undefined) {
        icon.className = 'fas fa-minus trend-icon neutral';
        value.textContent = '暂无对比数据';
        return;
    }

    if (Math.abs(change) < threshold) {
        icon.className = 'fas fa-minus trend-icon neutral';
        value.textContent = isCount ? '与上期基本持平' : '与上期基本持平';
    } else {
        if (change > 0) {
            icon.className = 'fas fa-arrow-up trend-icon up';
            let text = `较上期增加 ${isCount ? Math.abs(change) + ' 笔' : formatMoney(Math.abs(change)) + ' 元'}`;
            if (changeRate !== null && changeRate !== undefined) {
                text += ` (${changeRate > 0 ? '+' : ''}${changeRate.toFixed(1)}%)`;
            }
            value.textContent = text;
        } else {
            icon.className = 'fas fa-arrow-down trend-icon down';
            let text = `较上期减少 ${isCount ? Math.abs(change) + ' 笔' : formatMoney(Math.abs(change)) + ' 元'}`;
            if (changeRate !== null && changeRate !== undefined) {
                text += ` (${changeRate.toFixed(1)}%)`;
            }
            value.textContent = text;
        }
    }
}

// 显示提示框
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) {
        // 如果页面没有 toast 元素，动态创建一个
        const newToast = document.createElement('div');
        newToast.id = 'toast';
        newToast.className = 'toast';
        document.body.appendChild(newToast);
        newToast.textContent = message;
        newToast.style.display = 'block';
        setTimeout(() => {
            newToast.style.display = 'none';
        }, duration);
        return;
    }
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, duration);
}

// 格式化时间
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// 全局加载状态控制
const globalLoader = {
    show: function (text = '加载中...') {
        const loader = document.getElementById('globalLoader');
        if (loader) {
            loader.querySelector('.loader-text').textContent = text;
            loader.style.display = 'flex';
        }
    },
    hide: function () {
        const loader = document.getElementById('globalLoader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
};

// 引导提示控制
const guideTip = {
    currentStep: 0,
    steps: [],

    show: function (steps) {
        this.steps = steps;
        this.currentStep = 0;
        this.showStep();
    },

    showStep: function () {
        if (this.currentStep >= this.steps.length) {
            this.hide();
            return;
        }

        const step = this.steps[this.currentStep];
        const tip = document.getElementById('guideTip');
        const target = document.querySelector(step.target);

        if (!target || !tip) {
            this.nextStep();
            return;
        }

        const rect = target.getBoundingClientRect();
        tip.style.display = 'block';
        tip.querySelector('.guide-text').textContent = step.text;

        // 计算提示框位置
        const tipRect = tip.getBoundingClientRect();
        let top = rect.bottom + 8;
        let left = rect.left;

        // 确保提示框在可视区域内
        if (top + tipRect.height > window.innerHeight) {
            top = rect.top - tipRect.height - 8;
        }
        if (left + tipRect.width > window.innerWidth) {
            left = window.innerWidth - tipRect.width - 16;
        }

        tip.style.top = `${top}px`;
        tip.style.left = `${left}px`;
    },

    nextStep: function () {
        this.currentStep++;
        this.showStep();
    },

    hide: function () {
        const tip = document.getElementById('guideTip');
        if (tip) tip.style.display = 'none';
    }
};

// 错误处理
function showError(message, container) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;

    if (container) {
        container.insertBefore(errorDiv, container.firstChild);
    } else {
        const content = document.querySelector('.content');
        if (content) {
            content.insertBefore(errorDiv, content.firstChild);
        }
    }

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// 移动端菜单控制
function initMobileMenu() {
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.innerHTML = '<i class="fas fa-bars"></i>';

    toggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    document.body.appendChild(toggle);
}

// 网络错误重试机制
async function fetchWithRetry(url, options = {}, retries = 3) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchWithRetry(url, options, retries - 1);
        }
        throw error;
    }
}

// 交易详情弹窗逻辑
function showTransactionModal(title, transactions) {
    const modal = document.getElementById('detailModal');
    if (!modal) return; // 如果没有弹窗元素，直接返回

    const modalTitle = modal.querySelector('.modal-title');
    let currentSort = { field: 'time', direction: 'desc' };
    let allTransactions = [...transactions];  // 保存所有交易记录的副本
    let currentTransactions = [...transactions];

    // 日期时间格式化函数
    function formatDateTime(dateStr) {
        try {
            // 处理不同的日期格式
            let date;
            if (typeof dateStr === 'string') {
                // 如果是 "YYYY-MM-DD HH:mm:ss" 格式
                if (dateStr.includes(':')) {
                    date = new Date(dateStr);
                }
                // 如果是 "YYYY-MM-DD" 格式
                else {
                    date = new Date(dateStr + ' 00:00:00');
                }
            } else {
                date = new Date(dateStr);
            }

            // 检查日期是否有效
            if (isNaN(date.getTime())) {
                throw new Error('Invalid date');
            }

            // 使用 Intl.DateTimeFormat 格式化日期
            return new Intl.DateTimeFormat('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(date);
        } catch (error) {
            console.error('Date formatting error:', error);
            return dateStr; // 如果格式化失败，返回原始字符串
        }
    }

    function updateTable() {
        const transactionList = document.getElementById('transactionList');
        if (!transactionList) return;

        // 排序逻辑
        currentTransactions.sort((a, b) => {
            if (currentSort.field === 'time') {
                const timeA = new Date(a.time);
                const timeB = new Date(b.time);
                return currentSort.direction === 'desc' ? timeB - timeA : timeA - timeB;
            } else if (currentSort.field === 'amount') {
                return currentSort.direction === 'desc' ?
                    b.amount - a.amount :
                    a.amount - b.amount;
            }
            return 0;
        });

        // 更新表格内容
        transactionList.innerHTML = currentTransactions.map(t => `
            <tr>
                <td>${formatDateTime(t.time)}</td>
                <td>${t.description}</td>
                <td>${t.category}</td>
                <td class="amount ${t.type === '收入' ? 'income' : 'expense'}">
                    ${formatMoney(t.amount)} 元
                </td>
            </tr>
        `).join('');

        // 更新表头排序状态
        modal.querySelectorAll('th.sortable').forEach(th => {
            const sortField = th.dataset.sort;
            const icon = th.querySelector('i');
            if (sortField === currentSort.field) {
                th.classList.add('active');
                icon.className = `fas fa-sort-${currentSort.direction === 'desc' ? 'down' : 'up'}`;
            } else {
                th.classList.remove('active');
                icon.className = 'fas fa-sort';
            }
        });

        // 更新排序按钮状态
        modal.querySelectorAll('.sort-btn').forEach(btn => {
            const sortField = btn.dataset.sort;
            btn.classList.toggle('active', sortField === currentSort.field);
        });
    }

    // 添加金额筛选处理函数
    function filterTransactions(filterType) {
        if (filterType === 'all') {
            currentTransactions = [...allTransactions];
        } else if (filterType === 'large') {
            currentTransactions = allTransactions.filter(t => t.amount >= 1000);
        } else if (filterType === 'small') {
            currentTransactions = allTransactions.filter(t => t.amount < 1000);
        }
        updateTable();
    }

    // 绑定金额筛选按钮事件
    // 注意：这里每次调用都会重新绑定，可能会导致多次绑定。
    // 最好是将绑定逻辑移出函数，或者使用 cloneNode 清除监听器。
    // 为了简单起见，这里使用 cloneNode 清除旧的监听器
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            // 更新按钮状态
            document.querySelectorAll('.filter-btn').forEach(b =>
                b.classList.remove('active'));
            this.classList.add('active');

            // 应用筛选
            filterTransactions(this.dataset.filter);
        });
    });

    modalTitle.textContent = title;
    modal.style.display = 'flex';

    // 移除之前的事件监听器
    const sortBtns = modal.querySelectorAll('.sort-btn');
    const sortableHeaders = modal.querySelectorAll('th.sortable');

    // 清除之前的事件监听器
    sortBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });
    sortableHeaders.forEach(th => {
        const newTh = th.cloneNode(true);
        th.parentNode.replaceChild(newTh, th);
    });

    // 重新获取元素（因为被替换了）
    const newSortBtns = modal.querySelectorAll('.sort-btn');
    const newSortableHeaders = modal.querySelectorAll('th.sortable');

    // 重新绑定排序按钮事件
    newSortBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const sortField = this.dataset.sort;
            if (currentSort.field === sortField) {
                currentSort.direction = currentSort.direction === 'desc' ? 'asc' : 'desc';
            } else {
                currentSort = { field: sortField, direction: 'desc' };
            }
            updateTable();
        });
    });

    // 重新绑定表头排序事件
    newSortableHeaders.forEach(th => {
        th.addEventListener('click', function () {
            const sortField = this.dataset.sort;
            if (currentSort.field === sortField) {
                currentSort.direction = currentSort.direction === 'desc' ? 'asc' : 'desc';
            } else {
                currentSort = { field: sortField, direction: 'desc' };
            }
            updateTable();
        });
    });

    // 初始化表格
    updateTable();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    // 在移动端初始化菜单
    if (window.innerWidth <= 768) {
        initMobileMenu();
    }

    // 关闭弹窗
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', function () {
            const modal = document.getElementById('detailModal');
            if (modal) modal.style.display = 'none';
        });
    }

    // 点击弹窗外部关闭
    const detailModal = document.getElementById('detailModal');
    if (detailModal) {
        detailModal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    }

    // 添加键盘事件监听，按ESC关闭弹窗
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('detailModal');
            if (modal) modal.style.display = 'none';
        }
    });
});

// 全局交易过滤器管理器
const TransactionFilterManager = {
    STORAGE_KEY: 'transactionFilter',

    // 获取当前过滤器状态
    get: function () {
        return localStorage.getItem(this.STORAGE_KEY) || 'all';
    },

    // 设置过滤器状态
    set: function (filterType) {
        localStorage.setItem(this.STORAGE_KEY, filterType);
    },

    // 初始化过滤器按钮状态
    init: function (callback) {
        const currentFilter = this.get();

        // 更新UI按钮状态
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.filter === currentFilter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 绑定按钮点击事件
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const filterType = btn.dataset.filter;
                this.set(filterType);

                // 更新按钮状态
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');

                // 调用回调函数重新加载数据
                if (callback) {
                    callback(filterType);
                }
            });
        });

        // 监听自定义事件
        window.addEventListener('filterChanged', (e) => {
            console.log('Filter changed:', e.detail);
        });
    },

    // 将过滤器参数添加到 URL 查询参数
    applyToParams: function (params, filterType) {
        const filter = filterType || this.get();

        if (filter === 'large') {
            params.append('min_amount', '1000');
        } else if (filter === 'small') {
            params.append('max_amount', '1000');
        }

        return params;
    }
};

// 桑基图渲染
function renderSankeyChart(data) {
    const chartDom = document.getElementById('sankeyChart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'sankey',
                data: data.nodes,
                links: data.links,
                emphasis: {
                    focus: 'adjacency'
                },
                lineStyle: {
                    color: 'gradient',
                    curveness: 0.5
                },
                label: {
                    color: 'rgba(0,0,0,0.7)',
                    fontFamily: 'Arial'
                }
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 时光机 / 故事模式逻辑
let currentSlide = 0;
const totalSlides = 5;

function showStoryMode() {
    if (!window.storyData) {
        showToast('暂无故事数据', 'error');
        return;
    }

    const modal = document.getElementById('storyModal');
    const slidesContainer = document.getElementById('storySlides');
    const indicators = document.getElementById('storyIndicators');
    const data = window.storyData;

    // 生成幻灯片内容
    const slides = [
        // 封面
        `
        <div class="slide active">
            <div class="slide-content">
                <h1>您的年度消费故事</h1>
                <p>这一年，您经历了 ${data.summary.total_days} 个日夜</p>
                <p>完成了 ${data.summary.tx_count} 笔交易</p>
                <div class="slide-big-icon"><i class="fas fa-book-open"></i></div>
            </div>
        </div>
        `,
        // 最贵的一天
        `
        <div class="slide">
            <div class="slide-content">
                <h2>最"壕"的一天</h2>
                <div class="slide-date">${data.max_day.date}</div>
                <div class="slide-amount">${formatMoney(data.max_day.amount)}</div>
                <p>那一天，您一定买了心仪已久的东西吧？</p>
                <div class="slide-big-icon"><i class="fas fa-shopping-bag"></i></div>
            </div>
        </div>
        `,
        // 消费最高月
        `
        <div class="slide">
            <div class="slide-content">
                <h2>消费巅峰月</h2>
                <div class="slide-date">${data.max_month.month}</div>
                <div class="slide-amount">${formatMoney(data.max_month.amount)}</div>
                <p>这个月的账单，是不是让您心跳加速？</p>
                <div class="slide-big-icon"><i class="fas fa-chart-bar"></i></div>
            </div>
        </div>
        `,
        // 最晚消费
        `
        <div class="slide">
            <div class="slide-content">
                <h2>深夜未眠</h2>
                <div class="slide-date">${data.latest_tx.time}</div>
                <p>在 <strong>${data.latest_tx.merchant}</strong></p>
                <div class="slide-amount">${formatMoney(data.latest_tx.amount)}</div>
                <p>这么晚还在消费，要注意休息哦</p>
                <div class="slide-big-icon"><i class="fas fa-moon"></i></div>
            </div>
        </div>
        `,
        // 总结
        `
        <div class="slide">
            <div class="slide-content">
                <h2>年度关键词</h2>
                <div class="slide-keyword">${data.top_category.name}</div>
                <p>这是您投入最多的领域 (${formatMoney(data.top_category.amount)})</p>
                <p>新的一年，愿您每一笔消费都物超所值！</p>
                <div class="slide-big-icon"><i class="fas fa-star"></i></div>
            </div>
        </div>
        `
    ];

    slidesContainer.innerHTML = slides.join('');

    // 生成指示器
    indicators.innerHTML = slides.map((_, i) =>
        `<span class="indicator ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></span>`
    ).join('');

    modal.style.display = 'flex';
    currentSlide = 0;
    updateSlide();
}

function closeStoryMode() {
    document.getElementById('storyModal').style.display = 'none';
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

function updateSlide() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });

    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentSlide);
    });
}

// 全局导出，供各页面使用
window.TransactionFilterManager = TransactionFilterManager;
