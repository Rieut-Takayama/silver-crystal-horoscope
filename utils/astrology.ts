// 簡易的な星座計算（後で本格的なライブラリに置き換え）
export function getZodiacSign(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const signs = [
    { name: '\u7261\u7f8a\u5ea7', start: [3, 21], end: [4, 19] },
    { name: '\u7261\u725b\u5ea7', start: [4, 20], end: [5, 20] },
    { name: '\u53cc\u5b50\u5ea7', start: [5, 21], end: [6, 21] },
    { name: '\u87f9\u5ea7', start: [6, 22], end: [7, 22] },
    { name: '\u7345\u5b50\u5ea7', start: [7, 23], end: [8, 22] },
    { name: '\u4e59\u5973\u5ea7', start: [8, 23], end: [9, 22] },
    { name: '\u5929\u79e4\u5ea7', start: [9, 23], end: [10, 23] },
    { name: '\u880d\u5ea7', start: [10, 24], end: [11, 22] },
    { name: '\u5c04\u624b\u5ea7', start: [11, 23], end: [12, 21] },
    { name: '\u5c71\u7f8a\u5ea7', start: [12, 22], end: [1, 19] },
    { name: '\u6c34\u74f6\u5ea7', start: [1, 20], end: [2, 18] },
    { name: '\u9b5a\u5ea7', start: [2, 19], end: [3, 20] }
  ]
  
  for (const sign of signs) {
    const [startMonth, startDay] = sign.start
    const [endMonth, endDay] = sign.end
    
    if (startMonth === 12 && month === 12 && day >= startDay) return sign.name
    if (startMonth === 12 && month === 1 && day <= endDay) return sign.name
    
    if (month === startMonth && day >= startDay) return sign.name
    if (month === endMonth && day <= endDay) return sign.name
  }
  
  return '\u9b5a\u5ea7' // デフォルト
}

// 月相の計算
export function getMoonPhase(date: Date): string {
  const phases = ['\u65b0\u6708', '\u4e0a\u5f26\u306e\u6708', '\u6e80\u6708', '\u4e0b\u5f26\u306e\u6708']
  // 簡易実装（後で正確な計算に置き換え）
  const dayOfMonth = date.getDate()
  const phaseIndex = Math.floor((dayOfMonth - 1) / 7.5) % 4
  return phases[phaseIndex]
}

// 今後の重要な日付を計算
export function getUpcomingEvents(birthDate: Date): any[] {
  const events = []
  const today = new Date()
  
  // 次の新月
  const nextNewMoon = new Date(today)
  nextNewMoon.setDate(nextNewMoon.getDate() + 15)
  events.push({
    date: nextNewMoon.toISOString(),
    type: 'new_moon',
    description: '\u65b0\u6708 - \u65b0\u3057\u3044\u59cb\u307e\u308a\u306e\u30bf\u30a4\u30df\u30f3\u30b0',
    theme: '\u65b0\u3057\u3044\u610f\u56f3\u3092\u8a2d\u5b9a\u3059\u308b',
    magicalWork: '\u65b0\u3057\u3044\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3084\u7fd2\u6163\u3092\u59cb\u3081\u308b\u306e\u306b\u6700\u9069'
  })
  
  // 次の満月
  const nextFullMoon = new Date(today)
  nextFullMoon.setDate(nextFullMoon.getDate() + 30)
  events.push({
    date: nextFullMoon.toISOString(),
    type: 'full_moon',
    description: '\u6e80\u6708 - \u5b9f\u73fe\u3068\u624b\u653e\u3057\u306e\u30bf\u30a4\u30df\u30f3\u30b0',
    theme: '\u611f\u8b1d\u3068\u624b\u653e\u3057',
    magicalWork: '\u4e0d\u8981\u306a\u3082\u306e\u3092\u624b\u653e\u3057\u3001\u611f\u8b1d\u306e\u30a8\u30cd\u30eb\u30ae\u30fc\u3092\u9ad8\u3081\u308b'
  })
  
  return events
}