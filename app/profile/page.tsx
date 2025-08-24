'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Moon, Star, Sparkles } from 'lucide-react'
import Link from 'next/link'
import StarryBackground from '@/components/StarryBackground'

export default function ProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Supabaseに保存
    localStorage.setItem('userProfile', JSON.stringify(formData))
    router.push('/horoscope')
  }

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

        <main className="container mx-auto px-4 py-8 max-w-md">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl">
            <h1 className="text-3xl font-serif text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-8">
              あなたの星の記憶
            </h1>

            <div className="text-center mb-8 p-6 bg-white/5 rounded-2xl">
              <Moon className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
              <p className="text-pink-200">生まれた瞬間の星空を教えてください</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 生年月日 */}
              <div>
                <label className="block text-pink-200 mb-2">
                  <Star className="inline w-4 h-4 mr-1" />
                  生年月日
                </label>
                <input
                  type="date"
                  required
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-300/60 focus:bg-white/15 transition-all"
                />
              </div>

              {/* 出生時間 */}
              <div>
                <label className="block text-pink-200 mb-2">
                  <Moon className="inline w-4 h-4 mr-1" />
                  出生時間（わかれば）
                </label>
                <input
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-300/60 focus:bg-white/15 transition-all"
                />
              </div>

              {/* 出生地 */}
              <div>
                <label className="block text-pink-200 mb-2">
                  <Sparkles className="inline w-4 h-4 mr-1" />
                  出生地（わかれば）
                </label>
                <input
                  type="text"
                  placeholder="東京都渋谷区"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-300/60 focus:bg-white/15 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Moon className="w-5 h-5" />
                銀水晶に記憶する
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}