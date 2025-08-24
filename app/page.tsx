'use client'

import { useState, useEffect } from 'react'
import { Moon, Star, Sparkles, Calendar, BookOpen } from 'lucide-react'
import { getMoonPhase } from '@/utils/astrology'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import StarryBackground from '@/components/StarryBackground'

export default function Home() {
  const router = useRouter()
  const [moonPhase, setMoonPhase] = useState('')
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const currentDate = new Date()
    setMoonPhase(getMoonPhase(currentDate))
    const hour = currentDate.getHours()
    if (hour < 5) setGreeting('月光が導く時間')
    else if (hour < 12) setGreeting('朝の光とともに')
    else if (hour < 18) setGreeting('太陽が輝く時間')
    else setGreeting('星々が見守る夜')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-pink-900">
      {/* 星空の背景 */}
      <StarryBackground />

      <div className="relative z-10">
        {/* ヘッダー */}
        <header className="p-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-2">
            幻の銀水晶
          </h1>
          <p className="text-pink-200 text-sm md:text-base">星読みAI × マジカルノート術</p>
        </header>

        {/* メインコンテンツ */}
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* 挨拶とムーンフェーズ */}
          <div className="text-center mb-12 p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-xl">
            <h2 className="text-2xl md:text-3xl text-pink-100 mb-4">{greeting}</h2>
            <div className="flex items-center justify-center gap-4 text-purple-200">
              <Moon className="w-8 h-8" />
              <span className="text-lg">今夜は{moonPhase}</span>
            </div>
          </div>

          {/* 機能カード */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* 星の流れ分析 */}
            <Link href="/horoscope" className="group p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl border border-purple-300/30 hover:border-purple-300/60 transition-all duration-300 hover:scale-105 block">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-8 h-8 text-yellow-300" />
                <h3 className="text-xl font-semibold text-purple-100">星の流れを読む</h3>
              </div>
              <p className="text-purple-200 text-sm text-left">
                あなたの生まれた瞬間の星空から、これからの節目と可能性を読み解きます
              </p>
            </Link>

            {/* マジカルノート */}
            <Link href="/note" className="group p-6 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl border border-pink-300/30 hover:border-pink-300/60 transition-all duration-300 hover:scale-105 block">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-pink-300" />
                <h3 className="text-xl font-semibold text-pink-100">願いを紡ぐ</h3>
              </div>
              <p className="text-pink-200 text-sm text-left">
                星のエネルギーに合わせて、願いを現実に変える魔法のノートを綴ります
              </p>
            </Link>

            {/* カレンダー */}
            <Link href="/calendar" className="group p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl border border-indigo-300/30 hover:border-indigo-300/60 transition-all duration-300 hover:scale-105 block">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-8 h-8 text-indigo-300" />
                <h3 className="text-xl font-semibold text-indigo-100">月のリズム</h3>
              </div>
              <p className="text-indigo-200 text-sm text-left">
                新月、満月、惑星の動き。最適なタイミングで願いを叶えるカレンダー
              </p>
            </Link>

            {/* 直感メッセージ */}
            <Link href="/message" className="group p-6 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-md rounded-2xl border border-purple-300/30 hover:border-purple-300/60 transition-all duration-300 hover:scale-105 block">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-purple-300" />
                <h3 className="text-xl font-semibold text-purple-100">今日のメッセージ</h3>
              </div>
              <p className="text-purple-200 text-sm text-left">
                宇宙からの導きを受け取り、今この瞬間に必要な気づきを得ます
              </p>
            </Link>
          </div>

          {/* 始めるボタン */}
          <div className="text-center">
            <button 
              onClick={() => {
                const profile = localStorage.getItem('userProfile')
                if (!profile) {
                  router.push('/profile')
                } else {
                  router.push('/horoscope')
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                星読みの旅を始める
              </span>
            </button>
          </div>
        </main>

        {/* フッター */}
        <footer className="text-center py-8 text-purple-300 text-sm">
          <p>月の光が、あなたの願いを照らしますように</p>
        </footer>
      </div>
    </div>
  )
}