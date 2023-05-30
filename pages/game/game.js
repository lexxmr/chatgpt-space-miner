Page({
  data: {
    miners: {
      bareHands: {
        count: 1,
        efficiency: 1,
        canMine: ["copper"],
        imageUrl: "/images/miners/bareHands.png"
      },
      copperMiner: {
        count: 0,
        efficiency: 2,
        canMine: ["copper"],
        imageUrl: "/images/miners/copperMiner.png"
      },
      ironMiner: {
        count: 0,
        efficiency: 4,
        canMine: ["copper", "iron"],
        imageUrl: "/images/miners/ironMiner.png"
      },
      goldMiner: {
        count: 0,
        efficiency: 8,
        canMine: ["copper", "iron", "gold"],
        imageUrl: "/images/miners/goldMiner.png"
      },
    },
    ores: {
      copper: {
        count: 0,
        imageUrl: "/images/ores/copperOre.png"
      },
      iron: {
        count: 0,
        imageUrl: "/images/ores/ironOre.png"
      },
      gold: {
        count: 0,
        imageUrl: "/images/ores/goldOre.png"
      },
    },
    autoMining: false,
    autoMineInterval: null,
  },

  autoMine: function() {
    for (let oreType in this.data.ores) {
      let totalOre = 0;
      for (let minerType in this.data.miners) {
        if (this.data.miners[minerType].canMine.includes(oreType)) {
          totalOre += this.data.miners[minerType].count * this.data.miners[minerType].efficiency;
        }
      }
      this.setData({
        ["ores." + oreType + ".count"]: this.data.ores[oreType].count + totalOre
      });
    }
  },

  toggleAutoMine: function() {
    if (this.data.autoMining) {
      clearInterval(this.data.autoMineInterval);
      this.setData({
        autoMining: false,
        autoMineInterval: null
      });
    } else {
      this.setData({
        autoMining: true,
        autoMineInterval: setInterval(this.autoMine, 1000)
      });
    }
  }
});
