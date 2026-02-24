// 演示数据初始化脚本
export const initDemoData = (store) => {
  const demoLogs = {
    '2024-01': [
      {
        id: 1,
        date: '2024-01-15',
        content: '项目启动会议，讨论了第一季度的开发计划和技术选型。',
        timestamp: '2024-01-15T09:00:00.000Z'
      },
      {
        id: 2,
        date: '2024-01-20',
        content: '完成了用户管理系统的核心功能开发，包括注册、登录和权限控制。',
        timestamp: '2024-01-20T17:30:00.000Z'
      }
    ],
    '2024-02': [
      {
        id: 3,
        date: '2024-02-05',
        content: '开始集成第三方支付接口，处理了多个支付场景的异常情况。',
        timestamp: '2024-02-05T14:20:00.000Z'
      },
      {
        id: 4,
        date: '2024-02-14',
        content: '情人节特别活动上线，用户活跃度提升了30%，服务器负载正常。',
        timestamp: '2024-02-14T23:59:00.000Z'
      }
    ],
    '2024-03': [
      {
        id: 5,
        date: '2024-03-08',
        content: '妇女节促销活动数据分析完成，准备下一轮营销策略。',
        timestamp: '2024-03-08T18:45:00.000Z'
      }
    ]
  }

  // 保存到 store
  Object.keys(demoLogs).forEach(monthKey => {
    demoLogs[monthKey].forEach(log => {
      store.commit('calendar/SAVE_LOG', { monthKey, log })
    })
  })

  console.log('演示数据初始化完成')
}