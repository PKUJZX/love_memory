// 当整个页面的HTML内容加载完成后，执行以下代码
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 常量和全局状态 ---
    // 恋爱开始的纪念日
    const startDate = new Date('2025-04-05T00:00:00'); 
    
    // --- 2. 我们的回忆数据 ---
    // 所有回忆都记录在这里
    // 照片文件名格式为 "MMDD.jpg"，请确保 images 文件夹中有对应的照片
    const ourEvents = [
        { date: '2025-03-22', description: '如命运安排般的偶然初见', imageUrl: 'images/0322.jpg' },
        { date: '2025-03-29', description: '第一次单独出去玩', imageUrl: 'images/0329.jpg' },
        { date: '2025-04-05', description: '我们在一起啦', imageUrl: 'images/0405.jpg' },
        { date: '2025-04-10', description: '送花与清华漫步', imageUrl: 'images/0410.jpg' },
        { date: '2025-04-13', description: '是谁有女朋友帮忙挑衣服呀', imageUrl: 'images/0413.jpg' },
        { date: '2025-04-17', description: '第一次夜逛未名湖', imageUrl: 'images/0417.jpg' },
        { date: '2025-04-19', description: '雍和宫逛吃与情人坡微醺', imageUrl: 'images/0419.jpg' },
        { date: '2025-04-28', description: '收获人生照片', imageUrl: 'images/0428.jpg' },
        { date: '2025-05-01', description: '我们第一次kiss啦', imageUrl: 'images/0501.jpg' },
        { date: '2025-05-07', description: '未名湖畔微醺', imageUrl: 'images/0507.jpg' },
        { date: '2025-05-11', description: '植物园与KTV', imageUrl: 'images/0511.jpg' },
        { date: '2025-05-18', description: '在私人影院看恐怖片', imageUrl: 'images/0518.jpg' },
        { date: '2025-05-25', description: '去清吧喝酒', imageUrl: 'images/0525.jpg' },
        { date: '2025-06-01', description: '逛北海公园', imageUrl: 'images/0601.jpg' },
        { date: '2025-06-07', description: '也是开上房了', imageUrl: 'images/0607.jpg' },
        { date: '2025-06-11', description: '在按摩店躺平', imageUrl: 'images/0611.jpg' },
        { date: '2025-06-19', description: '第一次一起出去旅游', imageUrl: 'images/0619.jpg' },
        { date: '2025-07-06', description: '墨西哥餐厅与私人影院', imageUrl: 'images/0706.jpg' },
        { date: '2025-07-23', description: '唱KTV和吃寿司郎', imageUrl: 'images/0723.jpg' },
        { date: '2025-08-09', description: '久别重逢于萨莉亚', imageUrl: 'images/0809.jpg' },
        { date: '2025-08-11', description: '在北大看罗小黑', imageUrl: 'images/0811.jpg' },
        { date: '2025-08-14', description: '没看到天坛亮灯但吃到春饼', imageUrl: 'images/0814.jpg' },
        { date: '2025-08-19', description: '去承德旅游啦', imageUrl: 'images/0819.jpg' },
        { date: '2025-08-24', description: '玩剧本杀《红豆》', imageUrl: 'images/0824.jpg' },
        { date: '2025-08-29', description: '第一次一起过七夕', imageUrl: 'images/0829.jpg' },
        { date: '2025-09-06', description: '于酒店微醺', imageUrl: 'images/0906.jpg' }
    ];

    // --- 3. DOM元素获取 ---
    const dayCounterElement = document.getElementById('day-counter');
    const timelineContainer = document.getElementById('timeline-container');

    // --- 4. 核心渲染与计算函数 ---
    function updateDayCounter() {
        const today = new Date();
        const timeDifference = today.getTime() - startDate.getTime();
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        dayCounterElement.textContent = days >= 0 ? days : 0;
    }

    function renderTimeline() {
        // 按日期排序，确保时间轴顺序正确
        ourEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        timelineContainer.innerHTML = ''; // 渲染前清空
        ourEvents.forEach((event, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const eventElement = document.createElement('div');
            eventElement.classList.add('timeline-event', side);
            
            // 简化了模板，移除了编辑和删除按钮
            eventElement.innerHTML = `
                <div class="event-content">
                    <img src="${event.imageUrl}" alt="${event.description.substring(0, 20)}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/f8c2c2/fdf6f6?text=Image+Not+Found';">
                    <div class="event-details">
                        <div class="event-date">${event.date}</div>
                        <p class="event-description">${event.description}</p>
                    </div>
                </div>`;
            timelineContainer.appendChild(eventElement);
        });
        setupScrollAnimations();
    }

    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.timeline-event').forEach(el => observer.observe(el));
    }

    // --- 5. 页面初始化 ---
    function init() {
        updateDayCounter();
        renderTimeline();
    }

    init(); // 启动！
});

