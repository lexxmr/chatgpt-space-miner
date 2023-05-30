const { findPathToNearestOre } = require('./pathfinding');

Page({
  data: {
    map: [],
    miners: [
      {
        x: 0,
        y: 0,
        minerType: 'bareHands',
        imageUrl: '/images/miners/bareHands.png'
      },
    ],
    autoMining: false,
    autoMineInterval: null,
  },

  onLoad: function() {
    // Initialize your map
    let map = [
      [{ x: 0, y: 0, type: 'copper' }, { x: 1, y: 0, type: 'copper' }, { x: 2, y: 0, type: 'iron' }, { x: 3, y: 0, type: 'iron' }, { x: 4, y: 0, type: 'gold' }],
      [{ x: 0, y: 1, type: 'copper' }, { x: 1, y: 1, type: 'copper' }, { x: 2, y: 1, type: 'iron' }, { x: 3, y: 1, type: 'iron' }, { x: 4, y: 1, type: 'gold' }],
      [{ x: 0, y: 2, type: 'copper' }, { x: 1, y: 2, type: 'copper' }, { x: 2, y: 2, type: 'iron' }, { x: 3, y: 2, type: 'iron' }, { x: 4, y: 2, type: 'gold' }],
      [{ x: 0, y: 3, type: 'copper' }, { x: 1, y: 3, type: 'copper' }, { x: 2, y: 3, type: 'iron' }, { x: 3, y: 3, type: 'iron' }, { x: 4, y: 3, type: 'gold' }],
      [{ x: 0, y: 4, type: 'copper' }, { x: 1, y: 4, type: 'copper' }, { x: 2, y: 4, type: 'iron' }, { x: 3, y: 4, type: 'iron' }, { x: 4, y: 4, type: 'gold' }],
    ];

    // Mark the initial position of the miners as having a miner
    this.data.miners.forEach(miner => {
      map[miner.y][miner.x].hasMiner = true;
      map[miner.y][miner.x].minerImage = miner.imageUrl;
    });

    this.setData({ map });
  },

  mineOre: function(miner, ore) {
    let { map } = this.data;
    map[ore.y][ore.x].type = null;
    map[miner.y][miner.x].hasMiner = false;
    miner.x = ore.x;
    miner.y = ore.y;
    map[miner.y][miner.x].hasMiner = true;
    map[miner.y][miner.x].minerImage = miner.imageUrl;
    this.setData({ map });
  },

  autoMine: function() {
    const { miners, map } = this.data;
    for (let miner of miners) {
      let path = findPathToNearestOre(miner, map);
      if (path && path.length > 0) {
        let ore = path[path.length - 1]; // 获取路径数组的最后一个元素作为矿石位置
        this.mineOre(miner, ore);
      }
    }
  },

  toggleAutoMine: function() {
    this.setData({
      autoMining: !this.data.autoMining
    });
    if (this.data.autoMining) {
      this.data.autoMineInterval = setInterval(this.autoMine, 1000);
    } else {
      clearInterval(this.data.autoMineInterval);
    }
  }
});