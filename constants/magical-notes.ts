export const MOON_PHASES = {
  NEW_MOON: {
    name: '新月',
    theme: '種まきの魔法',
    prompts: [
      '新しく始めたいことは何ですか？その第一歩は？',
      '今月、どんな種を心に蒔きますか？',
      'ゼロから創造したい未来を描いてください'
    ]
  },
  WAXING_CRESCENT: {
    name: '上弦の月',
    theme: '行動の加速',
    prompts: [
      '新月に蒔いた種に、どんな栄養を与えますか？',
      '今、一番力を入れるべきことは？',
      '成長を妨げているものは何ですか？'
    ]
  },
  FULL_MOON: {
    name: '満月',
    theme: '感謝と手放し',
    prompts: [
      '実った果実に感謝を。何が叶いましたか？',
      'もう必要のないものを手放す時。何を卒業しますか？',
      '満ちた今、誰に感謝を伝えたいですか？'
    ]
  },
  WANING_CRESCENT: {
    name: '下弦の月',
    theme: '内省と調整',
    prompts: [
      '静かに振り返る時。何を学びましたか？',
      '次の新月に向けて、整えておきたいことは？',
      '心の声に耳を傾けてください。何と言っていますか？'
    ]
  }
}

export const ZODIAC_THEMES = {
  ARIES: {
    sign: '牡羊座',
    theme: '新しい自分になる',
    keywords: ['勇気', '挑戦', '開拓'],
    symbol: '🔥'
  },
  TAURUS: {
    sign: '牡牛座',
    theme: '豊かさを育む',
    keywords: ['価値', '感覚', '豊かさ'],
    symbol: '🌸'
  },
  GEMINI: {
    sign: '双子座',
    theme: '繋がりを広げる',
    keywords: ['コミュニケーション', '学び', '軽やかさ'],
    symbol: '🦋'
  },
  CANCER: {
    sign: '蟹座',
    theme: '心の基盤を作る',
    keywords: ['感情', '家族', '安心'],
    symbol: '🌊'
  },
  LEO: {
    sign: '獅子座',
    theme: '自分を輝かせる',
    keywords: ['自己表現', '創造', '喜び'],
    symbol: '⭐'
  },
  VIRGO: {
    sign: '乙女座',
    theme: '日常を整える',
    keywords: ['浄化', '健康', '奉仕'],
    symbol: '🌿'
  },
  LIBRA: {
    sign: '天秤座',
    theme: 'バランスを見つける',
    keywords: ['調和', '美', '関係性'],
    symbol: '⚖️'
  },
  SCORPIO: {
    sign: '蠍座',
    theme: '深く変容する',
    keywords: ['変容', '再生', '真実'],
    symbol: '🦂'
  },
  SAGITTARIUS: {
    sign: '射手座',
    theme: '可能性を広げる',
    keywords: ['冒険', '自由', '哲学'],
    symbol: '🏹'
  },
  CAPRICORN: {
    sign: '山羊座',
    theme: '目標を実現する',
    keywords: ['達成', '責任', '構築'],
    symbol: '⛰️'
  },
  AQUARIUS: {
    sign: '水瓶座',
    theme: '革新を起こす',
    keywords: ['革新', '独創性', '未来'],
    symbol: '💫'
  },
  PISCES: {
    sign: '魚座',
    theme: '夢と現実を繋ぐ',
    keywords: ['直感', '共感', '創造'],
    symbol: '🌙'
  }
}

export const MAGICAL_SYMBOLS = [
  { emoji: '🌙', name: '月', meaning: '直感、女性性、受容、サイクル' },
  { emoji: '⭐', name: '星', meaning: '希望、導き、高次の視点、可能性' },
  { emoji: '🌸', name: '花', meaning: '開花、美、成長、優しさ' },
  { emoji: '💎', name: '宝石', meaning: '価値、輝き、不変、内なる豊かさ' },
  { emoji: '🦋', name: '蝶', meaning: '変容、軽やかさ、自由、美しさ' },
  { emoji: '🌊', name: '波', meaning: '流れ、浄化、感情、柔軟性' },
  { emoji: '🔥', name: '炎', meaning: '情熱、浄化、創造、勇気' },
  { emoji: '🌳', name: '木', meaning: '成長、安定、繋がり、生命力' }
]

export const PLANETARY_ENERGIES = {
  MERCURY_RETROGRADE: {
    name: '水星逆行',
    theme: '見直しと再調整',
    description: '過去からのメッセージに気づく時期',
    prompts: [
      '過去からのメッセージに気づいていますか？',
      'やり残したことで、今こそ完成させるべきものは？',
      'コミュニケーションで大切にしたいことは？'
    ]
  },
  VENUS_TRANSIT: {
    name: '金星の移動',
    theme: '愛と美の更新',
    description: '価値観と愛情表現を見直す時期',
    prompts: [
      'あなたにとっての美しさとは？',
      '愛情表現の新しい形を見つけましょう',
      '自分を愛するための具体的な行動は？'
    ]
  }
}