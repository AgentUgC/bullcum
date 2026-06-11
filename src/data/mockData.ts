import type { Bull, Core, PumpSlot, Order, Inventory, GameState } from '../types/game';

function makeBull(index: number): Bull {
  const qualities: Bull['quality'][] = ['standard','standard','standard','premium','premium','superior','standard','premium','standard','standard','premium','superior'];
  const personalities: Bull['personality'][] = ['steady','direct','energetic','silent','steady','energetic','direct','silent','steady','energetic','direct','silent'];
  const ejacs: Bull['ejaculationMode'][] = ['burst','uniform','escalating','overflow','uniform','burst','escalating','uniform','overflow','burst','escalating','uniform'];
  const names = ['B001','A001','B002','B003','A002','S001','B004','B005','A003','B006','B007','S002'];
  const bodyDescs = [
    '肩宽腰窄的倒三角，腹肌六块清晰紧致',
    '胸背肩肌肉饱满宽厚，腰腹厚实稳重大块',
    '精壮型，肌肉线条锐利分明，体脂偏低',
    '厚壮型，胸背体积感强，整体质量压迫感',
    '肩宽腰窄，三角肌圆润流畅，人鱼线深刻',
    '胸背饱满，腰腹不过分收窄，稳重压迫感',
    '精壮紧致，腹肌清晰，腰侧几无赘余',
    '厚壮宽大，肌肉体积感强，沉稳有力',
    '倒三角轮廓，线条利落，力量感精实',
    '饱满宽厚，胸背肩肌肉发达，稳重',
    '精壮端，肩宽腰窄，腹肌六块',
    '厚壮端，胸背肩饱满，腰腹厚实',
  ];
  const faceDescs = [
    '年轻明朗型，五官线条干净利落，眼神清亮',
    '硬朗成熟型，骨骼感强，眉弓与颌线突出',
    '年轻明朗型，鼻梁挺直，下颌角柔和但轮廓清晰',
    '硬朗成熟型，五官深邃锐利，沉稳有压迫感',
    '年轻明朗型，眼角微微上挑带几分爽朗',
    '硬朗成熟型，面部轮廓如刀削，眼神沉稳',
    '年轻明朗型，表情生动自然，五官清亮',
    '硬朗成熟型，眉骨突出，下颌线条锋利',
    '年轻明朗型，面部带少年感，眼神明亮',
    '硬朗成熟型，骨骼感强烈，沉稳内敛',
    '年轻明朗型，五官干净利落，鼻梁高挺',
    '硬朗成熟型，深邃锐利，沉稳压迫',
  ];
  const hairColors = ['深栗色','乌黑色','浅栗色','深棕色','银灰色','红棕色','麦棕色','炭黑色','蜜棕色','灰白色','焦糖色','黑曜色'];
  const eyeColors = ['琥珀棕','墨黑','浅褐','深蓝','暗金','碧绿','灰蓝','深紫','铜棕','银灰','焦糖','琥珀'];
  const hornColors = ['奶咖渐变象牙白','乌木黑','浅栗渐变米白','深棕配象牙黄','银白配深灰','红棕配米白','麦黄','炭黑配灰白','蜜棕配象牙','灰白','焦糖配米白','黑曜配深灰'];
  const ejacDescs = [
    '前3发如高压水柱，随后快速减弱，共7-9发',
    '每发约80ml均匀绵长如脉搏，共12发稳定输出',
    '前半温和，后段逐渐加速，最后几发最猛烈',
    '精液以稠厚涌流方式持续溢出，偶有小幅喷发',
    '每发均匀70-110ml，节奏清晰绵长共13发',
    '前4发高压远射140ml/发，后快速衰减',
    '前半段70-90ml温和，后段最高150ml猛烈',
    '持续涌流，量大时低弧度抛物线外溢',
    '均匀稳定每发90ml，共11发节奏清晰',
    '爆发型前3发180ml高压，后快速减弱',
    '后段增强型，最后几发反而最猛烈共10发',
    '溢流涌出型，浓稠液体持续外溢不间断',
  ];
  const persDescs = [
    '沉着配合，语气低沉平稳，身体稳定有力',
    '直接回应，接收指令后给予明确正面回应',
    '精力旺盛话多爱笑，反应热烈具感染力',
    '内心感受强烈但难以转化为语言，身体反应剧烈',
    '情绪稳定安全感充足，面对采集沉着配合',
    '话语较多且富有活力，反应有感染力',
    '即时反馈，声音清晰，反应干脆自然',
    '不善言辞或害羞，采集时几乎不语只有压抑闷哼',
    '血清素偏高，天然情绪稳定',
    '多巴胺基础水平偏高，容易兴奋',
    '去甲肾上腺素通路活跃，信息处理即时',
    '语言表达神经通路偏弱，躯体感受敏锐',
  ];
  const locs = ['休息棚','休息棚','采精车间','休息棚','休息棚','医疗室','休息棚','培育室','休息棚','休息棚','休息棚','休息棚'];

  return {
    id: names[index],
    name: names[index],
    quality: qualities[index],
    height: 190 + Math.floor(Math.random()*16),
    weight: 85 + Math.floor(Math.random()*20),
    bodyType: index % 2 === 0 ? '精壮端' : '厚壮端',
    bodyDesc: bodyDescs[index],
    skinColor: ['蜜色偏深小麦肤','古铜暖调肤色','小麦偏蜜肤色','深麦古铜色'][index%4],
    faceDesc: faceDescs[index],
    hairStyle: '碎寸短发',
    hairColor: hairColors[index],
    eyeColor: eyeColors[index],
    hornShape: ['向两侧微弯后上翘短弧角','笔直向上尖锐长角','短粗弧形角','向内侧卷曲大角','修长尖锐角','微弯粗壮角','短弧角','螺旋形角','分叉角','粗短直角','优雅长弧角','厚重弯曲角'][index],
    hornColor: hornColors[index],
    hornSize: ['中等偏短约12cm','修长约18cm','粗短约10cm','宽大弯曲约15cm','纤细尖锐约20cm','粗壮约14cm'][index%6],
    earFurColor: hairColors[index],
    earDesc: '覆有短绒毛的柔软兽耳，比人耳更大更长',
    tailLength: 100 + Math.floor(Math.random()*40),
    tailColor: hairColors[index],
    tailTasselColor: hairColors[index],
    penisLength: 26 + Math.floor(Math.random()*11),
    penisFlaccid: 13 + Math.floor(Math.random()*9),
    penisGirth: 17 + Math.floor(Math.random()*5),
    foreskin: ['半包皮，勃起后自然后退','全包皮，勃起后仍覆盖部分','微包皮，几乎完全露出'][index%3],
    veinLevel: ['中等，两条浅浮青筋','明显，茎身密布隆起血管','几乎不可见'][index%3],
    hasRing: index === 5 || index === 11,
    ringDesc: index === 5 || index === 11 ? '茎身中段一圈紧实肉环，勃起时明显凸起' : '无',
    penisDesc: ['匀称圆柱略带上弧，龟头饱满熟杏色','柱身粗直微弯，龟头浑圆略大','匀称略向下弧，龟头饱满色泽深'][index%3],
    testicleVolume: 75 + Math.floor(Math.random()*26),
    testicleDesc: ['双丸匀称饱满低垂，阴囊皮肤细腻','丸体饱满紧实，阴囊薄可辨轮廓','低垂饱满，质感温热沉重'][index%3],
    ejaculationMode: ejacs[index],
    ejaculationDesc: ejacDescs[index],
    personality: personalities[index],
    personalityDesc: persDescs[index],
    birthDay: 1,
    dailyCollected: 0,
    dailyMax: 10,
    status: 'healthy',
    supplementUsed: false,
    supplementCount: 0,
    boundToUltimate: false,
    currentLocation: locs[index],
  };
}

