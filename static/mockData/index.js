// 定义系统变量-在index.html全局引入  type: 0 内部, 1外部链接, -1不跳转
window.APP_DATA = {
  title: '数据治理系统',
  menus: [
    {
      id: '86eebf8484ff4b27a6600fa0a3c31edc',
      name: '大数据分析',
      type: 1,
      children: [
        {
          id: '100002',
          name: '算法模型',
          url: 'http://192.168.23.224:8080/add_model.html',
          type: 1
        },
        {
          id: '100003',
          name: '可视化建模',
          url: 'http://192.168.23.224:8080/model.html',
          type: 1
        },
        {
          id: '86eebf8484ff4b27a6600fa0a3c31edc',
          name: '可视化分析',
          path: '/data_analysis/analysis/dataset',
          type: 0
        }
      ]
    },
    {
      id: '10001',
      name: '大数据存储',
      type: 1,
      children: [
        {
          id: '100012',
          name: '分布式文件系统',
          url: 'http://192.168.23.73:8080/#/main/services/HDFS/summary',
          type: -1
        },
        {
          id: '100013',
          name: '分布式数据库',
          url: 'http://192.168.23.73:8080/#/main/services/HBASE/summary',
          type: -1
        },
        {
          id: '100014',
          name: 'MPP数据库',
          url: 'http://192.168.23.74/phpPgAdmin/',
          type: -1
        },
        {
          id: '100015',
          name: '存储管理',
          url: 'http://192.168.23.73:8080/#/main/dashboard/metrics',
          type: -1
        }
      ]
    },
    {
      id: '1fec59c0136249e398c19d6d9946c090',
      name: '大数据计算',
      type: 0,
      path: '/dataCalculation/Offline'
      // children: [
      //   {
      //     id: '100021',
      //     name: '离线计算',
      //     url: 'https://www.baidu.com/',
      //     type: -1
      //   },
      //   {
      //     id: '100022',
      //     name: '实时计算',
      //     url: 'http://192.168.23.76:8081/',
      //     type: -1
      //   },
      //   {
      //     id: '100023',
      //     name: '即席查询',
      //     url: 'http://192.168.23.76:9100/',
      //     type: -1
      //   }
      // ]
    },
    {
      id: '830f2c90af6140648bb7bd1abcb69dbb',
      name: '大数据治理',
      type: 1,
      children: [
        {
          id: '100041',
          name: '元数据管理',
          path: '/data_gover/data_meta/datasource_directory',
          type: 0
        },
        {
          id: '100042',
          name: '数据质量管理',
          path: '/data_gover/data_quality/quality_model',
          type: 0
        },
        {
          id: '100043',
          name: '数据安全管理',
          path: '/data_gover/data_security/rule_desensitization',
          // url: 'https://lanhuapp.com/url/21iwW',
          type: 0
        },
        {
          id: '100044',
          name: '数据资产管理',
          url: 'http://192.168.23.140:9528/admin/#/portal/theme/menu/index',
          type: 1
        },
        {
          id: '100045',
          name: '数据治理管理',
          url: 'http://192.168.23.140:9528/sjzl-index',
          type: 1
        }
      ]
    },
    {
      id: '44f96b74899e4efba44b38f023ab651d',
      name: '大数据采集汇编',
      type: 1,
      children: [
        {
          id: '100051',
          name: '采报汇总',
          url: 'http://39.104.28.91:9000/information/Management/jxz?type=jxz',
          type: 1
        },
        {
          id: '100052',
          name: '源数采集',
          url: 'http://101.200.63.48:8080/DSGWEB/#/login/',
          type: 1
        },
        {
          id: '100053',
          name: '数据交互',
          url: 'http://101.200.63.48:8080/DSGWEB/#/login/',
          type: 1
        },
        {
          id: '44f96b74899e4efba44b38f023ab651d',
          name: '人工录入',
          path: '/bigDataCAndC/manualEntry',
          type: 0
        },
        {
          id: '100055',
          name: '图片文件扫描',
          url: 'http://101.200.63.48:8080/DSGWEB/#/login/',
          type: 1
        }
      ]
    },
    {
      id: 'fcf432e7640d493f87ec012a8b031d68',
      name: '大数据融合共享',
      type: 1,
      children: [
        {
          id: '100061',
          name: '数据集成',
          url: 'http://101.200.63.48:8080/DSGWEB/#/login/',
          type: 1
        },
        {
          id: '100062',
          name: '数据目录',
          path: '/data_sharing/data_directory/share_directory',
          type: 0
        },
        {
          id: '100063',
          name: '数据同步',
          url: 'http://101.200.63.48:8080/DSGWEB/#/login/',
          type: 1
        },
        {
          id: '100064',
          name: '数据访问',
          url: 'http://192.168.23.77:9528/gtone/#/dataInterface/index',
          type: 1
        }
      ]
    },
    {
      id: '7f565f22927a4acb9c0f4e0b3b230cb8',
      name: '大数据整编处理',
      type: 0,
      path: '/data_compilation/data_clean/rule_validation'
    }
  ]
}
