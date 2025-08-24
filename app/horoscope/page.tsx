'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Star, Moon, Sparkles, TrendingUp, RefreshCw, Heart } from 'lucide-react'
import Link from 'next/link'
import { getZodiacSign, getUpcomingEvents } from '@/utils/astrology'
import { ZODIAC_THEMES } from '@/constants/magical-notes'
import StarryBackground from '@/components/StarryBackground'

interface ProfileData {
  birthDate: string
  birthTime?: string
  birthPlace?: string
}

export default function HoroscopePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [zodiacSign, setZodiacSign] = useState('')
  const [upcomingEvents, setUpcomingEvents] = useState<{
    date: string
    type: string
    description: string
    theme?: string
    magicalWork?: string
  }[]>([])

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (!savedProfile) {
      router.push('/profile')
      return
    }

    const profileData = JSON.parse(savedProfile) as ProfileData
    setProfile(profileData)

    // 星座を計算
    const birthDate = new Date(profileData.birthDate)
    const sign = getZodiacSign(birthDate)
    setZodiacSign(sign)

    // 今後のイベントを取得
    const events = getUpcomingEvents(birthDate)
    setUpcomingEvents(events)
  }, [router])

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'transformation': return <RefreshCw className="w-6 h-6" />
      case 'expansion': return <TrendingUp className="w-6 h-6" />
      case 'harmony': return <Heart className="w-6 h-6" />
      default: return <Star className="w-6 h-6" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'new_moon': return 'from-indigo-500/20 to-purple-500/20 border-indigo-300/30'
      case 'full_moon': return 'from-yellow-500/20 to-pink-500/20 border-yellow-300/30'
      case 'transformation': return 'from-purple-500/20 to-pink-500/20 border-purple-300/30'
      case 'expansion': return 'from-green-500/20 to-blue-500/20 border-green-300/30'
      default: return 'from-purple-500/20 to-indigo-500/20 border-purple-300/30'
    }
  }

  if (!profile) return null

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
          {/* あなたの星座情報 */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl mb-8">
            <h1 className="text-3xl font-serif text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-6">
              あなたの星の地図
            </h1>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-4 p-6 bg-white/5 rounded-2xl">
                <div className="text-5xl">
                  {Object.values(ZODIAC_THEMES).find(z => z.sign === zodiacSign)?.symbol || '⭐'}
                </div>
                <div className="text-left">
                  <h2 className="text-2xl text-yellow-300 font-semibold">{zodiacSign}</h2>
                  <p className="text-purple-200">太陽星座</p>
                </div>
              </div>
            </div>

            {profile.birthTime && (
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white/5 rounded-xl">
                  <Moon className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-purple-200 text-sm">月星座</p>
                  <p className="text-pink-100">魚座</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                  <p className="text-purple-200 text-sm">アセンダント</p>
                  <p className="text-pink-100">天秤座</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <Star className="w-8 h-8 text-pink-300 mx-auto mb-2" />
                  <p className="text-purple-200 text-sm">MC（天頂）</p>
                  <p className="text-pink-100">蟹座</p>
                </div>
              </div>
            )}
          </div>

          {/* 今後の重要な節目 */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-serif text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-6">
              今後の重要な節目
            </h2>

            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className={`p-6 bg-gradient-to-br ${getEventColor(event.type)} rounded-2xl border transition-all hover:scale-[1.02]`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-yellow-300">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-pink-100">
                          {new Date(event.date).toLocaleDateString('ja-JP', { 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </h3>
                        <span className="text-sm text-purple-200 bg-white/10 px-3 py-1 rounded-full">
                          {event.type === 'new_moon' ? '新月' : 
                           event.type === 'full_moon' ? '満月' : 
                           event.theme}
                        </span>
                      </div>
                      <p className="text-purple-200 mb-2">{event.description}</p>
                      {event.magicalWork && (
                        <p className="text-pink-200 text-sm">
                          ✨ {event.magicalWork}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center space-y-4">
              <Link
                href="/note"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                この節目に向けてノートを作成
              </Link>
              
              <p className="text-purple-300 text-sm">
                星の流れに合わせて願いを紡ぎましょう
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}