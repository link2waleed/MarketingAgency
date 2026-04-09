'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { ChatMessage, ChatBotResponse, chatBotService } from '@/lib/chatbot-service'

interface ChatBotContextType {
  messages: ChatMessage[]
  isOpen: boolean
  isLoading: boolean
  openChat: () => void
  closeChat: () => void
  sendMessage: (message: string) => void
  clearMessages: () => void
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined)

export function ChatBotProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! 👋 Welcome to our marketing agency. I am here to help you with service information, project tracking, FAQs, and more. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
    },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback((userMessage: string) => {
    if (!userMessage.trim()) return

    // Remove leading/trailing whitespace
    const trimmedMessage = userMessage.trim()
    
    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: trimmedMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    }

    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    // Simulate slight delay for natural feel
    setTimeout(() => {
      const response = chatBotService.generateResponse(trimmedMessage)
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        type: response.type as any,
        data: response.data,
      }

      setMessages(prev => [...prev, botMsg])
      setIsLoading(false)
    }, 500)
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        text: 'Hello! 👋 Welcome to our marketing agency. I am here to help you with service information, project tracking, FAQs, and more. How can I assist you today?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      },
    ])
    chatBotService.clearHistory()
  }, [])

  const openChat = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <ChatBotContext.Provider 
      value={{ 
        messages, 
        isOpen, 
        isLoading, 
        openChat, 
        closeChat, 
        sendMessage, 
        clearMessages 
      }}
    >
      {children}
    </ChatBotContext.Provider>
  )
}

export function useChatBot() {
  const context = useContext(ChatBotContext)
  if (!context) {
    throw new Error('useChatBot must be used within ChatBotProvider')
  }
  return context
}