export const mockBulls: Bull[] = Array.from({ length: 12 }, (_, i) => makeBull(i));

export const mockCores: Core[] = [
  { type: 'standard', unlocked: true, level: 1, dailyProcessed: 0, status: 'normal', boundBulls: [] },
  { type: 'premium', unlocked: false, level: 1, dailyProcessed: 0, status: 'normal', boundBulls: [] },
  { type: 'superior', unlocked: false, level: 1, dailyProcessed: 0, status: 'normal', boundBulls: [] },
  { type: 'ultimate', unlocked: false, level: 1, dailyProcessed: 0, status: 'normal', boundBulls: [] },
];

export const mockPumps: PumpSlot[] = [
  { coreType: 'standard', pumpIndex: 0, bullId: 'B001', status: 'running' },
  { coreType: 'standard', pumpIndex: 1, bullId: null, status: 'idle' },
];

export const mockOrders: Order[] = [
  { id: 'g1', type: 'guaranteed', quality: 'standard', demand: 10000, delivered: 0, revenue: 100, completed: false },
  { id: 'r1', type: 'random', quality: 'standard', demand: 30000, delivered: 0, revenue: 3150, source: '都会精酿工坊', usage: '精液调酒原料鲜饮供应', scale: '小型', completed: false },
  { id: 'r2', type: 'random', quality: 'premium', demand: 50000, delivered: 0, revenue: 8250, source: '高端私人会所', usage: '精液浴池浸泡灌注', scale: '小型', completed: false },
];

export const mockInventory: Inventory = {
  grass: 0, water: 0, supplement: 0, ultimateSupplement: 0,
  semenStandard: 0, semenPremium: 0, semenSuperior: 0,
};

export const initialGameState: GameState = {
  day: 1,
  phase: 1,
  currency: 5000,
  reputation: 100,
  factoryLevel: 1,
  factoryName: '性福工厂',
  playerName: '厂长',
  playerUpgraded: false,
  manualLimit: 60,
  manualUsed: 0,
  inventory: mockInventory,
  bulls: mockBulls,
  cores: mockCores,
  pumps: mockPumps,
  orders: mockOrders,
  breedingSlots: 10,
  breedingUsed: 0,
};
