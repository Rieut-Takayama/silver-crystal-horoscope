'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Moon, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { MOON_PHASES, MAGICAL_SYMBOLS } from '@/constants/magical-notes'
import { getMoonPhase } from '@/utils/astrology'
import StarryBackground from '@/components/StarryBackground'

export default function MagicalNotePage() {
  const router = useRouter()
  const [selectedSymbol, setSelectedSymbol] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [intention, setIntention] = useState('')
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [moonPhase, setMoonPhase] = useState('')

  useEffect(() => {
    const phase = getMoonPhase(new Date())
    setMoonPhase(phase)
    
    // 月相に応じたプロンプトを選択
    const phaseKey = phase.includes('新月') ? 'NEW_MOON' : 
                    phase.includes('満月') ? 'FULL_MOON' : 
                    phase.includes('上弦') ? 'WAXING_CRESCENT' : 
                    'WANING_CRESCENT'
    
    const prompts = MOON_PHASES[phaseKey].prompts
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
    setCurrentPrompt(randomPrompt)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const noteData = {
      content: noteContent,
      intention,
      symbol: selectedSymbol,
      moonPhase,
      prompt: currentPrompt,
      createdAt: new Date().toISOString()
    }
    
    // TODO: Supabaseに保存
    const existingNotes = JSON.parse(localStorage.getItem('magicalNotes') || '[]')
    existingNotes.push(noteData)
    localStorage.setItem('magicalNotes', JSON.stringify(existingNotes))
    
    // 完了後ホームに戻る
    router.push('/')
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

        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl">
            <h1 className="text-3xl font-serif text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-8">
              願いを紡ぐ
            </h1>

            {/* AIからの問いかけ */}
            <div className="mb-8 p-6 bg-pink-400/20 rounded-2xl border border-pink-300/30">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-pink-100 font-medium">AIからの問いかけ</span>
              </div>
              <p className="text-white text-lg leading-relaxed">
                「{currentPrompt}」
              </p>
              <p className="text-pink-200 text-sm mt-2">
                今夜は{moonPhase}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ノート記入エリア */}
              <div>
                <label className="block text-pink-200 mb-2">
                  <Moon className="inline w-4 h-4 mr-1" />
                  あなたの願いと意図
                </label>
                <textarea
                  required
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="心に浮かんだことを自由に書いてください..."
                  className="w-full min-h-[150px] px-4 py-3 bg-white/10 border border-purple-300/30 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-300/60 focus:bg-white/15 transition-all resize-none"
                />
              </div>

              {/* シンボル選択 */}
              <div>
                <label className="block text-pink-200 mb-4">
                  <Sparkles className="inline w-4 h-4 mr-1" />
                  象徴を選んでください
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {MAGICAL_SYMBOLS.map((symbol) => (
                    <button
                      key={symbol.emoji}
                      type="button"
                      onClick={() => setSelectedSymbol(symbol.emoji)}
                      className={`p-4 rounded-2xl border transition-all duration-300 ${
                        selectedSymbol === symbol.emoji
                          ? 'border-pink-400 bg-pink-400/20 scale-110'
                          : 'border-purple-300/30 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-3xl mb-1">{symbol.emoji}</div>
                      <div className="text-xs text-purple-200">{symbol.name}</div>
                    </button>
                  ))}
                </div>
                {selectedSymbol && (
                  <p className="text-pink-200 text-sm mt-2 text-center">
                    {MAGICAL_SYMBOLS.find(s => s.emoji === selectedSymbol)?.meaning}
                  </p>
                )}
              </div>

              {/* 意図の明確化 */}
              <div>
                <label className="block text-pink-200 mb-2">
                  <Sparkles className="inline w-4 h-4 mr-1" />
                  意図の明確化
                </label>
                <input
                  type="text"
                  required
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  placeholder="例：古い習慣を手放し、新しい自分になる"
                  className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-300/60 focus:bg-white/15 transition-all"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  宇宙に願いを送る
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  下書き保存
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}