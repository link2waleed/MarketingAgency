'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChatBot } from '@/contexts/chatbot-context'
import { Send, X, MessageCircle, RotateCcw } from 'lucide-react'

export function ChatBot() {
  const { messages, isOpen, isLoading, openChat, closeChat, sendMessage, clearMessages } = useChatBot()
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 z-40 glass rounded-full p-4 border border-white/10 bg-white/5 hover:bg-white/10 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageCircle className="h-6 w-6 text-primary relative z-10" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-md glass rounded-2xl border border-white/10 bg-background backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-white/10 p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">Marketing Assistant</h3>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearMessages}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <RotateCcw className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
                <button
                  onClick={closeChat}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' ? (
                    <div className="max-w-xs space-y-3">
                      {/* Text Response */}
                      {message.type === 'text' && (
                        <div className="glass rounded-xl px-4 py-3 border border-white/10 bg-white/5">
                          <p className="text-sm text-foreground leading-relaxed">{message.text}</p>
                        </div>
                      )}

                      {/* FAQ Response */}
                      {message.type === 'faq' && (
                        <div className="glass rounded-xl p-4 border border-white/10 bg-white/5 space-y-3">
                          <div>
                            <p className="text-sm font-bold text-primary mb-2">❓ {message.data?.question}</p>
                            <span className="inline-block text-xs bg-gradient-to-r from-primary/30 to-accent/30 px-2 py-1 rounded mb-3">
                              {message.data?.category}
                            </span>
                          </div>
                          <div className="border-t border-white/10 pt-3">
                            <p className="text-sm text-foreground/90 leading-relaxed">{message.data?.answer}</p>
                          </div>
                        </div>
                      )}

                      {/* FAQs List Response */}
                      {message.type === 'faqs-list' && (
                        <div className="space-y-2 max-w-sm">
                          <div className="text-sm font-semibold text-foreground mb-3">{message.text}</div>
                          {message.data?.map((faq: any, idx: number) => (
                            <div
                              key={idx}
                              className="glass rounded-lg p-3 border border-white/10 bg-white/5 space-y-2 hover:bg-white/10 transition-colors"
                            >
                              <div>
                                <p className="text-sm font-semibold text-primary">❓ {faq.question}</p>
                                <span className="inline-block text-xs bg-gradient-to-r from-primary/20 to-accent/20 px-1.5 py-0.5 rounded mt-1">
                                  {faq.category}
                                </span>
                              </div>
                              <p className="text-xs text-foreground/80 leading-relaxed">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Service Response */}
                      {message.type === 'service' && (
                        <div className="space-y-3">
                          <div className="glass rounded-xl p-4 border border-white/10 bg-white/5">
                            <p className="text-sm font-semibold text-foreground mb-3">{message.text}</p>
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <p className="text-sm font-bold text-primary">{message.data?.service?.name}</p>
                                <p className="text-xs text-muted-foreground">{message.data?.service?.description}</p>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-sm font-semibold text-foreground">
                                    ${message.data?.service?.price}/month
                                  </span>
                                  <span className="text-xs bg-gradient-to-r from-primary/30 to-accent/30 px-2 py-1 rounded">
                                    ⭐ {message.data?.service?.rating}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Recommendations */}
                              {message.data?.recommendations?.length > 0 && (
                                <div className="pt-3 border-t border-white/10">
                                  <p className="text-xs font-semibold text-muted-foreground mb-2">You might also like:</p>
                                  {message.data.recommendations.map((rec: any) => (
                                    <div key={rec.id} className="text-xs text-muted-foreground/80">
                                      📌 {rec.name}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Services List Response */}
                      {message.type === 'services-list' && (
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-foreground">{message.text}</div>
                          {message.data?.map((service: any) => (
                            <div
                              key={service.id}
                              className="glass rounded-lg p-3 border border-white/10 bg-white/5 text-sm"
                            >
                              <p className="font-semibold text-primary">{service.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">${service.price}/month</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Project Response */}
                      {message.type === 'project' && (
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-foreground">{message.text}</div>
                          {message.data?.map((project: any) => (
                            <div
                              key={project.id}
                              className="glass rounded-lg p-3 border border-white/10 bg-white/5 space-y-2"
                            >
                              <div>
                                <p className="font-semibold text-primary text-sm">{project.name}</p>
                                <p className="text-xs text-muted-foreground">{project.service}</p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className={
                                    project.status === 'completed' ? 'text-green-400' :
                                    project.status === 'in-progress' ? 'text-primary' :
                                    'text-yellow-400'
                                  }>
                                    {project.status}
                                  </span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-primary to-accent"
                                    style={{ width: `${project.progress}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Pricing Plans Response */}
                      {message.type === 'pricing' && (
                        <div className="space-y-2 max-w-sm">
                          <div className="text-sm font-semibold text-foreground mb-3">{message.text}</div>
                          {message.data?.map((plan: any) => (
                            <div
                              key={plan.id}
                              className={`glass rounded-lg p-3 border transition-all ${
                                plan.popular
                                  ? 'border-primary/50 bg-gradient-to-br from-white/10 to-white/5'
                                  : 'border-white/10 bg-white/5'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-semibold text-primary text-sm">{plan.name}</p>
                                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                                </div>
                                {plan.popular && (
                                  <span className="text-xs bg-gradient-to-r from-primary/30 to-accent/30 px-2 py-1 rounded">
                                    ⭐ Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-sm font-bold text-accent mb-2">
                                ${plan.price}/month
                              </p>
                              <div className="space-y-1">
                                {plan.features.slice(0, 3).map((feature: string, idx: number) => (
                                  <div key={idx} className="text-xs text-muted-foreground/80 flex gap-1">
                                    <span>✓</span>
                                    <span>{feature}</span>
                                  </div>
                                ))}
                                {plan.features.length > 3 && (
                                  <p className="text-xs text-primary/80 pt-1">+{plan.features.length - 3} more features</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="max-w-xs bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl px-4 py-3 border border-white/10">
                      <p className="text-sm text-foreground">{message.text}</p>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass rounded-xl px-4 py-3 border border-white/10 bg-white/5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-4 bg-gradient-to-t from-background via-background to-transparent">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about services, pricing, projects..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-r from-primary to-accent text-white border-0 px-3 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">💡 Try asking: "What services do you offer?" or "Where is my project?"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
