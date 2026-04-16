'use client'

import { useEffect } from 'react'

export function ChatbaseWidget() {
  useEffect(() => {
    // Initialize Chatbase script
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args: any[]) => {
        if (!window.chatbase.q) {
          window.chatbase.q = []
        }
        window.chatbase.q.push(args)
      }
      window.chatbase = new Proxy(window.chatbase as any, {
        get(target, prop) {
          if (prop === "q") {
            return target.q
          }
          return (...callArgs: any[]) => target(prop, ...callArgs)
        },
      })
    }

    // Load the Chatbase script
    const script = document.createElement("script")
    script.src = "https://www.chatbase.co/embed.min.js"
    script.id = "KGBSd-kI4_UADS_Gkf1HN"
    script.domain = "www.chatbase.co"
    script.async = true
    
    document.body.appendChild(script)

    return () => {
      // Cleanup: remove script if component unmounts
      if (script && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}
