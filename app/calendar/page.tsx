'use client'

import { useState } from 'react'
import { ArrowLeft, Moon } from 'lucide-react'
import Link from 'next/link'
import { getMoonPhase } from '@/utils/astrology'
import StarryBackground from '@/components/StarryBackground'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  // 月の最初の日と最後の日を取得
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // カレンダーの日付配列を生成
  const calendarDays = []
  
  // 前月の日付で埋める
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // 当月の日付
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const isSpecialDay = (day: number) => {
    const date = new Date(year, month, day)
    const moonPhase = getMoonPhase(date)
    return moonPhase.includes('新月') || moonPhase.includes('満月')
  }

  const getDayInfo = (day: number) => {
    const date = new Date(year, month, day)
    const moonPhase = getMoonPhase(date)
    
    if (moonPhase.includes('新月')) return { icon: '🌑', label: '新月' }
    if (moonPhase.includes('満月')) return { icon: '🌕', label: '満月' }
    if (moonPhase.includes('上弦')) return { icon: '🌓', label: '上弦' }
    if (moonPhase.includes('下弦')) return { icon: '🌗', label: '下弦' }
    
    return null
  }

  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ]

  const weekDays = ['日', '月', '火', '水', '木', '金', '土']

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-pink-900">
      {/* 星空の背景 */}
      <StarryBackground />

      <div className="relative z-10">
        {/* ヘッダー */}
        <header className="p-6">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>戻る</span>
          </Link>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl">
            <h1 className="text-3xl font-serif text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-8">
              月のリズムカレンダー
            </h1>

            {/* 月の切り替え */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1))}
                className="p-2 text-purple-300 hover:text-purple-200 transition-colors"
              >
                ←
              </button>
              <h2 className="text-2xl text-pink-100 font-semibold">
                {year}年 {monthNames[month]}
              </h2>
              <button
                onClick={() => setCurrentDate(new Date(year, month + 1))}
                className="p-2 text-purple-300 hover:text-purple-200 transition-colors"
              >
                →
              </button>
            </div>

            {/* カレンダー */}
            <div className="bg-white/5 rounded-2xl p-4">
              {/* 曜日ヘッダー */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((day, index) => (
                  <div
                    key={day}
                    className={`text-center py-2 text-sm font-medium ${
                      index === 0 ? 'text-pink-300' : 
                      index === 6 ? 'text-indigo-300' : 
                      'text-purple-200'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* 日付 */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} />
                  }

                  const dayInfo = getDayInfo(day)
                  const isToday = 
                    day === new Date().getDate() &&
                    month === new Date().getMonth() &&
                    year === new Date().getFullYear()

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(new Date(year, month, day))}
                      className={`
                        relative aspect-square p-2 rounded-xl transition-all
                        ${isToday ? 'bg-purple-500/30 border border-purple-400' : ''}
                        ${isSpecialDay(day) ? 'bg-pink-500/20' : 'bg-white/5'}
                        hover:bg-white/10 hover:scale-105
                      `}
                    >
                      <div className="text-center">
                        <div className={`text-sm ${isToday ? 'text-yellow-300 font-bold' : 'text-purple-100'}`}>
                          {day}
                        </div>
                        {dayInfo && (
                          <div className="text-xl mt-1">{dayInfo.icon}</div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 選択した日の情報 */}
            {selectedDate && (
              <div className="mt-6 p-6 bg-white/5 rounded-2xl">
                <h3 className="text-xl text-pink-100 font-semibold mb-3">
                  {selectedDate.toLocaleDateString('ja-JP', { 
                    month: 'long', 
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </h3>
                <p className="text-purple-200 mb-4">
                  月相：{getMoonPhase(selectedDate)}
                </p>
                <Link
                  href="/note"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Moon className="w-4 h-4" />
                  この日のノートを作成
                </Link>
              </div>
            )}

            {/* 凡例 */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <h4 className="text-pink-100 font-medium mb-3">月の満ち欠け</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌑</span>
                  <span className="text-purple-200">新月 - 新しい始まり</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌓</span>
                  <span className="text-purple-200">上弦 - 行動の時</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌕</span>
                  <span className="text-purple-200">満月 - 感謝と解放</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌗</span>
                  <span className="text-purple-200">下弦 - 内省の時</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}