'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Sparkles, RefreshCw, Heart } from 'lucide-react'
import Link from 'next/link'
import { getMoonPhase, getZodiacSign } from '@/utils/astrology'
import StarryBackground from '@/components/StarryBackground'

const DAILY_MESSAGES = [
  {
    category: '愛',
    messages: [
      '今日出会う全ての人に、あなたの優しさが伝わります',
      '愛は与えることで増えていく。今日は誰かに小さな親切を',
      '自分を愛することから、全ては始まります'
    ]
  },
  {
    category: '豊かさ',
    messages: [
      '豊かさはすでにあなたの中にあります。気づくだけです',
      '感謝の気持ちが、新しい豊かさを引き寄せます',
      '今日、小さな豊かさに気づくことで、大きな豊かさがやってきます'
    ]
  },
  {
    category: '成長',
    messages: [
      '今日の小さな一歩が、明日の大きな飛躍につながります',
      '失敗は成功の種。恐れずに新しいことに挑戦しましょう',
      'あなたは思っているよりも、ずっと強い存在です'
    ]
  },
  {
    category: '直感',
    messages: [
      '心の声に耳を傾けてください。答えはすでにあなたの中に',
      '今日は直感を信じて行動する日。宇宙があなたを導いています',
      '静かな時間を作ることで、内なる声がはっきりと聞こえてきます'
    ]
  }
]

export default function MessagePage() {
  const [currentMessage, setCurrentMessage] = useState('')
  const [currentCategory, setCurrentCategory] = useState('')
  const [moonPhase, setMoonPhase] = useState('')
  const [zodiacSign, setZodiacSign] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const generateMessage = () => {
    setIsAnimating(true)
    
    // カテゴリをランダムに選択
    const categoryIndex = Math.floor(Math.random() * DAILY_MESSAGES.length)
    const category = DAILY_MESSAGES[categoryIndex]
    
    // メッセージをランダムに選択
    const messageIndex = Math.floor(Math.random() * category.messages.length)
    const message = category.messages[messageIndex]
    
    setCurrentCategory(category.category)
    setCurrentMessage(message)
    
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    // 初期メッセージを生成
    generateMessage()
    
    // 月相を取得
    const phase = getMoonPhase(new Date())
    setMoonPhase(phase)
    
    // ユーザーの星座を取得
    const profile = localStorage.getItem('userProfile')
    if (profile) {
      const { birthDate } = JSON.parse(profile)
      const sign = getZodiacSign(new Date(birthDate))
      setZodiacSign(sign)
    }
  }, [])

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

        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl">
            <h1 className="text-3xl font-serif text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-8">
              今日のメッセージ
            </h1>

            {/* 現在の状態 */}
            <div className="text-center mb-8">
              <p className="text-purple-200 mb-2">
                {new Date().toLocaleDateString('ja-JP', { 
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'long'
                })}
              </p>
              <p className="text-pink-200">
                {moonPhase} {zodiacSign && `・ ${zodiacSign}の季節`}
              </p>
            </div>

            {/* メッセージカード */}
            <div className={`relative mb-8 ${isAnimating ? 'animate-pulse' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 blur-xl" />
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-purple-300/30">
                <div className="text-center mb-4">
                  <Sparkles className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
                  <p className="text-pink-200 text-sm font-medium mb-4">
                    〜 {currentCategory}のメッセージ 〜
                  </p>
                </div>
                
                <p className="text-xl md:text-2xl text-white leading-relaxed text-center font-serif">
                  「{currentMessage}」
                </p>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={generateMessage}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <RefreshCw className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
                別のメッセージを見る
              </button>
              
              <Link
                href="/note"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                このメッセージでノートを書く
              </Link>
            </div>

            {/* インスピレーション */}
            <div className="mt-8 p-6 bg-white/5 rounded-2xl">
              <h3 className="text-pink-100 font-medium mb-3 text-center">
                ✨ 今日の宇宙からのヒント ✨
              </h3>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li>• このメッセージが心に響いたら、それは宇宙からのサイン</li>
                <li>• 今日一日、このメッセージを意識して過ごしてみましょう</li>
                <li>• 寝る前に、このメッセージがもたらした気づきをノートに</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}