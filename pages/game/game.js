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
  
  findPathToNearestOre: function(miner) {
    // 在这个函数中，你需要实现寻路算法来找到最近的矿石
    // 以下是一个简单的例子，只查找相邻的单元格
    let directions = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ];
    for (let direction of directions) {
      let x = miner.x + direction.dx;
      let y = miner.y + direction.dy;
      if (this.data.map[y] && this.data.map[y][x] && this.data.map[y][x].type) {
        return { x, y };
      }
    }
    // 如果找不到矿石，就返回null
    return null;
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
    for (let miner of this.data.miners) {
      let ore = this.findPathToNearestOre(miner);
      if (ore) {
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